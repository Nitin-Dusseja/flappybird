export default class pipes {
  constructor(PipesElem) {
    this.PipesElem = PipesElem;
  }

  get x() {
    return parseFloat(getComputedStyle(this.PipesElem).getPropertyValue("--x"));
  }
  set x(value) {
    return parseInt(this.PipesElem.style.setProperty("--x", value));
  }

  update(delta, pipeUp, pipeDown, speed) {
    if (this.x <= -25) {
      this.x = 100;
      let random = Math.floor(Math.random() * 50) + 10;
      console.log(random);
      let upHeight = random;
      let downHeight = 80 - random;
      pipeUp.style.height = `${upHeight}vh`;
      pipeDown.style.height = `${downHeight}vh`;
      return;
    }
    // before pipes speed is 0.035
    this.x -= delta * 0.04 + speed;
  }
}
