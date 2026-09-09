const COLLECTIONS = [
  {
    name: "手机",
    icon: "📱",
    eras: [
      { year: "1973", title: "移动通信的早期形态", subtitle: "手机还很大，但人类第一次真正把电话带到了户外。", icon: "📻", facts: ["早期移动电话体积巨大，主要用于语音通信。", "蜂窝移动通信让电话开始摆脱固定线路。", "昂贵、笨重与续航有限，是早期手机的典型特征。"] },
      { year: "1983", title: "第一代商用手机", subtitle: "移动电话从实验室走向普通商业通信。", icon: "📱", facts: ["模拟蜂窝网络进入商业化阶段。", "移动通信开始形成更成熟的个人设备形态。", "价格、重量、续航仍然限制着普及速度。"] },
      { year: "1994", title: "数字手机", subtitle: "手机从模拟信号迈入数字通信时代。", icon: "☎️", facts: ["数字网络提高了容量，也带来更丰富的通信服务。", "短信逐渐成为手机的重要功能。", "芯片与电池技术推动机身持续缩小。"] },
      { year: "2000", title: "功能手机", subtitle: "手机不再只是电话，而开始拥有自己的功能生态。", icon: "⌨️", facts: ["彩屏、铃声、通讯录和游戏逐渐成为日常体验。", "拍照、音乐等能力进入越来越多手机。", "实体键盘成为这一时期的代表性交互方式。"] },
      { year: "2007", title: "触屏智能手机", subtitle: "手机开始变成一台真正意义上的掌上电脑。", icon: "✨", facts: ["多点触控重新定义了人与手机的交互。", "应用生态让第三方软件成为手机体验的重要组成。", "网页、地图、音乐、相机等能力被集中到一个设备。"] },
      { year: "2015", title: "全面屏时代", subtitle: "屏幕成为手机最重要的空间。", icon: "▣", facts: ["窄边框让更大的显示区域进入相对紧凑的机身。", "移动支付与生物识别逐渐融入日常生活。", "计算摄影让手机拍照能力快速提升。"] },
      { year: "2026", title: "AI 手机", subtitle: "手机正在从响应指令的工具，变成更主动的计算入口。", icon: "✦", facts: ["端侧 AI 可以承担越来越多的个人任务。", "语音、视觉与文字能力正在融合。", "未来的手机可能更像一个理解环境与意图的个人计算伙伴。"] }
    ]
  },
  { name: "汽车", icon: "🚗", eras: [{ year: "COMING", title: "即将开放", subtitle: "下一件进入博物馆的物品。", icon: "🚗", facts: ["从早期机械交通工具，到电动化与智能化。", "未来将加入完整时间轴。", "敬请期待。"] }] },
  { name: "电脑", icon: "💻", eras: [{ year: "COMING", title: "即将开放", subtitle: "从巨型计算机到个人电脑，再到 AI 计算。", icon: "💻", facts: ["未来将加入完整时间轴。", "记录硬件、交互与计算方式的变化。", "敬请期待。"] }] },
  { name: "相机", icon: "📷", eras: [{ year: "COMING", title: "即将开放", subtitle: "从胶片、数码，到计算摄影。", icon: "📷", facts: ["未来将加入完整时间轴。", "记录影像技术如何改变人类记录世界的方式。", "敬请期待。"] }] },
  { name: "电视", icon: "📺", eras: [{ year: "COMING", title: "即将开放", subtitle: "从黑白电视到流媒体大屏。", icon: "📺", facts: ["未来将加入完整时间轴。", "记录屏幕、内容与观看方式的变化。", "敬请期待。"] }] },
  { name: "手表", icon: "⌚", eras: [{ year: "COMING", title: "即将开放", subtitle: "从计时工具到腕上计算机。", icon: "⌚", facts: ["未来将加入完整时间轴。", "记录机械、石英与智能穿戴的演化。", "敬请期待。"] }] }
];

let collectionIndex = 0;
let eraIndex = 0;

const $ = (id) => document.getElementById(id);
const objectTitle = $("object-title");
const collectionCount = $("collection-count");
const objectTabs = $("object-tabs");
const timelinePoints = $("timeline-points");
const timelineProgress = $("timeline-progress");
const visual = $("visual");
const symbol = $("object-symbol");
const visualYear = $("visual-year");
const stageIndex = $("stage-index");
const stageTitle = $("stage-title");
const stageSubtitle = $("stage-subtitle");
const facts = $("stage-facts");
const previous = $("previous");
const next = $("next");

function currentCollection() {
  return COLLECTIONS[collectionIndex];
}

function renderTabs() {
  objectTabs.innerHTML = COLLECTIONS.map((collection, index) => `
    <button class="object-tab ${index === collectionIndex ? "active" : ""}" type="button" data-collection="${index}">
      ${collection.icon} ${collection.name}
    </button>
  `).join("");

  objectTabs.querySelectorAll("[data-collection]").forEach((button) => {
    button.addEventListener("click", () => {
      collectionIndex = Number(button.dataset.collection);
      eraIndex = 0;
      render();
    });
  });
}

function renderTimeline() {
  const eras = currentCollection().eras;
  timelinePoints.innerHTML = eras.map((era, index) => `
    <button class="timeline-point ${index === eraIndex ? "active" : ""}" type="button" data-era="${index}" aria-label="查看 ${era.year} ${era.title}">
      <span class="timeline-dot"></span>
      <span class="timeline-year">${era.year}</span>
    </button>
  `).join("");

  timelinePoints.querySelectorAll("[data-era]").forEach((button) => {
    button.addEventListener("click", () => {
      eraIndex = Number(button.dataset.era);
      render();
    });
  });
}

function renderStage() {
  const collection = currentCollection();
  const era = collection.eras[eraIndex];
  const total = collection.eras.length;
  const progress = total <= 1 ? 0 : (eraIndex / (total - 1)) * 100;

  objectTitle.textContent = collection.name;
  collectionCount.textContent = `${String(collectionIndex + 1).padStart(2, "0")} / ${String(COLLECTIONS.length).padStart(2, "0")}`;
  symbol.textContent = era.icon;
  visualYear.textContent = era.year;
  stageIndex.textContent = `STAGE ${String(eraIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  stageTitle.textContent = era.title;
  stageSubtitle.textContent = era.subtitle;
  facts.innerHTML = era.facts.map((fact) => `<li>${fact}</li>`).join("");
  timelineProgress.style.width = `${progress}%`;
  previous.disabled = eraIndex === 0;
  next.disabled = eraIndex === total - 1;

  visual.style.setProperty("--accent", eraIndex === 0 ? "#7c8cff" : "#9aa3ff");
}

function render() {
  renderTabs();
  renderTimeline();
  renderStage();
}

previous.addEventListener("click", () => {
  if (eraIndex > 0) {
    eraIndex -= 1;
    render();
  }
});

next.addEventListener("click", () => {
  if (eraIndex < currentCollection().eras.length - 1) {
    eraIndex += 1;
    render();
  }
});

render();
