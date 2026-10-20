import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
const require=createRequire(join(process.env.NELOY_QA_DEPS,'package.json'));
const {chromium,webkit}=require('playwright');
const out='motion-qa-results';await mkdir(out,{recursive:true});
const target=process.env.NELOY_DIAGNOSTIC_TARGET||'https://neloydigitalsolutions.com';
const results={target,cases:[]};
for(const [name,engine,options] of [
 ['chrome-laptop',chromium,{viewport:{width:1440,height:900}}],
 ['chrome-android',chromium,{viewport:{width:390,height:844},isMobile:true,hasTouch:true}],
 ['safari-iphone',webkit,{viewport:{width:390,height:844},isMobile:true,hasTouch:true}],
 ['safari-laptop',webkit,{viewport:{width:1440,height:900}}]
]){
 const browser=await engine.launch();const context=await browser.newContext({...options,recordVideo:{dir:out,size:options.viewport}});
 // Permit ordinary public resources while excluding writes and admin/private API requests.
 await context.route('**/*',route=>{const r=route.request(),u=new URL(r.url());if(!['GET','HEAD'].includes(r.method())||u.pathname.startsWith('/admin')||(u.origin===target&&u.pathname.startsWith('/api/')&&u.pathname!=='/api/social-stats'))return route.abort();return route.continue()});
 const page=await context.newPage(),entry={name,errors:[],consoleErrors:[],samples:[]};
 page.on('pageerror',e=>entry.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')entry.consoleErrors.push(m.text().slice(0,200))});
 async function sample(label){entry.samples.push(await page.evaluate(label=>{const main=document.querySelector('main'),a=document.getAnimations().filter(a=>a.effect?.target?.closest?.('main')&&!a.effect.target.closest('#nds-client-name-marquee'));return {label,y:scrollY,ready:main?.dataset.ndsCinematic,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,hidden:document.hidden,words:document.querySelectorAll('.nds-motion-word').length,running:a.filter(x=>x.playState==='running').length,paused:a.filter(x=>x.playState==='paused').length,overflow:document.documentElement.scrollWidth-innerWidth,heading:document.querySelector('h1')?.innerText,positions:a.slice(0,5).map(a=>({target:a.effect.target.className,time:a.currentTime,style:getComputedStyle(a.effect.target).translate}))}},label))}
 try{
 const response=await page.goto(target,{waitUntil:'domcontentloaded'});entry.status=response.status();entry.headers=await response.allHeaders();entry.finalURL=page.url();
 await page.waitForTimeout(150);await sample('initial-150ms');await page.waitForTimeout(3000);await sample('settled-3s');
 for(let i=0;i<10;i++){if(engine===webkit&&options.isMobile)await page.evaluate(y=>scrollBy({top:y,behavior:'instant'}),options.viewport.height*.72);else await page.mouse.wheel(0,options.viewport.height*.72);await page.waitForTimeout(180);await sample('scroll-down-'+i)}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250);await sample('return-to-top');
 await page.screenshot({path:join(out,name+'-return.png')});
 const h=page.locator('main h2').first();await h.scrollIntoViewIfNeeded();await page.waitForTimeout(180);await sample('revisit-first-heading');
 entry.dom=await page.evaluate(()=>[...document.querySelectorAll('.nds-work-art,.nds-sc-card img,.web-project-image img,.nds-sc-controls,.nds-sc-active')].slice(0,15).map(n=>({tag:n.tagName,class:n.className,fit:getComputedStyle(n).objectFit,width:n.clientWidth,height:n.clientHeight,natural:n.naturalWidth,outer:n.outerHTML.slice(0,900)})));
 }catch(e){entry.error=e.message}
 await page.close();await page.video()?.saveAs(join(out,name+'.webm'));await context.close();await browser.close();results.cases.push(entry);
}
await writeFile(join(out,'diagnostic.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
