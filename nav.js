/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  toggle.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    dropdowns.forEach((other) => {
      if (other !== dropdown) {
        other.classList.remove('open');
        other.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  });
});
document.addEventListener('click', (event) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    }
  });
});
