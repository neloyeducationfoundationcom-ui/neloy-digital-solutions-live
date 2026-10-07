// Showcase presentation only. Move existing genuine content; never manufacture reviews.
const SHOWCASE_TESTIMONIAL_SCRIPT = `<script id="nds-showcase-testimonials-script">
(function(){
 function enhance(){
  const section=document.querySelector('.nds-premium-showcase #testimonials');
  if(!section||section.classList.contains('nds-showcase-testimonials'))return;
  const grid=section.querySelector('.testGrid');
  const cards=[...section.querySelectorAll('.testCard,#dinesh-testimonial-fixed,#el-patron-marketing-testimonial')];
  if(!grid||cards.length!==5)return;
  // Validate before moving any nodes; incomplete cards retain their original layout.
  const parts=cards.map(function(card){
   const photo=card.querySelector('img'),name=card.querySelector('h3,.name'),quote=card.querySelector('p'),
    role=card.querySelector('small,.role')||(card.id==='mahe-testimonial'?card.querySelector('h3+div'):null),
    stars=card.querySelector('.stars'),rating=card.querySelector('.reviewStars,.maheStars')||(stars?stars.parentElement:null),
    score=rating?rating.querySelector('.score,.ratingText,.maheScore'):null,
    starText=rating?[...rating.childNodes].find(function(n){return n.nodeType===3&&n.textContent.includes('★');}):null;
   return {photo,name,quote,role,rating,score,stars,starText};
  });
  if(parts.some(function(p){return !p.photo||!p.name||!p.quote||!p.role||!p.rating||!p.score||(!p.stars&&!p.starText);}))return;
  section.classList.add('nds-showcase-testimonials');
  cards.forEach(function(card,index){
   const {photo,name,quote,role,rating,score,starText}=parts[index];
   let stars=parts[index].stars;
   if(!stars){stars=document.createElement('span');starText.replaceWith(stars);stars.append(starText);}
   stars.classList.add('nds-sc-stars');score.classList.add('nds-sc-score');
   const header=document.createElement('div'),identity=document.createElement('div');
   header.className='nds-sc-person';identity.className='nds-sc-identity';
   if(role)role.remove();
   header.append(photo,identity);identity.append(name);if(role)identity.append(role);
   rating.classList.add('nds-sc-rating');quote.classList.add('nds-sc-quote');quote.id='nds-sc-quote-'+index;
   card.replaceChildren(header,rating,quote);
   card.classList.add('nds-sc-card');card.setAttribute('aria-label',name.textContent.trim());
   const mark=document.createElement('span');mark.className='nds-sc-quotation';mark.textContent='“';mark.setAttribute('aria-hidden','true');card.append(mark);
   const button=document.createElement('button');button.type='button';button.className='nds-sc-more';button.textContent='Read more →';
   button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',quote.id);
   button.setAttribute('aria-label','Read more: '+name.textContent.trim());
   button.addEventListener('click',function(){const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));quote.classList.toggle('nds-sc-expanded',expanded);button.textContent=expanded?'Read less ↑':'Read more →';});
   card.append(button);grid.append(card);
  });
  const controls=document.createElement('div');controls.className='nds-sc-controls';
  const prev=document.createElement('button'),next=document.createElement('button'),dots=document.createElement('div');
  prev.type=next.type='button';prev.textContent='←';next.textContent='→';prev.setAttribute('aria-label','Previous testimonial');next.setAttribute('aria-label','Next testimonial');dots.className='nds-sc-dots';
  let active=0;const buttons=[];
  function update(index){active=index;cards.forEach(function(card,i){card.classList.toggle('nds-sc-active',i===index);});buttons.forEach(function(b,i){b.setAttribute('aria-current',i===index?'true':'false');});}
  function go(index){index=(index+cards.length)%cards.length;update(index);if(matchMedia('(max-width:760px)').matches)grid.scrollTo({left:cards[index].offsetLeft-grid.offsetLeft,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});else {cards[index].scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});const more=cards[index].querySelector('.nds-sc-more');if(more)more.focus({preventScroll:true});}}
  cards.forEach(function(card,i){const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Show testimonial '+(i+1)+': '+card.getAttribute('aria-label'));dot.addEventListener('click',function(){go(i);});buttons.push(dot);dots.append(dot);});
  prev.addEventListener('click',function(){go(active-1);});next.addEventListener('click',function(){go(active+1);});
  grid.addEventListener('scroll',function(){if(!matchMedia('(max-width:760px)').matches)return;let nearest=0;cards.forEach(function(c,i){if(Math.abs(c.offsetLeft-grid.offsetLeft-grid.scrollLeft)<Math.abs(cards[nearest].offsetLeft-grid.offsetLeft-grid.scrollLeft))nearest=i;});update(nearest);},{passive:true});
  controls.append(prev,dots,next);grid.after(controls);update(0);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});else enhance();
})();
</script>`;

export function upgradeShowcaseTestimonials(html) {
 if(html.includes('id="nds-showcase-testimonials-script"'))return html;
 return html.replace('</body>',SHOWCASE_TESTIMONIAL_SCRIPT+'</body>');
}
