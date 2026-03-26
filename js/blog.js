/* ============================================================
   NAWABI KACCHI — Blog Page JS
   ============================================================ */

/* ---------- Category Filter ---------- */
const catBtns  = document.querySelectorAll('.cat-btn');
const blogCards = document.querySelectorAll('.blog-card');
const featuredPost = document.querySelector('.featured-post');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;

    // Featured post visibility
    if (featuredPost) {
      const featCat = featuredPost.dataset.cat;
      featuredPost.style.display = (cat === 'all' || cat === featCat) ? '' : 'none';
    }

    // Blog cards
    blogCards.forEach((card, i) => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? '' : 'none';

      if (match) {
        // Re-trigger reveal with stagger
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), i * 80);
      }
    });
  });
});

/* ---------- Load More (simulates loading) ---------- */
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  let loaded = false;
  loadMoreBtn.addEventListener('click', () => {
    if (loaded) return;
    loaded = true;

    const icon = loadMoreBtn.querySelector('i');
    icon.className = 'fa-solid fa-spinner fa-spin';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      icon.className = 'fa-solid fa-check';
      loadMoreBtn.textContent = ' All Articles Loaded';
      loadMoreBtn.prepend(icon);
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
      loadMoreBtn.style.cursor = 'default';
    }, 1800);
  });
}

/* ---------- Newsletter Form ---------- */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn   = newsletterForm.querySelector('button');

    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#c94040';
      return;
    }
    input.style.borderColor = '';
    btn.textContent = 'Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #2e7d32, #1b5e20)';
    btn.disabled = true;
    input.value = '';
    input.placeholder = 'You\'re on the list!';
    input.disabled = true;
  });
}
