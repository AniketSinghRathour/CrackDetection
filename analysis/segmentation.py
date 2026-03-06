import cv2
import torch
import numpy as np
from model_loader import model, device


def segment_crack(image):

    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    img_resized = cv2.resize(img_rgb, (256, 256))

    inp = torch.tensor(img_resized / 255.0)\
        .permute(2, 0, 1)\
        .unsqueeze(0)\
        .float()\
        .to(device)

    with torch.no_grad():
        pred = model(inp)[0][0].cpu().numpy()

    mask = (pred > 0.5).astype(np.uint8)

    mask = cv2.resize(mask, (image.shape[1], image.shape[0]))

    return mask

def generate_overlay(image, mask):
    """
    image: BGR image (original)
    mask: binary mask (0/1 or 0/255)
    """

    # ensure mask is 0/255
    mask = (mask > 0).astype("uint8") * 255

    # apply colormap to mask
    heat = cv2.applyColorMap(mask, cv2.COLORMAP_JET)

    # overlay
    overlay = cv2.addWeighted(image, 0.7, heat, 0.3, 0)

    return overlay