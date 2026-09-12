import currentWorker from "./duck-private-email-wrapper.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};

const PAYMENT_STYLE = `<style id="payment-methods-style">
.paymentMethods{padding:46px 0 34px;background:linear-gradient(180deg,#f7fcff,#edf8ff);border-top:1px solid #c9e8f7}
.paymentMethods .payHead{text-align:center;margin-bottom:22px}.paymentMethods .payHead span{display:block;color:#075DFF;font-size:11px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}.paymentMethods .payHead h3{margin:6px 0 0;color:#0A2A5A;font-size:26px}
.paymentLogoGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.paymentLogo{min-height:92px;background:#fff;border:1px solid #c9e8f7;border-radius:18px;display:flex;align-items:center;justify-content:center;padding:16px;box-shadow:0 10px 26px rgba(7,93,255,.06);transition:transform .22s ease,box-shadow .22s ease}.paymentLogo:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(7,93,255,.11)}
.paypalLogo{font-size:29px;font-weight:1000;font-style:italic;letter-spacing:-2px;color:#003087}.paypalLogo .pp2{color:#009cde}
.wiseLogo{font-size:31px;font-weight:1000;color:#163300;letter-spacing:-1px}.wiseLogo:before{content:"➜";display:inline-block;margin-right:6px;color:#9FE870;transform:skewX(-12deg)}
.bkashLogo{font-size:29px;font-weight:1000;color:#e2136e;letter-spacing:-1px}.bkashLogo .bird{font-size:23px;margin-left:6px}
.touchLogo{background:linear-gradient(135deg,#0057b8,#0b87ef);color:#fff;border-radius:13px;padding:10px 13px;line-height:.92;text-align:center;font-weight:1000;font-style:italic;font-size:21px;box-shadow:inset 0 0 0 2px rgba(255,255,255,.7)}.touchLogo small{display:block;color:#ffe300;font-size:13px;margin-top:6px;letter-spacing:.02em}
.chaseLogo{display:flex;align-items:center;gap:10px;color:#062452;font-family:Georgia,serif;font-weight:700;font-size:18px;line-height:1.05}.chaseMark{width:38px;height:38px;border:9px solid #1261b8;transform:rotate(45deg);border-radius:5px;flex:0 0 auto}.chaseLogo small{display:block;font-family:Inter,system-ui,sans-serif;font-size:10px;color:#55718d;margin-top:5px;letter-spacing:.05em;text-transform:uppercase}
.paymentNote{text-align:center;color:#73879b;font-size:11px;margin:15px 0 0}
@media(max-width:900px){.paymentLogoGrid{grid-template-columns:repeat(3,1fr)}}@media(max-width:620px){.paymentLogoGrid{grid-template-columns:repeat(2,1fr)}.paymentLogo:last-child{grid-column:1/-1}.paymentMethods{padding:38px 0 28px}}
</style>`;

const PAYMENT_SECTION = `<section class="paymentMethods" aria-label="Payment methods"><div class="wrap"><div class="payHead"><span>Payment Options</span><h3>Flexible ways to pay</h3></div><div class="paymentLogoGrid"><div class="paymentLogo" title="PayPal"><div class="paypalLogo">Pay<span class="pp2">Pal</span></div></div><div class="paymentLogo" title="Wise"><div class="wiseLogo">wise</div></div><div class="paymentLogo" title="bKash"><div class="bkashLogo">bKash <span class="bird">◆</span></div></div><div class="paymentLogo" title="Touch 'n Go eWallet"><div class="touchLogo">Touch 'n Go<small>eWallet</small></div></div><div class="paymentLogo" title="JPMorgan Chase & Co. bank transfer"><div class="chaseLogo"><span class="chaseMark"></span><span>JPMorgan<br>Chase &amp; Co.<small>Bank Transfer</small></span></div></div></div><p class="paymentNote">Payment method logos are shown for payment identification only.</p></div></section>`;

const AI_BOT_FIX = `<style id="ai-bot-click-fix-style">#aiBtn{pointer-events:auto!important;touch-action:manipulation!important;z-index:2147483000!important}.chat.open{z-index:2147483001!important}</style><script id="ai-bot-click-fix">(()=>{function bind(){const b=document.getElementById('aiBtn'),c=document.getElementById('chat'),x=document.getElementById('closeChat');if(!b||!c)return;b.type='button';b.style.pointerEvents='auto';b.style.cursor='pointer';if(!b.dataset.aiFallbackBound){b.dataset.aiFallbackBound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();c.classList.add('open');c.setAttribute('aria-hidden','false');const i=document.getElementById('chatInput');if(i)setTimeout(()=>i.focus(),0);},true);}if(x&&!x.dataset.aiFallbackBound){x.dataset.aiFallbackBound='1';x.type='button';x.addEventListener('click',e=>{e.preventDefault();c.classList.remove('open');c.setAttribute('aria-hidden','true');},true);}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();setTimeout(bind,500);})();</script>`;

function withLeadCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function addPaymentMethods(html) {
  if (html.includes('class="paymentMethods"')) return html;
  if (html.includes('</head>') && !html.includes('id="payment-methods-style"')) {
    html = html.replace('</head>', PAYMENT_STYLE + '</head>');
  }
  if (html.includes('<footer')) {
    html = html.replace('<footer', PAYMENT_SECTION + '<footer');
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', PAYMENT_SECTION + '</body>');
  }
  return html;
}

function addAiBotFix(html) {
  if (!html.includes('id="aiBtn"') || html.includes('id="ai-bot-click-fix"')) return html;
  if (html.includes('</body>')) return html.replace('</body>', AI_BOT_FIX + '</body>');
  return html + AI_BOT_FIX;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const isLeadEndpoint = url.pathname === "/api/leads";

    // Facebook/Instagram in-app browsers can preflight JSON submissions.
    // This endpoint is intentionally public because website visitors submit leads here.
    if (isLeadEndpoint && method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (isLeadEndpoint && method === "POST") {
      // Some in-app browsers supply an opaque or app origin. The inner security
      // wrapper requires same-origin for /api routes, so remove Origin only for
      // this public POST endpoint. Admin GET/PATCH routes are untouched.
      const headers = new Headers(request.headers);
      headers.delete("origin");

      const body = await request.arrayBuffer();
      const forwarded = new Request(request.url, {
        method: "POST",
        headers,
        body
      });

      const response = await currentWorker.fetch(forwarded, env, ctx);
      return withLeadCors(response);
    }

    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    const isHome = method === "GET" && (url.pathname === "/" || url.pathname === "/website" || url.pathname === "/website/");
    const isPublicHtml = method === "GET" && type.includes("text/html") && !url.pathname.startsWith("/admin");

    if (isPublicHtml) {
      let html = await response.text();
      if (isHome) html = addPaymentMethods(html);
      html = addAiBotFix(html);
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      return new Response(html, {status: response.status, statusText: response.statusText, headers});
    }

    return response;
  }
};
