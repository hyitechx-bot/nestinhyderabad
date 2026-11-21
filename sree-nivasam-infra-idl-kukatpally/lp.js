// Lead form for Sree Nivasam Infra IDL Kukatpally
const form = document.getElementById('sidebarForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('s-name').value.trim();
    const phone = document.getElementById('s-phone').value.trim();
    if (!name) { alert('Please enter your name.'); return; }
    if (phone.replace(/\D/g, '').length < 10) { alert('Please enter a valid phone number.'); return; }
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const config = document.getElementById('s-config') ? document.getElementById('s-config').value : '';
    const page = window.location.pathname;
    try {
      const res = await fetch('https://formspree.io/f/mjgpzezo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, phone, config, page, project: 'Sree Nivasam Infra IDL Kukatpally' }),
      });
      if (!res.ok) throw new Error('Failed');
      // Google Ads conversion: "Submit lead form"
      if (typeof window.gtag === 'function') { window.gtag('event', 'conversion', { send_to: 'AW-18573329414/88SUCLrtm7gdEIaIuphF' }); }
      // GA4 lead event
      if (typeof window.gtag === 'function') { window.gtag('event', 'generate_lead', { project: 'Sree Nivasam Infra IDL Kukatpally', config: config || 'unspecified', page: page }); }
      document.getElementById('sidebarSuccess').hidden = false;
      form.reset();
      btn.textContent = 'Submitted ✓';
    } catch {
      btn.disabled = false;
      btn.textContent = label;
      alert('Something went wrong. Please WhatsApp us at +91 93919 54743');
    }
  });
}

// Track WhatsApp and call clicks in GA4
document.addEventListener('click', function (e) {
  const a = e.target.closest ? e.target.closest('a') : null;
  if (!a || !a.href || typeof window.gtag !== 'function') return;
  if (a.href.indexOf('wa.me') > -1) window.gtag('event', 'contact_whatsapp', { project: 'Sree Nivasam Infra IDL Kukatpally', page: window.location.pathname });
  else if (a.href.indexOf('tel:') === 0) window.gtag('event', 'contact_call', { project: 'Sree Nivasam Infra IDL Kukatpally', page: window.location.pathname });
}, { passive: true });

window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });
