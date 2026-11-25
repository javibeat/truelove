/** Superellipse |x|^n + |y|^n = 1 as a CSS polygon in percentages (app icons and logos use n = 3.6). */
export const superellipse = (n = 3.6, steps = 72) => {
  const pts = [];
  for (let k = 0; k < steps; k++) {
    const t = (k / steps) * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    const x = Math.sign(c) * Math.abs(c) ** (2 / n), y = Math.sign(s) * Math.abs(s) ** (2 / n);
    pts.push(`${+(50 + 50 * x).toFixed(2)}% ${+(50 + 50 * y).toFixed(2)}%`);
  }
  return `polygon(${pts.join(', ')})`;
};
