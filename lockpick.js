const lockpickRotationMin = -50;
const lockpickRotationMax = 110;
const lockpickRotationSmooth = (window.innerWidth / 2) / (lockpickRotationMax - lockpickRotationMin);

let lastMouse;
let lockpickRotation = 0;
let lockpickDamage = 0;
let successLockpickRotate;
let lockpickMaxDamage;

function lockpickInit() {
  successLockpickRotate = randomInteger(lockpickRotationMin, lockpickRotationMax);
  lockpickMaxDamage = randomInteger(50, 100);
  console.log("lockpick: ", successLockpickRotate, lockpickMaxDamage)
}

function rotateLockpick(evt) {
  const mouse = {
    x: evt.clientX,
    y: evt.clientY
  }

  if (lastMouse) {
    lockpickRotation += (mouse.x - lastMouse.x) / lockpickRotationSmooth;
    lockpickRotation = clamp(lockpickRotation, lockpickRotationMin, lockpickRotationMax);
  }
  
  lastMouse = mouse;
}

function damageLockpick() {
  disablePressedKey();
  lockpickDamage += randomInteger(1, 5);

  console.log(`MaxDamage: ${lockpickMaxDamage}`, `Damage: ${lockpickDamage}`)
  
  if (lockpickDamage >= lockpickMaxDamage) {
    breakLockpick();
  }
}

function breakLockpick() {
  console.log("lockpick broke")
  lockpickDamage = 0;
}

function checkLockpickRotate() {
  return Math.abs(lockpickRotation - successLockpickRotate) < (5 + 0.001);
}