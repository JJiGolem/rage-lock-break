class Lockpick {
  #strength;
  #minRotation;
  #maxRotation;
  #smoothnessRotation;
  #lastMouse;

  constructor(domElement, keyhole) {
    this.domElement = domElement;
    this.keyhole = keyhole;

    this.#strength = randomInteger(50, 100);
    this.#minRotation = this.keyhole.latch.minRotate;
    this.#maxRotation = this.keyhole.latch.maxRotate;
    this.#smoothnessRotation = (window.innerWidth / 2) / (this.#maxRotation - this.#minRotation);

    this.rotation = 0;

    this.damageBind = this.#damage.bind(this);
    this.keyhole.wrongRotateEvent.on = this.damageBind;
    
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

    if (this.keyhole.latch.hasTrueRotation(this.rotation)) {
      this.keyhole.latch.takeOff();
    } else {
      this.keyhole.latch.restore();
    }
    
    this.#lastMouse = mouse;
  }

  #damage() {
    const damage = randomInteger(1, 5);
    this.#strength -= damage;
    
    if (this.#strength <= 0) {
      this.#break();
    }

    console.log("lockpick damaged...", { Strength: this.#strength, Damage: damage });
  }

  #break() {
    this.keyhole.wrongRotateEvent.off = this.damageBind;
    this.#strength = 0;
    freezeAll();
    console.log("lockpick broken...")
  }
}