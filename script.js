// import
import Bird from "./bird.js";
import Pipes from "./pipes.js";
import Pipes2 from "./pipe2.js";

// create const variable to store an object of bird also attach with dom element of bird
const bird = new Bird(document.getElementById("bird"));
const pipes = new Pipes(document.getElementById("pipes"));
const pipes2 = new Pipes2(document.getElementById("pipes2"));
const gameStart = document.querySelector(".Game-name");
const pipeUpOne = document.querySelector(".pipe-up-one");
const pipeDownOne = document.querySelector(".pipe-down-one");

let pause = true;
let state = true;
let lastRenderTime;
function update(time) {
  if (lastRenderTime == null) {
    lastRenderTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastRenderTime;

  if (pause) {
    document.addEventListener("touchstart", () => {
      pause = false;
      gameStart.classList.add("display-none");
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") pause = false;
      gameStart.classList.add("display-none");
      return;
    });
  } else {
    state = bird.update(delta);
    if (!state) pause = true;
    pipes.update(delta, pipeUpOne, pipeDownOne);
    pipes2.update(delta);
  }
  lastRenderTime = time;
  window.requestAnimationFrame(update);
}

document.addEventListener("touchstart", () => {
  bird.flap();
});
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") bird.flap();
  return;
});

window.requestAnimationFrame(update);
