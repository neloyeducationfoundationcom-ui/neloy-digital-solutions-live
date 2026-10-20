const PACKAGES = [
  {key:'starter',name:'Starter Review',price:'$49',description:'A focused review of your homepage, mobile usability and key enquiry paths.',checks:['Homepage clarity','Mobile usability','Priority action list']},
  {key:'detailed',name:'Detailed Review',price:'$99',description:'A deeper look at key pages, navigation, on-page SEO basics and customer experience.',checks:['Key page review','SEO & usability checks','Detailed recommendations']},
  {key:'small-fixes',name:'Review + Small Fixes',price:'from $199',description:'A detailed review plus selected small improvements agreed before work begins.',checks:['Detailed review included','Agreed small fixes','Before-and-after summary']}
];

const STYLE = `<style id="nds-health-review-style">
#nds-health-review{padding:clamp(36px,6vw,64px) 20px;background:#f8fbfe;color:#10213c}
#nds-health-review *{box-sizing:border-box}
#nds-health-review .nhr-wrap{max-width:1248px;margin:0 auto}
#nds-health-review .nhr-intro{text-align:center;margin:0 0 32px}
#nds-health-review .nhr-eyebrow{margin:0 0 12px;color:#1478f5;font-size:13px;font-weight:800;letter-spacing:.12em}
#nds-health-review .nhr-title{margin:0 0 12px;font-size:clamp(28px,4vw,42px);line-height:1.16;font-weight:800;color:#10213c}
#nds-health-review .nhr-lead{margin:0;color:#53657d;font-size:clamp(17px,2vw,20px);line-height:1.6}
#nds-health-review .nhr-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
#nds-health-review .nhr-card{min-width:0;background:#fff;border:1px solid #dce7f1;border-radius:16px;padding:24px;display:flex;flex-direction:column;box-shadow:0 5px 15px rgba(16,33,60,.045)}
#nds-health-review .nhr-name{margin:0 0 18px;color:#10213c;font-size:clamp(19px,1.8vw,23px);line-height:1.35;font-weight:800}
#nds-health-review .nhr-price{margin:0 0 18px;color:#1478f5;font-size:clamp(34px,3.4vw,44px);line-height:1.15;font-weight:800}
#nds-health-review .nhr-description{margin:0 0 24px;color:#53657d;font-size:17px;line-height:1.65}
#nds-health-review .nhr-checks{list-style:none;padding:20px 0 0;margin:auto 0 24px;border-top:1px solid #dce7f1;color:#53657d;font-size:16px;line-height:1.6}
#nds-health-review .nhr-checks li{display:flex;align-items:flex-start;gap:10px;margin:0 0 12px}
#nds-health-review .nhr-checks li:last-child{margin-bottom:0}
#nds-health-review .nhr-check{flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#d7f7ff;color:#1478f5;display:inline-flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;margin-top:2px}
#nds-health-review .nhr-request{display:flex;align-items:center;justify-content:center;min-height:48px;width:100%;padding:13px 12px;border-radius:9px;background:#1478f5;color:#fff;text-align:center;text-decoration:none;font-size:15px;font-weight:800;line-height:1.5;overflow-wrap:anywhere}
#nds-health-review .nhr-request:hover{background:#0864df}
#nds-health-review .nhr-request:focus-visible{outline:3px solid #10213c;outline-offset:4px}
#nds-health-review .nhr-note{text-align:center;font-size:14px;line-height:1.7;color:#53657d;margin:26px 0 0}
@media(max-width:760px){#nds-health-review .nhr-grid{grid-template-columns:minmax(0,1fr);gap:20px}#nds-health-review .nhr-wrap{max-width:540px}#nds-health-review .nhr-intro{text-align:left}#nds-health-review .nhr-card{padding:24px}#nds-health-review .nhr-name{font-size:23px}#nds-health-review .nhr-checks{margin-top:0}#nds-health-review .nhr-request{font-size:16px}}
</style>`;

export function addWebsiteHealthReview(html,path,searchParams) {
  if(path==='/website-design' && !html.includes('id="nds-health-review"')){
    const marker='<section class="spSection"><div class="spWrap spFaq"><div class="spTitle"><h2>Website Design FAQ</h2>';
    if(!html.includes(marker))return html;
    const cards=PACKAGES.map(p=>`<article class="nhr-card" aria-label="${p.name}"><p class="nhr-name">${p.name}</p><p class="nhr-price">${p.price}</p><p class="nhr-description">${p.description}</p><ul class="nhr-checks">${p.checks.map(c=>`<li><span class="nhr-check" aria-hidden="true">✓</span><span>${c}</span></li>`).join('')}</ul><a class="nhr-request" href="/?website-review=${p.key}#contact" aria-label="Request a Website Review — ${p.name}, ${p.price}">Request a Website Review</a></article>`).join('');
    const section=`<section id="nds-health-review" aria-labelledby="nds-health-review-title"><div class="nhr-wrap"><div class="nhr-intro"><p class="nhr-eyebrow">NELOY DIGITAL SOLUTIONS</p><p id="nds-health-review-title" class="nhr-title">Website Health Review</p><p class="nhr-lead">Know what to improve before you rebuild.</p></div><div class="nhr-grid">${cards}</div><p class="nhr-note">Scope confirmed before work starts. No ranking guarantees.</p></div></section>`;
    return html.replace('</head>',STYLE+'</head>').replace(marker,section+marker);
  }
  // Only recognized package enquiries receive this script; ordinary homepage HTML is untouched.
  const selection=path==='/'?PACKAGES.find(p=>p.key===searchParams?.get('website-review')):null;
  if(!selection || html.includes('id="nds-health-review-prefill"'))return html;
  const message=`Website Health Review — ${selection.name} (${selection.price}). Please review my website: `;
  const script=`<script id="nds-health-review-prefill">(()=>{function apply(){const form=document.getElementById('leadForm');if(!form)return;const service=form.querySelector('[name="service"]');const details=form.querySelector('[name="projectDetails"]');if(service&&!service.value){service.value='Web Design';service.dispatchEvent(new Event('change',{bubbles:true}));}if(details&&!details.value.trim()){details.value=${JSON.stringify(message)};details.dispatchEvent(new Event('input',{bubbles:true}));}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();})();</script>`;
  return html.replace('</body>',script+'</body>');
}
