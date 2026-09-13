// Theme toggle with localStorage persistence + system-pref fallback.
(function () {
  const STORAGE_KEY = 'mv-theme';
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = saved || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);

  if (!btn) return;
  btn.setAttribute('aria-pressed', String(theme === 'dark'));
  btn.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  });
})();

// Scroll reveal: JS adds .reveal so content still shows with JS disabled.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('main section, .deal-card, .work-tile, .timeline li');
  if (!('IntersectionObserver' in window)) return;
  els.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
