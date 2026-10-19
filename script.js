const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('is-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}));

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
