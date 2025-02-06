export class Player {
  x: number;
  y: number;

  pos: number[] = [22, 12];
  dir: number[] = [-1, 0];
  planeX: number = 0;
  planeY: number = 1;

  radius: number;
  direction: number = 0;
  turnSpeed: number = 1;

  speed: number;

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  cast(canvasWidth: number): void {
    for (let x = 0; x < canvasWidth; x++) {}
  }

  draw(c: any, scale: number): void {
    // const angleRad = (this.direction * Math.PI) / 180;
    // c.beginPath();
    // c.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI);
    // c.fillStyle = "red";
    // c.fill();
    //
    // c.beginPath();
    // c.arc(
    //   this.x * scale,
    //   this.y * scale,
    //   this.radius * scale,
    //   angleRad - Math.PI / 2,
    //   angleRad + Math.PI / 2,
    // );
    // c.lineWidth = 5;
    // c.strokeStyle = "black";
    // c.stroke();
  }

  update(
    keyMap: Map<string, boolean>,
    map: number[][],
    blockSize: number,
  ): void {
    // if (keyMap.get("ArrowRight")) {
    //   this.direction += this.turnSpeed;
    // }
    // if (keyMap.get("ArrowLeft")) {
    //   this.direction -= this.turnSpeed;
    // }
    //
    // if (keyMap.get("ArrowUp")) {
    //   const nx =
    //     this.x + this.speed * Math.cos((this.direction * Math.PI) / 180);
    //   const ny =
    //     this.y + this.speed * Math.sin((this.direction * Math.PI) / 180);
    //
    //   const xBlock = Math.floor(nx / blockSize);
    //   const yBlock = Math.floor(ny / blockSize);
    //   if (
    //     xBlock >= map[0].length ||
    //     yBlock >= map.length ||
    //     (xBlock < map[0].length &&
    //       yBlock < map.length &&
    //       map[yBlock][xBlock] === 0)
    //   ) {
    //     this.x = nx;
    //     this.y = ny;
    //   }
    // }
    // if (keyMap.get("ArrowDown")) {
    //   const nx =
    //     this.x - this.speed * Math.cos((this.direction * Math.PI) / 180);
    //   const ny =
    //     this.y - this.speed * Math.sin((this.direction * Math.PI) / 180);
    //
    //   const xBlock = Math.floor(nx / blockSize);
    //   const yBlock = Math.floor(ny / blockSize);
    //   if (
    //     xBlock >= map[0].length ||
    //     yBlock >= map.length ||
    //     (xBlock < map[0].length &&
    //       yBlock < map.length &&
    //       map[yBlock][xBlock] === 0)
    //   ) {
    //     this.x = nx;
    //     this.y = ny;
    //   }
    // }
  }
}
