let lastMouse;
let lockpickRotation = 0;
const lockpickRotationMin = -50;
const lockpickRotationMax = 110;
const lockpickRotationSmooth = (window.innerWidth / 2) / (lockpickRotationMax - lockpickRotationMin);
const successLockpickRotate = randomInteger(lockpickRotationMin, lockpickRotationMax);
let lockpickDamage = 0;
let lockpickMaxHealth = randomInteger(50, 100);

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

function breakLockpick() {
  console.log("lockpick broke")
  lockpickDamage = 0;
}

function checkLockpickRotate() {
  return Math.abs(lockpickRotation - successLockpickRotate) < (5 + 0.001);
}