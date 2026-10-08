// Local checks only: no production lead writes or authenticated data reads.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {writeFile, unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import after from '../src/worker.js';
import {articles, BLOG_ORIGIN, publishedArticles} from '../src/blog/articles.js';
import {appendBlogSitemap, renderBlog} from '../src/blog/pages.js';
const baselineRef = process.argv[2] || '3a92d1decdce727f3aac2ce8b398ca18da9dcc06';
const baselineFile = new URL('../blog-baseline-verify.tmp.mjs',import.meta.url);
await writeFile(baselineFile,execFileSync('git',['show',`${baselineRef}:premium-site-wrapper.js`]));
const {default:before} = await import(baselineFile.href);
const request = (path, options={}) => new Request(BLOG_ORIGIN+path,options);
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
async function result(worker,path,options={},env={}) {
  const r = await worker.fetch(request(path,options),env,{});
  return {status:r.status,headers:[...r.headers].sort(),body:digest(Buffer.from(await r.arrayBuffer()))};
}
const paths=['/','/showcase','/portfolio','/logo-design','/website-design','/social-media-design','/video-editing','/digital-marketing','/team','/terms','/terms/','/website','/website/','/web-design-bangladesh','/web-design-bangladesh/','/robots.txt','/llms.txt','/admin','/privacy','/privacy/','/missing-page','/.env'];
try {
  for(const path of paths) assert.deepEqual(await result(after,path),await result(before,path),path);
  console.log(`PASS ${paths.length} unchanged routes: full headers, status and body SHA-256`);
  for(const [path, options] of [
    ['/api/leads',{}],['/api/leads',{method:'OPTIONS'}],['/api/leads/1',{method:'PATCH',headers:{'content-type':'application/json'},body:'{}'}],
    ['/api/leads',{method:'POST',headers:{origin:'https://another.example','content-type':'application/json'},body:'{}'}],
    ['/api/leads',{method:'POST',headers:{origin:BLOG_ORIGIN,'content-type':'text/plain'},body:'{}'}],
    ['/api/chat',{method:'POST',headers:{origin:BLOG_ORIGIN,'content-type':'application/json'},body:JSON.stringify({message:'website'})}]
  ]) assert.deepEqual(await result(after,path,options),await result(before,path,options),path);
  console.log('PASS API authentication, preflight, cross-origin, content type and chat regression comparisons');
  // Isolated DB double verifies the successful lead write path in each Worker.
  function mockDB(){const writes=[];return {writes,prepare(sql){let params=[];return {bind(...args){params=args;return this},async first(){return /COUNT/.test(sql)?{n:0}:null},async all(){return {results:[]}},async run(){writes.push({sql,params});return {success:true}}}}}}
  const body=JSON.stringify({name:'Local test',email:'test@example.test',service:'Web Design',projectDetails:'Local project sample',requirements:'Local requirements sample'});
  const options={method:'POST',headers:{origin:BLOG_ORIGIN,'content-type':'application/json'},body};
  const oldDB=mockDB(),newDB=mockDB();
  assert.deepEqual(await result(after,'/api/leads',options,{DB:newDB}),await result(before,'/api/leads',options,{DB:oldDB}));
  assert.deepEqual(newDB.writes.map(x=>x.sql),oldDB.writes.map(x=>x.sql));
  assert.ok(newDB.writes.some(x=>x.sql.startsWith('INSERT INTO leads')));
  console.log('PASS valid form submission with isolated DB double (no production records)');
  const oldXML=await (await before.fetch(request('/sitemap.xml'),{},{})).text();
  const newResponse=await after.fetch(request('/sitemap.xml'),{},{});
  const newXML=await newResponse.text();
  const oldEntries=[...oldXML.matchAll(/<url>[\s\S]*?<\/url>/g)].map(x=>x[0]);
  for(const entry of oldEntries) assert.ok(newXML.includes(entry),'existing sitemap entry changed');
  const locs=[...newXML.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  assert.equal(new Set(locs).size,locs.length);
  assert.equal(locs.length,oldEntries.length+publishedArticles().length+1);
  assert.equal(appendBlogSitemap(newXML),newXML);
  assert.match(newXML,/<video:video>/);
  console.log(`PASS sitemap: ${oldEntries.length} original entries intact; ${locs.length} URLs total; idempotent additions`);
  for(const a of publishedArticles()) {
    assert.match(a.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(Date.parse(a.dateModified)>=Date.parse(a.datePublished));
    assert.equal(new Set(a.sections.map(s=>s.id)).size,a.sections.length);
    const r=await after.fetch(request('/blog/'+a.slug),{},{});assert.equal(r.status,200);
    const html=await r.text();assert.equal((html.match(/<h1>/g)||[]).length,1);
    assert.ok(html.includes(`<link rel="canonical" href="${a.canonicalURL}">`));
    assert.ok(!html.includes('workers.dev'));assert.ok(!/adsbygoogle|googlesyndication|ad-placeholder/i.test(html));
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const post=schema['@graph'].find(s=>s['@type']==='BlogPosting');
    assert.equal(post.headline,a.title);assert.equal(post.url,a.canonicalURL);assert.equal(post.datePublished,a.datePublished);
    const crumbs=schema['@graph'].find(s=>s['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.length,3);
    assert.match(r.headers.get('content-security-policy'),/frame-ancestors 'none'/);
    const head=await after.fetch(request('/blog/'+a.slug,{method:'HEAD'}),{},{});assert.equal(head.status,200);assert.equal(await head.text(),'');
  }
  assert.equal(renderBlog('/blog/unknown').status,404);
  const missing=await after.fetch(request('/blog/unknown'),{},{});assert.equal(missing.status,404);assert.match(missing.headers.get('x-robots-tag'),/noindex/);
  const method=await after.fetch(request('/blog',{method:'POST'}),{},{});assert.equal(method.status,405);
  const redirect=await after.fetch(new Request('https://example.workers.dev/blog'),{},{});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),BLOG_ORIGIN+'/blog');
  // Future/draft articles do not leak into the index, route handler or sitemap.
  articles.push({...articles[0],slug:'unpublished-draft',published:false});
  assert.equal(renderBlog('/blog/unpublished-draft').status,404);
  assert.ok(!appendBlogSitemap(oldXML).includes('unpublished-draft'));articles.pop();
  assert.equal(publishedArticles(Date.parse('2026-10-07T00:00:00Z')).length,0);
  console.log('PASS article schema, canonical, main-domain links, HEAD, 404, draft/future visibility and Worker-host redirect');
} finally {await unlink(baselineFile)}
