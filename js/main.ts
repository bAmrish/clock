import {Clock} from "./clock";


window.addEventListener('DOMContentLoaded', () => {

  const c: Clock = new Clock();

  const type = 'CLOCK';

  // @ts-ignore
  if (type === 'TEST') {
    const min = Math.floor(Math.random() * 12) * 5;
    const hour = 1 + Math.floor(Math.random() * 12 - 1);
    c.showTime(hour, min).hideSeconds();
    console.log(`${hour}:${min}`)
  }

})
