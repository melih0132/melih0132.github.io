(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof Lenis === 'undefined') {
    return;
  }

  const lenis = new Lenis({
    autoRaf: true,
    anchors: { offset: 100 },
    allowNestedScroll: true
  });
  window.lenis = lenis;
})();
