import {Circle, Line, Rect, Svg, SVG, Text} from "@svgdotjs/svg.js";

class Canvas {
  node: Rect;
  width: number;
  height: number;
  svg: Svg;
  margin: 50;

  constructor(svg: Svg, width = 0, height = 0) {
    this.svg = svg;
    this.width = width;
    this.height = height;
  }

  draw(): this {
    this.node = this.svg.rect(this.width, this.height).fill('none').stroke('none');
    return this;
  }
}

class ClockFace {
  node: Circle;
  canvas: Canvas;
  svg: Svg;
  diameter: number;
  margin: number;
  cx: number;
  cy: number;


  CLOCK_FACE_FILL_COLOR = "rgba(185,185,185,55)";
  CLOCK_FACE_STROKE_COLOR = "#493119";
  CLOCK_FACE_STROKE_WIDTH = 0;
  CLOCK_FACE_SHADOW_COLOR = "#817e7e"
  CLOCK_FACE_SHADOW = `drop-shadow(3px 3px 3px ${this.CLOCK_FACE_SHADOW_COLOR})`;

  constructor(canvas, svg) {
    this.canvas = canvas;
    this.svg = svg;
    this.margin = canvas.margin;
    this.diameter = this.canvas.width - this.margin * 2 + 20;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
  }

  draw(): this {
    this.node = this.svg.circle(this.diameter)
      .center(this.cx, this.cy)
      .dy(0)
      .stroke({color: this.CLOCK_FACE_STROKE_COLOR, width: this.CLOCK_FACE_STROKE_WIDTH})
      .fill(this.CLOCK_FACE_FILL_COLOR)
      .css({"filter": this.CLOCK_FACE_SHADOW});
    return this;
  }

}

class Ticks {
  canvas: Canvas;
  svg: Svg;
  cx: number;
  cy: number;
  radius: number;
  numberTicksSize: 'SMALL' | 'LARGE' = 'SMALL';

  TICK_STROKE_COLOR = "#000000";
  TICK_STROKE_WIDTH = 1;
  TICK_LENGTH = 10;

  constructor(canvas, svg) {
    this.canvas = canvas;
    this.svg = svg;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
    this.radius = (this.canvas.width - 50 * 2) / 2;
  }


  setNumberTicksSize(size: 'SMALL' | 'LARGE') {
    this.numberTicksSize = size;
    this.draw();
  }

  draw(): this {
    for (let i = 1; i <= 60; i++) {
      let tickLength = this.TICK_LENGTH;
      let strokeWidth = this.TICK_STROKE_WIDTH;

      if (i % 5 === 0) {
        // @ts-ignore
        tickLength = (this.numberTicksSize === 'LARGE') ? this.TICK_LENGTH * 2 : this.TICK_LENGTH / 2;
        strokeWidth = +2;
      }

      const angleInDeg = (360 / 60) * i;
      const angleInRad = ((angleInDeg) * Math.PI) / 180;

      this.svg.line(this.cx, this.cy, this.cy, this.cy - tickLength)
        .stroke({width: strokeWidth, color: this.TICK_STROKE_COLOR})
        .rotate(angleInDeg)
        .dy(-1 * (this.radius - (tickLength / 2) * Math.cos(angleInRad)))
        .dx((tickLength / 2) * (Math.sin(angleInRad)));
    }

    return this;
  }
}

class Numbers {
  canvas: Canvas;
  svg: Svg;
  cx: number;
  cy: number;
  radius: number;
  numbers: Text[] = [];

  NUMBER_OFFSET = 25;

  NUMBER_FONT_NAME = 'Helvetica';
  NUMBER_FONT_SiZE = 20;
  NUMBER_FONT = {
    family: this.NUMBER_FONT_NAME,
    size: this.NUMBER_FONT_SiZE,
    anchor: 'middle',
    leading: '1.5em'
  };

  constructor(canvas, svg) {
    this.canvas = canvas;
    this.svg = svg;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
    const diameter = this.canvas.width - 50 * 2;
    this.radius = diameter / 2;
    console.log(this.canvas.width);
    if (this.canvas.width < 450) {
      this.NUMBER_OFFSET = 15
      this.NUMBER_FONT_SiZE = 15;
      this.NUMBER_FONT.size = this.NUMBER_FONT_SiZE;
    }
  }

  draw(): this {

    for (let i = 1; i <= 12; i++) {
      const angleInDeg = (360 / 12) * i;
      const t = i < 10 ? "" + i : "" + i;
      this.numbers.push(this.svg.text(t)
        .font(this.NUMBER_FONT)
        .cx(this.cx).cy(this.cy)
        .rotate(angleInDeg)
        .dy(-1 * (this.radius - this.NUMBER_OFFSET))
        .rotate(-angleInDeg));
    }

    return this;
  }

  show(): this {
    this.numbers.forEach(number => number.show());
    return this;
  }

  hide(): this {
    this.numbers.forEach(number => number.hide());
    return this;
  }

}

class ClockCenter {
  node: Circle;
  canvas: Canvas;
  svg: Svg;
  size = 0;
  cx: number;
  cy: number;


  CLOCK_CENTER_FILL_COLOR = "#04040400";
  CLOCK_CENTER_STROKE_COLOR = "#493119";
  CLOCK_CENTER_STROKE_WIDTH = 1;
  CLOCK_CENTER_SHADOW_COLOR = "#3C2003FF"
  CLOCK_CENTER_SHADOW = `drop-shadow(3px 3px 3px ${this.CLOCK_CENTER_SHADOW_COLOR})`;

  constructor(canvas, svg) {
    this.canvas = canvas;
    this.svg = svg;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
  }

  draw(): this {
    this.node = this.svg.circle(this.size)
      .center(this.cx, this.cy)
      .fill(this.CLOCK_CENTER_FILL_COLOR)
      .stroke({"color": this.CLOCK_CENTER_STROKE_COLOR, width: this.CLOCK_CENTER_STROKE_WIDTH})
      .css({"filter": this.CLOCK_CENTER_SHADOW});

    return this;
  }
}

class ClockHands {
  canvas: Canvas;
  svg: Svg;
  cx: number;
  cy: number;
  hourHand: Line;
  minuteHand: Line;
  secondHand: Line;
  handMargin = 50;
  clockMargin = 50;
  hour = 0;
  min = 0;
  sec = 0;

  MINUTE_HAND_STROKE_COLOR = "#000000";
  MINUTE_HAND_STROKE_WIDTH = 2;
  MINUTE_HAND_SHADOW_COLOR = "#3C2003FF"
  MINUTE_HAND_SHADOW = `drop-shadow(3px 3px 3px ${this.MINUTE_HAND_SHADOW_COLOR})`;

  HOUR_HAND_STROKE_COLOR = "#000000";
  HOUR_HAND_STROKE_WIDTH = 4;
  HOUR_HAND_SHADOW_COLOR = "#3C2003FF"
  HOUR_HAND_SHADOW = `drop-shadow(3px 3px 3px ${this.HOUR_HAND_SHADOW_COLOR})`;

  SECOND_HAND_STROKE_COLOR = "#690000";
  SECOND_HAND_STROKE_WIDTH = 1;
  SECOND_HAND_SHADOW_COLOR = "#3C2003FF"
  SECOND_HAND_SHADOW = `drop-shadow(3px 3px 3px ${this.SECOND_HAND_SHADOW_COLOR})`;

  constructor(canvas, svg) {
    this.canvas = canvas;
    this.svg = svg;
    this.cx = this.canvas.width / 2;
    this.cy = this.canvas.height / 2;
    if (this.canvas.width < 450) {
      this.handMargin = 25;
    }
  }

  draw(): this {

    this.minuteHand = this.svg.line(this.cx, this.cy, this.cx, this.clockMargin + this.handMargin)
      .stroke({
        width: this.MINUTE_HAND_STROKE_WIDTH,
        color: this.MINUTE_HAND_STROKE_COLOR
      })
      .css({"filter": this.MINUTE_HAND_SHADOW});

    this.hourHand = this.svg.line(this.cx, this.cy, this.cx, this.clockMargin + this.handMargin * 2)
      .stroke({
        width: this.HOUR_HAND_STROKE_WIDTH,
        color: this.HOUR_HAND_STROKE_COLOR
      })
      .css({"filter": this.HOUR_HAND_SHADOW});

    this.secondHand = this.svg.line(this.cx, this.cy, this.cx, this.clockMargin + this.handMargin / 2)
      .stroke({
        width: this.SECOND_HAND_STROKE_WIDTH,
        color: this.SECOND_HAND_STROKE_COLOR
      })
      .css({"filter": this.SECOND_HAND_SHADOW});

    return this;
  }

  showSeconds(show: boolean): this {
    show ? this.secondHand.show() : this.secondHand.hide();
    return this;
  }

  setTime(hour = 0, min = 0, sec = 0): this {

    this.secondHand.rotate(-1 * this.sec, this.cx, this.cy)
    this.minuteHand.rotate(-1 * this.min, this.cx, this.cy)
    this.hourHand.rotate(-1 * this.hour, this.cx, this.cy)

    this.sec = (360 * sec) / 60;
    this.min = (360 * min) / 60;
    this.hour = ((360 * hour) / 12) + ((360 * min) / (12 * 60));

    this.secondHand.rotate(this.sec, this.cx, this.cy)
    this.minuteHand.rotate(this.min, this.cx, this.cy)
    this.hourHand.rotate(this.hour, this.cx, this.cy)

    return this;
  }
}

export class Clock {
  parentNode: HTMLElement;
  svg: Svg;
  canvas: Canvas;
  clockFace: ClockFace;
  clockCenter: ClockCenter;
  clockHands: ClockHands;
  ticks: Ticks;
  numbers: Numbers;
  ticker: number;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;
    this.draw();
  }

  draw() {
    const parentWidth = parseInt(getComputedStyle(this.parentNode).width);
    const parentHeight = parseInt(getComputedStyle(this.parentNode).height);
    let MIN_DIM = Math.min(parentWidth, parentHeight);
    MIN_DIM = Math.max(MIN_DIM, 400);

    // account for 30px margin in main.css
    MIN_DIM -= 60;

    let svg = this.svg = SVG().addTo(this.parentNode).size(MIN_DIM, MIN_DIM).id("canvas");
    this.canvas = new Canvas(svg, MIN_DIM, MIN_DIM).draw();
    this.clockFace = new ClockFace(this.canvas, svg).draw();
    this.clockCenter = new ClockCenter(this.canvas, this.svg).draw();
    this.clockHands = new ClockHands(this.canvas, this.svg).draw();
    this.ticks = new Ticks(this.canvas, this.svg).draw();
    this.numbers = new Numbers(this.canvas, this.svg).draw();
    this.currentTime();
  }

  showNumbers(): this {
    this.numbers.show();
    this.ticks.setNumberTicksSize("LARGE")
    return this;
  }

  hideNumbers(): this {
    this.numbers.hide();
    this.ticks.setNumberTicksSize("SMALL")
    return this;
  }

  currentTime(): this {
    this.showSeconds();
    if (this.ticker) {
      clearInterval(this.ticker);
    }
    const now = new Date();
    this.clockHands.setTime(now.getHours(), now.getMinutes(), now.getSeconds());

    // @ts-ignore
    this.ticker = setInterval(() => {
      const now = new Date();
      this.clockHands.setTime(now.getHours(), now.getMinutes(), now.getSeconds());
    }, 1000)
    return this;
  }

  showTime(hour = 0, min = 0, sec = 0): this {
    if (this.ticker) {
      clearInterval(this.ticker);
    }

    this.clockHands.setTime(hour, min, sec)
    return this;
  }

  showSeconds(): this {
    this.clockHands.showSeconds(true);
    return this;
  }

  hideSeconds(): this {
    this.clockHands.showSeconds(false);
    return this;
  }

}

