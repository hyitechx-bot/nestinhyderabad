/* ═══════════════════════════════════════
   NestIn Hyderabad – Main JavaScript
═══════════════════════════════════════ */

(function () {
  'use strict';

  // ── Navbar scroll effect ──
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Mobile nav toggle ──
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Exit Popup ──
  var exitPopup = document.getElementById('exitPopup');
  var popupClose = document.getElementById('popupClose');
  var popupOverlay = document.getElementById('popupOverlay');
  var popupShown = false;

  function showPopup() {
    if (exitPopup && !popupShown && !sessionStorage.getItem('nih_popup_closed')) {
      exitPopup.classList.add('active');
      popupShown = true;
      document.body.style.overflow = 'hidden';
    }
  }

  function closePopup() {
    if (exitPopup) {
      exitPopup.classList.remove('active');
      document.body.style.overflow = '';
      sessionStorage.setItem('nih_popup_closed', '1');
    }
  }

  // Exit intent (desktop: mouse leaving top)
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY < 10) showPopup();
  });

  // Mobile: show after 45 seconds
  setTimeout(function () {
    showPopup();
  }, 45000);

  if (popupClose) popupClose.addEventListener('click', closePopup);
  if (popupOverlay) popupOverlay.addEventListener('click', closePopup);

  // Escape key closes popup
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // ── Form submissions ──
  function handleFormSubmit(formId, successMessage) {
    var form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var phone = data.get('phone') || '';
      var project = data.get('project') || '';
      var budget = data.get('budget') || '';

      // Build WhatsApp message
      var msg = 'Hi, I am ' + name + '.\n';
      msg += 'Mobile: ' + phone + '\n';
      if (project) msg += 'Interested in: ' + project + '\n';
      if (budget) msg += 'Budget: ' + budget + '\n';
      msg += 'I found you on nestinhyderabad.com. Please share details.';

      var waUrl = 'https://wa.me/919391954743?text=' + encodeURIComponent(msg);
      window.open(waUrl, '_blank', 'noopener');

      // Show success state
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        var origText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✅ Sent! Redirecting to WhatsApp...';
        submitBtn.disabled = true;
        setTimeout(function () {
          submitBtn.innerHTML = origText;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }
    });
  }

  handleFormSubmit('siteVisitForm', 'Site visit scheduled!');
  handleFormSubmit('contactForm', 'Details sent!');
  handleFormSubmit('popupForm', 'Details sent!');

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navH = (navbar ? navbar.offsetHeight : 72) + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Intersection Observer for fade-in animations ──
  var fadeEls = document.querySelectorAll('.why-card, .blog-card, .testimonial-card, .location-card');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ── Projects Slider (Horizontal Carousel) ──
  var projectsSlider = document.getElementById('projectsSlider');
  var prevBtn = document.getElementById('projectsPrev');
  var nextBtn = document.getElementById('projectsNext');

  if (projectsSlider && prevBtn && nextBtn) {
    var scrollAmount = 400;

    nextBtn.addEventListener('click', function () {
      projectsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', function () {
      projectsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // ── Clickable Project Cards ──
  document.querySelectorAll('.project-card[data-href]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Don't navigate if clicking on a link or button inside the card
      if (e.target.closest('a') || e.target.closest('button')) return;
      window.location.href = card.getAttribute('data-href');
    });
  });

  // ── Home AI Finder → AI Finder Page ──
  var homeAiForm = document.getElementById('homeAiFinder');
  if (homeAiForm) {
    homeAiForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var query = document.getElementById('homeAiInput').value.trim();
      if (query) {
        window.location.href = '/ai-finder.html?q=' + encodeURIComponent(query);
      } else {
        window.location.href = '/ai-finder.html';
      }
    });
    // Example pills
    document.querySelectorAll('.home-ai-eg').forEach(function(eg) {
      eg.addEventListener('click', function() {
        document.getElementById('homeAiInput').value = this.textContent;
        window.location.href = '/ai-finder.html?q=' + encodeURIComponent(this.textContent);
      });
    });
  }

  // ── Hero Search → Projects Page ──
  var heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.addEventListener('submit', function(e) {
      e.preventDefault();
      var loc = document.getElementById('hsLoc').value;
      var bhk = document.getElementById('hsBhk').value;
      var budget = document.getElementById('hsBudget').value;
      var params = [];
      if (loc) params.push('loc=' + encodeURIComponent(loc));
      if (bhk) params.push('bhk=' + encodeURIComponent(bhk));
      if (budget) params.push('budget=' + encodeURIComponent(budget));
      window.location.href = '/projects.html' + (params.length ? '?' + params.join('&') : '');
    });
  }

})();

/* ═══════════════════════════════════════
   Google Analytics 4 (GA4) — site-wide tracking
   Measurement ID: G-1ZH7WD4ZM9
   Loaded here so every page that includes main.js is tracked.
═══════════════════════════════════════ */
(function () {
  var GA_ID = 'G-1ZH7WD4ZM9';

  // Load the gtag.js library
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  // Initialize the dataLayer + gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

/* ═══════════════════════════════════════
   Lead Capture Form (reusable)
   - Works on GitHub Pages (static) via Formspree AJAX POST
   - Captures the lead even if the user never sends the WhatsApp message
   - Fires a GA4 "generate_lead" event
   - Then opens WhatsApp with a prefilled message

   SETUP (one time):
   1. Create a free form at https://formspree.io  -> get your form ID
   2. Replace FORMSPREE_ID below with your ID (looks like "xdorwqkg")

   USAGE on any page: add a <form class="lead-form" data-source="Kukatpally page"> ... </form>
   with inputs named: name, phone, budget, area  (see the HTML snippet in the docs comment)
═══════════════════════════════════════ */
(function () {
  var FORMSPREE_ID = 'mjgpzezo'; // Formspree form ID (same inbox as all project microsites)
  var WHATSAPP_NUMBER = '919391954743';

  var forms = document.querySelectorAll('form.lead-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var statusEl = form.querySelector('.lead-form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var budget = (data.get('budget') || '').toString().trim();
      var area = (data.get('area') || '').toString().trim();
      var source = form.getAttribute('data-source') || document.title;

      // Basic validation
      if (!name || !phone) {
        if (statusEl) { statusEl.textContent = 'Please enter your name and phone number.'; statusEl.style.color = '#c0392b'; }
        return;
      }
      var digits = phone.replace(/\D/g, '');
      if (digits.length < 10) {
        if (statusEl) { statusEl.textContent = 'Please enter a valid phone number.'; statusEl.style.color = '#c0392b'; }
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var origText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }
      if (statusEl) { statusEl.textContent = ''; }

      // Add context fields Formspree will email you
      data.append('page_source', source);
      data.append('page_url', window.location.href);
      data.append('_subject', 'New lead: ' + name + ' (' + (area || 'Hyderabad') + ')');

      // GA4 conversion event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          lead_source: source,
          area: area || 'unspecified',
          budget: budget || 'unspecified'
        });
      }

      // Build the WhatsApp message (used after capture)
      var msg = 'Hi, I am ' + name + '.\n';
      msg += 'Mobile: ' + phone + '\n';
      if (area) msg += 'Area: ' + area + '\n';
      if (budget) msg += 'Budget: ' + budget + '\n';
      msg += 'Enquiry from: ' + source + '\n';
      msg += 'I found you on nestinhyderabad.com. Please share details.';
      var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);

      function finishSuccess() {
        if (statusEl) {
          statusEl.textContent = '✅ Thank you! Our team will contact you shortly. Opening WhatsApp…';
          statusEl.style.color = '#2f6b34';
        }
        if (submitBtn) { submitBtn.innerHTML = '✅ Sent!'; }
        form.reset();
        // Open WhatsApp as a second touchpoint (lead already captured above)
        window.open(waUrl, '_blank', 'noopener');
        setTimeout(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origText; }
        }, 4000);
      }

      // If Formspree isn't configured yet, still don't lose the lead: go to WhatsApp
      if (!FORMSPREE_ID || FORMSPREE_ID === 'YOUR_FORM_ID') {
        finishSuccess();
        return;
      }

      // POST the lead to Formspree (captures it even if WhatsApp is never sent)
      fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          finishSuccess();
        } else {
          // Capture failed, but still route to WhatsApp so the lead isn't lost
          if (statusEl) { statusEl.textContent = 'Opening WhatsApp to complete your enquiry…'; statusEl.style.color = '#2f6b34'; }
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origText; }
          window.open(waUrl, '_blank', 'noopener');
        }
      }).catch(function () {
        if (statusEl) { statusEl.textContent = 'Opening WhatsApp to complete your enquiry…'; statusEl.style.color = '#2f6b34'; }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origText; }
        window.open(waUrl, '_blank', 'noopener');
      });
    });
  });
})();
