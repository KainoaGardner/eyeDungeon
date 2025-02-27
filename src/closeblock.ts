import { Map } from "./map";

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

  update(map: Map) {
    if (
      this.x >= 0 &&
      this.x < map.map[0].length &&
      this.y >= 0 &&
      this.y < map.map.length
    ) {
      if (this.counter === this.speed) {
        map.map[this.y][this.x] = 7;
      }
      if (this.counter === this.speed + this.stay) {
        map.map[this.y][this.x] = 0;
        this.counter = 0;
      }
      this.counter++;
    }
  }
}
