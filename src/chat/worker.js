import { chatApi } from './api.js';
import { chatClient } from './client.js';
import { INBOX_HTML, inboxClient } from './inbox.js';
import { hardenResponse } from '../security/response-headers.js';
export const CHAT_TAG='<script id="nds-live-chat-script" src="/chat-assets/widget.js" defer></script>';
function secured(content,type,url){const r=new Response(content,{headers:{'content-type':type,'cache-control':'no-store','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",'cross-origin-opener-policy':'same-origin','cross-origin-resource-policy':'same-origin'}});return new Response(r.body,{headers:hardenResponse(r,url)});}
export function withChat(currentWorker){return {async fetch(request,env,ctx){const url=new URL(request.url);if(url.pathname==='/api/chat'||url.pathname.startsWith('/api/chat/')||url.pathname==='/api/chat-inbox'||url.pathname.startsWith('/api/chat-inbox/'))return chatApi(request,env);
if(url.pathname==='/admin/chat')return request.method==='GET'?secured(INBOX_HTML,'text/html; charset=utf-8',url):new Response('Method not allowed',{status:405});
if(url.pathname==='/chat-assets/widget.js'||url.pathname==='/chat-assets/inbox.js'){if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});return secured(request.method==='HEAD'?null:'('+ (url.pathname.endsWith('/widget.js')?chatClient:inboxClient).toString()+')();','application/javascript; charset=utf-8',url);}
const response=await currentWorker.fetch(request,env,ctx);if(request.method!=='GET'||!response.ok||!(response.headers.get('content-type')||'').includes('text/html')||url.pathname.startsWith('/api/'))return response;
if(url.pathname.startsWith('/admin')&&url.pathname!=='/admin')return response;
const html=await response.text();const addition=url.pathname==='/admin'?'<nav id="nds-chat-admin-link" style="padding:12px 20px"><a href="/admin/chat">Open website chat inbox →</a></nav>':CHAT_TAG;
const headers=new Headers(response.headers);headers.delete('content-length');headers.delete('etag');return new Response(html.replace('</body>',addition+'</body>'),{status:response.status,statusText:response.statusText,headers});}};}
