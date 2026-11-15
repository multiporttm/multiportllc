const manifesto = document.querySelector('.manifesto p');

if (manifesto) {
  const words = manifesto.textContent.trim().split(/\s+/);
  manifesto.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
  const wordEls = manifesto.querySelectorAll('.word');

  function updateReveal() {
    const rect = manifesto.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const start = viewportHeight * 0.9;
    const end = viewportHeight * 0.35;
    const raw = (start - rect.top) / (start - end);
    const progress = Math.min(Math.max(raw, 0), 1);
    const activeCount = Math.round(progress * wordEls.length);
    wordEls.forEach((el, i) => {
      el.classList.toggle('active', i < activeCount);
    });
  }

  window.addEventListener('scroll', updateReveal, { passive: true });
  window.addEventListener('resize', updateReveal);
  updateReveal();
}
