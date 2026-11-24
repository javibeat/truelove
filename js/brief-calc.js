/* Brief estimate, pure (no DOM): same rules as the current truelovecreative.es/brief.
   choice = { web, type, app, redesign, urgency, sel: { feat_web, feat_app, feat_redesign, addons } } (sets or arrays) */
export const fits = (f, type) => f.types.includes('*') || f.types.includes(type);

export function estimateAED(data, choice) {
  const { WEBSITE_TYPES, WEB_FEATURES, APP_FEATURES, APP_BASE, REDESIGN_FEATURES, ADDON_PRICES, URGENCY_MULT } = data;
  const has = (g, v) => new Set(choice.sel?.[g] ?? []).has(v);
  let t = 0;
  if (choice.web && choice.type && WEBSITE_TYPES[choice.type]) {
    t += WEBSITE_TYPES[choice.type].base;
    WEB_FEATURES.forEach(f => { if (has('feat_web', f.name) && fits(f, choice.type)) t += f.price; });
  }
  if (choice.app) { t += APP_BASE; APP_FEATURES.forEach(f => { if (has('feat_app', f.name)) t += f.price; }); }
  if (choice.redesign && choice.web) REDESIGN_FEATURES.forEach(f => { if (has('feat_redesign', f.name)) t += f.price; });
  new Set(choice.sel?.addons ?? []).forEach(a => { t += ADDON_PRICES[a] ?? 0; });
  const m = URGENCY_MULT[choice.urgency ?? 0];
  return m ? Math.round(t * m) : t;
}

/** Amount in the chosen currency, formatted like the current site: "AED 33,350", "€8,338". */
export function formatMoney(aed, currency) {
  const n = String(Math.round(aed * currency.rate)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currency.code === 'AED' ? 'AED ' : currency.symbol}${n}`;
}
