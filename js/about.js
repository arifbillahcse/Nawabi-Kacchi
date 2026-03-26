/* ============================================================
   NAWABI KACCHI — About Page JS
   ============================================================ */

/* ---------- Animated Counters ---------- */
const statsNums = document.querySelectorAll('.stats-num');
let countersTriggered = false;

function animateStat(el) {
  const target   = +el.dataset.target;
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const tick = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  tick();
}

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersTriggered) {
      countersTriggered = true;
      statsNums.forEach(animateStat);
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsBanner);
}

/* ---------- Stagger reveal on timeline ---------- */
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.value-card, .team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
