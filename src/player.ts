export class Player {
  x: number;
  y: number;

  posX = 22;
  posY = 12;
  dirX = -1;
  dirY = 0;
  planeX: number = 0;
  planeY: number = 1;

  radius: number;
  direction: number = 0;
  turnSpeed: number = 1;

  viewDist: number = 32;

  battery: number = 1000;
  flashlight: boolean = true;

  speed: number;

  constructor(x: number, y: number, radius: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw(c: any, scale: number): void {
    const angleRad = (this.direction * Math.PI) / 180;
    c.beginPath();
    c.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI);
    c.fillStyle = "red";
    c.fill();

    c.beginPath();
    c.arc(
      this.x * scale,
      this.y * scale,
      this.radius * scale,
      angleRad - Math.PI / 2,
      angleRad + Math.PI / 2,
    );
    c.lineWidth = 5;
    c.strokeStyle = "black";
    c.stroke();
  }

  drawView(c: any, canvas: any, map: number[][], mapSize: number) {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height / 2);
    c.fillStyle = "black";
    c.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
      const viewAngle = (90 * x) / (canvas.width / 2) - 45;
      const newAngle = this.direction + viewAngle;
      const distance = this.distance(newAngle, map, mapSize);

      if (distance === -1) {
        continue;
      }

      const height = ((1 / (distance / 500) - 1) * canvas.height) / 5;

      const color = (height / canvas.height) * this.viewDist;
      c.fillStyle = `rgb(${color},${color},${color})`;
      c.fillRect(x * 2, canvas.height / 2 - height / 2, 2, height);
    }
  }

  private distance(angle: number, map: number[][], mapSize: number) {
    for (let i = 1; i <= 500; i += 5) {
      const nX = this.x + i * Math.cos((angle * Math.PI) / 180);
      const nY = this.y + i * Math.sin((angle * Math.PI) / 180);

      const blockX = Math.floor(nX / mapSize);
      const blockY = Math.floor(nY / mapSize);

      if (
        blockX < 0 ||
        blockX >= map[0].length ||
        blockY < 0 ||
        blockY >= map.length
      ) {
        return -1;
      }

      if (map[blockY][blockX] !== 0) {
        return i;
      }
    }

    return -1;
  }

  drawUi(c: any, canvas: any) {
    if (this.flashlight) {
      c.fillStyle = "#f1c40f";
    } else {
      c.fillStyle = "#b33939";
    }
    c.fillRect(canvas.width - 110, 10, (this.battery / 1000) * 100, 10);
  }

  update(
    keyMap: Map<string, boolean>,
    map: number[][],
    blockSize: number,
  ): void {
    if (this.battery <= 0) {
      this.flashlight = false;
    }
    if (!this.flashlight && this.battery >= 1000) {
      this.flashlight = true;
    }
    if (keyMap.get("Space") && this.battery > 0 && this.flashlight) {
      this.viewDist = 128;
      this.battery--;
    } else {
      this.viewDist = 16;
      if (this.battery < 1000) {
        this.battery += 0.5;
      }
    }

    if (keyMap.get("ArrowRight")) {
      this.direction += this.turnSpeed;
    }
    if (keyMap.get("ArrowLeft")) {
      this.direction -= this.turnSpeed;
    }

    if (keyMap.get("ArrowUp")) {
      const nx =
        this.x + this.speed * Math.cos((this.direction * Math.PI) / 180);
      const ny =
        this.y + this.speed * Math.sin((this.direction * Math.PI) / 180);

      const xBlock = Math.floor(nx / blockSize);
      const yBlock = Math.floor(ny / blockSize);
      if (
        xBlock >= map[0].length ||
        yBlock >= map.length ||
        (xBlock >= 0 &&
          xBlock < map[0].length &&
          yBlock >= 0 &&
          yBlock < map.length &&
          map[yBlock][xBlock] === 0)
      ) {
        this.x = nx;
        this.y = ny;
      }
    }
    if (keyMap.get("ArrowDown")) {
      const nx =
        this.x - this.speed * Math.cos((this.direction * Math.PI) / 180);
      const ny =
        this.y - this.speed * Math.sin((this.direction * Math.PI) / 180);

      const xBlock = Math.floor(nx / blockSize);
      const yBlock = Math.floor(ny / blockSize);
      if (
        xBlock >= map[0].length ||
        yBlock >= map.length ||
        (xBlock >= 0 &&
          xBlock < map[0].length &&
          yBlock >= 0 &&
          yBlock < map.length &&
          map[yBlock][xBlock] === 0)
      ) {
        this.x = nx;
        this.y = ny;
      }
    }
  }
}
