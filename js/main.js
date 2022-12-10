import {SVG} from '@svgdotjs/svg.js'

const init = () => {
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const CLOCK_MARGIN = 50;
  const CENTER_X = CANVAS_WIDTH / 2;
  const CENTER_Y = CANVAS_WIDTH / 2;
  const CLOCK_DIAMETER = CANVAS_WIDTH - CLOCK_MARGIN * 2;
  const CLOCK_RADIUS = CLOCK_DIAMETER / 2;
  const HAND_MARGIN = 35;

  const CLOCK_FACE_FILL_COLOR = "#70FF8700";
  const CLOCK_FACE_STROKE_COLOR = "#493119";
  const CLOCK_FACE_STROKE_WIDTH = 1;
  const CLOCK_FACE_SHADOW_COLOR = "#3C2003FF"
  const CLOCK_FACE_SHADOW = `drop-shadow(3px 3px 3px ${CLOCK_FACE_SHADOW_COLOR})`;

  const CLOCK_CENTER_SIZE = 20;
  const CLOCK_CENTER_FILL_COLOR = "#04040400";
  const CLOCK_CENTER_STROKE_COLOR = "#493119";
  const CLOCK_CENTER_STROKE_WIDTH = 0;
  const CLOCK_CENTER_SHADOW_COLOR = "#3C2003FF"
  const CLOCK_CENTER_SHADOW = `drop-shadow(3px 3px 3px ${CLOCK_CENTER_SHADOW_COLOR})`;

  const MINUTE_HAND_STROKE_COLOR = "#000000";
  const MINUTE_HAND_STROKE_WIDTH = 2;
  const MINUTE_HAND_SHADOW_COLOR = "#3C2003FF"
  const MINUTE_HAND_SHADOW = `drop-shadow(3px 3px 3px ${MINUTE_HAND_SHADOW_COLOR})`;

  const HOUR_HAND_STROKE_COLOR = "#000000";
  const HOUR_HAND_STROKE_WIDTH = 4;
  const HOUR_HAND_SHADOW_COLOR = "#3C2003FF"
  const HOUR_HAND_SHADOW = `drop-shadow(3px 3px 3px ${HOUR_HAND_SHADOW_COLOR})`;

  const TICK_STROKE_COLOR = "#000000";
  const TICK_STROKE_WIDTH = 0;
  const TICK_LENGTH = 10;

  const NUMBER_FONT_NAME = 'Helvetica';
  const NUMBER_FONT_SiZE = 20;

  const NUMBER_FONT = {
    family: NUMBER_FONT_NAME,
    size: NUMBER_FONT_SiZE,
    anchor: 'middle',
    leading: '1.5em'
  };


  const draw = SVG().addTo('body').size(CANVAS_WIDTH, CANVAS_HEIGHT).id("canvas");

  draw.rect(CANVAS_WIDTH, CANVAS_WIDTH).fill('none').stroke('none')

  const clockFace = draw.circle(CLOCK_DIAMETER + 20)
    .center(CENTER_X, CENTER_Y)
    .dy(-3)
    .stroke({color: CLOCK_FACE_STROKE_COLOR, width: CLOCK_FACE_STROKE_WIDTH})
    .fill(CLOCK_FACE_FILL_COLOR)
    .css({"filter": CLOCK_FACE_SHADOW});

  const clockCenter = draw.circle(CLOCK_CENTER_SIZE)
    .center(CENTER_X, CENTER_Y)
    .fill(CLOCK_CENTER_FILL_COLOR)
    .stroke({"color": CLOCK_CENTER_STROKE_COLOR, width: CLOCK_CENTER_STROKE_WIDTH})
    .css({"filter": CLOCK_CENTER_SHADOW});


  const minuteHand = draw.line(CENTER_X, CENTER_Y, CENTER_X, CLOCK_MARGIN + HAND_MARGIN)
    .stroke({
      width: MINUTE_HAND_STROKE_WIDTH,
      color: MINUTE_HAND_STROKE_COLOR
    })
    .css({"filter": MINUTE_HAND_SHADOW});

  const hourHand = draw.line(CENTER_X, CENTER_Y, CENTER_X, CLOCK_MARGIN + HAND_MARGIN * 2)
    .stroke({
      width: HOUR_HAND_STROKE_WIDTH,
      color: HOUR_HAND_STROKE_COLOR
    })
    .css({"filter": HOUR_HAND_SHADOW});


  for (let i = 1; i <= 60; i++) {
    let tickLength = TICK_LENGTH;
    if (i % 5 === 0) tickLength = 5;

    const angleInDeg = (360 / 60) * i;
    const angleInRad = ((angleInDeg) * Math.PI) / 180;

    draw.line(CENTER_X, CENTER_Y, CENTER_Y, CENTER_Y - tickLength)
      .stroke({width: TICK_STROKE_WIDTH, color: TICK_STROKE_COLOR})
      .rotate(angleInDeg)
      .dy(-1 * (CLOCK_RADIUS - (tickLength / 2) * Math.cos(angleInRad)))
      .dx((tickLength / 2) * (Math.sin(angleInRad)));
  }

  for (let i = 1; i <= 12; i++) {
    const angleInDeg = (360 / 12) * i;
    const t = i < 10 ? "" + i : "" + i;
    const tick_length = 15;

    draw.text(t)
      .font(NUMBER_FONT)
      .cx(CENTER_X).cy(CENTER_Y)
      .rotate(angleInDeg)
      .dy(-1 * (CLOCK_RADIUS - tick_length))
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
