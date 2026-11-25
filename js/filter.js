/* Blog: topic filter buttons ([data-filter-for=<list id>] [data-cat]) show only the cards of that topic. */
/** Which cards stay visible for a topic ("All" keeps every card). */
export const visibleFor = (cats, topic) => cats.map(c => topic === 'All' || c === topic);

export function filter(group) {
  const list = document.getElementById(group.dataset.filterFor);
  if (!list) return;
  const cards = [...list.querySelectorAll('[data-cat]')], buttons = [...group.querySelectorAll('[data-cat]')];
  buttons.forEach(b => b.addEventListener('click', () => {
    const show = visibleFor(cards.map(c => c.dataset.cat), b.dataset.cat);
    cards.forEach((c, i) => { c.hidden = !show[i]; });
    buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
}
