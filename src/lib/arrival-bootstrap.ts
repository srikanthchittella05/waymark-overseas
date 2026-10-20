// A tiny parser-time cosmetic enhancement: no network request or hydration wait.
// The no-JS page remains completely visible. No profile or progress is touched.
export const ARRIVAL_BOOTSTRAP = String.raw`
(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const restoreScroll = () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
  };
  if (location.pathname !== '/' || location.hash || preference.matches ||
      performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
    restoreScroll();
    return;
  }
  // Every fresh document is a fresh entrance. The opening reveal replays on
  // every reload, so the page always begins from its opening state instead of
  // from whatever the browser remembers of the last scroll position.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  root.dataset.waymarkArrival = 'pending';
  let active = true;
  const events = ['keydown', 'pointerdown', 'wheel', 'touchstart'];
  const finish = (skip) => {
    if (!active) return;
    active = false;
    clearTimeout(watchdog);
    events.forEach((name) => window.removeEventListener(name, interrupt, true));
    preference.removeEventListener('change', interrupt);
    document.removeEventListener('waymark:arrival-done', done);
    if (skip) {
      root.setAttribute('data-waymark-arrival-skipped', '');
      document.dispatchEvent(new Event('waymark:skip-arrival'));
    }
    delete root.dataset.waymarkArrival;
    restoreScroll();
  };
  const interrupt = () => finish(true);
  const done = () => finish(false);
  const watchdog = setTimeout(interrupt, 4500);
  events.forEach((name) => window.addEventListener(name, interrupt, { capture: true, passive: true }));
  preference.addEventListener('change', interrupt);
  document.addEventListener('waymark:arrival-done', done);
})();`;
