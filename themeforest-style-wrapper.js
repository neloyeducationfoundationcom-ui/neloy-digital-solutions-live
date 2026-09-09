import currentWorker from "./mobile-wrapper.js";

const THEME = `
<style id="premium-light-theme">
:root{--cream:#fff8d6;--cream2:#f8f0c8;--plum:#62385f;--plum2:#4f294d;--purple:#76506f;--gold:#d1ad62;--ink:#40283e;--muted2:#745f70;--border:#d8c79f;--white:#fffdf2}
html,body{background:var(--cream)!important;color:var(--ink)!important}
body{background:linear-gradient(180deg,#fffbe5 0%,#fff6cf 48%,#f7efc8 100%)!important}
.top{background:rgba(255,248,214,.96)!important;border-bottom:1px solid var(--border)!important;box-shadow:0 6px 28px rgba(79,41,77,.08)!important}
.brand{color:var(--plum2)!important}.brand strong{color:var(--plum2)!important}.brand small{color:#7f687b!important}
.mark{background:linear-gradient(135deg,var(--plum),#9a6d8e)!important;color:var(--cream)!important;box-shadow:0 10px 24px rgba(98,56,95,.20)!important}
.navlinks a{color:var(--plum2)!important}.navlinks a:hover{color:var(--plum)!important}
.hero{background:linear-gradient(135deg,var(--plum2),#6e4268 60%,#7b5373)!important;color:var(--cream)!important;padding-top:84px!important;padding-bottom:84px!important}
.hero h1,.hero strong,.hero .lead{color:var(--cream)!important}.hero .lead{opacity:.94}.hero .eyebrow{background:rgba(255,248,214,.12)!important;border-color:rgba(255,248,214,.4)!important;color:var(--cream)!important}
.heroCard{background:linear-gradient(145deg,#fff9dc,#f1e6b9)!important;border:1px solid #d9c58e!important;box-shadow:0 24px 70px rgba(48,22,46,.25)!important}.heroCard:before{border-color:rgba(98,56,95,.22)!important}.heroLogo .n{background:linear-gradient(135deg,var(--plum),#9b718f)!important;-webkit-background-clip:text!important;color:transparent!important}.heroLogo strong{color:var(--plum2)!important}.heroLogo small{color:#7f6479!important}
.primary{background:linear-gradient(135deg,#f6e7a7,#fff7ce)!important;color:var(--plum2)!important;border:1px solid #dec67f!important;box-shadow:none!important}.primary:hover{transform:translateY(-1px)}
.ghost{background:transparent!important;color:var(--cream)!important;border:1px solid rgba(255,248,214,.7)!important}
section{background:transparent!important}.alt{background:#f7efc9!important;border-block:1px solid var(--border)!important}
.sectionHead h2,h2,h3{color:var(--plum2)!important}.sectionHead p,.muted,.card p,.workCard p,.testCard p{color:var(--muted2)!important}
.eyebrow{background:#efe3b6!important;border:1px solid #d8c485!important;color:var(--plum2)!important}
.grid{gap:20px!important}
.card,.workCard,.testCard,.contactBox,form{background:var(--white)!important;border:1px solid var(--border)!important;box-shadow:0 12px 34px rgba(84,54,80,.08)!important;color:var(--ink)!important}
.card:hover,.workCard:hover,.testCard:hover{transform:translateY(-4px);transition:.25s ease;box-shadow:0 18px 44px rgba(84,54,80,.14)!important}
.icon{background:#efe0d2!important;color:var(--plum)!important;border:1px solid #d7bda4!important}
.card button{color:var(--plum)!important}
.tag{color:var(--plum2)!important;border-color:#c6aabf!important;background:#f8eefa!important}
input,select,textarea{background:#fffdf5!important;color:var(--ink)!important;border:1px solid #cdbb92!important}input::placeholder,textarea::placeholder{color:#9f8b99!important}
#submitBtn{background:linear-gradient(135deg,var(--plum),#8c6482)!important;color:var(--cream)!important;border:0!important}
#partners{background:#fff8dc!important}#partners .card{background:#fffdf2!important}
footer{background:#f1e5b8!important;border-top:1px solid var(--border)!important;color:var(--plum2)!important}
footer strong{color:var(--plum2)!important}
.chatBtn{background:linear-gradient(135deg,var(--plum),#916684)!important;color:#fff8d6!important;box-shadow:0 12px 32px rgba(98,56,95,.28)!important}.chat{background:#fff9e1!important;border-color:#cdbb92!important}.chatHead{background:#f0e4b8!important;border-bottom-color:#d4c08e!important;color:var(--plum2)!important}.chatHead small{color:#7b6878!important}.msgs{background:#fffaf0!important}.bot{background:#f0e5c3!important;color:var(--plum2)!important}.user{background:#7a5473!important;color:#fff!important}.chatForm{background:#f0e4b8!important;border-top-color:#d4c08e!important}.chatForm input{background:#fffdf5!important;color:var(--plum2)!important}.chatForm button{background:var(--plum)!important;color:#fff!important}
.waBtn,.waFloat,#mobileWhatsappDirect{background:#25D366!important;color:#fff!important}
.status.success{color:#35754c!important}.status.error{color:#a44141!important}
@media(max-width:880px){.hero{padding-top:48px!important;padding-bottom:48px!important}.navlinks a:last-child{background:#f3e6ba!important;border-color:#cdbb92!important}.heroGrid{gap:26px!important}.heroCard{min-height:250px!important}.card,.workCard,.testCard,form,.contactBox{box-shadow:0 8px 24px rgba(84,54,80,.08)!important}.actions .ghost{color:var(--cream)!important}}
</style>`;

function polish(html){
  html = html.replace('Digital services that make your business look professional and work smarter.','Creative digital services built to help your business look premium and grow with confidence.');
  html = html.replace('Logo design, web design, video editing, social media posts, coding, CRM software and AI automation — all in one place.','Web design, branding, video, social media, coding and business support — delivered with a clean, professional experience.');
  html = html.replace('Ideas • Automation • Growth','Creative • Digital • Growth');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if(request.method === 'GET' && url.pathname === '/'){
      const type = response.headers.get('content-type') || '';
      if(type.includes('text/html')){
        let html = polish(await response.text());
        if(html.includes('</head>')) html = html.replace('</head>', THEME + '</head>');
        const headers = new Headers(response.headers);
        headers.set('content-type','text/html; charset=utf-8');
        headers.set('cache-control','no-store');
        return new Response(html,{status:response.status,headers});
      }
    }
    return response;
  }
};
