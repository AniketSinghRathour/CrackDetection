import numpy as np
import cv2
from skimage.morphology import skeletonize
from scipy.ndimage import distance_transform_edt


def crack_metrics(mask, mm_per_pixel):

    mask = mask.astype(np.uint8)

    mask = cv2.GaussianBlur(mask, (3, 3), 0)
    mask = (mask > 0.3).astype(np.uint8)

    skeleton = skeletonize(mask)

    dist = distance_transform_edt(mask)

    widths = dist[skeleton] * 2

    widths_mm = widths * mm_per_pixel

    widths_mm = widths_mm[widths_mm > 0]

    max_width = float(np.max(widths_mm))
    avg_width = float(np.median(widths_mm))

    crack_pixels = np.sum(mask)

    area_mm2 = crack_pixels * (mm_per_pixel ** 2)

    return {
        "max_width_mm": max_width,
        "avg_width_mm": avg_width,
        "area_mm2": float(area_mm2)
    }