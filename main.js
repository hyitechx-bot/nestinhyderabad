// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

// Sticky header shadow
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) header.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.5)' : 'none';
});

// Lead form
const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name) { highlight('name'); return; }
    if (!phone || phone.length < 10) { highlight('phone'); return; }

    const btn = form.querySelector('.btn-primary');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('https://formspree.io/f/mjgpzezo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name, phone,
          email: document.getElementById('email')?.value,
          location: document.getElementById('location')?.value,
          budget: document.getElementById('budget')?.value,
          config: document.getElementById('config')?.value,
          source: 'SS Reality Website'
        }),
      });
      if (res.ok) {
        document.getElementById('formSuccess').hidden = false;
        form.reset();
        btn.textContent = 'Submitted ✓';
      } else { throw new Error(); }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Get Free Advice Now';
      alert('Something went wrong. Please WhatsApp us at +91 93919 54743');
    }
  });
}

function highlight(id) {
  const el = document.getElementById(id);
  el.focus();
  el.style.borderColor = '#ef4444';
  el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
}
