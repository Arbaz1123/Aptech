(function() {
  'use strict';

  // Initialize AOS
  AOS.init({
    duration: 700,
    once: true,
    offset: 80
  });

  // Navbar active link on scroll and shrink effect
  const navbar = document.getElementById('mainNavbar');
  const backToTop = document.getElementById('backToTop');
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const onScroll = () => {
    const scrolled = window.scrollY > 24;
    if (scrolled) {
      navbar && navbar.classList.add('scrolled');
      backToTop && backToTop.classList.add('show');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Smooth scrolling for anchor links
  $(document).on('click', 'a[href^="#"]:not([data-bs-toggle])', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Form validation and fake submit
  const form = document.getElementById('appointmentForm');
  const alertBox = document.getElementById('formAlert');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        if (alertBox) {
          alertBox.className = 'small text-danger';
          alertBox.textContent = 'Please complete all required fields.';
        }
        return;
      }

      // Simulate async submit
      if (alertBox) {
        alertBox.className = 'small text-muted';
        alertBox.textContent = 'Submitting...';
      }

      setTimeout(function() {
        if (alertBox) {
          alertBox.className = 'small text-success';
          alertBox.textContent = 'Appointment request sent! We will contact you shortly.';
        }
        form.reset();
        form.classList.remove('was-validated');
      }, 900);
    });
  }

  // GSAP subtle entrance for hero buttons
  window.addEventListener('load', function() {
    const btns = document.querySelectorAll('.hero-section .btn');
    if (btns.length) {
      gsap.from(btns, { y: 16, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' });
    }

    // Counters on stats section
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = Number(el.getAttribute('data-target') || '0');
            const durationMs = 1200;
            const startTs = performance.now();
            const startVal = 0;
            const formatter = new Intl.NumberFormat();

            function tick(now) {
              const progress = Math.min(1, (now - startTs) / durationMs);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.round(startVal + (target - startVal) * eased);
              el.textContent = formatter.format(value);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.4 });

      counters.forEach((c) => observer.observe(c));
    }
  });
})();

