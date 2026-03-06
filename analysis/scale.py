import cv2
import numpy as np


def compute_scale(img1, img2, baseline_mm):

    orb = cv2.ORB_create(8000)

    kp1, des1 = orb.detectAndCompute(img1, None)
    kp2, des2 = orb.detectAndCompute(img2, None)

    bf = cv2.BFMatcher(cv2.NORM_HAMMING)

    matches = bf.knnMatch(des1, des2, k=2)

    good = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good.append(m)

    if len(good) < 50:
        raise ValueError("Rejected: not enough matches")

    pts1 = np.float32([kp1[m.queryIdx].pt for m in good])
    pts2 = np.float32([kp2[m.trainIdx].pt for m in good])

    disparity = np.abs(pts1[:, 0] - pts2[:, 0])
    median_disp = np.median(disparity)

    if median_disp < 10:
        raise ValueError("Rejected: camera movement too small")

    mm_per_pixel = (baseline_mm / 20.0) / median_disp

    return mm_per_pixel