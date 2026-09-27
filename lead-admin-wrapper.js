import currentWorker from "./cynthia-wrapper.js";

import { ADMIN_PAGE } from "./src/admin/page.js";

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const auth=(request,env)=>!!env.ADMIN_TOKEN&&request.headers.get('authorization')==='Bearer '+env.ADMIN_TOKEN;
async function ensureDB(env){if(!env.DB)return false;await env.DB.prepare("CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT,created_at TEXT NOT NULL,updated_at TEXT DEFAULT '',name TEXT NOT NULL,email TEXT NOT NULL,service TEXT DEFAULT '',project_details TEXT NOT NULL,requirements TEXT NOT NULL,status TEXT DEFAULT 'New',notes TEXT DEFAULT '')").run();return true}
async function listLeads(request,env){if(!auth(request,env))return json({error:'Unauthorized.'},401);if(!(await ensureDB(env)))return json({error:'D1 binding DB is not connected.'},503);const r=await env.DB.prepare('SELECT * FROM leads ORDER BY id DESC LIMIT 250').all();return json({leads:r.results||[]})}
async function updateLead(request,env,id){if(!auth(request,env))return json({error:'Unauthorized.'},401);if(!(await ensureDB(env)))return json({error:'D1 binding DB is not connected.'},503);let b;try{b=await request.json()}catch{return json({error:'Invalid update.'},400)}const allowed=['New','Contacted','Qualified','Won','Lost'];const status=String(b.status||'').trim();const notes=String(b.notes||'').trim().slice(0,2000);if(!allowed.includes(status))return json({error:'Invalid status.'},400);await env.DB.prepare('UPDATE leads SET status=?,notes=?,updated_at=? WHERE id=?').bind(status,notes,new Date().toISOString(),id).run();return json({ok:true})}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/admin') return new Response(ADMIN_PAGE,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
    if (request.method === 'GET' && url.pathname === '/api/leads') return listLeads(request,env);
    const m=url.pathname.match(/^\/api\/leads\/(\d+)$/);
    if (m && request.method === 'PATCH') return updateLead(request,env,Number(m[1]));
    return currentWorker.fetch(request, env, ctx);
  }
};
