import { c, pos } from "./global";

export class Map {
  map: number[][];
  lightList: pos[] = [];
  size: number;
  brightness: number = 1;

  constructor(
    map: Array<Array<number>>,
    mapSize: number,
    canvasHeight: number,
    brightness: number,
  ) {
    this.map = map;
    this.size = canvasHeight / mapSize;
    this.lightList = this.getLightList(this.map);
    this.brightness = brightness;
  }

  getLightList(map: number[][]): pos[] {
    const lights: pos[] = [];
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[0].length; c++) {
        if (map[r][c] === 4) {
          const pos = { x: r + 0.5, y: c + 0.5 };
          lights.push(pos);
        }
      }
    }

    return lights;
  }

  draw(scale: number) {
    const rows = this.map.length;
    const cols = this.map[0].length;

    c.fillStyle = "#7f8c8d";
    c.fillRect(0, 0, rows * this.size * scale, cols * this.size * scale);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (this.map[j][i] === 1) {
          c.fillStyle = "black";
          c.fillRect(
            this.size * j * scale,
            this.size * i * scale,
            this.size * scale,
            this.size * scale,
          );
        } else if (this.map[j][i] === 2) {
          c.fillStyle = "green";
          c.fillRect(
            this.size * j * scale,
            this.size * i * scale,
            this.size * scale,
            this.size * scale,
          );
        } else if (this.map[j][i] === 3) {
          c.fillStyle = "orange";
          c.fillRect(
            this.size * j * scale,
            this.size * i * scale,
            this.size * scale,
            this.size * scale,
          );
        }
      }
    }
  }
}
