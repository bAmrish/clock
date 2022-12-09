import {SVG} from '@svgdotjs/svg.js'

const init = () => {
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const CLOCK_MARGIN = 50;
  const CENTER_X = CANVAS_WIDTH / 2;
  const CENTER_Y = CANVAS_WIDTH / 2;
  const CLOCK_DIAMETER
    = CANVAS_WIDTH - CLOCK_MARGIN * 2;
  const CLOCK_RADIUS = CLOCK_DIAMETER / 2;
  const NUMBER_MARGIN = 35;
  const draw = SVG().addTo('body').size(CANVAS_WIDTH, CANVAS_HEIGHT).id("canvas");
  draw.rect(CANVAS_WIDTH, CANVAS_WIDTH).fill('none').stroke('none')
  const clockFace = draw.circle(CLOCK_DIAMETER + 35)
    .center(CENTER_X, CENTER_Y)
    .dy(-5)
    // .stroke({color: '#493119', width: 1})
    .fill('rgba(112,255,135,0.56)')
    .css({"filter": "drop-shadow(3px 3px 3px #3C2003FF)"});



  const minuteHand = draw.line(CENTER_X, CENTER_Y, CENTER_X, CLOCK_MARGIN + NUMBER_MARGIN).stroke({
    width: 2,
    color: "#000000"
  }).css({"filter": "drop-shadow(3px 3px 3px #3C2003FF)"});
  const hourHand = draw.line(CENTER_X, CENTER_Y, CENTER_X, CLOCK_MARGIN + NUMBER_MARGIN * 2).stroke({
    width: 4,
    color: "#000000"
  }).css({"filter": "drop-shadow(3px 3px 3px #3C2003FF)"});
  // draw.line(CANVAS_WIDTH / 2, CLOCK_MARGIN + 10, CANVAS_WIDTH/2, CLOCK_MARGIN + 20).stroke({width: 4, color: "red"})

  for (let i = 1; i <= 12; i++) {
    const angleInDeg = (360 / 12) * i;
    // const angleInRad = ((angleInDeg) * Math.PI) / 180;
    // draw.line(CENTER_X, CENTER_Y, CENTER_Y, CENTER_Y - NUMBER_MARGIN)
    //   .stroke({width: 0, color: "red"})
    //   .rotate(angleInDeg)
    //   .dy(-1 * (CLOCK_RADIUS - NUMBER_MARGIN / 2 * Math.cos(angleInRad)))

    const t = i < 10 ? "" + i : "" + i;
    draw.text(t)
      .font({
        family: 'Helvetica',
        size: 20,
        anchor: 'middle',
        leading: '1.5em'
      })
      .cx(CENTER_X).cy(CENTER_Y)
      .rotate(angleInDeg)
      .dy(-1 * (CLOCK_RADIUS))
      .rotate(-angleInDeg);
  }

  const min = Math.floor(Math.random() * 12) * 5;
  const hour = 1 + Math.floor(Math.random() * 12 - 1);
  console.log(`${hour}:${min}`)
  minuteHand.rotate((360 * min) / 60, CENTER_X, CENTER_Y)
  hourHand.rotate(((360 * hour) / 12) + ((360 * min) / (12 * 60)), CENTER_X, CENTER_Y)

};

window.addEventListener('DOMContentLoaded', () => {
  init();
})
