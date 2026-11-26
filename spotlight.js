/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const spotlightTrack = document.querySelector('.spotlight-track');
const spotlightDots = document.querySelector('.spotlight-dots');

if (spotlightTrack && spotlightDots) {
  const slides = Array.from(spotlightTrack.children);
  const prevButton = document.querySelector('.spotlight-prev');
  const nextButton = document.querySelector('.spotlight-next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'spotlight-dot';
    dot.setAttribute('aria-label', `Go to product ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    spotlightDots.appendChild(dot);
  });
  const dots = Array.from(spotlightDots.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    spotlightTrack.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  if (prevButton) prevButton.addEventListener('click', () => goTo(current - 1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(current + 1));

  goTo(0);
}
