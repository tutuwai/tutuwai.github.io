const tasks = {
  table: { title: "Table setting", times: [0, 3.5, 7, 10.5, 14.1, 17.5, 21.1, 24.5, 28.1, 31.6, 35.1, 38.6] },
  basket: { title: "Basket handling", times: [0, 3.4, 6.9, 10.3, 13.7, 17.1, 20.5, 24, 27.4, 30.8, 34.3, 37.7] },
  bell: { title: "Bell pressing", times: [0, 3.5, 6.9, 10.3, 13.8, 17.3, 20.7, 24.1, 27.6, 31.1, 34.5, 37.9] }
};
const canvas = document.querySelector("#sequence");
const context = canvas.getContext("2d");
const frame = document.querySelector("#frame");
const output = document.querySelector("#frame-time");
const choices = document.querySelectorAll("[data-task]");
let current = "table";
let loadedImage;
let pending = 0;

function draw() {
  const i = Number(frame.value);
  const t = tasks[current].times[i].toFixed(1) + " s";
  context.drawImage(loadedImage, (i % 4) * 768, Math.floor(i / 4) * 384, 768, 384, 0, 0, 768, 384);
  canvas.setAttribute("aria-label", tasks[current].title + " at " + t + ", overhead and both wrist views.");
  output.value = t;
  frame.setAttribute("aria-valuetext", t + ", " + tasks[current].title);
}
async function selectTask(id) {
  const request = ++pending;
  const img = new Image();
  img.src = "./assets/project/" + id + "-sequence.webp";
  try {
    await img.decode();
  } catch {
    return;
  }
  if (request !== pending) return;
  current = id;
  loadedImage = img;
  choices.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.task === id)));
  draw();
  canvas.hidden = false;
  document.querySelector("#still").hidden = true;
  document.querySelector("#controls").hidden = false;
}
choices.forEach(button => button.addEventListener("click", () => selectTask(button.dataset.task)));
frame.addEventListener("input", draw);
if (context) selectTask(current);

