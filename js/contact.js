/* ============================================================
   NAWABI KACCHI — Contact Page JS
   ============================================================ */

/* ---------- FAQ Accordion ---------- */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (toggle)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---------- Contact Form Validation ---------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, errId, message) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input)  input.classList.add('error');
  if (err)    err.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
    .forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const email     = document.getElementById('email').value.trim();
    const subject   = document.getElementById('subject').value;
    const message   = document.getElementById('message').value.trim();
    const consent   = document.getElementById('consent').checked;

    if (!firstName) {
      showError('firstName', 'firstNameErr', 'First name is required.');
      valid = false;
    }
    if (!lastName) {
      showError('lastName', 'lastNameErr', 'Last name is required.');
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      showError('email', 'emailErr', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject) {
      showError('subject', 'subjectErr', 'Please select a subject.');
      valid = false;
    }
    if (message.length < 10) {
      showError('message', 'messageErr', 'Please enter a message of at least 10 characters.');
      valid = false;
    }
    if (!consent) {
      valid = false;
      // highlight checkbox area
      document.querySelector('.form-check').style.outline = '2px solid #c94040';
      setTimeout(() => document.querySelector('.form-check').style.outline = '', 3000);
    }

    if (!valid) return;

    // Simulate sending
    const btnText    = contactForm.querySelector('.btn-text');
    const btnLoading = contactForm.querySelector('.btn-loading');
    const submitBtn  = contactForm.querySelector('.form-submit');

    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled       = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1800);
  });

  // Real-time clear error on input
  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = document.getElementById(el.id + 'Err');
      if (errEl) errEl.textContent = '';
    });
  });
}
