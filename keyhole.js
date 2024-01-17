let keyholeRotation = 0;
const keyholeRotateStep = 0.75;
const keyholeRotateRestoreStep = 2.35;
const successKeyholeRotate = Math.sign(randomInteger(-90, 90));

function rotateKeyhole(evt) {
  const lockpickSuccess = checkLockpickRotate();

  if (!evt) {
    keyholeRotation -= Math.sign(keyholeRotation) * keyholeRotateRestoreStep;
    if (Math.abs(keyholeRotation) < keyholeRotateRestoreStep - 0.001) {
      keyholeRotation = 0;
    }
    return;
  }

  const key = evt.keyCode;
  if (key == 68) { // D
    keyholeRotation += keyholeRotateStep;
    keyholeRotation = Math.min(90, keyholeRotation + keyholeRotateStep);
  }

  if (key == 65) { // A
    keyholeRotation -= keyholeRotateStep;
    keyholeRotation = Math.max(-90, keyholeRotation - keyholeRotateStep);
  }

  if (successKeyholeRotate != Math.sign(keyholeRotation) && keyholeRotation > 15) {
    eventInfo = null;
  }

  if (!lockpickSuccess) {
    damageLockpick();
  }
}