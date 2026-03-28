/* ============================================================
   Ceylon Coco Creations — script.js
============================================================ */

/* ============================================================
   1. STICKY NAVBAR
============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load
})();


/* ============================================================
   2. HAMBURGER MENU
============================================================ */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  document.body.style.position = navLinks.classList.contains('open') ? 'fixed' : '';
  document.body.style.width = navLinks.classList.contains('open') ? '100%' : '';
});

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
document.body.style.position = ''
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();


/* ============================================================
   3. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver to add .visible class
   when elements enter viewport
============================================================ */
(function initReveal() {
  const selectors = ['.reveal', '.reveal-left', '.reveal-right'];
  const elements  = document.querySelectorAll(selectors.join(', '));

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly for a nicer cascade
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Add stagger delay to product cards and feature items
  document.querySelectorAll('.product-card').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    el.classList.add('reveal');
  });

  document.querySelectorAll('.feature-item').forEach((el, i) => {
    el.dataset.delay = i * 80;
    el.classList.add('reveal');
  });

  document.querySelectorAll('.sustain-card').forEach((el, i) => {
    el.dataset.delay = i * 80;
    el.classList.add('reveal');
  });

  document.querySelectorAll('.chain-step').forEach((el, i) => {
    el.dataset.delay = i * 90;
    el.classList.add('reveal');
  });

  document.querySelectorAll('.market-card').forEach((el, i) => {
    el.dataset.delay = i * 80;
    el.classList.add('reveal');
  });

  // Re-query after dynamic additions
  document.querySelectorAll(selectors.join(', ')).forEach(el => {
    observer.observe(el);
  });
})();


/* ============================================================
   4. SMOOTH SCROLL for anchor links
   (reinforces CSS scroll-behavior for older browsers)
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   5. CONTACT FORM
   Simple frontend validation + success state
============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Basic validation
    if (!name) {
      shakeField(form.querySelector('#name'));
      return;
    }
    if (!email || !emailRe.test(email)) {
      shakeField(form.querySelector('#email'));
      return;
    }
    if (!message) {
      shakeField(form.querySelector('#message'));
      return;
    }

    // Simulate submission
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '.7';

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '';
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1400);
  });

  function shakeField(el) {
    if (!el) return;
    el.style.borderColor = '#c0392b';
    el.style.animation = 'shake .35s ease';
    el.addEventListener('animationend', () => {
      el.style.animation = '';
    }, { once: true });
    el.focus();
  }

  // Inject shake keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();


/* ============================================================
   6. ACTIVE NAV HIGHLIGHT on scroll
   Highlights the nav link corresponding to the
   section currently in view
============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#d4a96a';
          }
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(section => observer.observe(section));
})();


/* ============================================================
   7. PARALLAX — subtle hero image movement on scroll
============================================================ */
(function initParallax() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Move image up at half the scroll rate (parallax effect)
        if (scrollY < window.innerHeight * 1.5) {
          heroImg.style.transform = `scale(1.06) translateY(${scrollY * 0.18}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ============================================================
   8. STATS COUNT-UP ANIMATION
   Animates the numeric statistics in the About section
============================================================ */
(function initCountUp() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();

      // Extract number and any suffix character (e.g. "50+" → num:50, suffix:"+")
      const match  = raw.match(/^(\d+)(.*)/);
      if (!match) return;

      const target = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const duration = 1400;
      const start  = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();
// Initialize Lucide Icons
lucide.createIcons();