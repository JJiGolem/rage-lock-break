class Lockpick {
  #strength;
  #minRotation;
  #maxRotation;
  #trueRotation;
  #smoothnessRotation;
  #lastMouse;

  constructor(domElement, minRotation = -50, maxRotation = 110) {
    this.domElement = domElement;

    this.#strength = randomInteger(50, 100);
    this.#minRotation = minRotation;
    this.#maxRotation = maxRotation;
    this.#trueRotation = randomInteger(this.#minRotation, this.#maxRotation);
    this.#smoothnessRotation = (window.innerWidth / 2) / (this.#maxRotation - this.#minRotation);

    this.rotation = 0;

    console.log("lockpickRotate:", this.#trueRotation);
    console.log("lockpickStrength:", this.#strength);
  }

  animate() {
    if (this.domElement) {
      this.domElement.style.transform = "translate(-100%, -100%) rotateZ(" + this.rotation + "deg)";
    }
  }

  rotate(evt) {
    const mouse = {
      x: evt.clientX,
      y: evt.clientY
    }
  
    if (this.#lastMouse) {
      this.rotation += (mouse.x - this.#lastMouse.x) / this.#smoothnessRotation;
      this.rotation = clamp(this.rotation, this.#minRotation, this.#maxRotation);
    }
    
    this.#lastMouse = mouse;
  }

  hasTrueRotation() {
    const eps = 0.001;
    const inaccuracy = 5 + eps;
    return Math.abs(this.rotation - this.#trueRotation) < inaccuracy;
  }

  damage() {
    const damage = randomInteger(1, 5);
    this.#strength -= damage;
    
    if (this.#strength <= 0) {
      this.#break();
    }

    console.log("lockpick damaged...", { Strength: this.#strength, Damage: damage });
  }

  #break() {
    console.log("lockpick broken...")
    this.#strength = 0;
    freezeAll();
  }
}