/** Poster tilt: degrees to lean and where the light sits (%), for a pointer at (x, y) inside a w×h card. */
export const tiltAt = (x, y, w, h, max = 5) => {
  const px = w > 0 ? Math.min(1, Math.max(0, x / w)) : .5, py = h > 0 ? Math.min(1, Math.max(0, y / h)) : .5;
  return { rx: +((0.5 - py) * 2 * max).toFixed(2), ry: +((px - 0.5) * 2 * max).toFixed(2), mx: Math.round(px * 100), my: Math.round(py * 100) };
};
