// Focused runtime checks with simulated DOM/observer/animation APIs.
// These are not browser scrolling, layout, console or video playback tests.
import assert from 'node:assert/strict';
import {initCinematicMotion} from '../src/design/cinematic-motion.js';
const checks=[];
function scenario({reduce=false,compact=false,longHeading=false}={}){
 const observers=[],animations=[],listeners={},mediaListeners={},created=[],frames=[];
 const node=(name,extra={})=>({name,dataset:{},children:[],parentElement:{closest:()=>null},closest:()=>null,contains:()=>false,querySelectorAll:()=>[],append(...kids){this.children.push(...kids)},addEventListener(type,fn){(this.listeners??={})[type]=fn},setAttribute(k,v){(this.attrs??={})[k]=v},animate(k,t){const a={node:this,keyframes:k,timing:t,effect:{target:this},currentTime:null,cancel(){this.cancelled=true;this.oncancel?.()},pause(){this.paused=true}};animations.push(a);return a},...extra});
 let geometryReads=0;
 const owner=node('projectFrame',{top:900,getBoundingClientRect(){geometryReads++;return {top:this.top,height:300}}});
 const art=node('projectArt',{closest:s=>s.includes('#nds-client-name-marquee')?null:owner});
 const img=node('loadedScreenshot',{tagName:'IMG',complete:true,naturalWidth:1200,closest:s=>s.includes('#nds-client-name-marquee')?null:owner});
 const copy=node('copy');const card=node('card');const video=node('videoFrame');const privateText=node('protected',{closest:()=>({})});
 const heading=node('heading',{textContent:longHeading?'long '.repeat(30):'Grow Your Business'});
 const text={textContent:'Grow Your Business',parentElement:{closest:()=>null},replaceWith(fragment){this.fragment=fragment}};
 const main=node('main',{querySelectorAll(selector){if(selector==='h1,h2')return [heading];if(selector.includes('.web-project-image img'))return [img];if(selector.includes('.nds-art-window'))return [art];if(selector.startsWith('.nds-work-card'))return [card,privateText];if(selector.startsWith('.nds-concept-eyebrow'))return [copy,privateText];if(selector.startsWith('.ndsVideoThumb'))return [video];return []},querySelector:()=>null});
 const doc={readyState:'complete',hidden:false,activeElement:node('body'),querySelector:s=>s==='main'?main:node('footer'),createElement(name){const el=node(name);created.push(el);return el},createDocumentFragment:()=>node('fragment'),createTextNode:part=>({textContent:part}),createTreeWalker(){let next=true;return {nextNode(){if(next){next=false;this.currentNode=text;return true}return false}}},addEventListener(type,fn){listeners[type]=fn}};
 const reduced={matches:reduce,addEventListener(type,fn){mediaListeners[type]=fn}};
 class IO{constructor(callback,options){this.callback=callback;this.options=options;this.observed=new Set();observers.push(this)}observe(n){this.observed.add(n)}unobserve(n){this.observed.delete(n)}disconnect(){this.observed.clear()}}
 globalThis.document=doc;globalThis.NodeFilter={SHOW_TEXT:4};globalThis.window={IntersectionObserver:IO,ResizeObserver:undefined,addEventListener(type,fn){listeners[type]=fn}};globalThis.IntersectionObserver=IO;
 globalThis.matchMedia=q=>q.includes('prefers-reduced-motion')?reduced:{matches:compact};globalThis.Element={prototype:{animate(){}}};globalThis.innerHeight=800;
 globalThis.getComputedStyle=()=>({objectFit:'cover'});globalThis.requestAnimationFrame=fn=>{frames.push(fn);return frames.length};globalThis.cancelAnimationFrame=()=>{};
 initCinematicMotion();
 const flush=()=>{const list=frames.splice(0);list.forEach(fn=>fn())};
 const intersect=()=>observers[0].callback([...observers[0].observed].map(target=>({target,isIntersecting:true,boundingClientRect:{top:300,left:0}})));
 return {observers,animations,listeners,reduced,mediaListeners,created,flush,intersect,owner,img,card,copy,video,privateText,main,text,heading,queued:()=>frames.length,reads:()=>geometryReads};
}
function check(name,fn){fn();checks.push({name,passed:true});}
check('Reduced motion creates no entrance or scrub animations',()=>{const s=scenario({reduce:true});assert.equal(s.animations.length,0);assert.equal(s.observers[0].observed.size,0)});
check('Only unprotected content receives entrance animations; no media playback mutations',()=>{const s=scenario();s.intersect();assert.ok(s.animations.some(x=>x.node===s.card));assert.ok(s.animations.some(x=>x.node===s.copy));assert.ok(s.animations.some(x=>x.node===s.video));assert.ok(!s.animations.some(x=>x.node===s.privateText));for(const a of s.animations){assert.equal(a.timing.iterations,undefined);for(const k of a.keyframes){assert.equal(k.clipPath,undefined);assert.equal(k.visibility,undefined)}}});
check('Entrances run once per page load',()=>{const s=scenario();s.intersect();const count=s.animations.length;s.intersect();assert.equal(s.animations.length,count)});
check('Heading words preserve exact text and avoid legacy span styles',()=>{const s=scenario();s.intersect();const words=s.created.filter(n=>n.className==='nds-motion-word');assert.equal(words.length,3);assert.ok(words.every(n=>n.name==='nds-word'));assert.equal(s.text.fragment.children.map(n=>n.textContent).join(''),'Grow Your Business');assert.equal(s.animations.filter(a=>words.includes(a.node)).length,3)});
check('Scroll simulation updates screenshot position; idle creates no animation loop',()=>{const s=scenario();const media=s.observers[1];media.callback([{target:s.owner,isIntersecting:true}]);s.flush();const image=s.animations.find(x=>x.node===s.img);const before=image.currentTime;s.owner.top=200;s.listeners.scroll();s.flush();assert.ok(image.currentTime>before);assert.deepEqual(image.keyframes,[{objectPosition:'50% 0%'},{objectPosition:'50% 100%'}]);assert.equal(image.timing.duration,1000);assert.equal(image.paused,true)});
check('Pause control is independent of the marquee and clears all effects',()=>{const s=scenario();s.intersect();const button=s.created.find(x=>x.id==='nds-page-motion-toggle');button.listeners.click();assert.equal(button.attrs['aria-pressed'],'true');assert.ok(s.animations.every(a=>a.cancelled));assert.equal(s.observers[0].observed.size,0);button.listeners.click();assert.equal(button.attrs['aria-pressed'],'false')});
check('Changing reduced motion at runtime clears effects and scrub tracks',()=>{const s=scenario();s.intersect();s.reduced.matches=true;s.mediaListeners.change();assert.ok(s.animations.every(a=>a.cancelled));assert.equal(s.observers[0].observed.size,0)});
check('Touch/mobile entrance distances and duration are reduced',()=>{const s=scenario({compact:true});s.intersect();const copy=s.animations.find(a=>a.node===s.copy);assert.equal(copy.keyframes[0].translate,'0 12px');assert.equal(copy.timing.duration,624)});
check('Focused cards immediately settle',()=>{const s=scenario();s.intersect();s.card.contains=()=>true;s.main.listeners.focusin({target:s.card});assert.ok(s.animations.find(a=>a.node===s.card).cancelled)});
check('Long headings use one bounded entrance effect',()=>{const s=scenario({longHeading:true});s.intersect();assert.equal(s.created.filter(n=>n.className==='nds-motion-word').length,0);assert.equal(s.animations.filter(a=>a.node===s.heading).length,1)});
check('Offscreen scroll events schedule no animation frames',()=>{const s=scenario();for(let i=0;i<20;i++)s.listeners.scroll();assert.equal(s.queued(),0)});
check('Visible project geometry is read once per frame despite multiple tracked elements',()=>{const s=scenario();s.observers[1].callback([{target:s.owner,isIntersecting:true}]);s.flush();assert.equal(s.reads(),1)});
console.log(JSON.stringify({passed:checks.length,scope:'Simulated DOM APIs only; no real scrolling/layout/playback'},null,2));
