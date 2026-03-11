/**
 * 安全模块 - 防止 XSS、 spam、滥用
 */
(function () {
  const BLOCKED_WORDS = [
    'telegram', 'whatsapp', 'wechat', '微信', 'loan', 'casino', '赌博', '色情',
    'spam', 'porn', 'viagra', 'crypto', 'bitcoin', '投资理财', '代考', '办证'
  ];

  const XSS_PATTERNS = [
    /<script\b/i, /javascript\s*:/i, /vbscript\s*:/i, /data\s*:/i,
    /on\w+\s*=/i, /\beval\s*\(/i, /expression\s*\(/i,
    /<iframe/i, /<object/i, /<embed/i, /<img[^>]+onerror/i,
    /<svg[^>]+onload/i, /<body[^>]+onload/i
  ];

  function hasBlockedWord(text) {
    if (!text || typeof text !== 'string') return null;
    const lower = text.toLowerCase();
    return BLOCKED_WORDS.find(w => lower.includes(w.toLowerCase())) || null;
  }

  function hasXssPattern(text) {
    if (!text || typeof text !== 'string') return false;
    return XSS_PATTERNS.some(p => p.test(text));
  }

  function validateUserInput(nickname, freeTextNotes) {
    const err = {};
    const blocked = hasBlockedWord((nickname || '') + ' ' + (freeTextNotes || ''));
    if (blocked) err.free_text_notes = { type: 'riskWord', word: blocked };
    if (hasXssPattern(nickname || '')) err.nickname = { type: 'invalidChars' };
    if (hasXssPattern(freeTextNotes || '')) err.free_text_notes = err.free_text_notes || { type: 'invalidChars' };
    return err;
  }

  const RATE_LIMIT_KEY = 'sg_submit_ts';
  const RATE_LIMIT_MS = 30000; // 30 秒内只能提交一次

  function canSubmit() {
    const ts = parseInt(sessionStorage.getItem(RATE_LIMIT_KEY) || '0', 10);
    return Date.now() - ts >= RATE_LIMIT_MS;
  }

  function recordSubmit() {
    sessionStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  }

  function getRateLimitRemainingMs() {
    const ts = parseInt(sessionStorage.getItem(RATE_LIMIT_KEY) || '0', 10);
    const elapsed = Date.now() - ts;
    return Math.max(0, RATE_LIMIT_MS - elapsed);
  }

  window.sgSecurity = {
    BLOCKED_WORDS,
    hasBlockedWord,
    hasXssPattern,
    validateUserInput,
    canSubmit,
    recordSubmit,
    getRateLimitRemainingMs
  };
})();
