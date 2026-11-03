// ── Google Analytics 4 (GA4) — load on every Candeur Eternia page ──
(function () {
  var GA_ID = 'G-1ZH7WD4ZM9';
  if (window.gtag) return; // already loaded (e.g. via main.js)
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

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
        body: JSON.stringify({ name, phone, config, page }),
      });
      if (res.ok) {
        document.getElementById('sidebarSuccess').hidden = false;
        form.reset();
        btn.textContent = 'Submitted ✓';
        // GA4 conversion event — lets you measure which page generates leads
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            project: 'Candeur Eternia',
            config: config || 'unspecified',
            page: page
          });
        }
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

// ── Track WhatsApp + call clicks as leads (GA4) ──
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a') : null;
  if (!a || !a.href) return;
  if (typeof window.gtag !== 'function') return;
  if (a.href.indexOf('wa.me') > -1 || a.href.indexOf('whatsapp') > -1) {
    window.gtag('event', 'contact_whatsapp', { project: 'Candeur Eternia', page: window.location.pathname });
  } else if (a.href.indexOf('tel:') === 0) {
    window.gtag('event', 'contact_call', { project: 'Candeur Eternia', page: window.location.pathname });
  }
}, { passive: true });

// ── Sticky Call + WhatsApp action bar (mobile-first conversion booster) ──
(function () {
  if (document.getElementById('stickyCta')) return;
  var PHONE = '919391954743';
  var WA = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent("Hi, I'm interested in premium apartments in Bachupally. Please share details.");
  var bar = document.createElement('div');
  bar.id = 'stickyCta';
  bar.innerHTML =
    '<a class="sc-call" href="tel:+' + PHONE + '">📞 Call Now</a>' +
    '<a class="sc-wa" href="' + WA + '" target="_blank" rel="noopener">💬 WhatsApp</a>';
  var css = document.createElement('style');
  css.textContent =
    '#stickyCta{position:fixed;left:0;right:0;bottom:0;z-index:9998;display:flex;box-shadow:0 -2px 16px rgba(0,0,0,0.18)}' +
    '#stickyCta a{flex:1;text-align:center;padding:15px 8px;font-weight:700;font-size:0.95rem;text-decoration:none;color:#fff;font-family:inherit}' +
    '#stickyCta .sc-call{background:#1a1a1a}' +
    '#stickyCta .sc-wa{background:#25D366}' +
    'body{padding-bottom:56px}' +
    '.whatsapp-float{bottom:72px!important}' +
    '@media(min-width:900px){#stickyCta{display:none}body{padding-bottom:0}.whatsapp-float{bottom:24px!important}}';
  document.head.appendChild(css);
  document.body.appendChild(bar);
})();
