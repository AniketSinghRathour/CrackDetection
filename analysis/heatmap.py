import cv2
import numpy as np
from scipy.ndimage import distance_transform_edt


def generate_heatmap(image, mask, mm_per_pixel):

    dist = distance_transform_edt(mask)

    width_map = dist * 2 * mm_per_pixel

    norm = cv2.normalize(width_map, None, 0, 255, cv2.NORM_MINMAX)

    norm = norm.astype(np.uint8)

    heatmap = cv2.applyColorMap(norm, cv2.COLORMAP_JET)

    overlay = cv2.addWeighted(image, 0.7, heatmap, 0.3, 0)

    return overlay