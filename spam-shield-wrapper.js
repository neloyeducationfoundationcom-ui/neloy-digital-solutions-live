import app from "./organic-marketing-aeo-wrapper.js";

const LEAD_PATHS = new Set(["/api/leads", "/api/lead"]);
const CHAT_PATH = "/api/chat";

function json(data,status=200){
  return new Response(JSON.stringify(data),{
    status,
    headers:{
      "content-type":"application/json; charset=utf-8",
      "cache-control":"no-store",
      "x-content-type-options":"nosniff"
    }
  });
}

function sameSite(request){
  const target=new URL(request.url);
  const origin=request.headers.get("origin");
  const referer=request.headers.get("referer");
  try{
    if(origin) return new URL(origin).origin===target.origin;
    if(referer) return new URL(referer).origin===target.origin;
  }catch{}
  return false;
}

function hasLinkOrMarkup(value){
  const s=String(value||"");
  return /(?:https?:\/\/|www\.|(?:^|\s)[a-z0-9][a-z0-9-]{1,62}\.(?:com|net|org|io|co|me|xyz|top|site|online|info|biz|click|link|app|dev|ru|cn|tk|ml|ga|cf|ly)(?:\b|\/)|<\s*\/?\s*(?:a|script|iframe|img|object|embed|style|form)\b|javascript\s*:|data\s*:\s*text\/html)/i.test(s);
}

function cleanText(value,max){
  return String(value??"")
    .replace(/[<>]/g," ")
    .replace(/[\u0000-\u001f\u007f]/g," ")
    .replace(/\s{3,}/g,"  ")
    .trim()
    .slice(0,max);
}

async function sha256(text){
  const bytes=new TextEncoder().encode(text);
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function ensureGuardDB(env){
  if(!env.DB) return false;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS web_guard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guard_key TEXT NOT NULL,
    kind TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`).run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_web_guard_lookup ON web_guard(guard_key,kind,created_at)").run();
  return true;
}

async function rateCheck(request,env,kind,shortLimit,longLimit){
  if(!(await ensureGuardDB(env))) return {ok:true};
  const now=Math.floor(Date.now()/1000);
  const ip=request.headers.get("cf-connecting-ip")||"unknown";
  const ua=(request.headers.get("user-agent")||"").slice(0,220);
  const key=await sha256(ip+"|"+ua);

  await env.DB.prepare("DELETE FROM web_guard WHERE created_at < ?").bind(now-172800).run();

  const short=await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM web_guard WHERE guard_key=? AND kind=? AND created_at>=?"
  ).bind(key,kind,now-600).first();

  const long=await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM web_guard WHERE guard_key=? AND kind=? AND created_at>=?"
  ).bind(key,kind,now-86400).first();

  if(Number(short?.n||0)>=shortLimit || Number(long?.n||0)>=longLimit){
    return {ok:false};
  }

  await env.DB.prepare("INSERT INTO web_guard (guard_key,kind,created_at) VALUES (?,?,?)")
    .bind(key,kind,now).run();
  return {ok:true};
}

async function duplicateCheck(env,fingerprint){
  if(!(await ensureGuardDB(env))) return false;
  const now=Math.floor(Date.now()/1000);
  const key=await sha256(fingerprint);
  const row=await env.DB.prepare(
    "SELECT id FROM web_guard WHERE guard_key=? AND kind='lead-content' AND created_at>=? LIMIT 1"
  ).bind(key,now-86400).first();
  if(row) return true;
  await env.DB.prepare("INSERT INTO web_guard (guard_key,kind,created_at) VALUES (?,'lead-content',?)")
    .bind(key,now).run();
  return false;
}

function rebuildJsonRequest(request,body){
  const headers=new Headers(request.headers);
  headers.set("content-type","application/json");
  headers.delete("content-length");
  return new Request(request.url,{
    method:request.method,
    headers,
    body:JSON.stringify(body),
    redirect:request.redirect
  });
}

async function protectLead(request,env,ctx){
  if(request.method==="OPTIONS") return json({error:"Forbidden."},403);
  if(request.method!=="POST") return app.fetch(request,env,ctx);
  if(!sameSite(request)) return json({error:"Blocked by website security."},403);

  const type=(request.headers.get("content-type")||"").toLowerCase();
  if(!type.includes("application/json")) return json({error:"JSON required."},415);

  const len=Number(request.headers.get("content-length")||"0");
  if(Number.isFinite(len)&&len>12000) return json({error:"Submission too large."},413);

  const rate=await rateCheck(request,env,"lead-attempt",3,10);
  if(!rate.ok) return json({error:"Too many submissions. Please try again later."},429);

  let b;
  try{b=await request.json()}catch{return json({error:"Invalid form data."},400)}

  const rawProject=String(b.projectDetails??b.project_details??"");
  const rawRequirements=String(b.requirements??"");
  const rawName=String(b.name??"");
  const rawService=String(b.service??"");

  if([rawProject,rawRequirements,rawName,rawService].some(hasLinkOrMarkup)){
    return json({error:"For security, website links and HTML are not accepted in project enquiries. Please describe your project without a link."},400);
  }

  const safe={
    ...b,
    name:cleanText(b.name,80),
    email:cleanText(b.email,120).toLowerCase(),
    service:cleanText(b.service,80),
    projectDetails:cleanText(b.projectDetails??b.project_details,1600),
    requirements:cleanText(b.requirements,1600)
  };

  if(await duplicateCheck(env,[safe.email,safe.service,safe.projectDetails,safe.requirements].join("|"))){
    return json({ok:true,message:"Your enquiry was already received."},200);
  }

  return app.fetch(rebuildJsonRequest(request,safe),env,ctx);
}

async function protectChat(request,env,ctx){
  if(request.method!=="POST") return app.fetch(request,env,ctx);
  if(!sameSite(request)) return json({error:"Blocked by website security."},403);
  const rate=await rateCheck(request,env,"chat-attempt",20,80);
  if(!rate.ok) return json({error:"Too many messages. Please try again later."},429);

  let b;
  try{b=await request.json()}catch{return json({error:"Invalid request."},400)}
  const message=String(b.message||"");
  if(hasLinkOrMarkup(message)){
    return json({error:"For security, links and HTML are not accepted in website chat."},400);
  }
  return app.fetch(rebuildJsonRequest(request,{...b,message:cleanText(message,700)}),env,ctx);
}

function secureHeaders(response,url){
  const h=new Headers(response.headers);
  h.set("X-Content-Type-Options","nosniff");
  h.set("Referrer-Policy","strict-origin-when-cross-origin");
  h.set("Permissions-Policy","camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  h.set("X-Frame-Options","DENY");
  h.set("Strict-Transport-Security","max-age=31536000; includeSubDomains; preload");
  h.delete("Server");
  h.delete("X-Powered-By");
  if(url.pathname.startsWith("/api/")||url.pathname.startsWith("/admin")){
    h.set("Cache-Control","no-store, no-cache, must-revalidate");
    h.set("X-Robots-Tag","noindex, nofollow, noarchive");
  }
  return h;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    let response;

    if(LEAD_PATHS.has(url.pathname)) response=await protectLead(request,env,ctx);
    else if(url.pathname===CHAT_PATH) response=await protectChat(request,env,ctx);
    else response=await app.fetch(request,env,ctx);

    const headers=secureHeaders(response,url);
    return new Response(response.body,{
      status:response.status,
      statusText:response.statusText,
      headers
    });
  }
};
