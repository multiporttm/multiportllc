/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-reveal fade/slide-up for cards and rows
if (!reducedMotion) {
  const revealEls = document.querySelectorAll(
    '.feature-row, .product-card, .faq-item, .showcase-item, .mosaic-tip'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// 3D tilt effect on product cards
if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--ty', '-6px');
    });
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--ty', '0px');
    });
  });
}

// Navbar shadow once the page is scrolled
const navbar = document.querySelector('.navbar');
if (navbar) {
  const updateNavbarShadow = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', updateNavbarShadow, { passive: true });
  updateNavbarShadow();
}
