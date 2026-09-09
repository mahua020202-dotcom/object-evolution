const ERAS=[
{year:"1973",title:"电话第一次<br /><span>离开了墙。</span>",description:"Martin Cooper 的移动电话原型第一次证明，电话可以真正跟着人走。",stat:"1.1 kg",statLabel:"DynaTAC 原型约重",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Motorola_DynaTAC.jpg",caption:"1973 DYNATAC PROTOTYPE · THE PHONE LEAVES THE WALL",left:"PROTOTYPE / 1G",right:"1973",fit:.94},
{year:"1983",title:"它开始<br /><span>真正进入生活。</span>",description:"DynaTAC 8000X 获得商业认证，移动电话从实验设备走向真正可以购买和携带的个人设备。",stat:"800 g",statLabel:"DynaTAC 8000X 约重",image:"https://commons.wikimedia.org/wiki/Special:FilePath/DynaTAC8000X.jpg",caption:"DYNATAC 8000X · THE BRICK BECOMES MOBILE",left:"CELLULAR / 1G",right:"PORTABLE",fit:.92},
{year:"1994",title:"文字，<br /><span>进入了手机。</span>",description:"IBM Simon 把电话、触控、日程与信息放进同一个设备，手机开始靠近“电脑”。",stat:"TOUCH",statLabel:"手机第一次接近智能终端",image:"https://commons.wikimedia.org/wiki/Special:FilePath/IBM_Simon_Personal_Communicator.png",caption:"IBM SIMON · PHONE MEETS COMPUTER",left:"TOUCH / PDA",right:"1994",fit:.9},
{year:"2000",title:"手机开始<br /><span>拥有自己的世界。</span>",description:"彩屏、短信、游戏、音乐与相机，让手机从通信工具变成个人娱乐中心。",stat:"COLOR",statLabel:"屏幕开始表达更多",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Nokia_3310_grey_front.jpg",caption:"NOKIA 3310 · THE PHONE BECOMES CULTURE",left:"SMS / GAME",right:"PERSONAL",fit:.93},
{year:"2007",title:"屏幕，<br /><span>变成了入口。</span>",description:"触控、网页、地图、相机与应用，把手机推向掌上电脑时代。",stat:"MULTI-TOUCH",statLabel:"交互方式发生变化",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Apple-iPhone-003.jpg",caption:"IPHONE · THE SCREEN BECOMES THE INTERFACE",left:"TOUCH / WEB",right:"2007",fit:1.02},
{year:"2015",title:"更多屏幕，<br /><span>更少边界。</span>",description:"显示、摄影、生物识别和移动支付逐渐融进同一个薄薄的矩形。",stat:"5.0 in",statLabel:"屏幕成为主要界面",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Moto_G_2nd_generation_%28front%29.jpg",caption:"SMARTPHONE · EVERYTHING IN ONE SLAB",left:"CAMERA / PAY",right:"COMPUTE",fit:.98},
{year:"2026",title:"下一步，<br /><span>是理解。</span>",description:"手机正在从响应指令的工具，变成更主动的个人计算入口。语音、视觉、文字与端侧 AI 开始融合。",stat:"AI",statLabel:"从操作走向意图",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Pixel_10_front_%28Obsidian%29.svg",caption:"2026 · AI PHONE / FROM COMMAND TO INTENT",left:"VISION / VOICE",right:"INTENT",fit:.98}
];
const COLLECTIONS=[["01","汽车","从机械动力到电动与智能化"],["02","电脑","从巨型计算机到个人 AI"],["03","相机","从胶片到计算摄影"],["04","电视","从黑白屏幕到流媒体"],["05","手表","从计时到腕上计算"]];
const $=id=>document.getElementById(id),clamp=(v,min=0,max=1)=>Math.min(Math.max(v,min),max),lerp=(a,b,t)=>a+(b-a)*t;
const progressBar=$("progress-bar"),evolution=document.querySelector(".evolution"),productImage=$("product-image"),ghostA=$("ghost-a"),ghostB=$("ghost-b"),stack=$("product-stack"),bg=$("evolution-bg"),eraWatermark=$("era-watermark"),eraIndex=$("era-index"),eraYear=$("era-year"),eraTitle=$("era-title"),eraDescription=$("era-description"),eraStat=$("era-stat"),eraStatLabel=$("era-stat-label"),eraCaption=$("era-caption"),detailLeft=$("detail-left"),detailRight=$("detail-right"),eraProgress=$("era-progress"),explodeLines=$("explode-lines"),dots=$("era-dots");
let lastProgress=0;
ERAS.forEach(({image})=>{const img=new Image();img.decoding="async";img.src=image});
function renderDots(){dots.innerHTML=ERAS.map((e,i)=>`<button type="button" aria-label="跳到 ${e.year}" data-index="${i}"></button>`).join("");dots.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.index;const target=evolution.offsetTop+(evolution.offsetHeight-innerHeight)*(i/(ERAS.length-1));scrollTo({top:target,behavior:"smooth"})}))}
function renderTimeline(){document.getElementById("timeline-list").innerHTML=ERAS.map((e,i)=>`<article class="timeline-item"><strong>${e.year}</strong><div><h3>${e.title.replace(/<[^>]+>/g,"")}</h3><p>${e.description}</p></div><em>0${i+1} / 07</em></article>`).join("")}
function renderCollections(){document.getElementById("collection-grid").innerHTML=COLLECTIONS.map(([i,n,d])=>`<article class="collection-card"><span class="index">${i}</span><strong>${n}</strong><span>${d}</span></article>`).join("")}
function setEra(index,local,global){
  const from=ERAS[index],to=ERAS[Math.min(index+1,ERAS.length-1)];
  const transition=index<ERAS.length-1?clamp((local-.38)/.5):0;
  const changing=index<ERAS.length-1&&local>.68;
  const current=changing?to:from,currentIndex=changing?index+1:index;
  eraIndex.textContent=String(currentIndex+1).padStart(2,"0");eraYear.textContent=current.year;eraWatermark.textContent=current.year;eraTitle.innerHTML=current.title;eraDescription.textContent=current.description;eraStat.textContent=current.stat;eraStatLabel.textContent=current.statLabel;eraCaption.textContent=current.caption;detailLeft.textContent=current.left;detailRight.textContent=current.right;
  const completed=transition>=.98||index===ERAS.length-1;
  if(productImage.dataset.src!==from.image&&productImage.dataset.src!==to.image) productImage.dataset.src=from.image;
  if(index===ERAS.length-1){if(productImage.dataset.src!==to.image){productImage.dataset.src=to.image;productImage.src=to.image}productImage.style.opacity="1"}else if(completed){if(productImage.dataset.src!==to.image){productImage.dataset.src=to.image;productImage.src=to.image}productImage.style.opacity="1"}else{if(productImage.dataset.src!==from.image){productImage.dataset.src=from.image;productImage.src=from.image}productImage.style.opacity=String(1-transition)}
  const spin=Math.sin(global*Math.PI*2.35)*8;
  const localSpin=lerp(-5,5,local);
  const pulse=Math.sin(local*Math.PI);
  const scale=lerp(.9,1.06,pulse*.16+.5)*current.fit;
  const y=Math.sin(global*Math.PI*2)*-18;
  productImage.style.transform=`translate3d(0,${y}px,0) rotateX(${lerp(2,-3,local)}deg) rotateY(${spin}deg) rotateZ(${localSpin}deg) scale(${scale})`;
  productImage.style.filter=`grayscale(.18) contrast(.96) saturate(.9) drop-shadow(${lerp(24,38,scale-.9)}px ${lerp(38,58,scale-.9)}px ${lerp(26,44,scale-.9)}px rgba(0,0,0,.20))`;
  ghostA.src=from.image;ghostB.src=to.image;ghostA.style.opacity=transition*.26;ghostB.style.opacity=transition*.95;
  ghostA.style.transform=`translate3d(${transition*-105}px,${transition*-38}px,0) rotateY(${transition*-20}deg) rotateZ(${transition*-8}deg) scale(${(1+transition*.13)*from.fit})`;
  ghostB.style.transform=`translate3d(${transition*105}px,${transition*46}px,0) rotateY(${transition*20}deg) rotateZ(${transition*8}deg) scale(${(1+transition*.18)*to.fit})`;
  if(completed){ghostA.style.opacity="0";ghostB.style.opacity="0"}
  explodeLines.style.opacity=transition>.05&&transition<.98?Math.min(transition*2.2,1)*.72:0;explodeLines.style.transform=`translateY(-50%) rotate(${global*42}deg) scale(${.7+transition*.45})`;stack.style.transform=`translateY(-50%) scale(${1+pulse*.035})`;
  bg.style.background=current.year==="2026"?"radial-gradient(circle at 72% 48%,rgba(100,113,255,.22) 0,rgba(186,106,255,.10) 23%,#f3f3f1 55%,#e9e9e7 100%)":"radial-gradient(circle at 67% 48%,#fff 0,#f5f5f2 37%,#eeeeec 100%)";
  eraWatermark.style.transform=`translate3d(${Math.sin(global*Math.PI)*20}px,-50%,0) scale(${1+Math.sin(global*Math.PI)*.06})`;eraWatermark.style.opacity=String(.07+Math.sin(local*Math.PI)*.03);dots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",i===currentIndex));lastProgress=global;
}
function update(){const maxScroll=document.documentElement.scrollHeight-innerHeight,pageProgress=maxScroll>0?scrollY/maxScroll:0;progressBar.style.width=`${pageProgress*100}%`;const rect=evolution.getBoundingClientRect(),range=Math.max(evolution.offsetHeight-innerHeight,1),progress=clamp(-rect.top/range),position=progress*(ERAS.length-1),index=Math.min(Math.floor(position),ERAS.length-2),local=position-index;eraProgress.style.width=`${progress*100}%`;setEra(index,local,progress)}
renderDots();renderTimeline();renderCollections();addEventListener("scroll",update,{passive:true});addEventListener("resize",update);addEventListener("load",update);update();
