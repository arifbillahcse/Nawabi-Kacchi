/* ============================================================
   NAWABI KACCHI — Book a Table
   ============================================================ */

const form       = document.getElementById('bookingForm');
const panels     = document.querySelectorAll('.step-panel');
const steps      = document.querySelectorAll('.step');
const nextBtns   = document.querySelectorAll('.next-step');
const prevBtns   = document.querySelectorAll('.prev-step');
const success    = document.getElementById('bookingSuccess');

let currentStep = 1;

/* ---------- Set min date to today ---------- */
const dateInput = form.querySelector('input[type="date"]');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

/* ---------- Guest selector ---------- */
const guestBtns   = document.querySelectorAll('.guest-btn');
const guestsInput = document.getElementById('guestsInput');
guestBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    guestBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    guestsInput.value = btn.dataset.guests;
  });
});

/* ---------- Occasion chips ---------- */
const chips         = document.querySelectorAll('.chip');
const occasionInput = document.getElementById('occasionInput');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    occasionInput.value = chip.dataset.val;
  });
});
// default "None" active
document.querySelector('.chip[data-val="none"]').classList.add('active');

/* ---------- Step navigation ---------- */
function showStep(step) {
  panels.forEach(p => p.classList.remove('active'));
  document.querySelector(`.step-panel[data-panel="${step}"]`).classList.add('active');

  steps.forEach(s => {
    const n = +s.dataset.step;
    s.classList.remove('active', 'completed');
    if (n === step) s.classList.add('active');
    else if (n < step) s.classList.add('completed');
  });
  currentStep = step;
  window.scrollTo({ top: document.querySelector('.booking-form-wrap').offsetTop - 80, behavior: 'smooth' });
}

function validateStep(step) {
  const panel = document.querySelector(`.step-panel[data-panel="${step}"]`);
  const fields = panel.querySelectorAll('input[required], select[required], textarea[required]');
  for (const f of fields) {
    if (!f.value.trim()) {
      f.focus();
      f.style.borderColor = '#8b1a1a';
      setTimeout(() => { f.style.borderColor = ''; }, 2000);
      return false;
    }
  }
  return true;
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    if (currentStep === 2) populateReview();
    showStep(currentStep + 1);
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => showStep(currentStep - 1));
});

/* ---------- Populate review summary ---------- */
function populateReview() {
  const d = form.date.value;
  const dateObj = new Date(d);
  const dateStr = dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  document.getElementById('rDate').textContent     = dateStr;
  document.getElementById('rTime').textContent     = form.time.value;
  document.getElementById('rGuests').textContent   = form.guests.value + ' guests';
  document.getElementById('rOccasion').textContent = form.occasion.value === 'none'
    ? '—'
    : form.occasion.value.charAt(0).toUpperCase() + form.occasion.value.slice(1);
  document.getElementById('rName').textContent     = form.name.value;
  document.getElementById('rEmail').textContent    = form.email.value;
  document.getElementById('rPhone').textContent    = form.phone.value;

  const notes = form.notes.value.trim();
  if (notes) {
    document.getElementById('rNotesWrap').style.display = 'block';
    document.getElementById('rNotes').textContent = notes;
  } else {
    document.getElementById('rNotesWrap').style.display = 'none';
  }
}

/* ---------- Submit ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.querySelector('#terms').checked) return;
  panels.forEach(p => p.classList.remove('active'));
  document.querySelector('.step-indicator').style.display = 'none';
  success.classList.add('show');
  window.scrollTo({ top: document.querySelector('.booking-form-wrap').offsetTop - 80, behavior: 'smooth' });
});
