// Shared presentation for the site's existing public pages. No routing or copy here.
const PREMIUM_PAGES_CSS = `<style id="nds-premium-pages">
body{--nds-page-navy:#071a2f;--nds-page-blue:#086af6;--nds-page-cyan:#22d3ee;--nds-page-soft:#f2f7ff;--nds-page-line:#dce9f8}
body .top{background:#fff!important;color:#112b4f!important;border-bottom:1px solid #e4edf8!important;box-shadow:0 8px 26px rgba(7,37,78,.06)!important;backdrop-filter:blur(14px)}
body .top :where(.brand,.brand strong,.navlinks a,.back){color:#10294c!important}
body .top :where(.navCta){background:linear-gradient(120deg,#086af6,#0ba5ff)!important;color:#fff!important;border:1px solid #1689f9!important;border-radius:10px!important;padding:11px 17px!important;box-shadow:0 10px 22px rgba(8,106,246,.21)!important;text-decoration:none}
body .top :where(.logo,.mark){background:linear-gradient(130deg,#086af6,#22d3ee)!important;color:#fff!important;border-radius:12px!important}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero){position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(circle at 85% 20%,#125ba4 0%,#092a58 32%,#061b36 72%,#04152d 100%)!important;color:#e5f3ff!important;padding-block:clamp(78px,8vw,120px)!important}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero):after{content:"";position:absolute;right:-10%;bottom:-230px;width:70%;height:330px;border:1px solid rgba(49,166,255,.22);border-radius:50%;box-shadow:0 -15px 100px rgba(0,148,255,.17);pointer-events:none}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero) :where(h1,h2){color:#fff!important;font-size:clamp(2.7rem,5.3vw,4.85rem)!important;line-height:1.09!important;letter-spacing:-.055em!important;max-width:16ch}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero) :where(p,.spLead,.mkLead,.lead){color:#d5e7f8!important;font-size:clamp(1.05rem,1.65vw,1.24rem)!important;line-height:1.7!important;max-width:65ch}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero) :where(.spEyebrow,.mkEyebrow,.eyebrow,span:first-child){color:#6cdbfc!important;letter-spacing:.12em;font-weight:800}
body .nds-service-page :where(.spSection,#nds-video-portfolio,#nds-video-watch,#nds-website-portfolio){padding-block:clamp(64px,7vw,95px)!important}
body .nds-service-page :where(.spSection.soft,#nds-video-portfolio,#nds-website-portfolio){background:var(--nds-page-soft)!important}
body .nds-service-page :where(.spSection:not(.soft),#nds-video-watch){background:#fff!important}
body :where(.nds-service-page .spSection,#nds-marketing-page .mkSection) :where(h2){color:var(--nds-page-navy)!important;font-size:clamp(2rem,3.2vw,3.1rem)!important;letter-spacing:-.035em!important;line-height:1.16!important}
body :where(.nds-service-page .spCard,.nds-service-page .spStep,.nds-service-page .svCard,#nds-marketing-page .mkCard,#nds-marketing-page .mkStep,.nds-premium-showcase .workCard,.nds-premium-showcase .testCard,.nds-premium-team .team .card,.nds-premium-terms .terms .card,.nds-premium-privacy .policy article){background:#fff!important;color:#173554!important;border:1px solid var(--nds-page-line)!important;border-radius:20px!important;box-shadow:0 18px 44px rgba(7,43,91,.09)!important}
body :where(.nds-service-page .spCard,.nds-service-page .spStep,#nds-marketing-page .mkCard,.nds-premium-showcase .workCard,.nds-premium-team .team .card){transition:transform .2s ease,box-shadow .2s ease}
body :where(.nds-service-page .spCard,.nds-service-page .spStep,#nds-marketing-page .mkCard,.nds-premium-showcase .workCard,.nds-premium-team .team .card):hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(7,43,91,.13)!important}
body :where(.nds-service-page .spCta,#nds-marketing-page .mkCta,.nds-premium-website .contactIntro){background:linear-gradient(135deg,#0b315e,#061a34)!important;border:1px solid #255a91!important;border-radius:24px!important;box-shadow:0 22px 55px rgba(7,31,67,.2)!important;color:#fff!important}
body :where(.nds-service-page .spCta,#nds-marketing-page .mkCta,.nds-premium-website .contactIntro) :where(h2,h3,p){color:#f1f8ff!important}
body :where(.nds-service-page a.spBtn,#nds-marketing-page a.mkBtn,.nds-premium-showcase .showcaseBack,.nds-premium-website .contact button){background:linear-gradient(125deg,#086af6,#0aa3ff)!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border:1px solid #1689f9!important;border-radius:10px!important;box-shadow:0 12px 26px rgba(8,106,246,.22)!important;text-decoration:none!important}
body .nds-premium-showcase :where(#graphic-design-portfolio,#web-design-projects,#nds-showcase-video,#nds-web-projects-2026){padding-block:clamp(65px,7vw,100px)!important}
body .nds-premium-showcase :where(#graphic-design-portfolio,#nds-showcase-video){background:#f3f8ff!important}
body .nds-premium-showcase :where(#web-design-projects,#nds-web-projects-2026,.testimonials){background:#fff!important}
body .nds-premium-showcase .testimonials{padding-block:clamp(65px,7vw,100px)!important}
.nds-premium-team .team,.nds-premium-terms .terms,.nds-premium-privacy .policy{padding-block:clamp(54px,7vw,92px)!important;background:#f5f9ff!important}
.nds-premium-team .team .grid{gap:20px!important}
.nds-premium-terms .terms .card{padding:clamp(22px,4vw,50px)!important}
.nds-premium-privacy .policy{display:grid;gap:18px}
.nds-premium-privacy .policy article{padding:clamp(20px,3vw,32px)!important}
.nds-premium-privacy .policy :where(h2){color:#102d54!important}
.nds-premium-website .hero{padding-block:clamp(78px,8vw,120px)!important}
.nds-premium-website .services,.nds-premium-website .companyContent,.nds-premium-website .aboutFounder,.nds-premium-website .contact{padding-block:clamp(60px,7vw,98px)!important}
.nds-premium-home :where(#nds-feature-video,.companyContent,.aboutFounder,#nds-client-offers,#nds-answer-section,#nds-creative-partner,#nds-ranking-progress,#nds-systeme-landing-cta,.paymentMethods,#nds-social-community){padding-block:clamp(56px,6vw,84px)!important}
.nds-premium-home :where(.companyContent,#nds-client-offers,#nds-creative-partner,.paymentMethods){background:#f2f7ff!important}
.nds-premium-home :where(.aboutFounder,#nds-answer-section,#nds-ranking-progress,#nds-social-community){background:#fff!important}
.nds-premium-home :where(.offerCard,.answerItem,.companyContentVisual){border-radius:20px!important;box-shadow:0 14px 35px rgba(11,43,86,.08)!important;border-color:#e0eafa!important}
body :where(.footer,footer){background:#06182e!important;color:#dceaf9!important;border-top:1px solid #194571!important}
body :where(.footer,footer) :where(strong,h2,h3){color:#fff!important}
body :where(.footer,footer) a{color:#a9eaff!important}
body .nds-feedback-grid footer{background:transparent!important;border:0!important;color:#62758d!important}
body .nds-feedback-grid footer strong{color:#0a2854!important}
/* Keep existing homepage copy visible while reducing the visual weight of older sections. */
body .nds-premium-home :where(#nds-feature-video,.companyContent,.aboutFounder,#nds-client-offers,#nds-answer-section,#nds-creative-partner,#nds-ranking-progress,.paymentMethods,#nds-social-community){padding-block:clamp(34px,4vw,54px)!important}
body .nds-premium-home :where(#nds-feature-video,.companyContent,.aboutFounder,#nds-client-offers,#nds-answer-section,#nds-creative-partner,#nds-ranking-progress) :where(.wrap,.offerWrap,.answerWrap,.cpWrap,.rpWrap){max-width:1120px!important}
body .nds-premium-home :where(.companyContentGrid,.aboutFounderGrid,.cpGrid,.rpGrid){gap:clamp(16px,2.3vw,32px)!important}
body .nds-premium-home :where(.companyContentVisual,.aboutFounderVisual,.cpVisual,.rpVideo){min-width:0;max-width:100%;overflow:hidden}
body .nds-premium-home :where(.companyContentVisual,.aboutFounderVisual,.cpVisual,.rpVideo) :where(img,video){max-width:100%;height:auto}
body .nds-premium-home #nds-answer-section .answerWrap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 20px}
body .nds-premium-home #nds-answer-section .answerWrap>h2{grid-column:1/-1;margin-bottom:6px}
body .nds-premium-home #nds-answer-section .answerItem{min-width:0;margin:0!important;padding:20px!important;border-radius:15px!important}
body .nds-premium-home #nds-client-offers .offerCard{min-width:0;padding:20px!important}
body .nds-premium-home #nds-insights{padding:26px 0 38px!important}
body .nds-premium-home #nds-insights .nds-insights-inner{padding:23px 30px!important;box-shadow:none!important}
body .nds-premium-home #nds-insights h2{font-size:clamp(1.6rem,2.4vw,2.1rem)!important;margin:5px 0 6px!important}
body .nds-premium-home #nds-insights p{font-size:14px;line-height:1.55}
body .nds-concept-hero:before{opacity:.34!important;box-shadow:none!important}
body .nds-concept-hero:after{display:none!important}
body .nds-concept-halo{opacity:.12!important;filter:blur(60px)!important}
body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero):after{opacity:.35!important;box-shadow:none!important}
body .nds-concept-layout{grid-template-columns:minmax(0,1.02fr) minmax(0,1fr);gap:clamp(25px,4vw,65px)}
body .nds-concept-copy,body .nds-concept-visual,body .nds-laptop{min-width:0;max-width:100%}
body .nds-premium-explore-links{display:flex;justify-content:center;gap:9px 19px;flex-wrap:wrap;width:min(1100px,calc(100% - 30px));margin:19px auto 0;padding-top:18px;border-top:1px solid #315272}
body .nds-premium-explore-links a{font-size:13px;line-height:1.5;text-decoration:none;color:#b3e6ff!important}
body .nds-premium-explore-links a:hover{text-decoration:underline}
@media(max-width:980px){body .nds-concept-layout{grid-template-columns:minmax(0,1fr)}body .nds-premium-home #nds-answer-section .answerWrap{grid-template-columns:minmax(0,1fr)}}
@media(max-width:620px){body .nds-concept-visual{overflow:visible}body .nds-mobile-device{right:1%!important;bottom:0!important}body .nds-premium-home #nds-insights .nds-insights-inner{padding:19px!important}body .nds-premium-home :where(.companyContent,.aboutFounder,#nds-client-offers,#nds-answer-section,#nds-creative-partner,#nds-ranking-progress){padding-block:36px!important}body .nds-premium-explore-links{gap:8px 14px}body .floatWa,body .floatAi{right:12px!important;width:52px!important;height:52px!important}body .floatWa{bottom:78px!important}body .floatAi{bottom:14px!important}body .chat{right:10px!important;left:10px!important;max-width:calc(100vw - 20px)!important}}
@media(max-width:720px){body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero){padding-block:62px!important}body :where(.nds-service-page .spHero,#nds-marketing-page .mkHero,.nds-premium-showcase .showcaseHero,.nds-premium-website .hero,.nds-premium-team .hero,.nds-premium-terms .hero,.nds-premium-privacy .hero) h1{font-size:clamp(2.35rem,9vw,3.2rem)!important}.nds-premium-privacy .policy{padding-inline:16px!important}}
@media(prefers-reduced-motion:reduce){body :where(.spCard,.mkCard,.workCard,.team .card){transition:none!important}}
</style>`;

export { PREMIUM_PAGES_CSS };
