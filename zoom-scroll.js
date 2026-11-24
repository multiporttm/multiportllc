/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const zoomStage = document.querySelector('.zoom-stage');
const zoomBox = document.querySelector('.zoom-box');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (zoomStage && zoomBox && !reducedMotionQuery.matches) {
  const startWidth = 420;
  const startHeight = 315;
  const startRadius = 40;

  function update() {
    const rect = zoomStage.getBoundingClientRect();
    const scrollableDistance = zoomStage.offsetHeight - window.innerHeight;
    const progress = scrollableDistance > 0
      ? Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      : 0;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxWidth = Math.min(startWidth, vw * 0.9);
    const maxHeight = Math.min(startHeight, vh * 0.9);

    const width = maxWidth + (vw - maxWidth) * progress;
    const height = maxHeight + (vh - maxHeight) * progress;
    const radius = startRadius * (1 - progress);

    zoomBox.style.width = `${width}px`;
    zoomBox.style.height = `${height}px`;
    zoomBox.style.borderRadius = `${radius}px`;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
