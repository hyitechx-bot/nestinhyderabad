// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

// Amenity tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('aria-controls');
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.remove('active');
      p.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(target);
    panel.classList.add('active');
    panel.hidden = false;
  });
});

// Lead form submission
document.getElementById('leadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name) { showError('name', 'Please enter your name.'); return; }
  if (!phone || phone.length < 10) { showError('phone', 'Please enter a valid phone number.'); return; }

  const submitBtn = this.querySelector('.btn-primary');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const data = {
    name,
    phone,
    email: document.getElementById('email').value.trim(),
    config: document.getElementById('config').value,
    message: document.getElementById('message').value.trim(),
  };

  try {
    const res = await fetch('https://formspree.io/f/mjgpzezo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      document.getElementById('formSuccess').hidden = false;
      this.reset();
      submitBtn.textContent = 'Submitted ✓';
    } else {
      const json = await res.json();
      throw new Error(json.error || 'Submission failed');
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book Free Site Visit';
    alert('Something went wrong. Please call us directly at +91 93919 54743 or WhatsApp us.');
    console.error(err);
  }
});

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  field.focus();
  field.style.borderColor = '#ef4444';
  field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
  alert(msg);
}

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
});
