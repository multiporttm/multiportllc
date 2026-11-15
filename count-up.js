/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

document.querySelectorAll('.count-up').forEach((el) => {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.suffix || '';
  const start = parseInt(el.textContent, 10) || 1;
  const duration = 900;
  let startTime = null;

  function step(now) {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.round(start + progress * (target - start));
    el.textContent = value + (progress === 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
  });
  observer.observe(el);
});
