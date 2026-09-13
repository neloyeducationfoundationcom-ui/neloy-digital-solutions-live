import currentWorker from "./duck-private-email-wrapper.js";
import GRAPHIC_PORTFOLIO_IMAGE from "./graphic-portfolio-image.js";

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

const GRAPHIC_PORTFOLIO_STYLE = `<style id="graphic-design-portfolio-style">
#graphic-design-portfolio{padding:64px 0;background:linear-gradient(180deg,#07182d,#0a2340);color:#fff}
#graphic-design-portfolio .graphicPortfolioWrap{width:min(1180px,calc(100% - 28px));margin:auto;text-align:center}
#graphic-design-portfolio .graphicPortfolioEyebrow{display:block;color:#12dff3;font-size:12px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px}
#graphic-design-portfolio h2{margin:0 0 10px;font-size:clamp(34px,5vw,58px);line-height:1;color:#fff}
#graphic-design-portfolio p{margin:0 auto 26px;max-width:760px;color:#c7d8e8;font-size:16px}
#graphic-design-portfolio .graphicPortfolioImage{display:block;width:100%;max-width:960px;margin:0 auto;border-radius:24px;box-shadow:0 28px 70px rgba(0,0,0,.32);border:1px solid rgba(18,223,243,.35)}
@media(max-width:700px){#graphic-design-portfolio{padding:44px 0}#graphic-design-portfolio .graphicPortfolioImage{border-radius:16px}}
</style>`;

const GRAPHIC_PORTFOLIO_SECTION = `<section id="graphic-design-portfolio" aria-label="Graphic Design Portfolio"><div class="graphicPortfolioWrap"><span class="graphicPortfolioEyebrow">Selected Client Work</span><h2>Graphic Design Portfolio</h2><p>NJR Cabinets, flyer design, logo design and Majority Academy presented together in one portfolio showcase.</p><img class="graphicPortfolioImage" src="${GRAPHIC_PORTFOLIO_IMAGE}" alt="Neloy Digital Solutions Graphic Design Portfolio featuring NJR Cabinets, flyer design, logo design and Majority Academy" loading="eager" decoding="async"></div></section>`;

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

function replaceOldPortfolio(html) {
  if (!html.includes('id="graphic-design-portfolio-style"') && html.includes('</head>')) {
    html = html.replace('</head>', GRAPHIC_PORTFOLIO_STYLE + '</head>');
  }

  const oldLogoSection = /<section\s+id=["']logo-design-projects["'][\s\S]*?<\/section>/i;
  if (oldLogoSection.test(html)) {
    return html.replace(oldLogoSection, GRAPHIC_PORTFOLIO_SECTION);
  }

  if (html.includes('id="graphic-design-portfolio"')) return html;

  const workSection = /<section\s+id=["']work["'][\s\S]*?<\/section>/i;
  const match = html.match(workSection);
  if (match) return html.replace(match[0], match[0] + GRAPHIC_PORTFOLIO_SECTION);

  if (html.includes('<footer')) return html.replace('<footer', GRAPHIC_PORTFOLIO_SECTION + '<footer');
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

    if (isLeadEndpoint && method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (isLeadEndpoint && method === "POST") {
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
    const isShowcase = method === "GET" && (url.pathname === "/showcase" || url.pathname === "/showcase/" || url.pathname === "/portfolio" || url.pathname === "/portfolio/");
    const isPublicHtml = method === "GET" && type.includes("text/html") && !url.pathname.startsWith("/admin");

    if (isPublicHtml) {
      let html = await response.text();
      if (isHome) html = addPaymentMethods(html);
      if (isShowcase) html = replaceOldPortfolio(html);
      html = addAiBotFix(html);
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      return new Response(html, {status: response.status, statusText: response.statusText, headers});
    }

    return response;
  }
};
