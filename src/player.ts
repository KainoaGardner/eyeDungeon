export class Player {
  x: number;
  y: number;

  direction: number = 0;

  turnSpeed: number = 1;

  speed: number;

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw(c: any): void {
    const angleRad = (this.direction * Math.PI) / 180;
    c.beginPath();
    c.arc(this.x, this.y, 30, 0, 2 * Math.PI);
    c.fillStyle = "red";
    c.fill();

    c.beginPath();
    c.arc(this.x, this.y, 30, angleRad - Math.PI / 2, angleRad + Math.PI / 2);
    c.lineWidth = 5;
    c.strokeStyle = "black";
    c.stroke();
  }

  update(keyMap: Map<string, boolean>, canvas: any): void {
    if (keyMap.get("ArrowRight")) {
      this.direction += this.turnSpeed;
    }
    if (keyMap.get("ArrowLeft")) {
      this.direction -= this.turnSpeed;
    }

    if (keyMap.get("ArrowUp")) {
      this.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
      this.y += this.speed * Math.sin((this.direction * Math.PI) / 180);
    }
    if (keyMap.get("ArrowDown")) {
      this.x -= this.speed * Math.cos((this.direction * Math.PI) / 180);
      this.y -= this.speed * Math.sin((this.direction * Math.PI) / 180);
    }

    if (this.x > canvas.width - 30) {
      this.x = canvas.width - 30;
    }
    if (this.x < 30) {
      this.x = 30;
    }
    if (this.y > canvas.height - 30) {
      this.y = canvas.height - 30;
    }
    if (this.y < 30) {
      this.y = 30;
    }
  }
}
