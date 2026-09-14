// Tab navigation: only one tab's sections are visible at a time.
// Inactive sections stay laid out off-flow (see CSS) so embeds size correctly.
(function () {
  var SECTION_TO_TAB = {
    top: 'home', home: 'home', about: 'home', 'kind-words': 'home',
    highlights: 'highlights',
    experience: 'experience', collaborators: 'experience',
    articles: 'writing', stories: 'writing',
    shop: 'shop',
    'work-with-me': 'contact', resume: 'contact', 'media-kit': 'contact', contact: 'contact'
  };
  var TABS = ['home', 'highlights', 'experience', 'writing', 'shop', 'contact'];

  var btns = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('#top > section[data-tab]'));

  function activate(name, scroll) {
    if (TABS.indexOf(name) === -1) return;
    btns.forEach(function (b) {
      var on = b.getAttribute('data-tab') === name;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    sections.forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-tab') === name);
    });
    try { history.replaceState(null, '', '#' + name); } catch (e) {}
    if (scroll !== false) window.scrollTo(0, 0);
    var activeBtn = document.querySelector('.tab-btn.is-active');
    if (activeBtn && activeBtn.scrollIntoView) {
      activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () { activate(b.getAttribute('data-tab')); });
  });

  // In-page anchor links (hero CTAs, footer, etc.) switch to the right tab.
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var tab = SECTION_TO_TAB[a.getAttribute('href').slice(1)];
    if (tab) { e.preventDefault(); activate(tab); }
  });

  var initial = (location.hash || '').replace(/^#/, '');
  activate(SECTION_TO_TAB[initial] || 'home', false);
})();
