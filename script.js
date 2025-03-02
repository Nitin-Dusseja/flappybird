// import
import Bird from "./bird.js";
import Pipes from "./pipes.js";
import Pipes2 from "./pipe2.js";

// create const variable to store an object of bird also attach with dom element of bird
const bird = new Bird(document.getElementById("bird"));
const pipes = new Pipes(document.getElementById("pipes"));
const pipes2 = new Pipes2(document.getElementById("pipes2"));
const gameStart = document.querySelector(".Game-name");
const gameOver = document.querySelector(".game-over");
const flapAudio = document.querySelector("#flap-audio");
const dieAudio = document.querySelector("#die-audio");
const coinAudio = document.querySelector("#coin-audio");
const restartBtn = document.querySelector(".restart-btn");
const pipeUpOne = document.querySelector(".pipe-up-one");
const pipeDownOne = document.querySelector(".pipe-down-one");
const upheadone = document.querySelector(".uphead-one");
const downheadone = document.querySelector(".downhead-one");
const upheadtwo = document.querySelector(".uphead-two");
const downheadtwo = document.querySelector(".downhead-two");
const pipeUptwo = document.querySelector(".pipe-up-two");
const pipeDowntwo = document.querySelector(".pipe-down-two");
const birdElem = document.querySelector("#bird");
const printScore = document.querySelector(".print-score");
const Score = document.querySelector(".score");
const endScore = document.querySelector(".end-score");
const bush = document.querySelector(".bush");
const bushone = document.querySelector(".bush-one");

let speed = 0.00001;
let score = 0;
let pipePassed = false;
let pause = true;
let state = true;
let bushMove = 0;
let lastRenderTime;

function update(time) {
  if (!state) {
    console.log("Game Over");
    diesound();
    setTimeout(() => {
      gameOver.classList.remove("display-none");
      endScore.innerHTML = score;
    }, 500);
    setTimeout(() => {
      document.addEventListener("keydown", () => {
        location.reload();
      });
    }, 1000);
    return;
  }
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
      Score.classList.remove("display-none");
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") pause = false;
      gameStart.classList.add("display-none");
      Score.classList.remove("display-none");
      return;
    });
  } else {
    state = bird.update(delta, speed);
    bushMove++;
    if (bushMove >= 1200) {
      bushMove = 0;
    }
    bushone.style.left = `-${bushMove / 0.4}px`;
    bush.style.left = `-${bushMove}px`;
    if (!state) pause = true;
    pipePassed = pipes.update(delta, pipeUpOne, pipeDownOne, speed);
    if (pipePassed) {
      pipePassed = false;
      score++;
      coinsound();
      printScore.innerHTML = parseInt(score);
    }
    pipePassed = pipes2.update(delta, speed);
    if (pipePassed) {
      pipePassed = false;
      score++;
      coinsound();
      printScore.innerHTML = parseInt(score);
    }
    speed += 0.00001;
    if (collisiondetection(upheadone, birdElem)) {
      state = false;
    }
    if (collisiondetection(downheadone, birdElem)) {
      state = false;
    }
    if (collisiondetection(upheadtwo, birdElem)) {
      state = false;
    }
    if (collisiondetection(downheadtwo, birdElem)) {
      state = false;
    }
    if (collisiondetection(pipeUpOne, birdElem)) {
      state = false;
    }
    if (collisiondetection(pipeDownOne, birdElem)) {
      state = false;
    }
    if (collisiondetection(pipeUptwo, birdElem)) {
      state = false;
    }
    if (collisiondetection(pipeDowntwo, birdElem)) {
      state = false;
    }
  }
  lastRenderTime = time;
  window.requestAnimationFrame(update);
}

function collisiondetection(pipeUpElem, birdElem) {
  let pipeUp = pipeUpElem.getBoundingClientRect();
  let bird = birdElem.getBoundingClientRect();
  return !(
    pipeUp.top + pipeUp.height < bird.top ||
    pipeUp.top > bird.top + bird.height ||
    pipeUp.left + pipeUp.width < bird.left ||
    pipeUp.left > bird.left + bird.width
  );
}

async function flapsound() {
  await flapAudio.play();
}
async function diesound() {
  await dieAudio.play();
}
function coinsound() {
  coinAudio.play();
}

document.addEventListener("touchstart", () => {
  if (!state) {
    return;
  }
  bird.flap();
  flapsound();
});
document.addEventListener("keydown", (e) => {
  if (!state) {
    return;
  }
  flapsound();
  if (e.code === "Space") bird.flap();
  return;
});

restartBtn.addEventListener("click", () => {
  location.reload();
});
window.requestAnimationFrame(update);
