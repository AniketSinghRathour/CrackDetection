import requests
import numpy as np
import cv2


def read_image_from_url(url):
    """Download an image from a URL and return it as a BGR numpy array."""

    r = requests.get(url, timeout=15)
    r.raise_for_status()  # Raise on 4xx/5xx

    # Convert response bytes to numpy array
    img_bytes = np.frombuffer(r.content, dtype=np.uint8)

    if img_bytes.size == 0:
        raise ValueError(f"Empty response from URL: {url}")

    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError(
            f"Failed to decode image from URL: {url}  "
            f"(Content-Type: {r.headers.get('content-type', 'unknown')}, "
            f"bytes: {len(r.content)})"
        )

    return img