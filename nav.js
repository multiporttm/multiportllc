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
