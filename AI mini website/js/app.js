const header=document.getElementById("header");
const menuToggle=document.getElementById("menuToggle");
menuToggle?.addEventListener("click",()=>header.classList.toggle("menu-open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>header.classList.remove("menu-open")));
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>30));

/* Framer Motion ecosystem: Motion for vanilla JS. This keeps the page static/fast while
   using the same animation engine family. The script is loaded only after the page. */
(async()=>{
  try{
    const {animate,inView} = await import("https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm");
    document.querySelectorAll(".reveal").forEach((el,i)=>{
      el.style.opacity="0";el.style.transform="translateY(20px)";
      setTimeout(()=>animate(el,{opacity:1,transform:"translateY(0)"},{duration:.65,delay:i*.06,easing:"ease-out"}),120);
    });
    document.querySelectorAll(".service-card,.testimonial,.process-step,.faq-item").forEach(el=>{
      inView(el,()=>animate(el,{opacity:1,transform:"translateY(0)"},{duration:.55,easing:"ease-out"}));
      el.style.opacity="0";el.style.transform="translateY(18px)";
    });
  }catch(e){document.querySelectorAll(".reveal").forEach(el=>{el.style.opacity=1})}
})();

/* Premium 3D tilt interaction */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-3px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

/* Magnetic buttons */
document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("pointermove",e=>{
    const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener("pointerleave",()=>btn.style.transform="");
});

/* FAQ accordion */
document.querySelectorAll(".faq-item button").forEach(btn=>btn.addEventListener("click",()=>{
  const item=btn.parentElement;
  document.querySelectorAll(".faq-item").forEach(x=>{if(x!==item)x.classList.remove("open")});
  item.classList.toggle("open");
}));

/* Count-up metrics */
const metrics=document.querySelectorAll("[data-count]");
const metricObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target,n=Number(el.dataset.count),isRoi=n===3;
    let start=0;const duration=900,startTime=performance.now();
    function tick(t){const p=Math.min((t-startTime)/duration,1),v=Math.round((1-Math.pow(1-p,3))*n);el.textContent=isRoi?v.toFixed(1)+"×":v+"%";if(p<1)requestAnimationFrame(tick)}
    requestAnimationFrame(tick);metricObserver.unobserve(el);
  })
},{threshold:.6});metrics.forEach(m=>metricObserver.observe(m));

/* Small pointer-parallax on hero visual */
const visual=document.querySelector(".hero-visual");
visual?.addEventListener("pointermove",e=>{
  const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  visual.style.transform=`perspective(1000px) rotateY(${x*3}deg) rotateX(${y*-3}deg)`;
});
visual?.addEventListener("pointerleave",()=>visual.style.transform="");
