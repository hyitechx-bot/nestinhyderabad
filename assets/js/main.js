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

})();
