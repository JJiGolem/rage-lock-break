const lockpickRotationMin = -50;
const lockpickRotationMax = 110;
const lockpickRotationSmooth = (window.innerWidth / 2) / (lockpickRotationMax - lockpickRotationMin);
const successLockpickRotate = randomInteger(lockpickRotationMin, lockpickRotationMax);
const lockpickMaxDamage = randomInteger(50, 100);

let lastMouse;
let lockpickRotation = 0;
let lockpickDamage = 0;

window.addEventListener("mousemove", (evt) => {
  const mouse = {
    x: evt.clientX,
    y: evt.clientY
  }

  if (lastMouse) {
    lockpickRotation += (mouse.x - lastMouse.x) / lockpickRotationSmooth;
    lockpickRotation = clamp(lockpickRotation, lockpickRotationMin, lockpickRotationMax);
  }
  
  lastMouse = mouse;
})

function damageLockpick() {
  eventInfo = null;
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