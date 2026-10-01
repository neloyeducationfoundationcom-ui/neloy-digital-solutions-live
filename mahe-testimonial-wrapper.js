import currentWorker from "./whatsapp-lead-prefill-wrapper.js";

const MAHE_PHOTO="data:image/jpeg;base64,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";

const STYLE=`<style id="mahe-testimonial-style">
#mahe-testimonial .mahePhoto{width:96px;height:96px;object-fit:cover;object-position:center center;border-radius:50%;border:3px solid #29dfff;margin:0 auto 14px;display:block}
#mahe-testimonial .maheStars{color:#f4b400;font-weight:900;letter-spacing:2px;margin:8px 0 12px}
#mahe-testimonial .maheScore{color:#496a89;font-size:13px;font-weight:900;margin-left:6px}
</style>`;

const CARD=`<article id="mahe-testimonial" class="testCard" style="text-align:center">
  <img class="mahePhoto" src="${MAHE_PHOTO}" alt="Mahe">
  <h3 style="margin-bottom:4px">Mahe</h3>
  <div style="color:#496a89;font-weight:800;margin-bottom:8px">Agency Website Design Client</div>
  <div class="maheStars">★★★★★<span class="maheScore">5.0 / 5</span></div>
  <p>“Hello Neloy, I was really happy to find you for my agency website design. Thank you for being a lifesaver and trustworthy. Loads of works coming along. Cheers”</p>
</article>`;

function addMahe(html){
  if(html.includes('id="mahe-testimonial"')) return html;

  if(!html.includes('id="mahe-testimonial-style"') && html.includes("</head>")){
    html=html.replace("</head>",STYLE+"</head>");
  }

  const sectionStart=html.search(/<section\b[^>]*\bid=["']testimonials["'][^>]*>/i);
  if(sectionStart!==-1){
    const sectionEnd=html.indexOf("</section>",sectionStart);
    if(sectionEnd!==-1){
      const section=html.slice(sectionStart,sectionEnd);
      const cynthiaAt=section.indexOf("Cynthia Gomez");
      if(cynthiaAt!==-1){
        const closeArticle=section.indexOf("</article>",cynthiaAt);
        if(closeArticle!==-1){
          const insertAt=sectionStart+closeArticle+"</article>".length;
          html=html.slice(0,insertAt)+CARD+html.slice(insertAt);
        }else{
          html=html.slice(0,sectionEnd)+CARD+html.slice(sectionEnd);
        }
      }else{
        html=html.slice(0,sectionEnd)+CARD+html.slice(sectionEnd);
      }
    }
  }

  return html
    .replace(/20\s*out\s*of\s*20/gi,"25 out of 25")
    .replace(/4\s*client\s*testimonials\s*[•·|\-]\s*20\s*stars\s*displayed/gi,"5 client testimonials • 25 stars displayed")
    .replace(/20\s*stars\s*displayed/gi,"25 stars displayed");
}

export default{
  async fetch(request,env,ctx){
    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get("content-type")||"";
    const url=new URL(request.url);

    if(request.method!=="GET" || !response.ok || !type.includes("text/html") || url.pathname.startsWith("/admin")){
      return response;
    }

    const html=addMahe(await response.text());
    const headers=new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control","no-store");

    return new Response(html,{
      status:response.status,
      statusText:response.statusText,
      headers
    });
  }
};
