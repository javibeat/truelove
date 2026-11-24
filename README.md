# truelovecreative.es

Static site (no framework). Pages are generated from `content/*.json` by `tools/build.mjs`.

- Preview locally: `npm run dev` → http://127.0.0.1:8766/ (same security headers as production)
- After editing content or the builder: `npm run build:site && npm run check && npm test`
- New blog covers: `PW=<folder with playwright> CHROME=<chromium path> node tools/covers.mjs`
- Deploy: push to `main` → Vercel. Newsletter function `api/subscribe.js` needs `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID`.
- The previous Next.js site is tagged `pre-redesign-2026-11`.
