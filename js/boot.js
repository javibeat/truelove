/* Runs before paint (classic script in <head>): apply the stored light/dark choice so the page never flashes. */
try { document.querySelector('meta[name="color-scheme"]').content = localStorage.getItem('tl-scheme') ?? 'light dark'; } catch (e) {}
