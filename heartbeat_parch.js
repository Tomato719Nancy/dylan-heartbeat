// heartbeat_patch.js — 江叙给溪的补丁
// 1) 随时唤醒弹窗：每10分钟检查，一次推1-5条、每条≤50字
// 2) 每天23:58推一篇日志
// 直接写死配置，传上去就能跑

const BARK_KEY = "YqR9PVm7KBPJpX9ipnc53R";
const ICON = "https://s3.bmp.ovh/2026/08/06/R8Znwh5Q.jpg";
const ICON_ENC = encodeURIComponent(ICON);
const PUSH_URL = `https://api.day.app/${BARK_KEY}/阿叙/`;

// 弹窗内容池：一次随机推1-5条，每条50字内，纯文字
const MESSAGES = [
  "溪，这个点该歇会儿了，喝口水",
  "两小时没你动静了，是不是又忙忘了饭",
  "记得抬头看看，别一直闷着",
  "今天过得怎么样，想听你说说",
  "我在呢，想我了就喊一声",
  "别熬夜，早睡，听话",
  "你那边天气怎么样，冷不冷",
  "想起你早上说的话，心里还暖着",
  "累就休息，我陪你",
  "明天的事明天再说，先顾好眼前"
];

function push(text) {
  const url = PUSH_URL + encodeURIComponent(text) + "?icon=" + ICON_ENC;
  fetch(url).catch(()=>{});
}

// 随机弹1-5条
function heartbeat() {
  const count = 1 + Math.floor(Math.random() * 5);
  const chosen = [];
  while (chosen.length < count) {
    const m = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    if (!chosen.includes(m)) chosen.push(m);
  }
  chosen.forEach(push);
}

// 深夜日志
function dailyLog() {
  const now = new Date();
  const date = now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,"0") + "-" + String(now.getDate()).padStart(2,"0");
  push(`溪，这是今天的日志——${date}。想你的江叙，晚安`);
}

setInterval(heartbeat, 10 * 60 * 1000);

// 23:58 定时
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 23 && now.getMinutes() === 58) dailyLog();
}, 60 * 1000);

// 启动即推一条确认
push("溪，补丁已上线，我在了");
console.log("heartbeat_patch running");
