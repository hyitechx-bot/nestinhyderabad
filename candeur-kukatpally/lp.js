// Sidebar form submission for all landing pages
const form = document.getElementById('sidebarForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('s-name').value.trim();
    const phone = document.getElementById('s-phone').value.trim();
    if (!name) { alert('Please enter your name.'); return; }
    if (!phone || phone.length < 10) { alert('Please enter a valid phone number.'); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const config = document.getElementById('s-config') ? document.getElementById('s-config').value : '';
    const page = window.location.pathname;

    try {
      const res = await fetch('https://formspree.io/f/mjgpzezo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, phone, config, page, project: 'Candeur Kukatpally - IDL Lake' }),
      });
      if (res.ok) {
        document.getElementById('sidebarSuccess').hidden = false;
        form.reset();
        btn.textContent = 'Submitted ✓';
      } else {
        throw new Error('Failed');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = form.querySelector('button').dataset.label || 'Submit';
      alert('Something went wrong. Please WhatsApp us at +91 93919 54743');
    }
  });
}

// Sticky header shadow – passive listener for performance
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });
