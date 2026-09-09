import currentWorker from "./project-visibility-fix-wrapper.js";

const BRAND_STYLE = `
<style id="neloy-logo-brand-theme">
:root{--brand-blue:#075DFF;--brand-blue2:#168CFF;--brand-cyan:#12DFF3;--brand-cyan2:#71F2FF;--brand-navy:#0A2A5A;--brand-ink:#173357;--brand-soft:#EDF8FF;--brand-soft2:#F7FCFF;--brand-line:#C9E8F7;--brand-glow:rgba(18,223,243,.28)}
html,body{background:#F7FCFF!important;color:var(--brand-ink)!important}
body{background:linear-gradient(180deg,#F9FDFF 0%,#F2FAFF 48%,#F8FCFF 100%)!important}
.top{background:rgba(255,255,255,.96)!important;border-bottom:1px solid var(--brand-line)!important;box-shadow:0 8px 28px rgba(7,93,255,.08)!important}
.brand{color:var(--brand-navy)!important}.brand strong{color:var(--brand-navy)!important;letter-spacing:.01em}.brand small{color:#5D7D9F!important;letter-spacing:.12em!important}
.logo{position:relative!important;overflow:visible!important;background:linear-gradient(135deg,var(--brand-blue) 0%,var(--brand-blue2) 45%,var(--brand-cyan) 100%)!important;color:#fff!important;border-radius:16px!important;box-shadow:0 10px 30px rgba(7,93,255,.24),0 0 24px var(--brand-glow)!important}
.logo:after{content:"";position:absolute;width:11px;height:11px;border-radius:50%;right:-4px;top:5px;background:var(--brand-cyan);box-shadow:0 0 14px rgba(18,223,243,.8);border:2px solid #fff}
.navlinks a{color:var(--brand-navy)!important}.navlinks a:hover{color:var(--brand-blue)!important}.navlinks .navCta{border-color:#8DDCF3!important;background:#F4FBFF!important;color:var(--brand-blue)!important}
.hero{background:linear-gradient(135deg,#F7FCFF 0%,#EAF7FF 50%,#EAFDFF 100%)!important;color:var(--brand-ink)!important}
.hero:before{background:rgba(7,93,255,.11)!important;filter:blur(10px)!important}.hero:after{background:rgba(18,223,243,.16)!important;filter:blur(10px)!important}
.hero h1{color:var(--brand-navy)!important}.hero .lead{color:#55728E!important}.pill,.eyebrow{background:#EAF8FF!important;border:1px solid #A7E4F4!important;color:var(--brand-blue)!important}.pill i{background:var(--brand-cyan)!important;box-shadow:0 0 10px rgba(18,223,243,.65)!important}
.primary{background:linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))!important;color:#fff!important;box-shadow:0 12px 28px rgba(7,93,255,.18)!important}.secondary{background:#fff!important;color:var(--brand-blue)!important;border:1px solid #A8DFF3!important}
.heroPanel{background:#fff!important;border:1px solid var(--brand-line)!important;box-shadow:0 26px 70px rgba(7,93,255,.12)!important}.heroPanel .bigCard{background:linear-gradient(145deg,#0C56D7 0%,#168CFF 55%,#12DFF3 120%)!important;color:#fff!important;box-shadow:inset 0 0 40px rgba(255,255,255,.04)!important}.heroPanel .bigCard h3,.heroPanel .bigCard p{color:#fff!important}.mini{background:#F6FCFF!important;border:1px solid var(--brand-line)!important}.mini b{color:var(--brand-blue)!important}.mini span{color:#63819F!important}
.services,.partner,.contact,.companyContent{background:#F9FDFF!important}.work,.testimonials{background:#EDF8FF!important}
.sectionHead h2,h2,h3{color:var(--brand-navy)!important}.sectionHead p,.card p,.workBody p,.testCard p,.partnerCard p,.companyContentArticle p{color:#5D7690!important}
.card,.workCard,.testCard,.form,.contactIntro,.partnerCard,.companyContentArticle{border-color:var(--brand-line)!important}.card,.testCard,.form,.companyContentArticle{background:#fff!important;box-shadow:0 12px 34px rgba(7,93,255,.07)!important}.card:hover,.workCard:hover,.testCard:hover{box-shadow:0 18px 42px rgba(7,93,255,.12)!important}
.icon{background:linear-gradient(135deg,#E9F7FF,#E9FEFF)!important;color:var(--brand-blue)!important;border:1px solid #BCEAF7!important}.tag{background:#EAF8FF!important;color:var(--brand-blue)!important;border:1px solid #B6E3F5!important}
#work .workCard{border-color:var(--brand-line)!important;background:#fff!important}#work .projectDetail{background:#F5FBFF!important;border-color:var(--brand-line)!important}#work .projectDetail b{color:var(--brand-navy)!important}#work .projectResult{background:#EAF8FF!important;border-left-color:var(--brand-blue)!important;color:#476785!important}#work .completedBadge{background:#E9FAF1!important;color:#247044!important}
.partnerCard{background:linear-gradient(135deg,#F5FBFF,#EAFDFF)!important}.partnerLogo{background:#F4FBFF!important;border-color:#8ADFF2!important;color:var(--brand-navy)!important}.partnerCard h3{color:var(--brand-navy)!important}
.companyContentVisual{background:linear-gradient(145deg,#075DFF 0%,#138FFF 52%,#12DFF3 120%)!important;box-shadow:0 18px 48px rgba(7,93,255,.18)!important}.companyContentVisual h3,.companyContentVisual p,.companyContentVisual small{color:#fff!important}.companyPoint{background:#F5FBFF!important;border-color:var(--brand-line)!important}.companyPoint b{color:var(--brand-navy)!important}.companyContentCta .project{background:linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))!important;color:#fff!important}
.contactIntro{background:linear-gradient(145deg,#0A5CE6 0%,#168CFF 58%,#12CFE9 120%)!important;color:#fff!important;box-shadow:0 20px 50px rgba(7,93,255,.17)!important}.contactIntro h2,.contactIntro p{color:#fff!important}.submit{background:linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))!important;color:#fff!important}
input,select,textarea{background:#fff!important;border-color:#BFE4F2!important;color:var(--brand-ink)!important}input:focus,select:focus,textarea:focus{outline:2px solid rgba(18,223,243,.22)!important;border-color:var(--brand-cyan)!important}
.footer{background:#EAF7FF!important;border-top:1px solid var(--brand-line)!important;color:var(--brand-navy)!important}.footer a{color:var(--brand-blue)!important}
.floatAi{background:linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))!important;color:#fff!important;box-shadow:0 10px 28px rgba(7,93,255,.25)!important}.floatWa{box-shadow:0 10px 28px rgba(37,211,102,.24)!important}
.chat{background:#fff!important;border-color:var(--brand-line)!important}.chatHead{background:#EAF8FF!important;color:var(--brand-navy)!important}.msgs{background:#F9FDFF!important}.bot{background:#EAF8FF!important;color:var(--brand-navy)!important}.user{background:linear-gradient(135deg,var(--brand-blue),var(--brand-blue2))!important;color:#fff!important}.chatForm{background:#EFF9FF!important}.chatForm button{background:linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))!important}
@media(max-width:700px){.top{box-shadow:0 5px 18px rgba(7,93,255,.08)!important}.brand strong{font-size:14px!important}.brand small{font-size:8px!important}.logo{width:44px!important;height:44px!important}.hero{padding-top:42px!important}.hero h1{font-size:42px!important}.heroPanel{border-radius:22px!important}.companyContentVisual{min-height:240px!important}}
</style>`;

function brandPolish(html){
  html = html.replaceAll('Creative • Digital • Growth','IDEAS • AUTOMATION • GROWTH');
  html = html.replaceAll('Creative • Digital • Growth','IDEAS • AUTOMATION • GROWTH');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if(request.method === "GET" && url.pathname === "/"){
      const type = response.headers.get("content-type") || "";
      if(type.includes("text/html")){
        let html = brandPolish(await response.text());
        if(html.includes('</head>')) html = html.replace('</head>', BRAND_STYLE + '</head>');
        const headers = new Headers(response.headers);
        headers.set('content-type','text/html; charset=utf-8');
        headers.set('cache-control','no-store');
        return new Response(html,{status:response.status,headers});
      }
    }
    return response;
  }
};
