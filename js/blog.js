/* ============================================================
   NAWABI KACCHI — Blog Page
   ============================================================ */

/* ---------- Category filter ---------- */
const pills = document.querySelectorAll('.cat-pill');
const cards = document.querySelectorAll('.blog-card');

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ---------- Pagination (visual only for demo) ---------- */
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    const isNumber = /^\d+$/.test(btn.textContent.trim());
    if (!isNumber) return;
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.scrollTo({ top: document.querySelector('.blog-grid-section').offsetTop - 80, behavior: 'smooth' });
  });
});
