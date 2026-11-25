/* Contact: the time in Dubai right now, so a client knows when we're likely to answer. */
/** "14:32" in Dubai (UTC+4, no daylight saving) for a given Date. */
export const dubaiTime = (d = new Date()) => {
  const m = (d.getUTCHours() * 60 + d.getUTCMinutes() + 240) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

export function clock(el) {
  const tick = () => { el.textContent = dubaiTime(); };
  tick(); setInterval(tick, 20000);
}
