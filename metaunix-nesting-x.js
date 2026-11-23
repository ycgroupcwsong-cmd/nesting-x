/* Nesting X | Sixshop header-preserving loader (2026-11-23) */
(function () {
  'use strict';
  var PAGE_PATH = '/nesting-x';
  var HOST_ID = 'mx-nesting-inline-host';
  var FRAME_URL = 'https://ycgroupcwsong-cmd.github.io/nesting-x/?sixshop_embed=1';

  function isTargetPage() {
    return (location.pathname.replace(/\/+$/, '') || '/') === PAGE_PATH;
  }

  function siteHeader() {
    return document.querySelector('#header, #site-header, [role="banner"], header');
  }

  function adjustHeight() {
    var host = document.getElementById(HOST_ID);
    if (!host) return;
    var header = siteHeader();
    var height = header ? Math.max(0, Math.ceil(header.getBoundingClientRect().height)) : 0;
    host.style.setProperty('--mx-site-header-height', Math.min(height, innerHeight * 0.4) + 'px');
  }

  function insertIntoContent(host) {
    var header = siteHeader();
    var selectors = ['main', '[role="main"]', '#contents', '#content', '#site-content', '.page-content'];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el && !el.closest('header, nav, footer') && !(header && el.contains(header))) {
        el.insertBefore(host, el.firstChild);
        return;
      }
    }
    var footer = document.querySelector('footer, [role="contentinfo"]');
    if (footer) footer.insertAdjacentElement('beforebegin', host);
    else document.body.appendChild(host);
  }

  function mount() {
    var host = document.getElementById(HOST_ID);
    if (!isTargetPage()) {
      if (host) host.remove();
      return;
    }
    if (!document.body) return;

    // 예전 Nesting X 전체 화면 iframe 흔적만 정리합니다.
    document.documentElement.classList.remove('mx-nesting-x-active');
    ['metaunix-nesting-x', 'metaunix-nesting-x-host', 'metaunix-nesting-x-frame'].forEach(function (id) {
      var old = document.getElementById(id);
      if (old) old.remove();
    });

    if (!host) {
      host = document.createElement('section');
      host.id = HOST_ID;
      host.setAttribute('aria-label', 'Nesting X 랜딩페이지');
      var frame = document.createElement('iframe');
      frame.id = 'mx-nesting-inline-frame';
      frame.title = 'Nesting X | 자재 배치 최적화 솔루션';
      frame.src = FRAME_URL;
      frame.setAttribute('allow', 'fullscreen; picture-in-picture');
      frame.setAttribute('allowfullscreen', '');
      host.appendChild(frame);
      insertIntoContent(host);
    }
    adjustHeight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
  window.addEventListener('pageshow', mount);
  window.addEventListener('popstate', mount);
  window.addEventListener('resize', adjustHeight);
})();
