const lockOpenSound = new Audio("./audio/openlocksong.mp3");
lockOpenSound.volume = 0.2;

class Keyhole {
  #rotateStep;
  #restoreStep;
  #lockTurnWay;

  constructor(
    domElement,
    latch,
    rotateStep = 0.75,
    restoreStep = 2.35,
  ) {
    this.domElement = domElement;
    this.latch = latch;

    this.#rotateStep = rotateStep;
    this.#restoreStep = restoreStep;
    this.#lockTurnWay = Math.sign(randomInteger(-90, 90)); // -1: left, 1: right

    this.rotation = 0;

    this.wrongRotateEvent = new CEvent();
    
    console.log("keyholeLockTurnWay:", this.#lockTurnWay);
  }

  animate() {
    if (this.domElement) {
      this.domElement.style.transform = "rotateZ(" + this.rotation + "deg)";
    }
  }

  rotate() {
    if (!pressedKey) { // If the rotation keys are not pressed, return the keyhole to its original position
      this.rotation -= Math.sign(this.rotation) * this.#restoreStep;
      if (Math.abs(this.rotation) < this.#restoreStep - 0.001) {
        this.rotation = 0;
      }
      return;
    }

    const key = pressedKey;
    if (key == 68) { // D
      this.rotation += this.#rotateStep;
      this.rotation = Math.min(90, this.rotation + this.#rotateStep);
    }

    if (key == 65) { // A
      this.rotation -= this.#rotateStep;
      this.rotation = Math.max(-90, this.rotation - this.#rotateStep);
    }

    // If we try to turn the keyhole in the opposite direction available to us
    if (this.#lockTurnWay != Math.sign(this.rotation) && Math.abs(this.rotation) > 15) {
      this.wrongRotateEvent.invoke();
      return;
    }

    if (!this.latch.defused) { // If the lock pick is turned at the wrong angle and we are trying to turn the keyhole
      this.wrongRotateEvent.invoke();
    } else { // If the lock pick is in the correct position, we will try to open the lock
      this.#tryOpenLock();
    }
  }

  #tryOpenLock() {
    // We re-check whether the keyhole is turning exactly in the right direction
    if (Math.sign(this.rotation) != Math.sign(this.#lockTurnWay)) {
      return;
    }

    // We take the unsigned rotation angle to determine the progress of the opening
    const absRotate = Math.abs(this.rotation);
    // If the keyhole is almost rotated to the maximum value
    if (absRotate >= 90 - this.#rotateStep * 5) {
      // We block the control of the lock and lock pick
      freezeAll();
      // We start playing the sound of the lock opening
      playOpenlockSound();
    }

    // If the angle of rotation is very close to the maximum, then open our lock
    if (absRotate >= 90 - 0.001) {
      this.#openLock();
    }
  }

  #openLock() {
    console.log("Lock opened...!");
    stopAnimate();
    freezeAll();
  }
}

lockOpenSound.onended = (event) => {
  lockOpenSound.currentTime = 0;
}

function playOpenlockSound() {
  if (lockOpenSound.currentTime != 0) {
    return;
  }

  lockOpenSound.currentTime = 0.2; // move the beginning of the sound so that the initial pause disappears
  lockOpenSound.play();
}