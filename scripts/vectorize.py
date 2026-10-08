import cv2
import numpy as np
from scipy.interpolate import splprep, splev

# Load master logo
img = cv2.imread('public/brand/logo.png')
bg = np.array([217, 235, 252], dtype=np.float32)
diff = np.linalg.norm(img.astype(np.float32) - bg, axis=2)

# Bilateral filter preserves sharp boundary edges while removing JPEG DCT noise
clean_diff = cv2.bilateralFilter(diff.astype(np.uint8), 5, 40, 40)
_, thresh = cv2.threshold(clean_diff, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

def smooth_contour_spline(cnt, is_subtitle=False):
    pts = cnt.reshape(-1, 2)
    # Remove consecutive duplicate points
    diffs = np.diff(pts, axis=0)
    non_zero = np.any(diffs != 0, axis=1)
    pts = np.vstack([pts[0], pts[1:][non_zero]])
    
    n = len(pts)
    if n < 5:
        return ""
    
    x = pts[:, 0].astype(float)
    y = pts[:, 1].astype(float)
    
    # Subsample if too dense
    step = 2 if is_subtitle else 4
    x_sub = x[::step]
    y_sub = y[::step]
    
    if len(x_sub) < 5:
        x_sub, y_sub = x, y
        
    try:
        # Periodic cubic B-spline fitting
        s_val = len(x_sub) * (0.8 if is_subtitle else 1.5)
        tck, u = splprep([x_sub, y_sub], s=s_val, per=True, k=3)
        
        # Evaluate spline densely
        num_eval = max(len(x_sub) * 3, 20)
        u_new = np.linspace(0, 1, num_eval)
        x_smooth, y_smooth = splev(u_new, tck)
        
        d = [f"M {x_smooth[0]:.2f},{y_smooth[0]:.2f}"]
        for xi, yi in zip(x_smooth[1:], y_smooth[1:]):
            d.append(f"L {xi:.2f},{yi:.2f}")
        d.append("Z")
        return " ".join(d)
    except Exception:
        # Fallback to direct contour polygon
        d = [f"M {pts[0][0]},{pts[0][1]}"]
        for p in pts[1:]:
            d.append(f"L {p[0]},{p[1]}")
        d.append("Z")
        return " ".join(d)

mark_paths = []
sub_paths = []
k_paths = []

for i, c in enumerate(contours):
    area = cv2.contourArea(c)
    if area < 10:
        continue
    x, y, w, h = cv2.boundingRect(c)
    is_sub = (y >= 610)
    d = smooth_contour_spline(c, is_subtitle=is_sub)
    if not d:
        continue
        
    if not is_sub:
        mark_paths.append(d)
        if x < 300:
            k_paths.append(d)
    else:
        sub_paths.append(d)

mark_combined_d = " ".join(mark_paths)
sub_combined_d = " ".join(sub_paths)
k_combined_d = " ".join(k_paths)

def make_svg(fill_color):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 350 850 330" width="100%" height="100%">
  <g fill="{fill_color}" fill-rule="evenodd">
    <path d="{mark_combined_d}" />
    <path d="{sub_combined_d}" />
  </g>
</svg>"""

with open('public/brand/logo.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg('#FB9A5E'))

with open('public/brand/logo-ink.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg('#2A1810'))

with open('public/brand/logo-cream.svg', 'w', encoding='utf-8') as f:
    f.write(make_svg('#FDEBD9'))

# App icon squircle
app_icon_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="140" fill="#FB9A5E" />
  <g transform="translate(65, 95) scale(0.48)" fill="#FDEBD9" fill-rule="evenodd">
    <path d="{mark_combined_d}" />
    <path d="{sub_combined_d}" />
  </g>
</svg>"""

with open('public/brand/app-icon.svg', 'w', encoding='utf-8') as f:
    f.write(app_icon_svg)

# Favicon: isolated 'k' letterform in brand orange
favicon_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 350 200 240" width="100%" height="100%">
  <g fill="#FB9A5E" fill-rule="evenodd">
    <path d="{k_combined_d}" />
  </g>
</svg>"""

with open('public/brand/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg)

print("Generated B-spline smooth vector SVG assets!")
