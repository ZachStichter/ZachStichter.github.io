/**
 * main.js — Theme toggle (light/dark) for ZachStichter.github.io
 */

(function () {
  'use strict';

  /* ── Theme management ─────────────────────────────────────────── */

  const THEME_KEY = 'preferred-theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';

  const NAV_ITEMS = [
    { href: '/about/', label: 'About' },
    { href: '/research/', label: 'Research' },
    { href: '/presentations/', label: 'Presentations' },
    // { href: '/publications/', label: 'Publications' },
    // { href: '/faith-science/', label: 'Faith &amp; Science' }
  ];

  class SiteNav extends HTMLElement {
    connectedCallback() {
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const links = NAV_ITEMS.map(({ href, label }) => {
        const isCurrent = href.replace(/\/$/, '') === currentPath;
        return `<li><a href="${href}"${isCurrent ? ' class="active" aria-current="page"' : ''}>${label}</a></li>`;
      }).join('');

      this.outerHTML = `<nav class="site-nav" aria-label="Main navigation"><ul class="nav-list">${links}</ul></nav>`;
    }
  }

  customElements.define('site-nav', SiteNav);

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return (stored === LIGHT_THEME || stored === DARK_THEME) ? stored : null;
    } catch (_) {
      return null;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) { /* storage may be unavailable */ }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    const next = current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    applyTheme(next);
  }

  function initTheme() {
    // Determine initial theme: stored preference → system preference
    const storedTheme = getStoredTheme();
    const theme = storedTheme || getSystemTheme();
    applyTheme(theme);

    // Set up toggle button
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }

  /* ── Initialise ──────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', initTheme);
})();
