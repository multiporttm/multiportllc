/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const zoomStage = document.querySelector('.zoom-stage');
const zoomBox = document.querySelector('.zoom-box');
const zoomVideo = document.querySelector('.zoom-video');
const zoomContent = document.querySelector('.zoom-box-content');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (zoomStage && zoomBox && !reducedMotionQuery.matches) {
  const startWidth = 420;
  const startHeight = 315;
  const startRadius = 40;
  const boxPhaseEnd = 0.45; // box finishes growing to fullscreen by this fraction of scroll
  const maxVideoZoom = 3.4; // how far the video keeps zooming in after that

  function update() {
    const rect = zoomStage.getBoundingClientRect();
    const scrollableDistance = zoomStage.offsetHeight - window.innerHeight;
    const progress = scrollableDistance > 0
      ? Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      : 0;

    const boxProgress = Math.min(progress / boxPhaseEnd, 1);
    const videoProgress = Math.max((progress - boxPhaseEnd) / (1 - boxPhaseEnd), 0);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxWidth = Math.min(startWidth, vw * 0.9);
    const maxHeight = Math.min(startHeight, vh * 0.9);

    const width = maxWidth + (vw - maxWidth) * boxProgress;
    const height = maxHeight + (vh - maxHeight) * boxProgress;
    const radius = startRadius * (1 - boxProgress);

    zoomBox.style.width = `${width}px`;
    zoomBox.style.height = `${height}px`;
    zoomBox.style.borderRadius = `${radius}px`;

    if (zoomVideo) {
      const videoScale = 1 + (maxVideoZoom - 1) * videoProgress;
      zoomVideo.style.transform = `scale(${videoScale})`;
    }

    if (zoomContent) {
      const fadeProgress = Math.min(videoProgress / 0.6, 1);
      zoomContent.style.opacity = `${1 - fadeProgress}`;
      zoomContent.style.transform = `scale(${1 + fadeProgress * 1.5})`;
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
