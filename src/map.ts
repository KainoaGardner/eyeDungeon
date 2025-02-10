export class Map {
  map: number[][];
  size: number;

  constructor(
    map: Array<Array<number>>,
    mapSize: number,
    canvasHeight: number,
  ) {
    this.map = map;
    this.size = canvasHeight / mapSize;
  }

  draw(c: any, scale: number) {
    const rows = this.map.length;
    const cols = this.map[0].length;

    c.fillStyle = "#7f8c8d";
    c.fillRect(0, 0, rows * this.size * scale, cols * this.size * scale);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (this.map[i][j] !== 0) {
          c.fillStyle = "black";
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
