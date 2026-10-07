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

// Concept correction: the reference is the owner's latest website screenshot,
// not the earlier side-by-side colour comparison.
const PREMIUM_CONCEPT_CSS = `<style id="nds-premium-concept">
body{--nds-navy:#071a2f;--nds-blue:#086af6;--nds-cyan:#22d3ee;--nds-soft:#f2f7ff;--nds-line:#e3ebf6}
body :where(.top,header.top){background:#fff!important;border-bottom:1px solid #e8eef8!important;box-shadow:0 5px 20px rgba(9,36,82,.05)!important}
body .navlinks .navCta,body a.btn.primary,body .nds-concept-primary{background:linear-gradient(115deg,#076af8,#058dff)!important;color:#fff!important;border:1px solid #1689f9!important;box-shadow:0 12px 26px rgba(0,103,240,.22)!important}
body .navlinks a:not(.navCta){color:#132b4c!important}
body .services .card,body :where(.spCard,.workCard,.offerCard){box-shadow:0 14px 35px rgba(11,43,86,.08)!important;border-color:#e4ecf7!important}
body .nds-concept-hero{position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 75% 43%,#104b96 0%,#062757 32%,#041835 72%,#03142a 100%)!important;padding:76px 0 96px!important;color:#fff!important}
body .nds-concept-hero:before{position:absolute;content:"";inset:auto -15% -210px -15%;height:300px;border-radius:50%;border:1px solid rgba(24,152,255,.3);box-shadow:0 -28px 100px rgba(0,126,255,.16);transform:rotate(-5deg);background:none;filter:none;opacity:1}
body .nds-concept-hero:after{position:absolute;content:"";inset:auto -20% 10% 52%;height:210px;border:1px solid rgba(31,158,255,.2);border-radius:50%;background:none;filter:none;opacity:1;transform:rotate(-12deg)}
body .nds-concept-layout{display:grid;grid-template-columns:1.02fr 1fr;gap:4%;align-items:center;position:relative;z-index:2}
body .nds-concept-copy{max-width:670px}
body .nds-concept-eyebrow{display:inline-block;border:1px solid rgba(37,171,255,.25);border-radius:999px;background:rgba(24,138,231,.15);color:#a7e8ff;padding:8px 16px;font-size:11px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
body .nds-concept-hero h1{font-size:clamp(3rem,5vw,5.4rem)!important;line-height:1.04!important;letter-spacing:-.055em!important;color:#fff!important;margin:22px 0 20px!important;max-width:13ch}
body .nds-concept-hero h1 em{font-style:normal;color:#36bcff!important;white-space:normal}
body .nds-concept-subtitle{color:#d8e6fa!important;font-size:clamp(1.06rem,1.45vw,1.3rem)!important;line-height:1.65;max-width:52ch;margin:0 0 14px}
body .nds-concept-legacy{color:#b9cee9!important;font-size:13px!important;margin:3px 0!important;line-height:1.45!important;max-width:65ch}
body .nds-concept-actions{display:flex;flex-wrap:wrap;gap:12px;margin:30px 0 22px}
body .nds-concept-actions .btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:50px;padding:12px 21px;font-size:14px;font-weight:800;border-radius:10px}
body .nds-concept-secondary{background:rgba(2,17,35,.24)!important;color:#fff!important;border:1px solid #33adf6!important;box-shadow:none!important}
body .nds-concept-benefits{display:flex;gap:17px;flex-wrap:wrap;padding:0;margin:10px 0 0;list-style:none}
body .nds-concept-benefits li{color:#d2e9f9;display:flex;align-items:center;gap:7px;font-size:12px;font-weight:700}
body .nds-concept-benefits li:before{content:"✓";color:#20d0f8;font-weight:900}
body .nds-concept-visual{position:relative;min-height:365px;display:flex;align-items:center;justify-content:center;perspective:1100px}
body .nds-concept-halo{position:absolute;width:83%;height:65%;left:18%;top:14%;border-radius:50%;background:#0089ff;filter:blur(78px);opacity:.24}
body .nds-laptop{position:relative;width:min(96%,540px);z-index:1;transform:rotate(-5deg) rotateY(-6deg);filter:drop-shadow(0 28px 24px rgba(0,8,20,.7))}
body .nds-laptop-screen{position:relative;overflow:hidden;aspect-ratio:1.58;border:10px solid #121b2c;border-bottom:13px solid #141f33;border-radius:17px 17px 5px 5px;background:linear-gradient(125deg,#fff 48%,#d8eafb);box-shadow:inset 0 0 0 1px #849ab0,0 0 0 1px #8896aa}
body .nds-demo-nav{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:8px;background:#fff;padding:13px 15px;border-bottom:1px solid #e9eef5;color:#12274a;font-size:9px}
body .nds-demo-nav b{white-space:nowrap}.nds-demo-nav b span{display:inline-grid;place-items:center;color:#0794fd;font-size:18px;margin-right:5px}
body .nds-demo-content{position:relative;z-index:2;display:flex;align-items:flex-start;flex-direction:column;gap:11px;width:54%;padding:13% 0 0 5%;color:#09204a}
body .nds-demo-content>span:first-child{font-size:8px;letter-spacing:.1em;color:#0575e5;font-weight:800}
body .nds-demo-content strong{font-size:clamp(15px,1.9vw,29px);line-height:1.13;letter-spacing:-.05em}
body .nds-demo-pill{background:#0879f9;color:#fff!important;border-radius:5px;padding:7px 9px;font-size:9px;font-weight:800}
body .nds-demo-art{position:absolute;right:-9%;bottom:-28%;width:65%;height:78%;background:linear-gradient(165deg,#d9efff,#94c8ef 50%,#416caa 52%,#123d78 75%,#082b57);clip-path:polygon(0 100%,32% 22%,44% 44%,65% 2%,100% 78%,100% 100%);filter:drop-shadow(0 0 20px rgba(10,85,151,.25))}
body .nds-laptop-base{height:16px;width:112%;margin-left:-6%;background:linear-gradient(#c8d5e2,#7c91a6 64%,#4e647c);border-radius:0 0 50% 50%;box-shadow:0 4px 10px #02142c}
body .nds-mobile-device{position:absolute;z-index:3;right:1%;bottom:-2%;width:23%;max-width:126px;aspect-ratio:.51;padding:7px;background:#091526;border:2px solid #a5b7cb;border-radius:24px;transform:rotate(3deg);box-shadow:15px 18px 32px rgba(0,8,23,.64)}
body .nds-mobile-screen{height:100%;overflow:hidden;border-radius:17px;background:linear-gradient(150deg,#fff 55%,#aac9ec)}
body .nds-mobile-brand{height:16%;padding:10px 6px;white-space:nowrap;color:#133763;font-size:7px;font-weight:900;background:#fff}
body .nds-mobile-brand b{font-size:14px;color:#008dff;margin-right:3px}
body .nds-mobile-content{display:flex;flex-direction:column;align-items:flex-start;padding:18px 8px;gap:12px;color:#092951}
body .nds-mobile-content span{font-size:5px;letter-spacing:.08em;color:#168ce9}.nds-mobile-content strong{font-size:clamp(10px,1.4vw,15px);line-height:1.1}.nds-mobile-content i{height:13px;width:55%;background:#0879f9;border-radius:4px}.nds-mobile-content small{font-size:6px;color:#255487}
body #business-results{position:relative;z-index:4;width:min(1170px,calc(100% - 36px));margin:-35px auto 0!important;padding:18px 25px!important;border:1px solid #e3ebf7;border-radius:18px;background:#fff!important;box-shadow:0 18px 48px rgba(13,50,104,.13)!important;color:#0a264d!important}
body #business-results .wrap{width:100%!important}
body #business-results .neloy-stats-title{font-size:12px!important;letter-spacing:.12em;text-transform:uppercase;text-align:center;margin:0 0 9px;color:#4c76a5!important}
body #business-results .neloy-stats-grid{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:0!important;margin:0!important}
body #business-results .neloy-stats-grid>div{padding:8px 12px!important;text-align:center!important;border-right:1px solid #e2eaf5!important}
body #business-results .neloy-stats-grid>div:last-child{border:0!important}
body #business-results dt{font-size:11px!important;color:#647890!important;margin:6px 0 0!important}
body #business-results dd{font-size:clamp(1.2rem,2vw,1.75rem)!important;font-weight:900!important;color:#0b2e69!important;margin:0!important;line-height:1.25!important}
body #business-results .neloy-review-count{font-size:clamp(.9rem,1.6vw,1.2rem)!important}
body .services{background:#fff!important}
body .services .sectionHead,body .nds-center-heading{text-align:center!important;max-width:800px;margin:0 auto 28px!important}
body .services .sectionHead:before{content:"OUR SERVICES";display:block;color:#086af6;font-size:11px;font-weight:900;letter-spacing:.13em;margin-bottom:12px}
body .services .sectionHead h2{margin:0 0 12px!important;color:#071a2f!important}
body .services .grid{gap:20px!important}
body .services .card{background:#fff!important;padding:25px!important;border-radius:18px!important}
body .services .icon{background:#eaf4ff!important;color:#086af6!important;border-radius:12px!important}
body .nds-selected-work,body .nds-client-feedback,body .nds-concept-process{padding:88px 0;background:#f3f8ff;color:#173456}
body .nds-client-feedback{background:#fff}
body .nds-section-kicker{display:inline-flex;align-items:center;background:#e5f0ff;padding:5px 14px;border-radius:999px;text-transform:uppercase;color:#086af6;font-size:11px;font-weight:900;letter-spacing:.07em}
body .nds-selected-work :where(h2),body .nds-center-heading h2{font-size:clamp(2rem,3.7vw,3.1rem);line-height:1.15;letter-spacing:-.04em;margin:12px 0 6px;color:#071a2f}
body .nds-selected-work em,body .nds-center-heading em{font-style:normal;color:#086af6}
body .nds-selected-work .nds-showcase-original{font-size:1rem!important;line-height:1.5!important;letter-spacing:0!important;font-weight:600;color:#526e8d!important;margin:0 0 4px!important}
body .nds-selected-work p,body .nds-center-heading p{color:#62758d;margin:0}
body .nds-showcase-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:22px;margin-bottom:28px}
body .nds-outline-link{padding:11px 16px;border:1px solid #087dff;border-radius:9px;color:#086af6;font-size:13px;font-weight:800;text-decoration:none;white-space:nowrap}
body .nds-work-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
body .nds-work-card{display:flex;flex-direction:column;background:#fff;border:1px solid #e4ecf7;box-shadow:0 14px 35px rgba(11,43,86,.08);border-radius:15px;padding:7px 7px 20px;text-decoration:none;color:#0b2753;overflow:hidden}
body .nds-work-art{height:195px;position:relative;display:grid;place-items:center;overflow:hidden;border-radius:11px 11px 5px 5px;background:linear-gradient(130deg,#07182f,#1666af)}
body .nds-work-art-one{background:radial-gradient(circle at 70% 20%,#1b94e0,#081b36 65%)}
body .nds-art-monogram{font-size:78px;font-weight:1000;color:#def4ff;text-shadow:0 0 30px #21c7fa}
body .nds-art-lines{position:absolute;width:50%;height:6px;bottom:32px;left:25%;background:#21c7fa;border-radius:20px;box-shadow:0 12px 0 #ffffff89}
body .nds-work-art-two{background:linear-gradient(140deg,#e8f6ff,#9fcdf5)}
body .nds-art-window{display:flex;flex-direction:column;gap:10px;width:80%;height:75%;padding:18px;background:#fff;border-top:14px solid #10345c;border-radius:8px;box-shadow:0 14px 26px #0a4f9d4d;color:#0c3466}
body .nds-art-window i{display:block;width:40%;height:6px;background:#26a6f9}.nds-art-window b{font-size:18px;letter-spacing:-.04em}.nds-art-window small{font-size:10px}
body .nds-work-art-three{background:linear-gradient(145deg,#14243f,#2758a7 48%,#17baf2)}
body .nds-art-play{display:grid;place-items:center;width:68px;height:68px;padding-left:4px;border-radius:50%;background:#ffffffde;color:#0b77ef;font-size:25px;box-shadow:0 10px 28px #0417337d}
body .nds-work-label{font-weight:900;font-size:16px;margin:15px 14px 3px;color:#0a2651}
body .nds-work-type{color:#62758d;font-size:12px;margin:0 14px}
body .nds-feedback-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
body .nds-feedback-grid blockquote{margin:0;padding:26px;border:1px solid #e5edf8;border-radius:16px;background:#fff;box-shadow:0 14px 35px rgba(10,39,82,.08)}
body .nds-feedback-grid blockquote p{font-size:16px;color:#1a3656;margin:0 0 20px}
body .nds-feedback-grid footer{display:flex;flex-direction:column;gap:2px;background:transparent!important;border:0!important;color:#61758e!important;padding:0!important;font-size:13px}
body .nds-feedback-grid footer strong{color:#0a2854!important;font-size:15px}
body .nds-feedback-more{display:block;text-align:center;color:#086af6;font-weight:800;margin-top:24px;text-decoration:none}
body .nds-process-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;list-style:none;padding:0;margin:40px 0 0}
body .nds-process-steps li{position:relative;display:grid;grid-template-columns:48px 1fr;column-gap:12px;align-items:start}
body .nds-process-steps li>span{grid-row:span 2;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#066af5;color:#fff;font-size:13px;font-weight:900}
body .nds-process-steps strong{color:#0b284e;font-size:17px}
body .nds-process-steps small{color:#5c718c;font-size:12px;line-height:1.5}
body :where(.footer,footer):not(.nds-feedback-grid footer){background:#06182e!important;color:#deecfb!important}
@media(max-width:980px){body .nds-concept-layout{grid-template-columns:1fr;gap:28px}body .nds-concept-copy{max-width:740px}body .nds-concept-visual{width:min(600px,100%);margin:auto}body .nds-concept-hero h1{max-width:18ch}body #business-results .neloy-stats-grid{grid-template-columns:repeat(3,1fr)!important}body #business-results .neloy-stats-grid>div:nth-child(3){border-right:0!important}body .nds-process-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){body .nds-concept-hero{padding:54px 0 80px!important}body .nds-concept-hero h1{font-size:clamp(2.55rem,10vw,3.65rem)!important;max-width:15ch}body .nds-concept-visual{min-height:250px;width:100%}body .nds-laptop{width:92%}body .nds-laptop-screen{border-width:6px;border-bottom-width:8px}body .nds-demo-nav{padding:7px 8px;font-size:6px}body .nds-demo-nav b span{font-size:12px}body .nds-demo-content strong{font-size:clamp(13px,4.5vw,24px)}body .nds-demo-content>span:first-child{font-size:6px}body .nds-mobile-device{right:0;bottom:0;width:24%;border-radius:17px;padding:4px}body .nds-mobile-screen{border-radius:12px}body #business-results{width:calc(100% - 28px);margin-top:-25px!important;padding:15px 12px!important}body #business-results .neloy-stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}body #business-results .neloy-stats-grid>div{border-right:0!important;border-bottom:1px solid #e4edf7!important}body #business-results .neloy-stats-grid>div:nth-child(odd){border-right:1px solid #e4edf7!important}body #business-results .neloy-stats-grid>div:last-child{grid-column:span 2;border:0!important}body .nds-selected-work,body .nds-client-feedback,body .nds-concept-process{padding:58px 0}body .nds-showcase-heading{align-items:flex-start;flex-direction:column}body .nds-work-grid,body .nds-feedback-grid{grid-template-columns:1fr}body .nds-process-steps{grid-template-columns:1fr 1fr;gap:20px 10px}body .nds-process-steps li{grid-template-columns:39px 1fr}body .nds-process-steps li>span{width:36px;height:36px}body .nds-concept-benefits{gap:9px 14px}}
@media(prefers-reduced-motion:reduce){body .nds-concept-hero *{scroll-behavior:auto!important}}

/* Homepage testimonial layout only. Keep existing headings, links and review text. */
body .nds-client-feedback{padding:48px 0;background:#fff}
body .nds-client-feedback .nds-center-heading{margin-bottom:24px!important}
body .nds-client-feedback .nds-feedback-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start}
body .nds-client-feedback .nds-feedback-card{position:relative;min-width:0;margin:0;padding:22px;border:1px solid #e3ebf6;border-radius:18px;background:#fff;box-shadow:0 10px 28px rgba(10,39,82,.06)}
body .nds-client-feedback .nds-feedback-card footer{display:flex;flex-direction:row;align-items:center;gap:12px;padding:0!important;background:transparent!important;border:0!important}
body .nds-client-feedback .nds-feedback-photo{flex:0 0 56px;width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid #e5f6fc}
body .nds-client-feedback .nds-feedback-person{display:flex;flex-direction:column;gap:3px;min-width:0;padding-right:12px}
body .nds-client-feedback .nds-feedback-person strong{color:#071a2f!important;font-size:15px;line-height:1.35}
body .nds-client-feedback .nds-feedback-person>span{color:#61758e;font-size:12px;line-height:1.45}
body .nds-client-feedback .nds-feedback-quote-icon{position:absolute;right:16px;top:14px;color:#086af6;font-family:Georgia,serif;font-size:34px;line-height:1;opacity:.55}
body .nds-client-feedback .nds-feedback-rating{margin:16px 0 12px;color:#f4b400;font-size:18px;letter-spacing:2px;line-height:1}
body .nds-client-feedback .nds-feedback-quote{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden;margin:0;min-height:6.6em;color:#1a3656;font-size:14px;line-height:1.65}
body .nds-client-feedback .nds-feedback-quote.nds-feedback-expanded{display:block;overflow:visible;-webkit-line-clamp:unset}
body .nds-client-feedback .nds-feedback-toggle{display:inline-flex;align-items:center;min-height:44px;margin:8px 0 0;padding:0;background:transparent;border:0;color:#086af6;font:inherit;font-size:13px;font-weight:800;cursor:pointer}
body .nds-client-feedback .nds-feedback-toggle:focus-visible,body .nds-client-feedback .nds-feedback-grid:focus-visible{outline:2px solid #086af6;outline-offset:4px}
body .nds-client-feedback .nds-feedback-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
body .nds-client-feedback .nds-feedback-more{margin-top:20px}
@media(max-width:760px){
  body .nds-client-feedback{padding:36px 0}
  body .nds-client-feedback .nds-feedback-grid{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:4px 2px 18px;scroll-padding-inline:2px;scroll-behavior:auto}
  body .nds-client-feedback .nds-feedback-card{flex:0 0 100%;scroll-snap-align:start;padding:20px;box-sizing:border-box}
}
@media print{
  body .nds-client-feedback .nds-feedback-quote{display:block;overflow:visible;-webkit-line-clamp:unset}
  body .nds-client-feedback .nds-feedback-toggle{display:none}
  body .nds-client-feedback .nds-feedback-grid{display:block;overflow:visible}
}
</style>`;

export { PREMIUM_THEME, PREMIUM_CONCEPT_CSS };
