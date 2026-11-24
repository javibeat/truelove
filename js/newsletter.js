/* Newsletter form → /api/subscribe (MailerLite). Same copy and honeypot as the old site. */
export function newsletter(form) {
  const msg = form.querySelector('.nl-msg'), btn = form.querySelector('button');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true; btn.textContent = 'Sending…'; msg.hidden = true;
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.value, website: form.website.value }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Try again.');
      form.classList.add('sent'); msg.textContent = 'You are in. Welcome to the dispatch.'; msg.hidden = false; form.reset();
    } catch (err) { msg.textContent = err.message || 'Something went wrong. Try again.'; msg.hidden = false; }
    finally { btn.disabled = false; btn.textContent = 'Subscribe'; }
  });
}
