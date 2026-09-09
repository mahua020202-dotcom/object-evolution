const ERAS = [
  { year: "1973", title: "电话第一次<br /><span>离开了墙。</span>", description: "它很重、很贵、很笨拙，但它第一次让电话可以跟着人走。", metric: "1.1 kg", metricLabel: "早期移动电话重量", screen: "DYNATAC", detail: "1973", width: 245, height: 500, radius: 40, angle: -24, rotate: 4, buttons: 1 },
  { year: "1983", title: "它开始<br /><span>变得像一部手机。</span>", description: "商业化蜂窝网络出现，手机从实验设备逐渐变成个人设备。", metric: "800 g", metricLabel: "更轻的移动设备", screen: "MOBILE", detail: "1983", width: 225, height: 470, radius: 36, angle: -12, rotate: 3, buttons: .8 },
  { year: "1994", title: "文字，<br /><span>进入了手机。</span>", description: "数字通信让短信、联系人和更丰富的信息服务开始成为日常体验。", metric: "SMS", metricLabel: "文字通信成为新入口", screen: "HELLO", detail: "1994", width: 205, height: 440, radius: 32, angle: 4, rotate: -2, buttons: .7 },
  { year: "2000", title: "手机开始<br /><span>拥有自己的世界。</span>", description: "彩屏、游戏、音乐和相机，让手机从通信工具变成个人娱乐中心。", metric: "COLOR", metricLabel: "屏幕开始表达更多", screen: "WORLD", detail: "2000", width: 195, height: 425, radius: 30, angle: 12, rotate: 2, buttons: .55 },
  { year: "2007", title: "屏幕，<br /><span>变成了入口。</span>", description: "触控、网页、地图和应用，把手机推向掌上电脑的时代。", metric: "MULTI-TOUCH", metricLabel: "触摸成为主要交互", screen: "APPS", detail: "2007", width: 205, height: 435, radius: 32, angle: -7, rotate: -3, buttons: .2 },
  { year: "2015", title: "更多屏幕，<br /><span>更少边界。</span>", description: "显示、摄影、生物识别和移动支付逐渐融进同一个薄薄的矩形。", metric: "5.5 in", metricLabel: "屏幕成为主要界面", screen: "FULL", detail: "2015", width: 215, height: 450, radius: 34, angle: 8, rotate: 1, buttons: 0 },
  { year: "2026", title: "下一步，<br /><span>是理解。</span>", description: "手机正在从响应指令的工具，变成更主动的个人计算入口。", metric: "AI", metricLabel: "从操作走向意图", screen: "INTENT", detail: "2026", width: 225, height: 465, radius: 38, angle: -2, rotate: 0, buttons: 0 }
];

const COLLECTIONS = [["🚗", "汽车", "从机械动力到电动与智能化"], ["💻", "电脑", "从巨型计算机到个人 AI"], ["📷", "相机", "从胶片到计算摄影"], ["📺", "电视", "从黑白屏幕到流媒体"], ["⌚", "手表", "从计时到腕上计算"]];
const progressBar = document.getElementById("progress-bar");
const heroPhone = document.getElementById("hero-phone");
const timelineList = document.getElementById("timeline-list");
const collectionGrid = document.getElementById("collection-grid");
const storySections = [...document.querySelectorAll(".story-section")];
const evolutionScene = document.getElementById("evolution");
const evolutionPhone = document.getElementById("evolution-phone");
const evolutionScreen = document.querySelector(".evolution-screen");
const evolutionButtons = document.querySelector(".evolution-buttons");
const evolutionBackdrop = document.getElementById("evolution-backdrop");
const evolutionProgress = document.getElementById("evolution-progress");
const evolutionYear = document.getElementById("evolution-year");
const evolutionTitle = document.getElementById("evolution-title");
const evolutionDescription = document.getElementById("evolution-description");
const evolutionMetric = document.getElementById("evolution-metric");
const evolutionMetricLabel = document.getElementById("evolution-metric-label");
const evolutionScreenLabel = document.getElementById("evolution-screen-label");
const evolutionScreenDetail = document.getElementById("evolution-screen-detail");

function renderTimeline() {
  timelineList.innerHTML = ERAS.map((era, index) => `<article class="timeline-item" data-target="${Math.min(index, 5)}"><strong>${era.year}</strong><div><h3>${era.title.replace(/<[^>]+>/g, "")}</h3><p>${era.description}</p></div><em>0${index + 1} / 07</em></article>`).join("");
  timelineList.querySelectorAll("[data-target]").forEach((item) => item.addEventListener("click", () => evolutionScene?.scrollIntoView({ behavior: "smooth" })));
}

function renderCollections() {
  collectionGrid.innerHTML = COLLECTIONS.map(([icon, name, description]) => `<article class="collection-card"><span class="icon">${icon}</span><strong>${name}</strong><span>${description}</span></article>`).join("");
}

function interpolate(a, b, t) { return a + (b - a) * t; }
function clamp(value, min = 0, max = 1) { return Math.min(Math.max(value, min), max); }

function updateEvolution() {
  if (!evolutionScene) return;
  const rect = evolutionScene.getBoundingClientRect();
  const range = evolutionScene.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / Math.max(range, 1));
  const position = progress * (ERAS.length - 1);
  const index = Math.min(Math.floor(position), ERAS.length - 2);
  const local = position - index;
  const from = ERAS[Math.max(index, 0)];
  const to = ERAS[Math.min(index + 1, ERAS.length - 1)];
  const t = local;
  const width = interpolate(from.width, to.width, t);
  const height = interpolate(from.height, to.height, t);
  const radius = interpolate(from.radius, to.radius, t);
  const angle = interpolate(from.angle, to.angle, t);
  const rotate = interpolate(from.rotate, to.rotate, t);
  const buttonOpacity = interpolate(from.buttons, to.buttons, t);
  evolutionPhone.style.width = `${width}px`;
  evolutionPhone.style.height = `${height}px`;
  evolutionPhone.style.borderRadius = `${radius}px`;
  evolutionPhone.style.transform = `rotateY(${angle}deg) rotateZ(${rotate}deg) translateY(${Math.sin(progress * Math.PI) * -22}px)`;
  evolutionButtons.style.opacity = buttonOpacity;
  evolutionButtons.style.transform = `scale(${interpolate(1, .72, 1 - buttonOpacity)})`;
  evolutionProgress.style.width = `${progress * 100}%`;
  evolutionYear.textContent = progress < 1 ? from.year : ERAS.at(-1).year;
  evolutionTitle.innerHTML = t > .55 ? to.title : from.title;
  evolutionDescription.textContent = t > .55 ? to.description : from.description;
  evolutionMetric.textContent = t > .55 ? to.metric : from.metric;
  evolutionMetricLabel.textContent = t > .55 ? to.metricLabel : from.metricLabel;
  evolutionScreenLabel.textContent = t > .55 ? to.screen : from.screen;
  evolutionScreenDetail.textContent = t > .55 ? to.detail : from.detail;
  evolutionScreen.style.background = progress > .83 ? "radial-gradient(circle at 50% 18%,#343f70,#08090b 62%)" : progress > .55 ? "radial-gradient(circle at 50% 18%,#26385c,#08090b 62%)" : "radial-gradient(circle at 50% 18%,#27344b,#08090b 62%)";
  evolutionBackdrop.style.background = progress > .83 ? "radial-gradient(circle at 68% 50%,rgba(91,108,255,.3),transparent 30%),radial-gradient(circle at 20% 60%,rgba(255,255,255,.06),transparent 28%)" : "radial-gradient(circle at 68% 50%,rgba(70,78,100,.24),transparent 30%),radial-gradient(circle at 20% 60%,rgba(255,255,255,.06),transparent 28%)";
}

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.width = `${progress * 100}%`;
  const heroProgress = clamp(window.scrollY / window.innerHeight);
  heroPhone.style.transform = `rotateY(${-18 + heroProgress * 36}deg) rotateZ(${5 - heroProgress * 12}deg) translateY(${heroProgress * 80}px) scale(${1 - heroProgress * .16})`;
  const viewportCenter = window.innerHeight * .5;
  let active = 0;
  storySections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    const activeRect = storySections[active].getBoundingClientRect();
    const activeDistance = Math.abs(activeRect.top + activeRect.height / 2 - viewportCenter);
    if (distance < activeDistance) active = index;
  });
  document.querySelectorAll(".timeline-item").forEach((item, index) => item.classList.toggle("active", index === active));
  updateEvolution();
}

renderTimeline();
renderCollections();
window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();
