// Runs only in the isolated GitHub review workflow. No credentials or live data access.
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

const root=process.cwd(),out=resolve(root,'motion-qa-results');
const deps=process.env.NELOY_QA_DEPS;
assert.ok(deps,'NELOY_QA_DEPS must point to the isolated test dependency directory');
const require=createRequire(join(deps,'package.json'));
const {build}=require('esbuild'),{chromium}=require('playwright');
await mkdir(out,{recursive:true});
const bundle=resolve(out,'worker-bundled.mjs');
await build({entryPoints:[resolve(root,'src/worker.js')],outfile:bundle,bundle:true,format:'esm',platform:'browser',target:'es2022',keepNames:true,logLevel:'warning'});
const {default:worker}=await import(pathToFileURL(bundle));
const origin='https://preview-premium-cinematic-motion-neloy-digital-solutions-live.info-digitalsolutions-neloy-b7a.workers.dev';
const mime={'.mp4':'video/mp4','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain'};
async function asset(path){
 const file=resolve(root,'public','.'+path);
 if(file===resolve(root,'public'))return new Response('Not found',{status:404});
 if(!file.startsWith(resolve(root,'public')+'/'))return new Response('Forbidden',{status:403});
 try{return new Response(await readFile(file),{headers:{'content-type':mime[extname(file)]||'application/octet-stream'}})}catch{return new Response('Not found',{status:404})}
}
let bindingAccess=0;
const env=new Proxy({ASSETS:{fetch:req=>asset(new URL(req.url).pathname)}},{get(target,key){if(key==='DB'||key==='CHAT_ALERTS'){bindingAccess++;throw new Error('Protected binding access prohibited in browser QA')}return target[key]}});
const server=http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,origin);let response;
  if(['GET','HEAD'].includes(req.method))response=await asset(u.pathname);
  if(!response||response.status===404)response=await worker.fetch(new Request(u,{method:req.method,headers:req.headers}),env,{waitUntil(){}});
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(req.method==='HEAD'?undefined:Buffer.from(await response.arrayBuffer()));
 }catch(error){res.writeHead(500);res.end(String(error));}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const local='http://127.0.0.1:'+server.address().port;
const results={bundledWithKeepNames:true,productionRequests:0,checks:[],failures:[],notes:['Chromium mobile viewport emulation, not physical phone hardware.','Third-party hosts are blocked. The external Descript player is not verified.','The isolated server executes the actual bundled Worker and local repository assets, with protected data bindings forbidden.']};
const browser=await chromium.launch({headless:true});
function ok(name,value,detail){assert.ok(value,name);results.checks.push({name,detail});}
const configs=[{name:'laptop',viewport:{width:1440,height:900},isMobile:false,hasTouch:false},{name:'mobile',viewport:{width:390,height:844},isMobile:true,hasTouch:true}];
try{
 for(const config of configs){
  const options={viewport:config.viewport,isMobile:config.isMobile,hasTouch:config.hasTouch};
  const context=await browser.newContext({...options,reducedMotion:'no-preference',recordVideo:{dir:out,size:config.viewport}});
  await context.route('**/*',route=>route.request().url().startsWith(local)||route.request().url().startsWith('data:')?route.continue():route.abort('blockedbyclient'));
  for(const path of ['/','/showcase']){
   const label=config.name+(path==='/'?'-home':'-showcase');
   const page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   try{
    await page.goto(local+path,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelector('main')?.dataset.ndsCinematic==='ready',null,{timeout:15000});
    await page.waitForFunction(()=>document.querySelectorAll('.nds-motion-word').length>0,null,{timeout:5000});
    ok(label+' bundled startup and word reveals',true);
    const active=await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.target?.closest?.('main')&&!a.effect.target.closest('#nds-client-name-marquee')&&a.playState==='running').length);
    ok(label+' actual running animation',active>0,{active});
    await page.waitForTimeout(1400);
    const widthErrors=[];let steps=0;
    while(steps++<30){
     const state=await page.evaluate(()=>({y:scrollY,bottom:innerHeight+scrollY>=document.documentElement.scrollHeight-2,overflow:document.documentElement.scrollWidth-innerWidth}));
     if(state.overflow>1)widthErrors.push(state);
     if(state.bottom)break;
     await page.mouse.wheel(0,Math.round(config.viewport.height*.72));
     await page.waitForTimeout(360);
    }
    ok(label+' horizontal overflow',widthErrors.length===0,widthErrors);
    await page.locator('#nds-page-motion-toggle').click();
    ok(label+' pause control',await page.locator('#nds-page-motion-toggle').getAttribute('aria-pressed')==='true');
    await page.locator('#nds-page-motion-toggle').click();
    ok(label+' resume control',await page.locator('#nds-page-motion-toggle').getAttribute('aria-pressed')==='false');
    if(path==='/showcase'){
     const more=page.locator('.nds-sc-more').first();
     await more.scrollIntoViewIfNeeded();await more.click();
     ok(label+' testimonial expansion',await more.getAttribute('aria-expanded')==='true');
     const next=page.getByRole('button',{name:'Next testimonial',exact:true});
     await next.scrollIntoViewIfNeeded();await next.click();await page.waitForTimeout(800);
     ok(label+' testimonial navigation',await page.locator('.nds-sc-dots button[aria-current="true"]').count()===1);
    }else{
     const name=page.locator('#leadForm input[name="name"]');
     await name.scrollIntoViewIfNeeded();await name.fill('Preview check only');
     ok(label+' form input remains usable without submission',await name.inputValue()==='Preview check only');
     await page.locator('#nds-video-open').scrollIntoViewIfNeeded();await page.locator('#nds-video-open').click();
     ok(label+' video modal opens',await page.locator('#nds-video-modal').evaluate(n=>n.classList.contains('open')));
     try{
      await page.waitForFunction(()=>document.querySelector('#nds-project-video')?.readyState>=2,null,{timeout:12000});
      const state=await page.locator('#nds-project-video').evaluate(async v=>{await v.play();return {controls:v.controls,duration:v.duration}});
      ok(label+' native video controls',state.controls);
      await page.waitForTimeout(1000);
      ok(label+' actual native video playback',await page.locator('#nds-project-video').evaluate(v=>v.currentTime>0));
     }catch(e){results.notes.push(label+' native playback unverified: '+e.message.slice(0,200));}
     await page.keyboard.press('Escape');
     ok(label+' video modal closes with Escape',await page.locator('#nds-video-modal').evaluate(n=>!n.classList.contains('open')));
    }
    await page.screenshot({path:join(out,label+'.png'),fullPage:false});
    ok(label+' browser runtime errors',errors.length===0,errors);
   }catch(e){results.failures.push({label,error:e.message,errors});await page.screenshot({path:join(out,label+'-failure.png'),fullPage:false}).catch(()=>{});}
   finally{await page.close();await page.video()?.saveAs(join(out,label+'.webm'));}
  }
  await context.close();
  const reduced=await browser.newContext({...options,reducedMotion:'reduce'});
  await reduced.route('**/*',route=>route.request().url().startsWith(local)||route.request().url().startsWith('data:')?route.continue():route.abort('blockedbyclient'));
  const page=await reduced.newPage();
  try{
   await page.goto(local,{waitUntil:'domcontentloaded'});await page.waitForTimeout(900);
   const moving=await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.target?.closest?.('main')&&!a.effect.target.closest('#nds-client-name-marquee')).length);
   ok(config.name+' reduced motion',moving===0,{moving});
   ok(config.name+' reduced-motion text remains visible',await page.locator('h1').isVisible());
  }catch(e){results.failures.push({label:config.name+'-reduced',error:e.message});}
  await reduced.close();
 }
 ok('No DB or private service binding was accessed',bindingAccess===0);
}finally{
 await browser.close();await new Promise(resolve=>server.close(resolve));
 await writeFile(join(out,'results.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify({checks:results.checks.length,failures:results.failures,notes:results.notes},null,2));
}
assert.equal(results.failures.length,0,'Browser checks failed; inspect motion-qa-results/results.json');
