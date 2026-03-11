window.sb = window.supabase.createClient(window.SG.supabaseUrl, window.SG.supabaseAnonKey);

function fmtDate(v) {
  if (!v) return '-';
  const d = new Date(v);
  return isNaN(d) ? v : d.toLocaleDateString('en-SG');
}

function days(a, b) {
  if (!a || !b) return null;
  return Math.floor((new Date(b) - new Date(a)) / 86400000);
}

/** 防止 XSS：转义 HTML 特殊字符 */
function escapeHtml(str) {
  if (str == null) return '';
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mountHelpWidget() {
  if (!document.body || document.querySelector('.help-widget')) return;
  const pick = (key, fallback) => (typeof window.t === 'function' ? window.t(key) : fallback);

  const root = document.createElement('div');
  root.className = 'help-widget';
  root.innerHTML = `
    <button type="button" class="help-widget-toggle" aria-expanded="false">
      ${escapeHtml(pick('helpWidgetLabel', 'Need help?'))}
    </button>
    <div class="help-widget-panel" role="dialog" aria-label="${escapeHtml(pick('helpWidgetTitle', 'May I help you?'))}">
      <h4>${escapeHtml(pick('helpWidgetTitle', 'May I help you?'))}</h4>
      <p class="small">${escapeHtml(pick('helpWidgetDesc', 'Quick actions to get started:'))}</p>
      <div class="help-widget-links">
        <a href="/pages/submit.html">${escapeHtml(pick('helpWidgetSubmit', 'Submit my case'))}</a>
        <a href="/pages/my-cases.html">${escapeHtml(pick('helpWidgetMyCases', 'View my cases'))}</a>
        <a href="/pages/cases.html">${escapeHtml(pick('helpWidgetCases', 'Browse cases'))}</a>
        <a href="/pages/terms.html">${escapeHtml(pick('helpWidgetTerms', 'Terms and Conditions'))}</a>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  const btn = root.querySelector('.help-widget-toggle');
  btn.addEventListener('click', () => {
    const opened = root.classList.toggle('open');
    btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
      root.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountHelpWidget);
} else {
  mountHelpWidget();
}
