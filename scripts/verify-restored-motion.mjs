import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const source=await readFile('src/design/homepage-motion.js');
assert.equal(createHash('sha1').update('blob '+source.length+'\0').update(source).digest('hex'),'bccbf3d4a38847d686e8c89d9c47e7219a8e7ee2');
const require=createRequire(join(process.env.NELOY_QA_DEPS,'package.json')),{chromium}=require('playwright');
const target='https://neloydigitalsolutions.com',out='restore-qa-results';await mkdir(out,{recursive:true});
const results={target,originalMotionSourceExact:true,cases:[],failures:[],notes:['Chromium viewport emulation; physical phone not inspected.','This verifies the restored original motion; media URLs and playback code are unchanged. Native video playback is not tested.','Public read-only browser checks. No forms submitted; APIs/admin, writes and external hosts blocked.']};
for(const path of ['/','/showcase','/website','/video-editing']){
 const r=await fetch(target+path);const text=await r.text();assert.equal(r.status,200);assert.ok(text.includes('id="nds-cinematic-motion-script"'));assert.ok(text.includes('id="nds-homepage-motion-style"'));assert.ok(!text.includes('id="nds-premium-motion-script"'));assert.ok(!/noindex/.test(r.headers.get('x-robots-tag')||''));
}
const browser=await chromium.launch();
for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile,...(mobile?{userAgent:'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'}:{})});
 await context.route('**/*',route=>{const r=route.request(),u=new URL(r.url());return u.protocol==='data:'||(['GET','HEAD'].includes(r.method())&&u.origin===target&&!/^\/(?:api|admin)(?:\/|$)/.test(u.pathname))?route.continue():route.abort()});
 for(const path of ['/','/showcase']){
  const name=(mobile?'android-chrome':'laptop-chrome')+(path==='/'?'-home':'-showcase');const page=await context.newPage(),entry={name,errors:[],samples:[]};page.on('pageerror',e=>entry.errors.push(e.message));
  try{
   await page.goto(target+path,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1300);
   assert.equal(await page.locator('#nds-premium-motion-script').count(),0);
   const selectors=path==='/'?['.nds-laptop','.nds-work-art .nds-art-window','.nds-feedback-photo','.ndsVideoThumb img']:['.gpCard img','.nds-sc-card .avatar'];
   for(const selector of selectors){
    const n=page.locator(selector).first();if(!await n.count()){entry.samples.push({selector,available:false});continue;}
    await n.scrollIntoViewIfNeeded();await page.waitForTimeout(900);
    const sample=()=>n.evaluate(n=>{const s=getComputedStyle(n);return {translate:s.translate,transform:s.transform,scale:s.scale,opacity:s.opacity,overflow:document.documentElement.scrollWidth-innerWidth}});
    const before=await sample();await page.waitForTimeout(650);const after=await sample();entry.samples.push({selector,before,after,moved:JSON.stringify(before)!==JSON.stringify(after)});
    assert.ok(before.overflow<=1&&after.overflow<=1,'Horizontal overflow '+selector);
   }
   assert.ok(entry.samples.some(x=>x.moved),'No computed visual movement observed');
   assert.equal(entry.errors.length,0,'Page runtime errors');await page.screenshot({path:join(out,name+'.png')});
  }catch(e){entry.failure=e.message;results.failures.push({name,error:e.message})}
  await page.close();results.cases.push(entry);
 }
 await context.close();
}
await browser.close();await writeFile(join(out,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));assert.equal(results.failures.length,0);
