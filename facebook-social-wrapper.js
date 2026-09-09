import currentWorker from "./logo-portfolio-wrapper.js";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61594451692541";

const LINKEDIN_URL = "https://www.linkedin.com/company/neloy-digital-solutions/";

const SOCIAL_STYLE = `<style id="facebook-social-style">
#neloy-facebook-link{display:inline-flex;align-items:center;gap:9px;margin-top:12px;padding:9px 13px;border-radius:999px;background:#1877F2;color:#fff;text-decoration:none;font-weight:800;font-size:14px;box-shadow:0 8px 20px rgba(24,119,242,.22)}
#neloy-facebook-link:hover{filter:brightness(.96)}
#neloy-facebook-link .fb-icon{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:#1877F2;font-weight:1000;font-family:Arial,sans-serif}
#neloy-linkedin-link{display:inline-flex;align-items:center;gap:9px;margin:12px 0 0 8px;padding:9px 13px;border-radius:999px;background:#0a66c2;color:#fff;text-decoration:none;font-weight:800;font-size:14px;box-shadow:0 8px 20px rgba(10,102,194,.22)}
#neloy-linkedin-link:hover{filter:brightness(.96)}
#neloy-linkedin-link .linkedin-icon{font-family:Arial,sans-serif;font-weight:900}
/* Keep social labels legible despite global theme text overrides. */
html body #neloy-facebook-link,html body #neloy-linkedin-link{font-size:16px!important;line-height:1.4!important;font-weight:700!important;padding:11px 16px!important;color:#fff!important;text-shadow:none!important}
html body #neloy-facebook-link{background:#0866cc!important}
html body #neloy-linkedin-link{background:#0a66c2!important}
html body #neloy-facebook-link span,html body #neloy-linkedin-link span{color:#fff!important;-webkit-text-fill-color:#fff!important;opacity:1!important;font-size:16px!important;font-weight:700!important;text-shadow:none!important}
html body #neloy-facebook-link .fb-icon{color:#0866cc!important;-webkit-text-fill-color:#0866cc!important;background:#fff!important}
html body #neloy-facebook-link:focus-visible,html body #neloy-linkedin-link:focus-visible{outline:3px solid #102a56;outline-offset:3px}
</style>`;

function addFacebookSocial(html){
  if(html.includes('id="neloy-facebook-link"')) return html;
  const link = `<a id="neloy-facebook-link" href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="Visit Neloy Digital Solutions on Facebook"><span class="fb-icon">f</span><span>Facebook</span></a><a id="neloy-linkedin-link" href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" aria-label="Visit Neloy Digital Solutions on LinkedIn"><span class="linkedin-icon" aria-hidden="true">in</span><span>LinkedIn</span></a>`;
  if(html.includes('</footer>')) html = html.replace('</footer>', link + '</footer>');
  else if(html.includes('</body>')) html = html.replace('</body>', link + '</body>');
  if(!html.includes('id="facebook-social-style"') && html.includes('</head>')) html = html.replace('</head>', SOCIAL_STYLE + '</head>');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    if(request.method === "GET" && type.includes("text/html")){
      const html = await response.text();
      const headers = new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(addFacebookSocial(html), {status:response.status,statusText:response.statusText,headers});
    }
    return response;
  }
};