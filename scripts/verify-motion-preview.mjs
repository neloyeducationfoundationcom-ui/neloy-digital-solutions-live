// Real Worker execution in Node; no network requests or production binding access.
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
const preview='https://preview-premium-cinematic-motion-neloy-digital-solutions-live.info-digitalsolutions-neloy-b7a.workers.dev';
const origin='https://neloydigitalsolutions.com';
let touched=0;
const env=new Proxy({}, {get(_,key){if(key==='DB'||key==='CHAT_ALERTS'){touched++;throw new Error('Protected binding accessed')}return undefined}});
let count=0;
for(const [method,path] of [['GET','/api/leads'],['GET','/api/chat-inbox'],['GET','/admin'],['POST','/'],['POST','/api/leads'],['PATCH','/api/leads/1']]){
 const r=await worker.fetch(new Request(preview+path,{method}),env,{});
 assert.equal(r.status,403,method+' '+path);
 assert.match(r.headers.get('x-robots-tag'),/noindex/);count++;
}
assert.equal(touched,0);count++;
for(const path of ['/','/showcase','/website-design','/video-editing']){
 const a=await worker.fetch(new Request(origin+path),env,{});
 const b=await worker.fetch(new Request(preview+path),env,{});
 assert.equal(b.status,200);assert.match(b.headers.get('x-robots-tag'),/noindex/);
 assert.equal(await a.text(),await b.text(),'Preview body differs: '+path);
 assert.match(b.headers.get('content-security-policy'),/connect-src 'self'(?:;|$)/);count++;
}
for(const host of ['neloy-digital-solutions-live.example.workers.dev','unrelated-preview.workers.dev']){
 const r=await worker.fetch(new Request('https://'+host+'/showcase'),env,{});
 assert.equal(r.status,301);assert.equal(r.headers.get('location'),origin+'/showcase');count++;
}
console.log('PASS '+count+' exact-host preview isolation checks; no network or protected binding access');
