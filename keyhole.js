const keyholeRotateStep = 0.75;
const keyholeRotateRestoreStep = 2.35;
const successKeyholeRotate = Math.sign(randomInteger(-90, 90));

let keyholeRotation = 0;

function rotateKeyhole() {
  const lockpickSuccess = checkLockpickRotate();

  if (!pressedKey) {
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

  if (successKeyholeRotate != Math.sign(keyholeRotation) && Math.abs(keyholeRotation) > 15) {
    damageLockpick();
  }

  if (!lockpickSuccess) {
    damageLockpick();
  } else {
    if (keyholeRotation == Math.sign(successKeyholeRotate) * 90) {
      openLock();
    }
  }
}