const keyholeRotateStep = 0.75;
const keyholeRotateRestoreStep = 2.35;
const lockOpenSound = new Audio("openlocksong.mp3");

let keyholeRotation = 0;
let successKeyholeRotate = 0;

function keyholeInit() {
  successKeyholeRotate = Math.sign(randomInteger(-90, 90));
  console.log("keyhole: ", successKeyholeRotate)
}

function rotateKeyhole() {
  const lockpickSuccess = checkLockpickRotate();

  if (!pressedKey) { // If the rotation keys are not pressed, return the keyhole to its original position
    keyholeRotation -= Math.sign(keyholeRotation) * keyholeRotateRestoreStep;
    if (Math.abs(keyholeRotation) < keyholeRotateRestoreStep - 0.001) {
      keyholeRotation = 0;
    }
    return;
  }

  const key = pressedKey;
  if (key == 68) { // D
    keyholeRotation += keyholeRotateStep;
    keyholeRotation = Math.min(90, keyholeRotation + keyholeRotateStep);
  }

  if (key == 65) { // A
    keyholeRotation -= keyholeRotateStep;
    keyholeRotation = Math.max(-90, keyholeRotation - keyholeRotateStep);
  }

  // If we try to turn the keyhole in the opposite direction available to us
  if (successKeyholeRotate != Math.sign(keyholeRotation) && Math.abs(keyholeRotation) > 15) {
    damageLockpick();
  }

  if (!lockpickSuccess) { // If the lock pick is turned at the wrong angle and we are trying to turn the keyhole
    damageLockpick();
  } else { // If the lock pick is in the correct position, we will try to open the lock
    tryOpenLock(keyholeRotation);
  }
}

function tryOpenLock(rotation) {
  // We re-check whether the keyhole is turning exactly in the right direction
  if (Math.sign(rotation) != Math.sign(successKeyholeRotate)) {
    return;
  }

  // We take the unsigned rotation angle to determine the progress of the opening
  const absRotate = Math.abs(rotation);
  // If the keyhole is almost rotated to the maximum value
  if (absRotate >= 90 - keyholeRotateStep * 5) {
    // We block the control of the lock and lock pick
    freezeAll();
    // We start playing the sound of the lock opening
    playOpenlockSound();
  }

  // If the angle of rotation is very close to the maximum, then open our lock
  if (absRotate >= 90 - 0.001) {
    openLock();
  }
}

function openLock() {
  console.log("Lock opened...!");
  stopAnimate();
  freezeAll();
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