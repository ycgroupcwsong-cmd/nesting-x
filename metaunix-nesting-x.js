/* Nesting X: Sixshop page-specific loader. */
(() => {
  'use strict';
  const TARGET_PATH = '/nesting-x';
  const PAGE_URL = 'https://ycgroupcwsong-cmd.github.io/nesting-x/';
  const FRAME_ID = 'metaunix-nesting-x-frame';
  const ACTIVE_CLASS = 'mx-nesting-x-active';

  function sync() {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const existing = document.getElementById(FRAME_ID);
    if (path !== TARGET_PATH) {
      if (existing) existing.remove();
      document.documentElement.classList.remove(ACTIVE_CLASS);
      return;
    }
    if (!document.body) return;
    if (!existing) {
      const frame = document.createElement('iframe');
      frame.id = FRAME_ID;
      frame.title = 'METAUNIX Nesting X';
      frame.src = PAGE_URL;
      frame.allow = 'fullscreen';
      frame.allowFullscreen = true;
      document.body.appendChild(frame);
    }
    document.documentElement.classList.add(ACTIVE_CLASS);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync, { once: true });
  } else {
    sync();
  }
  window.addEventListener('popstate', sync);
  window.addEventListener('pageshow', sync);
})();
