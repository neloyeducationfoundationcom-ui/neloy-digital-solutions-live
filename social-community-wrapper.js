import currentWorker from "./testimonial-final-fix-wrapper.js";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61594451692541";
const INSTAGRAM_URL = "https://www.instagram.com/neloydigital.solutions/";
const LINKEDIN_URL = "https://www.linkedin.com/company/neloy-digital-solutions/";

const FALLBACK_COUNTS = { facebook: 12, instagram: 3, linkedin: 1 };

const STYLE = `<style id="nds-social-community-style">
#nds-social-community{padding:54px 0;background:linear-gradient(180deg,#f8fcff,#eef8ff);border-top:1px solid #d9ecf8;border-bottom:1px solid #d9ecf8}
#nds-social-community .socialWrap{width:min(1050px,calc(100% - 32px));margin:0 auto;text-align:center}
#nds-social-community .eyebrow{display:inline-block;margin-bottom:10px;padding:7px 11px;border-radius:999px;background:#eaf7ff;border:1px solid #bfe7f8;color:#075dff;font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
#nds-social-community h2{margin:0;color:#0a2a5a;font-size:clamp(30px,5vw,44px);line-height:1.08;letter-spacing:-.03em}
#nds-social-community .socialIntro{max-width:700px;margin:12px auto 26px;color:#60758c;font-size:16px;line-height:1.7}
#nds-social-community .socialGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
#nds-social-community .socialCard{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:210px;padding:24px;border:1px solid #c9e8f7;border-radius:22px;background:#fff;box-shadow:0 12px 30px rgba(7,93,255,.08);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease}
#nds-social-community .socialCard:hover{transform:translateY(-3px);box-shadow:0 18px 38px rgba(7,93,255,.13)}
#nds-social-community .socialIcon{display:grid;place-items:center;width:52px;height:52px;border-radius:50%;margin-bottom:12px;color:#fff;font-weight:1000;font-family:Arial,sans-serif;font-size:21px}
#nds-social-community .facebook .socialIcon{background:#0866cc}
#nds-social-community .instagram .socialIcon{background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)}
#nds-social-community .linkedin .socialIcon{background:#0a66c2}
#nds-social-community .platform{color:#0a2a5a;font-size:20px;font-weight:1000}
#nds-social-community .handle{margin-top:4px;color:#6b86a0;font-size:13px;font-weight:800;word-break:break-word}
#nds-social-community .followerCount{margin-top:12px;display:inline-flex;align-items:center;justify-content:center;padding:8px 13px;border-radius:999px;background:#eef7ff;border:1px solid #c9e8f7;color:#0a2a5a;font-size:14px;font-weight:1000}
#nds-social-community .visit{margin-top:12px;padding:8px 12px;border-radius:999px;background:#f3faff;border:1px solid #c9e8f7;color:#075dff;font-size:12px;font-weight:900}
#nds-social-footer-links{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px}
#nds-social-footer-links a{display:inline-flex;align-items:center;justify-content:center;padding:8px 11px;border-radius:999px;background:#0a2a5a;color:#fff!important;text-decoration:none;font-size:12px;font-weight:900}
@media(max-width:760px){
 #nds-social-community{padding:40px 0}
 #nds-social-community .socialGrid{grid-template-columns:1fr}
 #nds-social-community .socialCard{min-height:175px;padding:20px}
}
</style>`;

const SECTION = `<section id="nds-social-community" aria-label="Neloy Digital Solutions social media profiles">
  <div class="socialWrap">
    <span class="eyebrow">Social Media</span>
    <h2>Connect with Neloy Digital Solutions</h2>
    <p class="socialIntro">Follow our latest creative work, video projects, design updates and digital solutions across our official social media profiles.</p>
    <div class="socialGrid">
      <a class="socialCard facebook" href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open Neloy Digital Solutions Facebook">
        <span class="socialIcon">f</span><span class="platform">Facebook</span><span class="handle">Neloy Digital Solutions</span><span class="followerCount" data-social-count="facebook">12 followers</span><span class="visit">View profile</span>
      </a>
      <a class="socialCard instagram" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open Neloy Digital Solutions Instagram">
        <span class="socialIcon">◎</span><span class="platform">Instagram</span><span class="handle">@neloydigital.solutions</span><span class="followerCount" data-social-count="instagram">3 followers</span><span class="visit">View profile</span>
      </a>
      <a class="socialCard linkedin" href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open Neloy Digital Solutions LinkedIn">
        <span class="socialIcon">in</span><span class="platform">LinkedIn</span><span class="handle">Neloy Digital Solutions</span><span class="followerCount" data-social-count="linkedin">1 follower</span><span class="visit">View profile</span>
      </a>
    </div>
  </div>
</section>`;

const FOOTER_LINKS = `<div id="nds-social-footer-links"><a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Facebook</a><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer">Instagram</a><a href="${LINKEDIN_URL}" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>`;

const LIVE_SCRIPT = `<script id="nds-social-live-count-script">
(function(){
  function label(n){return Number(n)===1?'1 follower':Number(n).toLocaleString()+' followers';}
  async function refreshSocialCounts(){
    try{
      const r=await fetch('/api/social-stats',{cache:'no-store'});
      if(!r.ok) return;
      const d=await r.json();
      ['facebook','instagram','linkedin'].forEach(function(k){
        const el=document.querySelector('[data-social-count="'+k+'"]');
        if(el && Number.isFinite(Number(d[k]))) el.textContent=label(d[k]);
      });
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refreshSocialCounts,{once:true});
  else refreshSocialCounts();
})();
</script>`;

function json(data,status=200){
  return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
}

async function fetchMetaCounts(env){
  const out={};
  const token=env.META_PAGE_ACCESS_TOKEN;
  const pageId=env.META_PAGE_ID || '61594451692541';
  if(!token || !pageId) return out;

  const version=env.META_GRAPH_VERSION || 'v23.0';
  try{
    const pageUrl=`https://graph.facebook.com/${version}/${encodeURIComponent(pageId)}?fields=followers_count,fan_count,instagram_business_account&access_token=${encodeURIComponent(token)}`;
    const pageRes=await fetch(pageUrl);
    if(pageRes.ok){
      const page=await pageRes.json();
      const fb=Number(page.followers_count ?? page.fan_count);
      if(Number.isFinite(fb)) out.facebook=fb;

      const igId=env.META_IG_USER_ID || page.instagram_business_account?.id;
      if(igId){
        const igUrl=`https://graph.facebook.com/${version}/${encodeURIComponent(igId)}?fields=followers_count&access_token=${encodeURIComponent(token)}`;
        const igRes=await fetch(igUrl);
        if(igRes.ok){
          const ig=await igRes.json();
          const count=Number(ig.followers_count);
          if(Number.isFinite(count)) out.instagram=count;
        }
      }
    }
  }catch(e){}
  return out;
}

async function fetchLinkedInCount(env){
  const token=env.LINKEDIN_ACCESS_TOKEN;
  const orgId=env.LINKEDIN_ORG_ID;
  if(!token || !orgId) return undefined;
  try{
    const urn=encodeURIComponent(`urn:li:organization:${orgId}`);
    const res=await fetch(`https://api.linkedin.com/rest/networkSizes/${urn}?edgeType=CompanyFollowedByMember`,{
      headers:{
        'Authorization':`Bearer ${token}`,
        'LinkedIn-Version':env.LINKEDIN_VERSION || '202608',
        'X-Restli-Protocol-Version':'2.0.0'
      }
    });
    if(!res.ok) return undefined;
    const data=await res.json();
    const count=Number(data.firstDegreeSize);
    return Number.isFinite(count)?count:undefined;
  }catch(e){return undefined;}
}

async function socialStats(env){
  const [meta,linkedin]=await Promise.all([fetchMetaCounts(env),fetchLinkedInCount(env)]);
  return {
    facebook: Number.isFinite(meta.facebook)?meta.facebook:FALLBACK_COUNTS.facebook,
    instagram: Number.isFinite(meta.instagram)?meta.instagram:FALLBACK_COUNTS.instagram,
    linkedin: Number.isFinite(linkedin)?linkedin:FALLBACK_COUNTS.linkedin,
    source:{
      facebook:Number.isFinite(meta.facebook)?'api':'fallback',
      instagram:Number.isFinite(meta.instagram)?'api':'fallback',
      linkedin:Number.isFinite(linkedin)?'api':'fallback'
    }
  };
}

function addSocials(html, path){
  if(!html.includes('id="nds-social-community-style"') && html.includes('</head>')) html=html.replace('</head>',STYLE+'</head>');
  html=html.replace(/<a\b[^>]*id=["']neloy-facebook-link["'][\s\S]*?<\/a>/gi,'');
  html=html.replace(/<a\b[^>]*id=["']neloy-linkedin-link["'][\s\S]*?<\/a>/gi,'');

  if((path==='/'||path==='') && !html.includes('id="nds-social-community"')){
    if(html.includes('</footer>')) html=html.replace('<footer',SECTION+'<footer');
    else if(html.includes('</body>')) html=html.replace('</body>',SECTION+'</body>');
  }

  if(!html.includes('id="nds-social-footer-links"') && html.includes('</footer>')) html=html.replace('</footer>',FOOTER_LINKS+'</footer>');
  if(!html.includes('id="nds-social-live-count-script"')) html=html.includes('</body>')?html.replace('</body>',LIVE_SCRIPT+'</body>'):html+LIVE_SCRIPT;
  return html;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);

    if(request.method==='GET' && url.pathname==='/api/social-stats'){
      return json(await socialStats(env));
    }

    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get('content-type')||'';
    if(request.method!=='GET'||!response.ok||!type.includes('text/html')||url.pathname.startsWith('/admin')) return response;
    const html=addSocials(await response.text(),url.pathname);
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
