// Vanilla JS for Portfolio Interactions (No external libraries)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Project detail panel expand / collapse
  const toggleButtons = document.querySelectorAll('.project-toggle-btn');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (panel) {
        if (isExpanded) {
          panel.classList.remove('is-open');
          button.setAttribute('aria-expanded', 'false');
          button.textContent = '[ + ] Detail Teknis & Fitur';
        } else {
          panel.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
          button.textContent = '[ − ] Tutup Detail';
        }
      }
    });
  });

  // 2. Active Navigation Link Scrollspy Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 3. Signature Detail 5: Custom Cursor with RAF (Desktop Only)
  const cursor = document.getElementById('custom-cursor');
  const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;

  if (cursor && isFinePointer) {
    let mouseX = -100;
    let mouseY = -100;
    let isTicking = false;

    const updateCursor = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      isTicking = false;
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursor.classList.contains('is-visible')) {
        cursor.classList.add('is-visible');
      }

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateCursor);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', () => {
      cursor.classList.add('is-visible');
    });

    // Enhance crosshair/dot scale on interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .project-toggle-btn, .chip, .project-item, .contact-link-pill';

    document.addEventListener('mouseover', (e) => {
      if (e.target && e.target.closest(interactiveSelectors)) {
        cursor.classList.add('is-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target && e.target.closest(interactiveSelectors)) {
        cursor.classList.remove('is-hover');
      }
    });
  }
});
