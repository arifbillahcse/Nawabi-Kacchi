/* ============================================================
   NAWABI KACCHI — Main JavaScript
   ============================================================ */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Floating Particles ---------- */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size    = Math.random() * 4 + 2;
    const left    = Math.random() * 100;
    const delay   = Math.random() * 15;
    const dur     = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.5 + 0.2;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${dur}s;
      opacity: ${opacity};
    `;
    container.appendChild(p);
  }
})();

/* ---------- Counter animation ---------- */
function animateCounter(el) {
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

/* ---------- Intersection Observer (reveal + counters) ---------- */
const revealEls   = document.querySelectorAll('.reveal');
const counterEls  = document.querySelectorAll('.stat-num');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger reveal on grid children
document.querySelectorAll('.features-grid, .dishes-grid, .testi-track').forEach(grid => {
  const children = grid.querySelectorAll('.feature-card, .dish-card, .testi-card');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});

// Counter observer (trigger once hero stats are visible)
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    counterEls.forEach(animateCounter);
  }
}, { threshold: 0.5 });

if (counterEls.length) {
  counterObserver.observe(counterEls[0].closest('.hero-stats') || counterEls[0]);
}

/* ---------- Testimonial dots ---------- */
(function initTestiDots() {
  const cards   = document.querySelectorAll('.testi-card');
  const dotsWrap = document.getElementById('testiDots');
  if (!dotsWrap || !cards.length) return;

  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  });
})();

/* ---------- Smooth active nav on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}` ||
          (entry.target.id === 'home' && link.getAttribute('href') === 'index.html')
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- Parallax on hero bg (subtle) ---------- */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const offset = window.scrollY;
  heroBg.style.transform = `scale(1.05) translateY(${offset * 0.15}px)`;
}, { passive: true });
