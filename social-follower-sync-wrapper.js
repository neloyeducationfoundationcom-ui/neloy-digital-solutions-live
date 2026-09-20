import app from "./whatsapp-lead-prefill-wrapper.js";

const FALLBACK_COUNTS = { facebook: 15, instagram: 7, linkedin: 3, tiktok: 4 };

function json(data,status=200){
  return new Response(JSON.stringify(data),{
    status,
    headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}
  });
}

async function fetchMetaCounts(env){
  const out={};
  const token=env.META_PAGE_ACCESS_TOKEN;
  const pageId=env.META_PAGE_ID || "61594451692541";
  if(!token || !pageId) return out;
  const version=env.META_GRAPH_VERSION || "v23.0";
  try{
    const pageUrl="https://graph.facebook.com/"+version+"/"+encodeURIComponent(pageId)+"?fields=followers_count,fan_count,instagram_business_account&access_token="+encodeURIComponent(token);
    const pageRes=await fetch(pageUrl);
    if(pageRes.ok){
      const page=await pageRes.json();
      const fb=Number(page.followers_count ?? page.fan_count);
      if(Number.isFinite(fb)) out.facebook=fb;
      const igId=env.META_IG_USER_ID || (page.instagram_business_account && page.instagram_business_account.id);
      if(igId){
        const igUrl="https://graph.facebook.com/"+version+"/"+encodeURIComponent(igId)+"?fields=followers_count&access_token="+encodeURIComponent(token);
        const igRes=await fetch(igUrl);
        if(igRes.ok){
          const ig=await igRes.json();
          const count=Number(ig.followers_count);
          if(Number.isFinite(count)) out.instagram=count;
        }
      }
    }
  }catch(_){}
  return out;
}

async function fetchLinkedInCount(env){
  const token=env.LINKEDIN_ACCESS_TOKEN;
  const orgId=env.LINKEDIN_ORG_ID;
  if(!token || !orgId) return undefined;
  try{
    const urn=encodeURIComponent("urn:li:organization:"+orgId);
    const res=await fetch("https://api.linkedin.com/rest/networkSizes/"+urn+"?edgeType=CompanyFollowedByMember",{
      headers:{
        "Authorization":"Bearer "+token,
        "LinkedIn-Version":env.LINKEDIN_VERSION || "202608",
        "X-Restli-Protocol-Version":"2.0.0"
      }
    });
    if(!res.ok) return undefined;
    const data=await res.json();
    const count=Number(data.firstDegreeSize);
    return Number.isFinite(count)?count:undefined;
  }catch(_){return undefined;}
}

async function fetchTikTokCount(env){
  const token=env.TIKTOK_ACCESS_TOKEN;
  if(!token) return undefined;
  try{
    const res=await fetch("https://open.tiktokapis.com/v2/user/info/?fields=follower_count",{
      headers:{"Authorization":"Bearer "+token}
    });
    if(!res.ok) return undefined;
    const data=await res.json();
    const count=Number(data && data.data && data.data.user && data.data.user.follower_count);
    return Number.isFinite(count)?count:undefined;
  }catch(_){return undefined;}
}

async function socialStats(env){
  const [meta,linkedin,tiktok]=await Promise.all([
    fetchMetaCounts(env),
    fetchLinkedInCount(env),
    fetchTikTokCount(env)
  ]);
  return {
    facebook:Number.isFinite(meta.facebook)?meta.facebook:FALLBACK_COUNTS.facebook,
    instagram:Number.isFinite(meta.instagram)?meta.instagram:FALLBACK_COUNTS.instagram,
    linkedin:Number.isFinite(linkedin)?linkedin:FALLBACK_COUNTS.linkedin,
    tiktok:Number.isFinite(tiktok)?tiktok:FALLBACK_COUNTS.tiktok,
    source:{
      facebook:Number.isFinite(meta.facebook)?"api":"fallback",
      instagram:Number.isFinite(meta.instagram)?"api":"fallback",
      linkedin:Number.isFinite(linkedin)?"api":"fallback",
      tiktok:Number.isFinite(tiktok)?"api":"fallback"
    }
  };
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==="GET" && url.pathname==="/api/social-stats"){
      return json(await socialStats(env));
    }
    return app.fetch(request,env,ctx);
  }
};
