// Publish cards only after their Medium URL and exact title have been verified.
const VERIFIED_MEDIUM_ARTICLES = [];
const MEDIUM_PROFILE_URL = 'https://medium.com/@info.digitalsolutions.neloy';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function insightsSection() {
  const articles = VERIFIED_MEDIUM_ARTICLES.filter(article => {
    try { return /^https:$/.test(new URL(article.url).protocol) && /(^|\.)medium\.com$/.test(new URL(article.url).hostname) && article.title.trim(); }
    catch { return false; }
  });
  const cards = articles.map(article => `<article class="nds-medium-card"><span>Medium article</span><h3>${escapeHtml(article.title)}</h3><a href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">Read on Medium →</a></article>`).join('');
  return `<section id="nds-insights" aria-labelledby="nds-insights-title"><div class="nds-insights-inner"><span class="nds-insights-kicker">Blog / Insights</span><h2 id="nds-insights-title">Practical thinking for digital growth</h2><p>Our long-form articles are published on Medium. Verified stories will appear here with their original titles and direct links.</p>${cards ? `<div class="nds-medium-grid">${cards}</div>` : ''}<a class="nds-medium-profile" href="${MEDIUM_PROFILE_URL}" target="_blank" rel="noopener noreferrer">Visit our Medium articles →</a></div></section>`;
}

export { insightsSection };
