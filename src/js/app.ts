import {Clock} from "./clock";
import {Game} from "./game";

const sel = document.querySelector.bind(document);
const selId = document.getElementById.bind(document);

export class App {
  clock: Clock;
  clockNode: HTMLElement;
  menu: HTMLElement;
  game: Game;

  init() {
    this.clockNode = selId("clock");
    this.clock = new Clock(this.clockNode);
    this.setupMenu();

    this.game = new Game(this.clock);
    this.game.start();
  }

  setupMenu() {
    this.setupModeToggle(this.clock);
    this.menu = sel("#menu");

    this.menu.addEventListener('click', () => {
      this.toggleMenu();
    })
  }

  toggleMenu() {
    const toolbar = sel("#toolbar-items");
    if (toolbar.classList.contains('hidden')) {
      toolbar.classList.remove('hidden')
    } else {
      toolbar.classList.add('hidden')
    }
  }

  setupModeToggle(clock: Clock) {
    const currentTimeRadio = selId('clock-type-current-time');
    const learnRadio = selId('clock-type-learn');

    currentTimeRadio.addEventListener('click', () => {
      this.toggleMenu();
      this.game.stop();
      clock.currentTime();
    });

    learnRadio.addEventListener('click', () => {
      this.toggleMenu();
      this.game.start();
    });
  }


}
