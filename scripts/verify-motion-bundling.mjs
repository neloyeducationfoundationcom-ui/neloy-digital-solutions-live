// Exercise emitted inline code after the name-preservation transform used by Worker bundling.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {initCinematicMotion,addCinematicMotion} from '../src/design/cinematic-motion.js';

const original=initCinematicMotion.toString;
// Reproduce an emitted nested-function annotation without using a lexical helper closure.
const bundled=original.call(initCinematicMotion).replace("  if(document.readyState", "  __name(start, 'start');\n  if(document.readyState");
assert.notEqual(bundled,original.call(initCinematicMotion),'Bundler fixture must exercise the helper reference');
const before='('+bundled+')();';
assert.throws(()=>vm.runInNewContext(before,{document:{readyState:'loading',addEventListener(){}}}),/__name is not defined/,'Previous injection must reproduce the startup failure');

try {
 initCinematicMotion.toString=()=>bundled;
 const html=addCinematicMotion('<html><head></head><body><main></main></body></html>');
 const code=html.match(/<script id="nds-premium-motion-script">([\s\S]*?)<\/script>/)[1];
 let registered=0;
 vm.runInNewContext(code,{document:{readyState:'loading',addEventListener(name,fn){assert.equal(name,'DOMContentLoaded');assert.equal(typeof fn,'function');registered++}}});
 assert.equal(registered,1,'Bundled client must register startup');
 // A static page without a main element must also complete startup without throwing.
 vm.runInNewContext(code,{document:{readyState:'complete',querySelector(){return null}}});
} finally {initCinematicMotion.toString=original;}
console.log('PASS deployed-script startup regression: old injection fails on __name; fixed injection runs in both document readiness states');
