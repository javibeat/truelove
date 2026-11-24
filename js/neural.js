/* Hero background: a quiet field of dots that "learns" where the pointer passes.
   Dots near the pointer wake up, lean toward it and link to their neighbours like a neural network;
   now and then a red pulse runs along a link. Everything fades back to rest on its own. */
import { reduceMotion } from './core.js';

export function neural(canvas) {
  const g = canvas.getContext('2d');
  const GAP = 26, R = 150;
  let W = 0, H = 0, cols = 0, rows = 0, dpr = 1;
  let act = new Float32Array(0);
  const ptr = { x: -9999, y: -9999, inside: false };
  const sparks = [];

  const resize = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    cols = Math.ceil(W / GAP) + 1; rows = Math.ceil(H / GAP) + 1;
    act = new Float32Array(cols * rows);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const ox = () => (W - (cols - 1) * GAP) / 2, oy = () => (H - (rows - 1) * GAP) / 2;
  // the canvas does not take the pointer (content sits above it), so it listens to the page
  addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
    ptr.inside = ptr.x >= 0 && ptr.y >= 0 && ptr.x <= r.width && ptr.y <= r.height;
  }, { passive: true });
  document.addEventListener('pointerleave', () => { ptr.inside = false; });

  // Rest when nothing moves: no pointer, no awake dots, no pulses, or the hero is off screen.
  let colour = '10,10,10', last = performance.now(), frame = 0, idle = false, visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  addEventListener('resize', () => { idle = false; });
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (frame++ % 15 === 0) {
      const c = getComputedStyle(document.body).color.match(/[\d.]+/g);
      const next = c ? c.slice(0, 3).map(Number).map(Math.round).join(',') : colour;
      if (next !== colour) { colour = next; idle = false; }
    }
    if (!visible || (idle && !ptr.inside && !sparks.length)) { requestAnimationFrame(loop); return; }
    const decay = Math.pow(0.18, dt);          // about 1.5 s to fall asleep again
    const x0 = ox(), y0 = oy();
    // wake the dots around the pointer
    if (ptr.inside) {
      const c0 = Math.max(0, Math.floor((ptr.x - x0 - R) / GAP)), c1 = Math.min(cols - 1, Math.ceil((ptr.x - x0 + R) / GAP));
      const r0 = Math.max(0, Math.floor((ptr.y - y0 - R) / GAP)), r1 = Math.min(rows - 1, Math.ceil((ptr.y - y0 + R) / GAP));
      for (let j = r0; j <= r1; j++) for (let i = c0; i <= c1; i++) {
        const d = Math.hypot(x0 + i * GAP - ptr.x, y0 + j * GAP - ptr.y);
        if (d < R) { const k = j * cols + i, a = 1 - d / R; if (a > act[k]) act[k] = a; }
      }
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    const pos = (i, j, a) => {
      let x = x0 + i * GAP, y = y0 + j * GAP;
      if (a > 0 && ptr.inside && !reduceMotion.matches) { x += (ptr.x - x) * .12 * a; y += (ptr.y - y) * .12 * a; }
      return [x, y];
    };
    // links between awake neighbours
    g.lineWidth = 1;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i, a = act[k];
      if (a < .04) continue;
      const [x, y] = pos(i, j, a);
      for (const [di, dj] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
        const ii = i + di, jj = j + dj;
        if (ii >= cols || jj < 0 || jj >= rows) continue;
        const b = act[jj * cols + ii];
        if (b < .04) continue;
        const [x2, y2] = pos(ii, jj, b);
        g.strokeStyle = `rgba(${colour},${(Math.min(a, b) * .32).toFixed(3)})`;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
        if (!reduceMotion.matches && Math.random() < .0016 * a * b && sparks.length < 14) sparks.push({ x, y, x2, y2, t: 0 });
      }
    }
    // dots
    let awake = 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i, a = act[k];
      if (a > awake) awake = a;
      const [x, y] = pos(i, j, a);
      g.fillStyle = `rgba(${colour},${(.09 + a * .6).toFixed(3)})`;
      g.beginPath(); g.arc(x, y, .9 + a * 1.6, 0, Math.PI * 2); g.fill();
      act[k] = a * decay;
    }
    // red pulses travelling along links
    for (let n = sparks.length - 1; n >= 0; n--) {
      const s = sparks[n]; s.t += dt * 2.6;
      if (s.t >= 1) { sparks.splice(n, 1); continue; }
      const x = s.x + (s.x2 - s.x) * s.t, y = s.y + (s.y2 - s.y) * s.t;
      g.fillStyle = `rgba(232,7,7,${(1 - s.t) * .9})`;
      g.beginPath(); g.arc(x, y, 2.2, 0, Math.PI * 2); g.fill();
    }
    idle = awake < .004;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
