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

  /* ── Tab navigation ──────────────────────────────────────────── */

  function getTabFromHash() {
    const hash = window.location.hash.replace('#', '');
    const panel = document.getElementById('tab-' + hash);
    return panel ? hash : null;
  }

  function activateTab(tabId) {
    const navLinks = document.querySelectorAll('.nav-list a');
    const panels = document.querySelectorAll('.tab-panel');

    // Deactivate all
    navLinks.forEach(function (link) { link.classList.remove('active'); });
    panels.forEach(function (panel) { panel.classList.remove('active'); });

    // Activate target
    const targetPanel = document.getElementById('tab-' + tabId);
    const targetLink = document.querySelector('.nav-list a[data-tab="' + tabId + '"]');

    if (targetPanel) { targetPanel.classList.add('active'); }
    if (targetLink) { targetLink.classList.add('active'); }
  }

  function initTabs() {
    const navLinks = document.querySelectorAll('.nav-list a[data-tab]');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const tabId = link.dataset.tab;
        activateTab(tabId);
        // Update URL hash without scrolling
        history.replaceState(null, '', '#' + tabId);
      });
    });

    // Activate tab from URL hash or default to first tab
    const fromHash = getTabFromHash();
    if (fromHash) {
      activateTab(fromHash);
    } else {
      const firstTab = navLinks[0];
      if (firstTab) {
        activateTab(firstTab.dataset.tab);
      }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function () {
      const fromHash = getTabFromHash();
      if (fromHash) {
        activateTab(fromHash);
      }
    });
  }

  /* ── Initialise ──────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initTabs();
  });
})();
