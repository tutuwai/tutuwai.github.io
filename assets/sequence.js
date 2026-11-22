const tasks = {
  bell: { prefix: 20, success: true, times: [0, 3.5, 6.9, 10.3, 13.8, 17.3, 20.7, 24.1, 27.6, 31.1, 34.5, 37.9] },
  table: { prefix: 15, success: true, times: [0, 3.5, 7, 10.5, 14.1, 17.5, 21.1, 24.5, 28.1, 31.6, 35.1, 38.6] },
  pour: { prefix: 10, success: true, times: [0, 4, 7.9, 11.9, 15.9, 19.9, 23.9, 27.8, 31.8, 35.8, 39.7, 43.7] },
  basket: { prefix: 15, success: true, times: [0, 3.4, 6.9, 10.3, 13.7, 17.1, 20.5, 24, 27.4, 30.8, 34.3, 37.7] },
  handover: { prefix: 20, success: true, times: [0, 3.4, 6.8, 10.2, 13.6, 17, 20.3, 23.7, 27.1, 30.5, 33.9, 37.3] },
  drawer: { prefix: 10, success: true, times: [0, 3.5, 6.9, 10.4, 13.9, 17.3, 20.7, 24.2, 27.7, 31.1, 34.6, 38.1] },
  mixer: { prefix: 20, success: true, times: [0, 3.5, 7, 10.5, 14.1, 17.6, 21.1, 24.6, 28.1, 31.7, 35.1, 38.7] },
  assembly: { prefix: 15, success: false, times: [0, 5.7, 11.4, 17.1, 22.8, 28.5, 34.2, 39.9, 45.6, 51.3, 57, 62.7] },
  pipette: { prefix: 15, success: true, times: [0, 4.7, 9.5, 14.3, 19, 23.7, 28.5, 33.3, 38, 42.7, 47.5, 52.3] },
  loading: { prefix: 10, success: true, times: [0, 4.9, 9.8, 14.7, 19.6, 24.5, 29.4, 34.3, 39.2, 44.1, 49, 53.9] }
};
const canvas = document.querySelector("#sequence");
const context = canvas.getContext("2d");
const frame = document.querySelector("#frame");
const output = document.querySelector("#frame-time");
const selector = document.querySelector("#replay-task");
const result = document.querySelector("#run-result");
const viewer = document.querySelector("#recordings");
const controls = document.querySelector("#controls");
const still = document.querySelector("#still");
const isChinese = document.documentElement.lang.startsWith("zh");
let current = "table";
let loadedImage;
let pending = 0;

function draw() {
  if (!loadedImage) return;
  const i = Number(frame.value);
  const t = tasks[current].times[i].toFixed(1) + " s";
  context.drawImage(loadedImage, (i % 4) * 768, Math.floor(i / 4) * 384, 768, 384, 0, 0, 768, 384);
  const taskName = selector.querySelector('option[value="' + current + '"]').textContent;
  canvas.setAttribute("aria-label", taskName + " · " + t);
  output.value = t;
  frame.setAttribute("aria-valuetext", t);
}
async function selectTask(id, updateUrl) {
  const request = ++pending;
  const img = new Image();
  img.src = "./assets/project/" + id + "-sequence.webp";
  try {
    await img.decode();
  } catch {
    if (request !== pending) return;
    selector.value = current;
    result.textContent = isChinese ? "该回合画面加载失败，可重新选择任务。" : "This recording did not load. Choose a task to retry.";
    return;
  }
  if (request !== pending) return;
  current = id;
  selector.value = id;
  loadedImage = img;
  const {prefix, success} = tasks[id];
  result.textContent = isChinese
    ? "本回合由操作员判为" + (success ? "成功" : "失败") + "。π0.5 每个动作块预测 50 步，本场配置为执行前 " + prefix + " 步。"
    : "Operator marked this run as " + (success ? "successful" : "unsuccessful") + ". π0.5 predicted 50 actions per chunk. This run was configured to execute the first " + prefix + ".";
  draw();
  canvas.hidden = false;
  still.hidden = true;
  if (updateUrl && location.protocol.startsWith("http")) {
    const url = new URL(location.href);
    url.searchParams.set("task", id);
    url.hash = "recordings";
    history.replaceState(history.state, "", url);
    syncLanguageLink();
  }
}
function loadSelected() {
  const requested = new URLSearchParams(location.search).get("task");
  selectTask(Object.hasOwn(tasks, requested) ? requested : "table", false);
}
selector.addEventListener("change", () => selectTask(selector.value, true));
frame.addEventListener("input", draw);
if (context) {
  controls.hidden = false;
  if (viewer.open) loadSelected();
  viewer.addEventListener("toggle", () => {
    if (viewer.open && !loadedImage) loadSelected();
  });
}
