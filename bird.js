export default class Bird {
  constructor(birdElem) {
    this.birdElem = birdElem;
  }

  get y() {
    return parseFloat(getComputedStyle(this.birdElem).getPropertyValue("--y"));
  }
  set y(value) {
    return parseInt(this.birdElem.style.setProperty("--y", value));
  }

  update(delta) {
    if (this.y >= 79) {
      return false;
    }
    // before falling speed is 0.02
    this.y += delta * 0.021;
    return true;
  }

  flap() {
    if (this.y <= 0) return;
    this.y -= 5.0;
  }
}
