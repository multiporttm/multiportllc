/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

document.querySelectorAll('.mosaic-panel').forEach((panel) => {
  panel.addEventListener('click', () => {
    const wasActive = panel.classList.contains('active');
    document.querySelectorAll('.mosaic-panel.active').forEach((other) => {
      other.classList.remove('active');
    });
    if (!wasActive) {
      panel.classList.add('active');
    }
  });
});
