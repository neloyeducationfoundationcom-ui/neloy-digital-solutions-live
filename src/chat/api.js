import { alertSchema, alertStatement } from './alerts.js';
import { hardenResponse } from '../security/response-headers.js';
export const WELCOME = 'Hi! Thanks for contacting Neloy Digital Solutions. Your enquiry has been saved. You can leave a message here or continue on WhatsApp for a direct conversation. This is an automatic welcome; a team member will reply when available.';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const owner = (r,e) => !!e.ADMIN_TOKEN && r.headers.get('authorization') === 'Bearer '+e.ADMIN_TOKEN;
const digest = async s => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(b=>b.toString(16).padStart(2,'0')).join('');
function json(data,status=200){const r=new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-robots-tag':'noindex, nofollow, noarchive','cross-origin-resource-policy':'same-origin'}});return new Response(r.body,{status,headers:hardenResponse(r,new URL('https://neloydigitalsolutions.com/admin/chat'))});}
// Additive, idempotent D1 setup follows the existing leads module's setup pattern.
// No existing table, secret, binding or account setting is altered.
const ready=new WeakMap();
async function schema(db){if(ready.has(db))return ready.get(db);const p=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS nds_chat_conversations (id TEXT PRIMARY KEY, name TEXT NOT NULL, enquiry TEXT NOT NULL, token_hash TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)'),
 db.prepare('CREATE TABLE IF NOT EXISTS nds_chat_messages (id TEXT PRIMARY KEY, conversation_id TEXT NOT NULL, role TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL)'),
 db.prepare('CREATE INDEX IF NOT EXISTS nds_chat_message_order ON nds_chat_messages(conversation_id,created_at)'),
 db.prepare('CREATE TABLE IF NOT EXISTS nds_chat_rate (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)')
]).catch(e=>{ready.delete(db);throw e;});ready.set(db,p);return p;}
async function rate(db,key,max,seconds){const now=Math.floor(Date.now()/1000);const bucket=Math.floor(now/seconds);const k=key+':'+bucket;await db.prepare('DELETE FROM nds_chat_rate WHERE expires < ?').bind(now).run();const r=await db.prepare('INSERT INTO nds_chat_rate(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(k,now+seconds).first();return r.count<=max;}
async function read(r){if(!(r.headers.get('content-type')||'').includes('application/json'))throw {status:415,message:'JSON required.'};if(Number(r.headers.get('content-length')||0)>12000)throw {status:413,message:'Message too large.'};const reader=r.body?.getReader();if(!reader)throw {status:400,message:'Invalid request.'};let parts=[],size=0;for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>12000){await reader.cancel();throw {status:413,message:'Message too large.'};}parts.push(value);}let bytes=new Uint8Array(size),offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.length;}try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw {status:400,message:'Invalid JSON.'};}}
function text(v,min,max){return typeof v==='string'&&v.trim().length>=min&&v.trim().length<=max?v.trim():null;}
export async function chatApi(request,env){const path=new URL(request.url).pathname;const isOwner=path.startsWith('/api/chat-inbox');const collection=path==='/api/chat'||path==='/api/chat-inbox';const id=path.split('/')[3];if(!collection&&!uuid.test(id||''))return json({error:'Not found.'},404);if(!['GET','POST'].includes(request.method))return json({error:'Method not allowed.'},405);if(request.method==='POST'){const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Forbidden.'},403);if(request.headers.get('sec-fetch-site')==='cross-site')return json({error:'Forbidden.'},403);}if(isOwner&&!owner(request,env))return json({error:'Unauthorized.'},401);if(!env.DB)return json({error:'Chat is unavailable. Please continue on WhatsApp.'},503);
try{
 let body=request.method==='POST'?await read(request):null;
 if(collection&&!isOwner&&request.method==='GET')return json({error:'Not found.'},404);
 if(collection&&!isOwner){const name=text(body?.name,2,80),enquiry=text(body?.enquiry,5,600);if(!name||!enquiry)return json({error:'Enter a name (2–80 characters) and enquiry (5–600 characters).'},400);
 await schema(env.DB);await alertSchema(env.DB);const ip=await digest(request.headers.get('cf-connecting-ip')||'local');if(!await rate(env.DB,'create:'+ip,10,3600))return json({error:'Too many new chats. Please continue on WhatsApp.'},429);
 const token=crypto.randomUUID()+crypto.randomUUID(),cid=crypto.randomUUID(),now=new Date().toISOString();await env.DB.batch([
 env.DB.prepare('INSERT INTO nds_chat_conversations VALUES(?,?,?,?,?,?)').bind(cid,name,enquiry,await digest(token),now,now),
 env.DB.prepare('INSERT INTO nds_chat_messages VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),cid,'assistant',WELCOME,now),
 alertStatement(env.DB,{id:cid,conversationId:cid,kind:'new_chat',name,enquiry,createdAt:now})
 ]);return json({id:cid,token,name,enquiry,messages:[{role:'assistant',body:WELCOME,created_at:now}]},201);}
 await schema(env.DB);await alertSchema(env.DB);
 if(collection){const r=await env.DB.prepare('SELECT id,name,enquiry,created_at,updated_at FROM nds_chat_conversations ORDER BY updated_at DESC LIMIT 100').all();return json({conversations:r.results});}
 const c=await env.DB.prepare('SELECT * FROM nds_chat_conversations WHERE id=?').bind(id).first();if(!c)return json({error:'Chat not found.'},404);
 if(!isOwner){const t=(request.headers.get('authorization')||'').replace(/^Bearer /,'');if(t.length!==72||await digest(t)!==c.token_hash)return json({error:'Unauthorized.'},401);}
 if(request.method==='POST'){const message=text(body?.body,1,1000);if(!message||!uuid.test(body?.id||''))return json({error:'Enter a message of 1–1000 characters.'},400);
 const existing=await env.DB.prepare('SELECT conversation_id,role,body FROM nds_chat_messages WHERE id=?').bind(body.id).first();const role=isOwner?'owner':'visitor';if(existing&&(existing.conversation_id!==id||existing.role!==role||existing.body!==message))return json({error:'Message ID conflict.'},409);
 if(!existing){if(!await rate(env.DB,'message:'+id,30,60))return json({error:'Please wait a minute before sending more messages.'},429);const count=await env.DB.prepare('SELECT COUNT(*) AS n FROM nds_chat_messages WHERE conversation_id=?').bind(id).first();if(count.n>=500)return json({error:'Please continue this conversation on WhatsApp.'},409);const now=new Date().toISOString();await env.DB.batch([env.DB.prepare('INSERT OR IGNORE INTO nds_chat_messages VALUES(?,?,?,?,?)').bind(body.id,id,role,message,now),env.DB.prepare('UPDATE nds_chat_conversations SET updated_at=? WHERE id=?').bind(now,id),...(!isOwner?[alertStatement(env.DB,{id:body.id,conversationId:id,kind:'visitor_message',name:c.name,enquiry:c.enquiry,message,createdAt:now})]:[])]);}}
 const r=await env.DB.prepare('SELECT id,role,body,created_at FROM nds_chat_messages WHERE conversation_id=? ORDER BY created_at,id LIMIT 500').bind(id).all();return json({id:c.id,name:c.name,enquiry:c.enquiry,messages:r.results});
 }catch(e){return json({error:e.status?e.message:'Chat is temporarily unavailable. Please continue on WhatsApp.'},e.status||503);}
}
