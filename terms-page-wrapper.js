import currentWorker from "./reels-showcase-wrapper.js";

const TERMS_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Payment, Cancellation & Refund Terms | Neloy Digital Solutions</title>
<meta name="description" content="Payment, cancellation and refund terms for Neloy Digital Solutions projects.">
<style>
:root{--bg:#050913;--card:#0b1628;--line:#173b61;--text:#eef8ff;--muted:#9fb7cf;--cyan:#29dfff;--blue:#1477ff}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;background:radial-gradient(circle at 15% 5%,#10377b 0,#050913 30%),var(--bg);color:var(--text);line-height:1.65}.wrap{width:min(920px,calc(100% - 32px));margin:auto}.top{position:sticky;top:0;z-index:20;background:#050913ee;backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:#fff;text-decoration:none}.mark{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,var(--blue),var(--cyan));font-size:25px;font-weight:1000}.brand strong{display:block}.brand small{display:block;color:#9fd9ff;letter-spacing:.14em;font-size:9px}.back{color:#d8ebff;text-decoration:none;border:1px solid var(--line);border-radius:10px;padding:9px 13px;font-weight:800}.hero{padding:58px 0 25px}.eyebrow{display:inline-block;color:var(--cyan);border:1px solid #1c6277;background:#092433;padding:7px 10px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(36px,6vw,58px);line-height:1.05;letter-spacing:-.035em;margin:16px 0}.lead{font-size:18px;color:var(--muted)}.terms{padding:18px 0 72px}.card{background:linear-gradient(145deg,#0e1d33,#081321);border:1px solid var(--line);border-radius:20px;padding:clamp(20px,4vw,36px);box-shadow:0 24px 70px #0005}.term{padding:8px 0 24px;border-bottom:1px solid #173b6188}.term:last-of-type{border-bottom:0}.term h2{font-size:23px;margin:12px 0 8px;color:#fff}.term p{margin:8px 0;color:#c7d9ea}.term ul{color:#c7d9ea;margin:10px 0 0;padding-left:22px}.highlight{margin:26px 0 0;padding:18px;border:1px solid #1f6680;background:#082637;border-radius:14px;color:#eafcff}.highlight strong{color:var(--cyan)}footer{padding:28px 0;border-top:1px solid var(--line);color:var(--muted)}footer a{color:#bfeaff;text-decoration:none}@media(max-width:620px){.nav{align-items:flex-start;padding:12px 0}.brand strong{font-size:14px}.brand small{font-size:8px}.back{font-size:13px;padding:8px 10px}h1{font-size:38px}}
</style>
</head>
<body>
<header class="top"><div class="wrap nav"><a class="brand" href="/"><span class="mark">N</span><span><strong>NELOY DIGITAL SOLUTIONS</strong><small>IDEAS • AUTOMATION • GROWTH</small></span></a><a class="back" href="/">← Back to Home</a></div></header>
<main>
<section class="hero"><div class="wrap"><span class="eyebrow">Client Policy</span><h1>Payment, Cancellation & Refund Terms</h1><p class="lead">By confirming a project with Neloy Digital Solutions, the client agrees to the following terms.</p></div></section>
<section class="terms"><div class="wrap"><div class="card">
<div class="term"><h2>1. Advance Payment</h2><p>A <strong>60% advance payment</strong> of the total agreed project fee is required before any work begins.</p><p>Work will start only after the advance payment has been received and the project requirements have been confirmed by the client.</p></div>
<div class="term"><h2>2. Final Payment</h2><p>The remaining <strong>40% payment</strong> must be paid after the agreed work has been completed and before the final files, website, design, source files, or other completed deliverables are fully handed over to the client.</p></div>
<div class="term"><h2>3. Cancellation After Work Has Started</h2><p>Once the client has approved the project and our team has started working, the project cannot be cancelled with a full refund.</p><p>If the client decides to stop or cancel the project after work has already started, <strong>40% of the total agreed project price will be retained by Neloy Digital Solutions</strong> to cover work already completed, staff time, planning, resources, and project-related costs.</p><p>From the original 60% advance payment, the client may therefore receive a maximum refund equal to <strong>20% of the total project price</strong>, where applicable.</p></div>
<div class="term"><h2>4. Change of Mind or Financial Reasons</h2><p>A request to cancel because the client:</p><ul><li>changes their mind,</li><li>decides to use another company or service,</li><li>no longer wants the project,</li><li>has insufficient funds,</li><li>changes their business plans, or</li><li>wants to use the money for another purpose</li></ul><p>does not qualify the client for a full refund after work has started.</p></div>
<div class="term"><h2>5. Client Approval</h2><p>Payment of the 60% advance confirms that the client has reviewed and accepted the project scope, price, and these payment and refund conditions.</p></div>
<div class="term"><h2>6. Work Already Completed</h2><p>Any work completed before cancellation remains subject to our payment terms. Work, concepts, designs, files, code, or other materials produced by Neloy Digital Solutions remain the property of Neloy Digital Solutions until all applicable payments have been completed.</p></div>
<div class="term"><h2>7. Agreement</h2><p>By making the advance payment and allowing work to begin, the client confirms that they understand and accept these terms and conditions.</p></div>
<div class="highlight"><strong>Neloy Digital Solutions</strong><br>Payment Structure: <strong>60% Advance | 40% Upon Completion</strong></div>
</div></div></section>
</main>
<footer><div class="wrap"><strong>Neloy Digital Solutions</strong><br>Ideas • Automation • Growth · <a href="/">Home</a></div></footer>
</body>
</html>`;

function addTermsFooterLink(html) {
  if (html.includes('href="/terms"') || html.includes("href='/terms'")) return html;
  const link = `<div style="margin-top:10px"><a href="/terms" style="color:#bfeaff;text-decoration:none;font-weight:750">Payment, Cancellation &amp; Refund Terms</a></div>`;
  if (html.includes('</footer>')) return html.replace('</footer>', link + '</footer>');
  return html;
}

function termsResponse() {
  return new Response(TERMS_HTML, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "x-frame-options": "SAMEORIGIN"
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "GET" && (url.pathname === "/terms" || url.pathname === "/terms/")) {
      return termsResponse();
    }

    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    if (request.method !== "GET" || !response.ok || !type.includes("text/html") || url.pathname.startsWith("/admin")) return response;

    const html = addTermsFooterLink(await response.text());
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");
    return new Response(html, {status: response.status, statusText: response.statusText, headers});
  }
};
