/**
 * main.js — Tab navigation + theme management for ZachStichter.github.io
 */

(function () {
  'use strict';

  /* ── Theme management ─────────────────────────────────────────── */

  const THEME_KEY = 'preferred-theme';
  const VALID_THEMES = ['auto', 'light', 'dark'];

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return VALID_THEMES.includes(stored) ? stored : 'auto';
    } catch (_) {
      return 'auto';
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update active button state
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) { /* storage may be unavailable */ }
  }

  function initTheme() {
    const theme = getStoredTheme();
    applyTheme(theme);

    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.dataset.theme);
      });
    });
  }

  /* ── Initialise ──────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
  });
})();
