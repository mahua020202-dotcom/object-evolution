const ERAS = [
  { year: "1973", title: "电话第一次离开了墙。", description: "早期移动电话笨重、昂贵，而且续航短。但它完成了一件看似简单的事：让人可以在移动中打电话。" },
  { year: "1983 · 1994", title: "它开始变得像一部手机。", description: "蜂窝网络、数字通信和更小的芯片，让移动电话从昂贵的实验逐渐成为真正的个人设备。" },
  { year: "2000", title: "手机开始拥有自己的世界。", description: "彩屏、游戏、音乐、相机。手机不再只是通信工具，功能开始围绕它聚集。" },
  { year: "2007", title: "然后，屏幕变成了入口。", description: "触控、网页、地图、相机、应用。手机开始成为一台真正意义上的掌上电脑。" },
  { year: "2015", title: "更多屏幕，更少边界。", description: "显示、摄影、生物识别和移动支付逐渐融入同一个薄薄的矩形里。" },
  { year: "2026", title: "下一步，是理解。", description: "手机正在从响应指令的工具，变成更主动的个人计算入口。" }
];

const COLLECTIONS = [
  ["🚗", "汽车", "从机械动力到电动与智能化"],
  ["💻", "电脑", "从巨型计算机到个人 AI"],
  ["📷", "相机", "从胶片到计算摄影"],
  ["📺", "电视", "从黑白屏幕到流媒体"],
  ["⌚", "手表", "从计时到腕上计算"]
];

const progressBar = document.getElementById("progress-bar");
const heroPhone = document.getElementById("hero-phone");
const timelineList = document.getElementById("timeline-list");
const collectionGrid = document.getElementById("collection-grid");
const storySections = [...document.querySelectorAll(".story-section")];

function renderTimeline() {
  timelineList.innerHTML = ERAS.map((era, index) => `
    <article class="timeline-item" data-target="${index}">
      <strong>${era.year}</strong>
      <div><h3>${era.title}</h3><p>${era.description}</p></div>
      <em>01 / 0${ERAS.length}</em>
    </article>
  `).join("");

  timelineList.querySelectorAll("[data-target]").forEach((item) => {
    item.addEventListener("click", () => storySections[Number(item.dataset.target)]?.scrollIntoView({ behavior: "smooth" }));
  });
}

function renderCollections() {
  collectionGrid.innerHTML = COLLECTIONS.map(([icon, name, description]) => `
    <article class="collection-card"><span class="icon">${icon}</span><strong>${name}</strong><span>${description}</span></article>
  `).join("");
}

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.width = `${progress * 100}%`;

  const heroProgress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
  heroPhone.style.transform = `rotateY(${-18 + heroProgress * 36}deg) rotateZ(${5 - heroProgress * 12}deg) translateY(${heroProgress * 80}px) scale(${1 - heroProgress * .16})`;

  const viewportCenter = window.innerHeight * .5;
  let active = 0;
  storySections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
    if (distance < Math.abs(storySections[active].getBoundingClientRect().top + storySections[active].getBoundingClientRect().height / 2 - viewportCenter)) active = index;
  });

  document.querySelectorAll(".timeline-item").forEach((item, index) => item.classList.toggle("active", index === active));
}

renderTimeline();
renderCollections();
window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();
