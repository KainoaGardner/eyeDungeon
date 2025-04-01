import { sfxSounds } from "./sounds";
import { levelSettings } from "./levels"

export class CloseBlock {
  x: number;
  y: number;
  speed: number;
  stay: number;
  counter: number;

  constructor(
    x: number,
    y: number,
    speed: number,
    stay: number,
    counter: number = 0,
  ) {
    this.x = Math.floor(y);
    this.y = Math.floor(x);
    this.speed = speed;
    this.stay = stay;
    this.counter = counter;
  }

  update(ls: levelSettings) {

    const map = ls.map;
    if (
      this.x >= 0 &&
      this.x < map.map[0].length &&
      this.y >= 0 &&
      this.y < map.map.length
    ) {
      const distance = Math.sqrt(
        (this.x - ls.player.posY) * (this.x - ls.player.posY) +
        (this.y - ls.player.posX) * (this.y - ls.player.posX),
      );

      if (this.counter === this.speed) {
        map.map[this.y][this.x] = 7;
        if (distance < 2) {
          sfxSounds[22].pause();
          sfxSounds[22].currentTime = 0;
          sfxSounds[22].play();

        }
      }
      if (this.counter === this.speed + this.stay) {
        map.map[this.y][this.x] = 0;

        this.counter = 0;
      }
      this.counter++;
    }
  }
}
