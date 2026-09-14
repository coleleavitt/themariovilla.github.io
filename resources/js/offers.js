// Offer tabs in the Work With Me section: click a tab to show that offer.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.offer-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.offer-panel'));
  if (!tabs.length || !panels.length) return;

  function select(name) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-offer') === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-offer-panel') === name);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { select(t.getAttribute('data-offer')); });
  });
})();
