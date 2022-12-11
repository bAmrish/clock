import {Clock} from "./clock";


window.addEventListener('DOMContentLoaded', () => {
  const clockNode = document.getElementById("clock");
  console.log(clockNode)
  const c: Clock = new Clock(clockNode);
  const currentTimeRadio = document.getElementById('clock-type-current-time');
  currentTimeRadio.addEventListener('click', () => {
    c.currentTime();
  });
  const testRadio = document.getElementById('clock-type-test');
  testRadio.addEventListener('click', () => {
    const min = Math.floor(Math.random() * 12) * 5;
    const hour = 1 + Math.floor(Math.random() * 12 - 1);
    c.showTime(hour, min).hideSeconds();
    console.log(`${hour}:${min}`)
  });
})
