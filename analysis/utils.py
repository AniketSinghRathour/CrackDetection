import requests
import numpy as np
import cv2


def read_image_from_url(url):

    r = requests.get(url, timeout=5)

    arr = np.asarray(bytearray(r.content), dtype=np.uint8)

    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    return img