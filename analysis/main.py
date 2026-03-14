from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import cv2
import base64
import numpy as np

from segmentation import segment_crack, generate_overlay
from scale import compute_scale
from crack_metrics import crack_metrics
from heatmap import generate_heatmap
from utils import read_image_from_url
from chatbot_engine import get_chat_response

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "crack-analysis-api"}


class CrackRequest(BaseModel):
    left_path: str
    right_path: str
    baseline_mm: float


# ── Chatbot models ──────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    crack_data: Optional[Dict[str, Any]] = None


# ── Chatbot endpoint ────────────────────────────────────────

@app.post("/chat")
def chatbot_endpoint(data: ChatRequest):
    try:
        messages = [{"role": m.role, "content": m.content} for m in data.messages]
        response = get_chat_response(messages, data.crack_data)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def load_image(path: str):

    # load from URL or local path
    if path.startswith("http://") or path.startswith("https://"):
        img = read_image_from_url(path)
    else:
        img = cv2.imread(path)

    if img is None:
        raise ValueError(f"Could not load image from: {path}")

    return img


def encode_image_to_base64(image):

    _, buffer = cv2.imencode(".png", image)
    return base64.b64encode(buffer).decode()


@app.post("/analyze-crack")
def analyze_crack(data: CrackRequest):

    try:

        # ---------------------------
        # load images
        # ---------------------------

        img_left = load_image(data.left_path)
        img_right = load_image(data.right_path)

        if img_left is None or img_right is None:
            raise ValueError("Image path or URL invalid")

        # ---------------------------
        # grayscale for stereo scale
        # ---------------------------

        gray_left = cv2.cvtColor(img_left, cv2.COLOR_BGR2GRAY)
        gray_right = cv2.cvtColor(img_right, cv2.COLOR_BGR2GRAY)

        # ---------------------------
        # compute pixel -> mm scale
        # ---------------------------

        mm_per_pixel = compute_scale(
            gray_left,
            gray_right,
            data.baseline_mm
        )

        # ---------------------------
        # crack segmentation
        # ---------------------------

        mask = segment_crack(img_left)

        # convert mask to visible format (0/255)
        overlay = generate_overlay(img_left, mask)
        overlay_b64 = encode_image_to_base64(overlay)

        # ---------------------------
        # crack metrics
        # ---------------------------

        metrics = crack_metrics(mask, mm_per_pixel)

        # ---------------------------
        # heatmap generation
        # ---------------------------

        heatmap = generate_heatmap(img_left, mask, mm_per_pixel)

        # ---------------------------
        # encode images
        # ---------------------------

        heatmap_b64 = encode_image_to_base64(heatmap)
        # mask_b64 = encode_image_to_base64(mask_vis)

        # ---------------------------
        # response
        # ---------------------------

        return {
            "scale_mm_per_pixel": float(mm_per_pixel),
            "max_width_mm": float(metrics["max_width_mm"]),
            "avg_width_mm": float(metrics["avg_width_mm"]),
            "crack_area_mm2": float(metrics["area_mm2"]),
            "overlay": overlay_b64,
            "heatmap": heatmap_b64
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))