import {Clock} from "./clock";

const toggleMenu = () => {
  const toolbar = document.querySelector("#toolbar-items");
  if(toolbar.classList.contains('hidden')){
    toolbar.classList.remove('hidden')
  } else {
    toolbar.classList.add('hidden')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const clockNode = document.getElementById("clock");
  console.log(clockNode)
  const c: Clock = new Clock(clockNode);

  const currentTimeRadio = document.getElementById('clock-type-current-time');
  const learnRadio = document.getElementById('clock-type-learn');
  currentTimeRadio.addEventListener('click', () => {
    c.currentTime();
    toggleMenu();
  });
  learnRadio.addEventListener('click', () => {
    const min = Math.floor(Math.random() * 12) * 5;
    const hour = 1 + Math.floor(Math.random() * 12 - 1);
    c.showTime(hour, min).hideSeconds();
    console.log(`${hour}:${min}`)
    toggleMenu();
  });

  const menu = document.querySelector("#menu");

  menu.addEventListener('click', () => {
    toggleMenu();
  })
})
