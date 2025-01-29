export default class pipes2 {
  constructor(Pipes2Elem) {
    this.Pipes2Elem = Pipes2Elem;
  }

  get x() {
    return parseFloat(
      getComputedStyle(this.Pipes2Elem).getPropertyValue("--x")
    );
  }
  set x(value) {
    return parseInt(this.Pipes2Elem.style.setProperty("--x", value));
  }

  update(delta) {
    if (this.x <= -25) {
      this.x = 100;
      return;
    }
    this.x -= delta * 0.035;
  }
}
