const dropdown = document.querySelector('.nav-dropdown');
const toggle = dropdown.querySelector('.dropdown-toggle');
toggle.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
