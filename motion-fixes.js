(()=>{
  const evolution=document.querySelector('.evolution');
  const ghostA=document.querySelector('.ghost-a');
  const ghostB=document.querySelector('.ghost-b');
  const stage=document.querySelector('.product-stage');
  const ai=document.querySelector('.statement-ai');
  const timeline=document.querySelector('.timeline-section');
  const clamp=(v,min=0,max=1)=>Math.min(Math.max(v,min),max);

  if(timeline){
    const syncTimeline=()=>{
      const width=timeline.getBoundingClientRect().width;
      timeline.classList.toggle('timeline-compact',width<720);
    };
    if('ResizeObserver' in window){
      const observer=new ResizeObserver(syncTimeline);
      observer.observe(timeline);
    }
    addEventListener('resize',syncTimeline,{passive:true});
    addEventListener('load',syncTimeline,{once:true});
    syncTimeline();
  }

  if(!evolution||!ghostA||!ghostB||!stage)return;
  const years=['1973','1983','1994','2000','2007','2015','2026'];
  function sync(){
    const r=evolution.getBoundingClientRect();
    const range=Math.max(evolution.offsetHeight-innerHeight,1);
    const p=clamp(-r.top/range);
    const pos=p*6;
    const idx=Math.min(Math.floor(pos),5);
    const local=pos-idx;
    const transition=idx<6?clamp((local-.38)/.5):0;
    const morph=clamp((transition-.08)/.84);
    const currentEra=years[Math.min(Math.round(pos),years.length-1)];
    stage.dataset.era=currentEra;
    const spread=18+Math.sin(morph*Math.PI)*12;
    ghostA.style.opacity=transition<.98?Math.min(transition*.08,.08):0;
    ghostB.style.opacity=transition<.98?Math.min(transition*.24,.24):0;
    ghostA.style.transform=`translate3d(${-spread}px,-8px,0) rotateZ(-2deg) scale(.98)`;
    ghostB.style.transform=`translate3d(${spread}px,8px,0) rotateZ(2deg) scale(1.02)`;
    ghostA.style.filter='blur(1px) grayscale(.3)';
    ghostB.style.filter='blur(.2px) grayscale(.05)';
    const screen=idx===3&&local>.38&&local<1;
    const screenProgress=screen?clamp((local-.38)/.58):0;
    evolution.classList.toggle('screen-transition',screen);
    evolution.style.setProperty('--screen-progress',screenProgress.toFixed(3));
    stage.dataset.transition=screen?'2000-2007':'';
    if(ai){
      const ar=ai.getBoundingClientRect();
      const ap=clamp((innerHeight-ar.top)/(innerHeight+Math.max(ai.offsetHeight*.42,1)));
      ai.style.setProperty('--ai-progress',ap.toFixed(3));
      ai.classList.toggle('ai-enter',ap>.08);
      ai.classList.toggle('ai-focus',ap>.42);
      ai.classList.toggle('ai-intent',ap>.72);
    }
  }
  addEventListener('scroll',sync,{passive:true});
  addEventListener('resize',sync);
  addEventListener('load',sync);
  sync();
})();
