/**
 * Light/Dark theme 切换
 */
(function () {
  const THEME_KEY = 'sg_theme';
  const DEFAULT_THEME = 'light';

  function getTheme() {
    const t = localStorage.getItem(THEME_KEY);
    return t === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme();
    document.dispatchEvent(new CustomEvent('themechange'));
  }

  function applyTheme() {
    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }

  function getChartColors() {
    const t = getTheme();
    return t === 'light'
      ? { text: '#1e293b', muted: '#64748b' }
      : { text: '#e9eefc', muted: '#9fb0ce' };
  }

  window.theme = { getTheme, setTheme, applyTheme, getChartColors };

  applyTheme();
})();
