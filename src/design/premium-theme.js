// A visual layer over the existing public templates. Keep content and route logic in their original modules.
const PREMIUM_THEME = `<style id="nds-premium-theme">
:root{--nds-navy:#102844;--nds-blue:#1954b4;--nds-cyan:#16b7d4;--nds-ink:#18324f;--nds-muted:#536981;--nds-line:#d8e8f5;--nds-soft:#f3f8fd;--nds-shadow:0 18px 48px rgba(15,55,99,.10)}
html{scroll-behavior:smooth}body{background:#fff!important;color:var(--nds-ink)!important;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif!important;line-height:1.65!important}
body :where(h1,h2,h3){color:var(--nds-navy);letter-spacing:-.035em;text-wrap:balance}
body :where(p,li){line-height:1.7}
body :where(.wrap,.spWrap,.mkWrap,.svWrap,.offerWrap,.answerWrap){max-width:1180px}
body :where(.top,header.top){background:rgba(255,255,255,.96)!important;border-bottom:1px solid #e4edf7!important;box-shadow:0 8px 28px rgba(15,55,99,.055)!important;color:var(--nds-navy)!important}
body :where(.navlinks a,.brand,.brand strong){color:var(--nds-navy)!important}
body :where(.hero,.spHero,.mkHero){background:radial-gradient(circle at 82% 18%,rgba(22,183,212,.13),transparent 29%),linear-gradient(150deg,#fff 0%,#f2f8ff 63%,#eaf4fd 100%)!important;color:var(--nds-ink)!important}
body :where(.hero,.spHero,.mkHero) :where(h1,h2){color:var(--nds-navy)!important;font-size:clamp(2.8rem,5.8vw,5.25rem)!important;line-height:1.08!important;letter-spacing:-.055em!important}
body .hero{padding-top:clamp(72px,9vw,126px)!important;padding-bottom:clamp(64px,8vw,112px)!important}
body :where(.hero .lead,.spLead,.mkLead){color:#526983!important;font-size:clamp(1.05rem,1.7vw,1.25rem)!important;max-width:66ch}
body :where(.pill,.eyebrow,.spEyebrow,.mkEyebrow){color:var(--nds-blue)!important;letter-spacing:.1em}
body :where(.services,.spSection,.mkSection,.testimonials,.contact,.work){padding-top:clamp(64px,7vw,104px)!important;padding-bottom:clamp(64px,7vw,104px)!important}
body :where(.services,.spSection.soft,.mkSection.soft){background:#f5f9fe!important}
body :where(.work,.testimonials,.spSection:not(.soft),.mkSection:not(.soft)){background:#fff!important}
body :where(.sectionHead h2,.spTitle h2,.mkSection h2){font-size:clamp(2rem,3.5vw,3.2rem)!important;line-height:1.14!important;color:var(--nds-navy)!important}
body :where(.card,.workCard,.testCard,.partnerCard,.spCard,.mkCard,.mkStep,.spStep,.svCard,.offerCard,.answerItem){border:1px solid var(--nds-line)!important;border-radius:22px!important;background:#fff!important;box-shadow:var(--nds-shadow)!important;color:var(--nds-ink)!important}
body :where(.card,.workCard,.testCard,.spCard,.mkCard,.svCard){transition:transform .24s ease,box-shadow .24s ease}
body :where(.card,.workCard,.testCard,.spCard,.mkCard,.svCard):hover{transform:translateY(-4px);box-shadow:0 22px 52px rgba(15,55,99,.15)!important}
body :where(.card,.spCard,.mkCard) :where(h3,p){color:var(--nds-ink)!important}
body :where(.heroPanel,.contactIntro,.spCta,.mkCta){background:linear-gradient(145deg,#183b65,#102844)!important;color:#fff!important;border:1px solid #31557b!important;border-radius:26px!important;box-shadow:0 25px 60px rgba(16,40,68,.18)!important}
body :where(.heroPanel,.contactIntro,.spCta,.mkCta) :where(h2,h3,p){color:#f5faff!important}
body :where(a.btn,button.btn,.navCta,.spBtn,.mkBtn,.contact button,.hero a.primary){background:linear-gradient(130deg,#1954b4,#146ccc)!important;color:#fff!important;border:1px solid #1552ad!important;border-radius:12px!important;box-shadow:0 8px 20px rgba(25,84,180,.20)!important;text-decoration:none!important}
body :where(a.btn,button.btn,.navCta,.spBtn,.mkBtn,.contact button,.hero a.primary):hover{filter:brightness(1.07)}
body :where(a.btn.alt,.spBtn.alt,.mkBtn.alt){background:#fff!important;color:var(--nds-blue)!important;border:1px solid #bad5ec!important}
body :where(input,textarea,select){border-radius:12px!important;border-color:#c9dcec!important}
body :where(.footer,footer){background:#102844!important;color:#d6e7f4!important;border-top:1px solid #244a72!important}
body :where(.footer,footer) :where(strong,h2,h3){color:#fff!important}
body :where(.footer,footer) a{color:#b9ecf6!important}
body #nds-creative-partner #nds-creative-partner-title,body #nds-systeme-landing-cta #nds-systeme-landing-title{color:#f6fbff!important}
body #neloy-copyright{background:#102844!important;color:#e5f1fb!important;border-top:1px solid #244a72}
body #neloy-copyright strong{color:#fff!important}
body .nds-service-page .spCta a.spBtn{background:linear-gradient(130deg,#1954b4,#146ccc)!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:1px solid #1552ad!important}
body #nds-bottom-center-links a{background:#1b3b60!important;border-color:#447392!important;color:#e9f7ff!important;box-shadow:none!important}
body #nds-bottom-center-links a:hover{background:#24537b!important;color:#fff!important}
body #nds-insights{padding:88px 0;background:#fff;color:var(--nds-ink)}
body #nds-insights .nds-insights-inner{width:min(1180px,calc(100% - 36px));margin:auto;padding:38px 42px;background:linear-gradient(140deg,#f3f8ff,#fff);border:1px solid #d8e8f5;border-radius:24px;box-shadow:var(--nds-shadow)}
body #nds-insights .nds-insights-kicker{font-size:12px;text-transform:uppercase;font-weight:800;letter-spacing:.16em;color:var(--nds-blue)}
body #nds-insights h2{font-size:clamp(2rem,3.4vw,3.1rem);margin:12px 0;color:var(--nds-navy)}
body #nds-insights p{color:var(--nds-muted);max-width:65ch;margin:0}
body #nds-insights .nds-medium-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:26px}
body #nds-insights .nds-medium-card{padding:26px;border:1px solid var(--nds-line);border-radius:18px;background:#fff;box-shadow:0 12px 30px rgba(15,55,99,.08)}
body #nds-insights .nds-medium-card a{color:var(--nds-blue);font-weight:800}
@media(max-width:800px){body :where(.hero,.spHero,.mkHero){padding-block:65px!important}body #nds-insights .nds-medium-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){body :where(.hero,.spHero,.mkHero){padding-block:55px!important}body :where(.hero,.spHero,.mkHero) :where(h1,h2){font-size:clamp(2.3rem,10vw,3.1rem)!important}body :where(.services,.spSection,.mkSection,.testimonials,.contact,.work){padding-block:58px!important}body #nds-insights{padding:56px 0}body #nds-insights .nds-insights-inner{padding:26px 22px}body #nds-insights .nds-medium-grid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}body :where(.card,.workCard,.testCard,.spCard,.mkCard,.svCard){transition:none!important;transform:none!important}}
</style>`;

export { PREMIUM_THEME };
