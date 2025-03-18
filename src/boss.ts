import { canvas, c, pos, UIRatio } from "./global";
import { Fireball } from "./fireball";
import { levelSettings } from "./levels";

export class Boss {
  x: number;
  y: number;
  health: number;
  speed: number;
  deadCounter = 0;
  alive: boolean = true;

  private shootSpeed = 0.2;
  private movePos: pos;
  private hurtCounter = 0;
  attack = 0;
  private attackCounter = 0;

  constructor(
    x: number,
    y: number,
    health: number,
    speed: number,
    attack: number = 0,
  ) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.movePos = { x: x, y: y };
    this.health = health;
    this.attack = attack;
  }

  private chooseAttack(): number {
    this.attackCounter = 1;

    // const attack = Math.floor(Math.random() * 11);
    const attack = Math.floor(Math.random() * 3) + 2;
    this.attack = attack;

    return attack;
  }

  takeDamage(damage: number) {
    this.health -= damage;
    this.hurtCounter = 1;
    if (this.health <= 0) {
      this.deadCounter = 1;
    }
  }

  private attack1(ls: levelSettings) {
    if (this.attackCounter === 300) {
      this.attackCounter = 0;
    }

    if (this.attackCounter % 3 !== 0 || this.attackCounter < 30) {
      return;
    }
    const angle =
      (((this.attackCounter * 3 + Math.random() * 10 - 5) % 360) * Math.PI) /
      180;
    const velX = this.shootSpeed * Math.cos(angle);
    const velY = this.shootSpeed * Math.sin(angle);
    const fireball = new Fireball(this.x, this.y, velX, velY);
    const sprite = { x: this.x, y: this.y, texture: 0, type: fireball };
    ls.sprites.push(sprite);
  }

  private attack2(ls: levelSettings) {
    if (this.attackCounter === 300) {
      this.attackCounter = 0;
    }

    if (this.attackCounter % 50 !== 0 || this.attackCounter < 30) {
      return;
    }

    for (let i = 0; i < 360; i += 15) {
      const angle = ((i + Math.random() * 20 - 10) * Math.PI) / 180;
      const velX = this.shootSpeed * Math.cos(angle);
      const velY = this.shootSpeed * Math.sin(angle);
      const fireball = new Fireball(this.x, this.y, velX, velY);
      const sprite = { x: this.x, y: this.y, texture: 0, type: fireball };
      ls.sprites.push(sprite);
    }
  }

  private attack3(ls: levelSettings) {
    if (this.attackCounter === 300) {
      this.attackCounter = 0;
    }
  }

  private attack4(ls: levelSettings) {
    if (this.attackCounter === 300) {
      this.attackCounter = 0;
    }
  }

  temp() {
    if (this.attackCounter === 100) {
      this.attackCounter = 0;
    }
  }

  update(ls: levelSettings) {
    console.log(this.attack);
    if (this.attackCounter === 0) {
      this.attack = this.chooseAttack();
    }

    switch (this.attack) {
      case 0:
        this.moveUpdate(ls.map.map);
        break;

      case 1:
        this.attack1(ls);
        break;
      case 2:
        this.attack2(ls);
        break;
      case 3:
        this.attack3(ls);
        break;

      default:
        this.temp();
        break;
    }
    if (this.attackCounter !== 0) {
      this.attackCounter += 1;
    }
  }

  moveUpdate(map: number[][]) {
    const moveSpeed = this.speed / 100;

    const distance = Math.sqrt(
      (this.x - this.movePos.y) * (this.x - this.movePos.y) +
        (this.y - this.movePos.x) * (this.y - this.movePos.x),
    );
    if (distance < moveSpeed) {
      this.x = this.movePos.y;
      this.y = this.movePos.x;
      this.attackCounter = 0;
      this.attack = this.chooseAttack();
      const newPos = this.getNextPos(map);
      this.movePos = { x: newPos.x + 0.5, y: newPos.y + 0.5 };
    } else {
      const xDif = this.x - this.movePos.y;
      const yDif = this.y - this.movePos.x;
      const angle = Math.atan2(yDif, xDif);
      const moveX = moveSpeed * Math.cos(angle);
      const moveY = moveSpeed * Math.sin(angle);
      this.x -= moveX;
      this.y -= moveY;
    }
  }

  private getNextPos(map: number[][]): pos {
    const m = map.length;
    const n = map[0].length;
    const nextPos = { x: 0, y: 0 };
    let block = map[nextPos.y][nextPos.x];
    while (block === 1) {
      nextPos.x = Math.floor(Math.random() * n);
      nextPos.y = Math.floor(Math.random() * m);
      block = map[nextPos.y][nextPos.x];
    }

    return nextPos;
  }

  hurtUpdate() {
    if (this.deadCounter >= 60) {
      this.alive = false;
    }
    if (this.deadCounter !== 0) {
      this.deadCounter++;
    }

    if (this.hurtCounter === 10) {
      this.hurtCounter = 0;
    }
    if (this.hurtCounter !== 0) {
      this.hurtCounter++;
    }
  }

  drawHealthBar() {
    c.fillStyle = "#e74c3c";
    c.fillRect(
      canvas.width / 2 - (this.health * UIRatio) / 3 / 20,
      UIRatio,
      (this.health * UIRatio) / 3 / 10,
      5 * UIRatio,
    );

    // c.fillRect(
    //   canvas.width / 2,
    //   canvas.height / 2,
    //   (this.health * UIRatio) / 3 / 10,
    //   5 * UIRatio,
    // );
  }
}
