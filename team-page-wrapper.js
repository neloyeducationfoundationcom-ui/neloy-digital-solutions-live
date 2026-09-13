import currentWorker from "./home-video-wrapper.js";

const TEAM_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Team Members | Neloy Digital Solutions</title>
<meta name="description" content="Meet the creative, development, video and digital marketing team behind Neloy Digital Solutions.">
<style>
:root{--blue:#1477ff;--blue2:#075dff;--cyan:#29dfff;--navy:#082a52;--text:#173451;--muted:#667f97;--line:#d8e9f7;--soft:#f5fbff;--white:#fff}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;background:linear-gradient(180deg,#fff 0%,#f4faff 42%,#eaf6ff 100%);color:var(--text);line-height:1.6}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}.top{position:sticky;top:0;z-index:30;background:#fffffff2;backdrop-filter:blur(14px);border-bottom:1px solid var(--line);box-shadow:0 8px 28px rgba(9,64,112,.07)}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{display:flex;align-items:center;gap:11px;color:var(--navy);text-decoration:none}.mark{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,var(--blue),var(--cyan));color:#fff;font-size:25px;font-weight:1000;box-shadow:0 10px 26px rgba(20,119,255,.28)}.brand strong{display:block}.brand small{display:block;color:var(--blue);letter-spacing:.14em;font-size:9px}.back{color:var(--blue2);text-decoration:none;border:1px solid #bad9f8;background:#f8fcff;border-radius:11px;padding:9px 14px;font-weight:850}.hero{padding:72px 0 34px;background:radial-gradient(circle at 85% 5%,#dcf6ff 0,transparent 31%)}.eyebrow{display:inline-block;padding:7px 11px;border-radius:999px;background:#eaf7ff;border:1px solid #bfe7f8;color:var(--blue2);font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.hero h1{margin:16px 0 12px;color:var(--navy);font-size:clamp(42px,6vw,66px);line-height:1.02;letter-spacing:-.045em}.hero p{max-width:760px;margin:0;color:var(--muted);font-size:18px}.team{padding:28px 0 82px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.card{position:relative;overflow:hidden;background:#fff;border:1px solid var(--line);border-radius:24px;padding:24px 20px 22px;text-align:center;box-shadow:0 18px 48px rgba(8,67,116,.09);transition:transform .2s ease,box-shadow .2s ease}.card:before{content:"";position:absolute;inset:0 0 auto;height:5px;background:linear-gradient(90deg,var(--blue),var(--cyan))}.card:hover{transform:translateY(-5px);box-shadow:0 24px 56px rgba(8,67,116,.14)}.avatar{width:126px;height:126px;margin:4px auto 18px;border-radius:50%;overflow:hidden;border:6px solid #eef8ff;background:#e9f7ff;box-shadow:0 12px 28px rgba(8,74,129,.13)}.avatar svg{display:block;width:100%;height:100%}.card h2{margin:0;color:var(--navy);font-size:22px;line-height:1.2}.role{min-height:52px;margin:8px 0 0;color:var(--blue2);font-weight:850;font-size:14px;line-height:1.45}.teamTag{display:inline-block;margin-top:15px;padding:6px 10px;border-radius:999px;background:#f2f9ff;border:1px solid #d1e8f8;color:#6a839a;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.note{margin:26px auto 0;max-width:760px;padding:18px 20px;border-radius:18px;background:linear-gradient(135deg,#edf8ff,#fff);border:1px solid #cae6f7;text-align:center;color:#56718a}footer{padding:30px 0;background:#082a52;color:#dcecff}footer strong{color:#fff}footer a{color:#7cecff;text-decoration:none;font-weight:800}.foot{display:flex;justify-content:space-between;gap:20px;align-items:center}.footLinks{display:flex;gap:14px;flex-wrap:wrap}
@media(max-width:980px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.nav{align-items:flex-start;padding:12px 0}.brand strong{font-size:14px}.brand small{font-size:8px}.back{font-size:13px;padding:8px 10px}.hero{padding-top:52px}.grid{grid-template-columns:1fr}.card{padding:22px 18px}.role{min-height:0}.foot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
<header class="top"><div class="wrap nav"><a class="brand" href="/"><span class="mark">N</span><span><strong>NELOY DIGITAL SOLUTIONS</strong><small>IDEAS • AUTOMATION • GROWTH</small></span></a><a class="back" href="/">← Back to Home</a></div></header>
<main>
<section class="hero"><div class="wrap"><span class="eyebrow">Our Team</span><h1>Meet the team behind Neloy Digital Solutions</h1><p>Creative specialists, developers, video professionals and digital marketers working together to deliver client projects across design, websites, content and growth.</p></div></section>
<section class="team"><div class="wrap"><div class="grid">

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Yealid"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#dff5ff"/><circle cx="64" cy="52" r="28" fill="#f1bf93"/><path d="M34 49c2-25 17-35 31-35 18 0 30 13 31 34-9-9-19-13-31-13-12 0-22 5-31 14z" fill="#172b46"/><path d="M22 128c4-31 21-46 42-46s38 15 42 46" fill="#1477ff"/><circle cx="54" cy="54" r="2.4" fill="#203148"/><circle cx="75" cy="54" r="2.4" fill="#203148"/><path d="M55 67c7 5 13 5 20 0" fill="none" stroke="#9a5c4e" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Yealid</h2><p class="role">WordPress Front-End Developer &amp; Designer</p><span class="teamTag">Web Development</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Omar"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#e9f1ff"/><circle cx="64" cy="52" r="28" fill="#d99b70"/><path d="M36 48c1-24 13-34 28-34 17 0 29 12 30 33-8-7-18-11-29-11-12 0-21 4-29 12z" fill="#171717"/><path d="M21 128c4-30 22-46 43-46s39 16 43 46" fill="#082a52"/><circle cx="54" cy="54" r="2.4" fill="#2b221e"/><circle cx="75" cy="54" r="2.4" fill="#2b221e"/><path d="M54 66c7 5 14 5 21 0" fill="none" stroke="#8e5748" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Omar</h2><p class="role">Full-Stack &amp; Back-End Developer</p><span class="teamTag">Development</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Mashfiq"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#e6fbf8"/><circle cx="64" cy="52" r="28" fill="#eab182"/><path d="M33 50c3-23 15-36 31-36 19 0 31 14 31 36-8-10-18-14-31-14-12 0-22 5-31 14z" fill="#253248"/><path d="M21 128c5-30 22-46 43-46s38 16 43 46" fill="#00a7a7"/><circle cx="54" cy="54" r="2.4" fill="#283647"/><circle cx="75" cy="54" r="2.4" fill="#283647"/><path d="M55 67c6 4 13 4 19 0" fill="none" stroke="#96584a" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Mashfiq</h2><p class="role">Podcast Video Editor &amp; Creator</p><span class="teamTag">Video &amp; Podcast</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Abiyaz"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#fff1e8"/><circle cx="64" cy="52" r="28" fill="#efbd91"/><path d="M34 49c2-23 14-35 31-35 18 0 30 13 31 35-9-9-20-13-31-13-12 0-23 5-31 13z" fill="#39291e"/><path d="M21 128c4-30 22-46 43-46s39 16 43 46" fill="#ff8a3d"/><circle cx="54" cy="54" r="2.4" fill="#322b25"/><circle cx="75" cy="54" r="2.4" fill="#322b25"/><path d="M55 67c7 4 13 4 20 0" fill="none" stroke="#9a5c4e" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Abiyaz</h2><p class="role">Graphic Designer</p><span class="teamTag">Creative Design</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Female avatar for Raisa"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#fff0f7"/><path d="M34 57c0-28 12-43 31-43 20 0 33 15 33 43v26H31z" fill="#35243b"/><circle cx="64" cy="53" r="27" fill="#efbc91"/><path d="M37 48c4-22 15-34 29-34 17 0 29 13 31 35-9-9-19-13-30-13-12 0-22 4-30 12z" fill="#2f2135"/><path d="M20 128c5-29 22-45 44-45s39 16 44 45" fill="#d94d8f"/><circle cx="54" cy="54" r="2.4" fill="#3a2b35"/><circle cx="75" cy="54" r="2.4" fill="#3a2b35"/><path d="M55 67c7 5 13 5 20 0" fill="none" stroke="#9a5c4e" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Raisa</h2><p class="role">Video Editor</p><span class="teamTag">Video Editing</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Female avatar for Rezwana"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#f2efff"/><path d="M31 61c0-31 13-47 33-47 21 0 34 17 34 47v25H29z" fill="#2d2e5a"/><circle cx="64" cy="53" r="27" fill="#ddb087"/><path d="M37 49c4-22 15-35 29-35 17 0 29 13 31 35-9-9-19-13-30-13-12 0-22 4-30 13z" fill="#22244d"/><path d="M20 128c5-29 22-45 44-45s39 16 44 45" fill="#7567d8"/><circle cx="54" cy="54" r="2.4" fill="#3b342f"/><circle cx="75" cy="54" r="2.4" fill="#3b342f"/><path d="M55 67c7 5 13 5 20 0" fill="none" stroke="#8f594c" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Rezwana</h2><p class="role">Graphic Designer</p><span class="teamTag">Creative Design</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Tanvin"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#eaf8ee"/><circle cx="64" cy="52" r="28" fill="#deb187"/><path d="M35 49c2-23 14-35 30-35 18 0 30 13 31 35-9-8-19-12-31-12-11 0-22 4-30 12z" fill="#202f27"/><path d="M21 128c4-30 22-46 43-46s39 16 43 46" fill="#278f5b"/><circle cx="54" cy="54" r="2.4" fill="#2f332f"/><circle cx="75" cy="54" r="2.4" fill="#2f332f"/><path d="M55 67c7 4 13 4 20 0" fill="none" stroke="#8f594c" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Tanvin</h2><p class="role">Graphic Designer</p><span class="teamTag">Creative Design</span></article>

<article class="card"><div class="avatar" role="img" aria-label="Male avatar for Safwan"><svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="64" fill="#e9f8ff"/><circle cx="64" cy="52" r="28" fill="#e5ad82"/><path d="M34 49c3-24 15-35 31-35 19 0 31 13 31 35-9-9-20-13-31-13-12 0-22 5-31 13z" fill="#1b2c3f"/><path d="M21 128c4-30 22-46 43-46s39 16 43 46" fill="#0b66d5"/><circle cx="54" cy="54" r="2.4" fill="#2c3136"/><circle cx="75" cy="54" r="2.4" fill="#2c3136"/><path d="M55 67c7 5 13 5 20 0" fill="none" stroke="#8f594c" stroke-width="2.5" stroke-linecap="round"/></svg></div><h2>Safwan</h2><p class="role">Head of Digital Marketing</p><span class="teamTag">Digital Marketing</span></article>

</div><div class="note">A multidisciplinary team supporting Neloy Digital Solutions across website development, back-end development, graphic design, video production, podcast content and digital marketing.</div></div></section>
</main>
<footer><div class="wrap foot"><div><strong>Neloy Digital Solutions</strong><br>Ideas • Automation • Growth</div><div class="footLinks"><a href="/">Home</a><a href="/team">Team Members</a></div></div></footer>
</body>
</html>`;

function teamResponse(){
  return new Response(TEAM_HTML,{status:200,headers:{"content-type":"text/html; charset=UTF-8","cache-control":"no-store","x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"SAMEORIGIN"}});
}

function addTeamLinks(html,path){
  if((path==='/'||path==='')&&!html.includes('href="/team"')){
    if(html.includes('<a href="#contact">Contact</a>')) html=html.replace('<a href="#contact">Contact</a>','<a href="/team">Team Members</a><a href="#contact">Contact</a>');
    else if(html.includes('</div></div></header>')) html=html.replace('</div></div></header>','<a href="/team" style="color:#c8daea;text-decoration:none;font-weight:750;font-size:14px">Team Members</a></div></div></header>');
  }
  if(!html.includes('id="nds-team-footer-link"')&&html.includes('</footer>')){
    html=html.replace('</footer>','<div id="nds-team-footer-link" style="margin-top:10px"><a href="/team" style="color:#7cecff;text-decoration:none;font-weight:800">Meet Our Team</a></div></footer>');
  }
  return html;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==='GET'&&(url.pathname==='/team'||url.pathname==='/team/')) return teamResponse();

    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get('content-type')||'';
    if(request.method!=='GET'||!response.ok||!type.includes('text/html')||url.pathname.startsWith('/admin')) return response;

    const html=addTeamLinks(await response.text(),url.pathname);
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
