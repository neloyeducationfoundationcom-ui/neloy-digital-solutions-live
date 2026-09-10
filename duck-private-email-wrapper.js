import currentWorker from "./web-design-project-wrapper.js";

const DUCK_ADDRESS = "neloydigitalsolutions@duck.com";
const DUCK_USERNAME = "neloydigitalsolutions";
const FORWARDING_GMAIL = "info.digitalsolutions.neloy@gmail.com";
const WRONG_GMAIL = "info.digitalsolitions.neloy@gmail.com";

function protectPublicEmail(html) {
  // Never expose the forwarding Gmail address in customer-facing HTML.
  return html
    .split(FORWARDING_GMAIL).join(DUCK_ADDRESS)
    .split(WRONG_GMAIL).join(DUCK_ADDRESS);
}

function addPrivateReplyHelper(html) {
  if (!html.includes("Neloy Digital Solutions — Leads") || html.includes("duck-private-reply-helper")) {
    return html;
  }

  const helper = `
<script id="duck-private-reply-helper">
(() => {
  const DUCK = ${JSON.stringify(DUCK_ADDRESS)};
  const USER = ${JSON.stringify(DUCK_USERNAME)};

  function relayTarget(email) {
    const value = String(email || '').trim();
    const at = value.lastIndexOf('@');
    if (at <= 0 || at === value.length - 1) return value;
    return value.slice(0, at) + '_at_' + value.slice(at + 1) + '_' + USER + '@duck.com';
  }

  function rewriteReplyLinks() {
    document.querySelectorAll('a.gmail').forEach((a) => {
      try {
        const u = new URL(a.href);
        const original = u.searchParams.get('to') || '';
        if (!original || original.endsWith('@duck.com')) return;
        u.searchParams.set('to', relayTarget(original));
        a.href = u.toString();
        a.textContent = 'Reply privately via Gmail';
        a.title = 'Send through ' + DUCK + ' so your forwarding Gmail stays private';
      } catch (_) {}
    });
  }

  function addNotice() {
    const heading = document.querySelector('h1');
    if (!heading || document.getElementById('duck-private-notice')) return;
    const p = document.createElement('p');
    p.id = 'duck-private-notice';
    p.className = 'note';
    p.innerHTML = 'Private reply address: <strong>' + DUCK + '</strong>. Use your connected forwarding Gmail account when the Gmail compose window opens.';
    heading.insertAdjacentElement('afterend', p);
  }

  addNotice();
  rewriteReplyLinks();
  new MutationObserver(rewriteReplyLinks).observe(document.documentElement, {childList:true, subtree:true});
})();
</script>`;

  return html.includes('</body>') ? html.replace('</body>', helper + '</body>') : html + helper;
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';

    if (request.method === 'GET' && type.includes('text/html')) {
      let html = await response.text();
      html = protectPublicEmail(html);
      html = addPrivateReplyHelper(html);

      const headers = new Headers(response.headers);
      headers.set('content-type', 'text/html; charset=utf-8');
      headers.set('cache-control', 'no-store');
      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return response;
  }
};
