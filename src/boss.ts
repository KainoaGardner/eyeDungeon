import { canvas, c, pos, UIRatio } from "./global";
import { Fireball } from "./fireball";
import { levelSettings } from "./levels";
import { CloseBlock } from "./closeblock";

import { Slime, Mage, Ghost, Skeleton } from "./enemy";
import { SpikeBall } from "./spikeball";

export class Boss {
  x: number;
  y: number;
  health: number;
  private startHealth: number;
  speed: number;
  deadCounter = 0;
  alive: boolean = true;

  private shootSpeed = 0.2;
  private movePos: pos;
  private hurtCounter = 0;
  attack = 0;
  private attackCounter = 0;
  private wallChoice = 0;
  private chaseCounter = 0;


  constructor(x: number, y: number, health: number, speed: number, attack: number = 0,) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.movePos = { x: x, y: y };
    this.health = health;
    this.startHealth = health;
    this.attack = attack;
  }

  private chooseAttack(): number {
    this.attackCounter = 1;

    const attack = Math.floor(Math.random() * 17);
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
    if (this.attackCounter === 200) {
      this.attackCounter = 0;
    }

    if (this.attackCounter % 3 !== 0 || this.attackCounter < 30) {
      return;
    }
    const angle =
      (((this.attackCounter * 3 + Math.random() * 10 - 5) % 360) * Math.PI) / 180;
    const velX = this.shootSpeed * Math.cos(angle);
    const velY = this.shootSpeed * Math.sin(angle);
    const fireball = new Fireball(this.x, this.y, velX, velY);
    const sprite = { x: this.x, y: this.y, texture: 0, type: fireball };
    ls.sprites.push(sprite);
  }

  private attack2(ls: levelSettings) {
    if (this.attackCounter === 160) {
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
    if (this.attackCounter === 30) {
      ls.moveWall = [
        new CloseBlock(8, 8, 200, 20, 20),

        new CloseBlock(7, 8, 200, 20, 80),
        new CloseBlock(7, 7, 200, 20, 80),
        new CloseBlock(7, 9, 200, 20, 80),
        new CloseBlock(8, 7, 200, 20, 80),
        new CloseBlock(8, 9, 200, 20, 80),
        new CloseBlock(9, 8, 200, 20, 80),
        new CloseBlock(9, 7, 200, 20, 80),
        new CloseBlock(9, 9, 200, 20, 80),


        new CloseBlock(6, 6, 200, 20, 100),
        new CloseBlock(6, 7, 200, 20, 100),
        new CloseBlock(6, 8, 200, 20, 100),
        new CloseBlock(6, 9, 200, 20, 100),
        new CloseBlock(6, 10, 200, 20, 100),
        new CloseBlock(7, 6, 200, 20, 100),
        new CloseBlock(7, 10, 200, 20, 100),
        new CloseBlock(8, 6, 200, 20, 100),
        new CloseBlock(8, 10, 200, 20, 100),
        new CloseBlock(9, 6, 200, 20, 100),
        new CloseBlock(9, 10, 200, 20, 100),
        new CloseBlock(10, 6, 200, 20, 100),
        new CloseBlock(10, 7, 200, 20, 100),
        new CloseBlock(10, 8, 200, 20, 100),
        new CloseBlock(10, 9, 200, 20, 100),
        new CloseBlock(10, 10, 200, 20, 100),

        new CloseBlock(5, 5, 200, 20, 120),
        new CloseBlock(5, 6, 200, 20, 120),
        new CloseBlock(5, 7, 200, 20, 120),
        new CloseBlock(5, 8, 200, 20, 120),
        new CloseBlock(5, 9, 200, 20, 120),
        new CloseBlock(5, 10, 200, 20, 120),
        new CloseBlock(5, 11, 200, 20, 120),
        new CloseBlock(6, 5, 200, 20, 120),
        new CloseBlock(6, 11, 200, 20, 120),
        new CloseBlock(7, 5, 200, 20, 120),
        new CloseBlock(7, 11, 200, 20, 120),
        new CloseBlock(8, 5, 200, 20, 120),
        new CloseBlock(8, 11, 200, 20, 120),
        new CloseBlock(9, 5, 200, 20, 120),
        new CloseBlock(9, 11, 200, 20, 120),
        new CloseBlock(10, 5, 200, 20, 120),
        new CloseBlock(10, 11, 200, 20, 120),
        new CloseBlock(11, 5, 200, 20, 120),
        new CloseBlock(11, 6, 200, 20, 120),
        new CloseBlock(11, 7, 200, 20, 120),
        new CloseBlock(11, 8, 200, 20, 120),
        new CloseBlock(11, 9, 200, 20, 120),
        new CloseBlock(11, 10, 200, 20, 120),
        new CloseBlock(11, 11, 200, 20, 120),

        new CloseBlock(4, 4, 200, 20, 140),
        new CloseBlock(4, 5, 200, 20, 140),
        new CloseBlock(4, 6, 200, 20, 140),
        new CloseBlock(4, 7, 200, 20, 140),
        new CloseBlock(4, 8, 200, 20, 140),
        new CloseBlock(4, 9, 200, 20, 140),
        new CloseBlock(4, 10, 200, 20, 140),
        new CloseBlock(4, 11, 200, 20, 140),
        new CloseBlock(4, 12, 200, 20, 140),
        new CloseBlock(5, 4, 200, 20, 140),
        new CloseBlock(5, 12, 200, 20, 140),
        new CloseBlock(6, 4, 200, 20, 140),
        new CloseBlock(6, 12, 200, 20, 140),
        new CloseBlock(7, 4, 200, 20, 140),
        new CloseBlock(7, 12, 200, 20, 140),
        new CloseBlock(8, 4, 200, 20, 140),
        new CloseBlock(8, 12, 200, 20, 140),
        new CloseBlock(9, 4, 200, 20, 140),
        new CloseBlock(9, 12, 200, 20, 140),
        new CloseBlock(10, 4, 200, 20, 140),
        new CloseBlock(10, 12, 200, 20, 140),
        new CloseBlock(11, 4, 200, 20, 140),
        new CloseBlock(11, 12, 200, 20, 140),
        new CloseBlock(12, 4, 200, 20, 140),
        new CloseBlock(12, 5, 200, 20, 140),
        new CloseBlock(12, 6, 200, 20, 140),
        new CloseBlock(12, 7, 200, 20, 140),
        new CloseBlock(12, 8, 200, 20, 140),
        new CloseBlock(12, 9, 200, 20, 140),
        new CloseBlock(12, 10, 200, 20, 140),
        new CloseBlock(12, 11, 200, 20, 140),
        new CloseBlock(12, 12, 200, 20, 140),

        new CloseBlock(3, 3, 200, 20, 160),
        new CloseBlock(3, 4, 200, 20, 160),
        new CloseBlock(3, 5, 200, 20, 160),
        new CloseBlock(3, 6, 200, 20, 160),
        new CloseBlock(3, 7, 200, 20, 160),
        new CloseBlock(3, 8, 200, 20, 160),
        new CloseBlock(3, 9, 200, 20, 160),
        new CloseBlock(3, 10, 200, 20, 160),
        new CloseBlock(3, 11, 200, 20, 160),
        new CloseBlock(3, 12, 200, 20, 160),
        new CloseBlock(3, 13, 200, 20, 160),
        new CloseBlock(4, 3, 200, 20, 160),
        new CloseBlock(4, 13, 200, 20, 160),
        new CloseBlock(5, 3, 200, 20, 160),
        new CloseBlock(5, 13, 200, 20, 160),
        new CloseBlock(6, 3, 200, 20, 160),
        new CloseBlock(6, 13, 200, 20, 160),
        new CloseBlock(7, 3, 200, 20, 160),
        new CloseBlock(7, 13, 200, 20, 160),
        new CloseBlock(8, 3, 200, 20, 160),
        new CloseBlock(8, 13, 200, 20, 160),
        new CloseBlock(9, 3, 200, 20, 160),
        new CloseBlock(9, 13, 200, 20, 160),
        new CloseBlock(10, 3, 200, 20, 160),
        new CloseBlock(10, 13, 200, 20, 160),
        new CloseBlock(11, 3, 200, 20, 160),
        new CloseBlock(11, 13, 200, 20, 160),
        new CloseBlock(12, 3, 200, 20, 160),
        new CloseBlock(12, 13, 200, 20, 160),
        new CloseBlock(13, 3, 200, 20, 160),
        new CloseBlock(13, 4, 200, 20, 160),
        new CloseBlock(13, 5, 200, 20, 160),
        new CloseBlock(13, 6, 200, 20, 160),
        new CloseBlock(13, 7, 200, 20, 160),
        new CloseBlock(13, 8, 200, 20, 160),
        new CloseBlock(13, 9, 200, 20, 160),
        new CloseBlock(13, 10, 200, 20, 160),
        new CloseBlock(13, 11, 200, 20, 160),
        new CloseBlock(13, 12, 200, 20, 160),
        new CloseBlock(13, 13, 200, 20, 160),

        new CloseBlock(2, 3, 200, 20, 180),
        new CloseBlock(2, 4, 200, 20, 180),
        new CloseBlock(2, 5, 200, 20, 180),
        new CloseBlock(2, 6, 200, 20, 180),
        new CloseBlock(2, 7, 200, 20, 180),
        new CloseBlock(2, 8, 200, 20, 180),
        new CloseBlock(2, 9, 200, 20, 180),
        new CloseBlock(2, 10, 200, 20, 180),
        new CloseBlock(2, 11, 200, 20, 180),
        new CloseBlock(2, 12, 200, 20, 180),
        new CloseBlock(2, 13, 200, 20, 180),
        new CloseBlock(3, 2, 200, 20, 180),
        new CloseBlock(3, 14, 200, 20, 180),
        new CloseBlock(4, 2, 200, 20, 180),
        new CloseBlock(4, 14, 200, 20, 180),
        new CloseBlock(5, 2, 200, 20, 180),
        new CloseBlock(5, 14, 200, 20, 180),
        new CloseBlock(6, 2, 200, 20, 180),
        new CloseBlock(6, 14, 200, 20, 180),
        new CloseBlock(7, 2, 200, 20, 180),
        new CloseBlock(7, 14, 200, 20, 180),
        new CloseBlock(8, 2, 200, 20, 180),
        new CloseBlock(8, 14, 200, 20, 180),
        new CloseBlock(9, 2, 200, 20, 180),
        new CloseBlock(9, 14, 200, 20, 180),
        new CloseBlock(10, 2, 200, 20, 180),
        new CloseBlock(10, 14, 200, 20, 180),
        new CloseBlock(11, 2, 200, 20, 180),
        new CloseBlock(11, 14, 200, 20, 180),
        new CloseBlock(12, 2, 200, 20, 180),
        new CloseBlock(12, 14, 200, 20, 180),
        new CloseBlock(13, 2, 200, 20, 180),
        new CloseBlock(13, 13, 200, 20, 180),
        new CloseBlock(14, 3, 200, 20, 180),
        new CloseBlock(14, 4, 200, 20, 180),
        new CloseBlock(14, 5, 200, 20, 180),
        new CloseBlock(14, 6, 200, 20, 180),
        new CloseBlock(14, 7, 200, 20, 180),
        new CloseBlock(14, 8, 200, 20, 180),
        new CloseBlock(14, 9, 200, 20, 180),
        new CloseBlock(14, 10, 200, 20, 180),
        new CloseBlock(14, 11, 200, 20, 180),
        new CloseBlock(14, 12, 200, 20, 180),
        new CloseBlock(14, 13, 200, 20, 180),

        new CloseBlock(1, 6, 200, 20, 200),
        new CloseBlock(1, 7, 200, 20, 200),
        new CloseBlock(1, 8, 200, 20, 200),
        new CloseBlock(1, 9, 200, 20, 200),
        new CloseBlock(1, 10, 200, 20, 200),
        new CloseBlock(6, 1, 200, 20, 200),
        new CloseBlock(7, 1, 200, 20, 200),
        new CloseBlock(8, 1, 200, 20, 200),
        new CloseBlock(9, 1, 200, 20, 200),
        new CloseBlock(10, 1, 200, 20, 200),
        new CloseBlock(6, 15, 200, 20, 200),
        new CloseBlock(7, 15, 200, 20, 200),
        new CloseBlock(8, 15, 200, 20, 200),
        new CloseBlock(9, 15, 200, 20, 200),
        new CloseBlock(10, 15, 200, 20, 200),
        new CloseBlock(15, 6, 200, 20, 200),
        new CloseBlock(15, 7, 200, 20, 200),
        new CloseBlock(15, 8, 200, 20, 200),
        new CloseBlock(15, 9, 200, 20, 200),
        new CloseBlock(15, 10, 200, 20, 200),
      ]
    }
    if (this.attackCounter === 190) {
      this.attackCounter = 0;
      ls.moveWall = [];

      for (let i = 0; i < ls.map.map.length; i++) {
        for (let j = 0; j < ls.map.map[0].length; j++) {
          if (ls.map.map[i][j] === 7) {
            ls.map.map[i][j] = 0;
          }
        }
      }
    }
  }

  private attack4(ls: levelSettings) {
    if (this.attackCounter === 1) {
      this.wallChoice = Math.floor(Math.random() * 2);
      if (this.wallChoice === 0) {
        ls.map.map[1][6] = 7;
        ls.map.map[1][7] = 7;
        ls.map.map[1][8] = 7;
        ls.map.map[1][9] = 7;
        ls.map.map[1][10] = 7;


      } else {
        ls.map.map[15][6] = 7;
        ls.map.map[15][7] = 7;
        ls.map.map[15][8] = 7;
        ls.map.map[15][9] = 7;
        ls.map.map[15][10] = 7;

      }
    }
    if (this.attackCounter === 50) {
      if (this.wallChoice === 0) {
        ls.moveWall = [
          new CloseBlock(1, 6, 150, 10, 150),
          new CloseBlock(1, 7, 150, 10, 150),
          new CloseBlock(1, 8, 150, 10, 150),
          new CloseBlock(1, 9, 150, 10, 150),
          new CloseBlock(1, 10, 150, 10, 150),

          new CloseBlock(2, 3, 150, 10, 140),
          new CloseBlock(2, 4, 150, 10, 140),
          new CloseBlock(2, 5, 150, 10, 140),
          new CloseBlock(2, 6, 150, 10, 140),
          new CloseBlock(2, 7, 150, 10, 140),
          new CloseBlock(2, 8, 150, 10, 140),
          new CloseBlock(2, 9, 150, 10, 140),
          new CloseBlock(2, 10, 150, 10, 140),
          new CloseBlock(2, 11, 150, 10, 140),
          new CloseBlock(2, 12, 150, 10, 140),
          new CloseBlock(2, 10, 150, 10, 140),

          new CloseBlock(3, 2, 150, 10, 130),
          new CloseBlock(3, 3, 150, 10, 130),
          new CloseBlock(3, 4, 150, 10, 130),
          new CloseBlock(3, 5, 150, 10, 130),
          new CloseBlock(3, 6, 150, 10, 130),
          new CloseBlock(3, 7, 150, 10, 130),
          new CloseBlock(3, 8, 150, 10, 130),
          new CloseBlock(3, 9, 150, 10, 130),
          new CloseBlock(3, 10, 150, 10, 130),
          new CloseBlock(3, 11, 150, 10, 130),
          new CloseBlock(3, 12, 150, 10, 130),
          new CloseBlock(3, 13, 150, 10, 130),
          new CloseBlock(3, 14, 150, 10, 130),

          new CloseBlock(4, 2, 150, 10, 120),
          new CloseBlock(4, 3, 150, 10, 120),
          new CloseBlock(4, 4, 150, 10, 120),
          new CloseBlock(4, 5, 150, 10, 120),
          new CloseBlock(4, 6, 150, 10, 120),
          new CloseBlock(4, 7, 150, 10, 120),
          new CloseBlock(4, 8, 150, 10, 120),
          new CloseBlock(4, 9, 150, 10, 120),
          new CloseBlock(4, 10, 150, 10, 120),
          new CloseBlock(4, 11, 150, 10, 120),
          new CloseBlock(4, 12, 150, 10, 120),
          new CloseBlock(4, 13, 150, 10, 120),
          new CloseBlock(4, 14, 150, 10, 120),

          new CloseBlock(5, 2, 150, 10, 110),
          new CloseBlock(5, 3, 150, 10, 110),
          new CloseBlock(5, 4, 150, 10, 110),
          new CloseBlock(5, 5, 150, 10, 110),
          new CloseBlock(5, 6, 150, 10, 110),
          new CloseBlock(5, 7, 150, 10, 110),
          new CloseBlock(5, 8, 150, 10, 110),
          new CloseBlock(5, 9, 150, 10, 110),
          new CloseBlock(5, 10, 150, 10, 110),
          new CloseBlock(5, 11, 150, 10, 110),
          new CloseBlock(5, 12, 150, 10, 110),
          new CloseBlock(5, 13, 150, 10, 110),
          new CloseBlock(5, 14, 150, 10, 110),


          new CloseBlock(6, 1, 150, 10, 100),
          new CloseBlock(6, 2, 150, 10, 100),
          new CloseBlock(6, 3, 150, 10, 100),
          new CloseBlock(6, 4, 150, 10, 100),
          new CloseBlock(6, 5, 150, 10, 100),
          new CloseBlock(6, 6, 150, 10, 100),
          new CloseBlock(6, 7, 150, 10, 100),
          new CloseBlock(6, 8, 150, 10, 100),
          new CloseBlock(6, 9, 150, 10, 100),
          new CloseBlock(6, 10, 150, 10, 100),
          new CloseBlock(6, 11, 150, 10, 100),
          new CloseBlock(6, 12, 150, 10, 100),
          new CloseBlock(6, 13, 150, 10, 100),
          new CloseBlock(6, 14, 150, 10, 100),
          new CloseBlock(6, 15, 150, 10, 100),

          new CloseBlock(7, 1, 150, 10, 90),
          new CloseBlock(7, 2, 150, 10, 90),
          new CloseBlock(7, 3, 150, 10, 90),
          new CloseBlock(7, 4, 150, 10, 90),
          new CloseBlock(7, 5, 150, 10, 90),
          new CloseBlock(7, 6, 150, 10, 90),
          new CloseBlock(7, 7, 150, 10, 90),
          new CloseBlock(7, 8, 150, 10, 90),
          new CloseBlock(7, 9, 150, 10, 90),
          new CloseBlock(7, 10, 150, 10, 90),
          new CloseBlock(7, 11, 150, 10, 90),
          new CloseBlock(7, 12, 150, 10, 90),
          new CloseBlock(7, 13, 150, 10, 90),
          new CloseBlock(7, 14, 150, 10, 90),
          new CloseBlock(7, 15, 150, 10, 90),

          new CloseBlock(8, 1, 150, 10, 80),
          new CloseBlock(8, 2, 150, 10, 80),
          new CloseBlock(8, 3, 150, 10, 80),
          new CloseBlock(8, 4, 150, 10, 80),
          new CloseBlock(8, 5, 150, 10, 80),
          new CloseBlock(8, 6, 150, 10, 80),
          new CloseBlock(8, 7, 150, 10, 80),
          new CloseBlock(8, 8, 150, 10, 80),
          new CloseBlock(8, 9, 150, 10, 80),
          new CloseBlock(8, 10, 150, 10, 80),
          new CloseBlock(8, 11, 150, 10, 80),
          new CloseBlock(8, 12, 150, 10, 80),
          new CloseBlock(8, 13, 150, 10, 80),
          new CloseBlock(8, 15, 150, 10, 80),
          new CloseBlock(8, 14, 150, 10, 80),

          new CloseBlock(9, 1, 150, 10, 70),
          new CloseBlock(9, 2, 150, 10, 70),
          new CloseBlock(9, 3, 150, 10, 70),
          new CloseBlock(9, 4, 150, 10, 70),
          new CloseBlock(9, 5, 150, 10, 70),
          new CloseBlock(9, 6, 150, 10, 70),
          new CloseBlock(9, 7, 150, 10, 70),
          new CloseBlock(9, 8, 150, 10, 70),
          new CloseBlock(9, 9, 150, 10, 70),
          new CloseBlock(9, 10, 150, 10, 70),
          new CloseBlock(9, 11, 150, 10, 70),
          new CloseBlock(9, 12, 150, 10, 70),
          new CloseBlock(9, 13, 150, 10, 70),
          new CloseBlock(9, 14, 150, 10, 70),
          new CloseBlock(9, 15, 150, 10, 70),

          new CloseBlock(10, 1, 150, 10, 60),
          new CloseBlock(10, 2, 150, 10, 60),
          new CloseBlock(10, 3, 150, 10, 60),
          new CloseBlock(10, 4, 150, 10, 60),
          new CloseBlock(10, 5, 150, 10, 60),
          new CloseBlock(10, 6, 150, 10, 60),
          new CloseBlock(10, 7, 150, 10, 60),
          new CloseBlock(10, 8, 150, 10, 60),
          new CloseBlock(10, 9, 150, 10, 60),
          new CloseBlock(10, 10, 150, 10, 60),
          new CloseBlock(10, 11, 150, 10, 60),
          new CloseBlock(10, 12, 150, 10, 60),
          new CloseBlock(10, 13, 150, 10, 60),
          new CloseBlock(10, 14, 150, 10, 60),
          new CloseBlock(10, 15, 150, 10, 60),

          new CloseBlock(11, 2, 150, 10, 50),
          new CloseBlock(11, 3, 150, 10, 50),
          new CloseBlock(11, 4, 150, 10, 50),
          new CloseBlock(11, 5, 150, 10, 50),
          new CloseBlock(11, 6, 150, 10, 50),
          new CloseBlock(11, 7, 150, 10, 50),
          new CloseBlock(11, 8, 150, 10, 50),
          new CloseBlock(11, 9, 150, 10, 50),
          new CloseBlock(11, 10, 150, 10, 50),
          new CloseBlock(11, 11, 150, 10, 50),
          new CloseBlock(11, 12, 150, 10, 50),
          new CloseBlock(11, 13, 150, 10, 50),
          new CloseBlock(11, 14, 150, 10, 50),

          new CloseBlock(12, 2, 150, 10, 40),
          new CloseBlock(12, 3, 150, 10, 40),
          new CloseBlock(12, 4, 150, 10, 40),
          new CloseBlock(12, 5, 150, 10, 40),
          new CloseBlock(12, 6, 150, 10, 40),
          new CloseBlock(12, 7, 150, 10, 40),
          new CloseBlock(12, 8, 150, 10, 40),
          new CloseBlock(12, 9, 150, 10, 40),
          new CloseBlock(12, 10, 150, 10, 40),
          new CloseBlock(12, 11, 150, 10, 40),
          new CloseBlock(12, 12, 150, 10, 40),
          new CloseBlock(12, 13, 150, 10, 40),
          new CloseBlock(12, 14, 150, 10, 40),

          new CloseBlock(13, 2, 150, 10, 30),
          new CloseBlock(13, 3, 150, 10, 30),
          new CloseBlock(13, 4, 150, 10, 30),
          new CloseBlock(13, 5, 150, 10, 30),
          new CloseBlock(13, 6, 150, 10, 30),
          new CloseBlock(13, 7, 150, 10, 30),
          new CloseBlock(13, 8, 150, 10, 30),
          new CloseBlock(13, 9, 150, 10, 30),
          new CloseBlock(13, 10, 150, 10, 30),
          new CloseBlock(13, 11, 150, 10, 30),
          new CloseBlock(13, 12, 150, 10, 30),
          new CloseBlock(13, 13, 150, 10, 30),
          new CloseBlock(13, 14, 150, 10, 30),

          new CloseBlock(14, 3, 150, 10, 20),
          new CloseBlock(14, 4, 150, 10, 20),
          new CloseBlock(14, 5, 150, 10, 20),
          new CloseBlock(14, 6, 150, 10, 20),
          new CloseBlock(14, 7, 150, 10, 20),
          new CloseBlock(14, 8, 150, 10, 20),
          new CloseBlock(14, 9, 150, 10, 20),
          new CloseBlock(14, 10, 150, 10, 20),
          new CloseBlock(14, 11, 150, 10, 20),
          new CloseBlock(14, 12, 150, 10, 20),
          new CloseBlock(14, 10, 150, 10, 20),

          new CloseBlock(15, 6, 150, 10, 10),
          new CloseBlock(15, 7, 150, 10, 10),
          new CloseBlock(15, 8, 150, 10, 10),
          new CloseBlock(15, 9, 150, 10, 10),
          new CloseBlock(15, 10, 150, 10, 10),

        ]

      } else {
        ls.moveWall = [
          new CloseBlock(1, 6, 150, 10, 10),
          new CloseBlock(1, 7, 150, 10, 10),
          new CloseBlock(1, 8, 150, 10, 10),
          new CloseBlock(1, 9, 150, 10, 10),
          new CloseBlock(1, 10, 150, 10, 10),

          new CloseBlock(2, 3, 150, 10, 20),
          new CloseBlock(2, 4, 150, 10, 20),
          new CloseBlock(2, 5, 150, 10, 20),
          new CloseBlock(2, 6, 150, 10, 20),
          new CloseBlock(2, 7, 150, 10, 20),
          new CloseBlock(2, 8, 150, 10, 20),
          new CloseBlock(2, 9, 150, 10, 20),
          new CloseBlock(2, 10, 150, 10, 20),
          new CloseBlock(2, 11, 150, 10, 20),
          new CloseBlock(2, 12, 150, 10, 20),
          new CloseBlock(2, 10, 150, 10, 20),

          new CloseBlock(3, 2, 150, 10, 30),
          new CloseBlock(3, 3, 150, 10, 30),
          new CloseBlock(3, 4, 150, 10, 30),
          new CloseBlock(3, 5, 150, 10, 30),
          new CloseBlock(3, 6, 150, 10, 30),
          new CloseBlock(3, 7, 150, 10, 30),
          new CloseBlock(3, 8, 150, 10, 30),
          new CloseBlock(3, 9, 150, 10, 30),
          new CloseBlock(3, 10, 150, 10, 30),
          new CloseBlock(3, 11, 150, 10, 30),
          new CloseBlock(3, 12, 150, 10, 30),
          new CloseBlock(3, 13, 150, 10, 30),
          new CloseBlock(3, 14, 150, 10, 30),

          new CloseBlock(4, 2, 150, 10, 40),
          new CloseBlock(4, 3, 150, 10, 40),
          new CloseBlock(4, 4, 150, 10, 40),
          new CloseBlock(4, 5, 150, 10, 40),
          new CloseBlock(4, 6, 150, 10, 40),
          new CloseBlock(4, 7, 150, 10, 40),
          new CloseBlock(4, 8, 150, 10, 40),
          new CloseBlock(4, 9, 150, 10, 40),
          new CloseBlock(4, 10, 150, 10, 40),
          new CloseBlock(4, 11, 150, 10, 40),
          new CloseBlock(4, 12, 150, 10, 40),
          new CloseBlock(4, 13, 150, 10, 40),
          new CloseBlock(4, 14, 150, 10, 40),

          new CloseBlock(5, 2, 150, 10, 50),
          new CloseBlock(5, 3, 150, 10, 50),
          new CloseBlock(5, 4, 150, 10, 50),
          new CloseBlock(5, 5, 150, 10, 50),
          new CloseBlock(5, 6, 150, 10, 50),
          new CloseBlock(5, 7, 150, 10, 50),
          new CloseBlock(5, 8, 150, 10, 50),
          new CloseBlock(5, 9, 150, 10, 50),
          new CloseBlock(5, 10, 150, 10, 50),
          new CloseBlock(5, 11, 150, 10, 50),
          new CloseBlock(5, 12, 150, 10, 50),
          new CloseBlock(5, 13, 150, 10, 50),
          new CloseBlock(5, 14, 150, 10, 50),


          new CloseBlock(6, 1, 150, 10, 60),
          new CloseBlock(6, 2, 150, 10, 60),
          new CloseBlock(6, 3, 150, 10, 60),
          new CloseBlock(6, 4, 150, 10, 60),
          new CloseBlock(6, 5, 150, 10, 60),
          new CloseBlock(6, 6, 150, 10, 60),
          new CloseBlock(6, 7, 150, 10, 60),
          new CloseBlock(6, 8, 150, 10, 60),
          new CloseBlock(6, 9, 150, 10, 60),
          new CloseBlock(6, 10, 150, 10, 60),
          new CloseBlock(6, 11, 150, 10, 60),
          new CloseBlock(6, 12, 150, 10, 60),
          new CloseBlock(6, 13, 150, 10, 60),
          new CloseBlock(6, 14, 150, 10, 60),
          new CloseBlock(6, 15, 150, 10, 60),

          new CloseBlock(7, 1, 150, 10, 70),
          new CloseBlock(7, 2, 150, 10, 70),
          new CloseBlock(7, 3, 150, 10, 70),
          new CloseBlock(7, 4, 150, 10, 70),
          new CloseBlock(7, 5, 150, 10, 70),
          new CloseBlock(7, 6, 150, 10, 70),
          new CloseBlock(7, 7, 150, 10, 70),
          new CloseBlock(7, 8, 150, 10, 70),
          new CloseBlock(7, 9, 150, 10, 70),
          new CloseBlock(7, 10, 150, 10, 70),
          new CloseBlock(7, 11, 150, 10, 70),
          new CloseBlock(7, 12, 150, 10, 70),
          new CloseBlock(7, 13, 150, 10, 70),
          new CloseBlock(7, 14, 150, 10, 70),
          new CloseBlock(7, 15, 150, 10, 70),

          new CloseBlock(8, 1, 150, 10, 80),
          new CloseBlock(8, 2, 150, 10, 80),
          new CloseBlock(8, 3, 150, 10, 80),
          new CloseBlock(8, 4, 150, 10, 80),
          new CloseBlock(8, 5, 150, 10, 80),
          new CloseBlock(8, 6, 150, 10, 80),
          new CloseBlock(8, 7, 150, 10, 80),
          new CloseBlock(8, 8, 150, 10, 80),
          new CloseBlock(8, 9, 150, 10, 80),
          new CloseBlock(8, 10, 150, 10, 80),
          new CloseBlock(8, 11, 150, 10, 80),
          new CloseBlock(8, 12, 150, 10, 80),
          new CloseBlock(8, 13, 150, 10, 80),
          new CloseBlock(8, 15, 150, 10, 80),
          new CloseBlock(8, 14, 150, 10, 80),

          new CloseBlock(9, 1, 150, 10, 90),
          new CloseBlock(9, 2, 150, 10, 90),
          new CloseBlock(9, 3, 150, 10, 90),
          new CloseBlock(9, 4, 150, 10, 90),
          new CloseBlock(9, 5, 150, 10, 90),
          new CloseBlock(9, 6, 150, 10, 90),
          new CloseBlock(9, 7, 150, 10, 90),
          new CloseBlock(9, 8, 150, 10, 90),
          new CloseBlock(9, 9, 150, 10, 90),
          new CloseBlock(9, 10, 150, 10, 90),
          new CloseBlock(9, 11, 150, 10, 90),
          new CloseBlock(9, 12, 150, 10, 90),
          new CloseBlock(9, 13, 150, 10, 90),
          new CloseBlock(9, 14, 150, 10, 90),
          new CloseBlock(9, 15, 150, 10, 90),

          new CloseBlock(10, 1, 150, 10, 100),
          new CloseBlock(10, 2, 150, 10, 100),
          new CloseBlock(10, 3, 150, 10, 100),
          new CloseBlock(10, 4, 150, 10, 100),
          new CloseBlock(10, 5, 150, 10, 100),
          new CloseBlock(10, 6, 150, 10, 100),
          new CloseBlock(10, 7, 150, 10, 100),
          new CloseBlock(10, 8, 150, 10, 100),
          new CloseBlock(10, 9, 150, 10, 100),
          new CloseBlock(10, 10, 150, 10, 100),
          new CloseBlock(10, 11, 150, 10, 100),
          new CloseBlock(10, 12, 150, 10, 100),
          new CloseBlock(10, 13, 150, 10, 100),
          new CloseBlock(10, 14, 150, 10, 100),
          new CloseBlock(10, 15, 150, 10, 100),

          new CloseBlock(11, 2, 150, 10, 110),
          new CloseBlock(11, 3, 150, 10, 110),
          new CloseBlock(11, 4, 150, 10, 110),
          new CloseBlock(11, 5, 150, 10, 110),
          new CloseBlock(11, 6, 150, 10, 110),
          new CloseBlock(11, 7, 150, 10, 110),
          new CloseBlock(11, 8, 150, 10, 110),
          new CloseBlock(11, 9, 150, 10, 110),
          new CloseBlock(11, 10, 150, 10, 110),
          new CloseBlock(11, 11, 150, 10, 110),
          new CloseBlock(11, 12, 150, 10, 110),
          new CloseBlock(11, 13, 150, 10, 110),
          new CloseBlock(11, 14, 150, 10, 110),

          new CloseBlock(12, 2, 150, 10, 120),
          new CloseBlock(12, 3, 150, 10, 120),
          new CloseBlock(12, 4, 150, 10, 120),
          new CloseBlock(12, 5, 150, 10, 120),
          new CloseBlock(12, 6, 150, 10, 120),
          new CloseBlock(12, 7, 150, 10, 120),
          new CloseBlock(12, 8, 150, 10, 120),
          new CloseBlock(12, 9, 150, 10, 120),
          new CloseBlock(12, 10, 150, 10, 120),
          new CloseBlock(12, 11, 150, 10, 120),
          new CloseBlock(12, 12, 150, 10, 120),
          new CloseBlock(12, 13, 150, 10, 120),
          new CloseBlock(12, 14, 150, 10, 120),

          new CloseBlock(13, 2, 150, 10, 130),
          new CloseBlock(13, 3, 150, 10, 130),
          new CloseBlock(13, 4, 150, 10, 130),
          new CloseBlock(13, 5, 150, 10, 130),
          new CloseBlock(13, 6, 150, 10, 130),
          new CloseBlock(13, 7, 150, 10, 130),
          new CloseBlock(13, 8, 150, 10, 130),
          new CloseBlock(13, 9, 150, 10, 130),
          new CloseBlock(13, 10, 150, 10, 130),
          new CloseBlock(13, 11, 150, 10, 130),
          new CloseBlock(13, 12, 150, 10, 130),
          new CloseBlock(13, 13, 150, 10, 130),
          new CloseBlock(13, 14, 150, 10, 130),

          new CloseBlock(14, 3, 150, 10, 140),
          new CloseBlock(14, 4, 150, 10, 140),
          new CloseBlock(14, 5, 150, 10, 140),
          new CloseBlock(14, 6, 150, 10, 140),
          new CloseBlock(14, 7, 150, 10, 140),
          new CloseBlock(14, 8, 150, 10, 140),
          new CloseBlock(14, 9, 150, 10, 140),
          new CloseBlock(14, 10, 150, 10, 140),
          new CloseBlock(14, 11, 150, 10, 140),
          new CloseBlock(14, 12, 150, 10, 140),
          new CloseBlock(14, 10, 150, 10, 140),

          new CloseBlock(15, 6, 150, 10, 150),
          new CloseBlock(15, 7, 150, 10, 150),
          new CloseBlock(15, 8, 150, 10, 150),
          new CloseBlock(15, 9, 150, 10, 150),
          new CloseBlock(15, 10, 150, 10, 150),

        ]


      }
    }
    if (this.attackCounter === 190) {
      this.attackCounter = 0;
      ls.moveWall = [];

      for (let i = 0; i < ls.map.map.length; i++) {
        for (let j = 0; j < ls.map.map[0].length; j++) {
          if (ls.map.map[i][j] === 7) {
            ls.map.map[i][j] = 0;
          }
        }
      }
    }
  }

  private attack5() {
    if (this.health / this.startHealth > 0.7 || this.attackCounter === 50) {
      this.attackCounter = 0;
    } else {
      this.health += 5;
    }
  }

  private attack6(ls: levelSettings) {
    if (this.attackCounter === 30) {
      ls.sprites.push(
        { x: this.x - 1, y: this.y - 1, texture: 8, type: new Slime(this.x - 1, this.y - 1, 100, 2, 10) },
        { x: this.x - 1, y: this.y + 1, texture: 8, type: new Slime(this.x - 1, this.y + 1, 100, 2, 10) },
        { x: this.x + 1, y: this.y - 1, texture: 8, type: new Slime(this.x + 1, this.y - 1, 100, 2, 10) },
        { x: this.x + 1, y: this.y - 1, texture: 8, type: new Slime(this.x + 1, this.y + 1, 100, 2, 10) },
      )
    }

    if (this.attackCounter === 100) {
      this.attackCounter = 0;
    }
  }

  private attack7(ls: levelSettings) {
    if (this.attackCounter === 30) {
      ls.sprites.push(
        { x: this.x - 1, y: this.y, texture: 3, type: new Mage(this.x - 1, this.y, 10, 0.2, 50, 20) },
        { x: this.x + 1, y: this.y, texture: 3, type: new Mage(this.x + 1, this.y, 10, 0.2, 50, 20, 25) },
      )
    }

    if (this.attackCounter === 100) {
      this.attackCounter = 0;
    }
  }

  private attack8(ls: levelSettings) {
    if (this.attackCounter === 30) {
      ls.sprites.push(
        {
          x: this.x,
          y: this.y,
          texture: 19,
          type: new Skeleton(this.x, this.y, 300, 4, 20),
        },

      )
    }

    if (this.attackCounter === 100) {
      this.attackCounter = 0;
    }
  }

  private attack9(ls: levelSettings) {
    if (this.attackCounter === 30) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 14, type: new Ghost(this.x, this.y, 0.03, 1, 100, 500) },
      )
    }

    if (this.attackCounter === 100) {
      this.attackCounter = 0;
    }
  }

  private attack10(ls: levelSettings) {
    if (this.attackCounter < 30) {
      return;
    }

    if (this.attackCounter === 150) {
      this.attackCounter = 0;
    }

    const moveSpeed = this.speed / 100;

    const distance = Math.sqrt(
      (this.x - ls.player.posX) * (this.x - ls.player.posX) +
      (this.y - ls.player.posY) * (this.y - ls.player.posY),
    );
    if (distance < moveSpeed) {
      this.x = ls.player.posX;
      this.y = ls.player.posY;
      this.attackCounter = 0;
    } else {
      const xDif = this.x - ls.player.posX;
      const yDif = this.y - ls.player.posY;
      const angle = Math.atan2(yDif, xDif);
      const moveX = moveSpeed * Math.cos(angle);
      const moveY = moveSpeed * Math.sin(angle);
      this.x -= moveX;
      this.y -= moveY;
    }
  }

  private attack11(ls: levelSettings) {
    if (this.attackCounter === 30) {
      this.movePos = { x: ls.player.posY, y: ls.player.posX }
    }

    if (this.attackCounter < 30) {
      return;
    }

    if (this.chaseCounter == 30) {
      this.movePos = { x: ls.player.posY, y: ls.player.posX }
      this.chaseCounter = 0;
    }

    if (this.chaseCounter !== 0) {
      this.chaseCounter++
      return;
    }


    const moveSpeed = this.speed / 75;
    const distance = Math.sqrt((this.x - this.movePos.y) * (this.x - this.movePos.y) +
      (this.y - this.movePos.x) * (this.y - this.movePos.x));
    if (distance < moveSpeed) {
      this.x = this.movePos.y;
      this.y = this.movePos.x;
      this.chaseCounter = 1;
    } else {
      const xDif = this.x - this.movePos.y;
      const yDif = this.y - this.movePos.x;
      const angle = Math.atan2(yDif, xDif);
      const moveX = moveSpeed * Math.cos(angle);
      const moveY = moveSpeed * Math.sin(angle);
      this.x -= moveX;
      this.y -= moveY;
    }

    if (this.attackCounter >= 200) {
      this.attackCounter = 0;
    }

  }

  private attack12(ls: levelSettings) {
    if (this.attackCounter === 30 ||
      this.attackCounter === 46 ||
      this.attackCounter === 61 ||
      this.attackCounter === 77) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(1, 0.1, { x: this.x, y: this.y }) },
      )
    }

    if (this.attackCounter === 30 ||
      this.attackCounter === 38 ||
      this.attackCounter === 46 ||
      this.attackCounter === 53 ||
      this.attackCounter === 60 ||
      this.attackCounter === 68 ||
      this.attackCounter === 76 ||
      this.attackCounter === 84
    ) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(2, -0.1, { x: this.x, y: this.y }) },
      )
    }


    if (this.attackCounter === 150) {
      this.attackCounter = 0;
      for (let i = ls.sprites.length - 1; i > -1; i--) {
        if (ls.sprites[i].type instanceof SpikeBall) {
          ls.sprites.splice(i, 1);
        }
      }
    }
  }

  private attack13(ls: levelSettings) {
    if (this.attackCounter === 30) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(1, 0.03, { x: this.x, y: this.y }) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(1, 0.03, { x: this.x, y: this.y }, 180) },
      )
    }
    if (this.attackCounter === 40) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(2, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 10) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(2, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 10 + 180) },
      )
    }

    if (this.attackCounter === 50) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(3, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 20) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(3, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 20 + 180) },
      )
    }

    if (this.attackCounter === 60) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(4, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 30) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(4, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 30 + 180) },
      )
    }

    if (this.attackCounter === 70) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(5, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 40) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(5, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 40 + 180) },
      )
    }

    if (this.attackCounter === 80) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(6, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 50) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(6, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 50 + 180) },
      )
    }

    if (this.attackCounter === 90) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(7, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 60) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(7, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 60 + 180) },
      )
    }

    if (this.attackCounter === 100) {
      ls.sprites.push(
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(8, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 70) },
        { x: this.x, y: this.y, texture: 13, type: new SpikeBall(8, 0.03, { x: this.x, y: this.y }, 0.03 * 180 / Math.PI * 70 + 180) },
      )
    }





    if (this.attackCounter === 300) {
      this.attackCounter = 0;
      for (let i = ls.sprites.length - 1; i > -1; i--) {
        if (ls.sprites[i].type instanceof SpikeBall) {
          ls.sprites.splice(i, 1);
        }
      }
    }
  }

  update(ls: levelSettings) {
    if (this.attackCounter === 0) {
      this.attack = this.chooseAttack();
    }

    switch (this.attack) {
      case 1:
        this.attack1(ls);
        break;
      case 2:
        this.attack2(ls);
        break;
      case 3:
        this.attack3(ls);
        break;
      case 4:
        this.attack4(ls);
        break;
      case 5:
        this.attack5();
        break;
      case 6:
        this.attack6(ls);
        break;
      case 7:
        this.attack7(ls);
        break;
      case 8:
        this.attack8(ls);
        break;
      case 9:
        this.attack9(ls);
        break;
      case 10:
        this.attack10(ls);
        break;
      case 11:
        this.attack11(ls);
        break;
      case 12:
        this.attack12(ls);
        break;
      case 13:
        this.attack13(ls);
        break;

      default:
        this.moveUpdate(ls.map.map);
        break;
    }
    if (this.attackCounter !== 0) {
      this.attackCounter += 1;
    }
  }

  moveUpdate(map: number[][]) {
    const moveSpeed = this.speed / 100;
    const distance = Math.sqrt((this.x - this.movePos.y) * (this.x - this.movePos.y) +
      (this.y - this.movePos.x) * (this.y - this.movePos.x));
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
    if (this.deadCounter === 0) {
      c.fillStyle = "#e74c3c";
      c.fillRect(canvas.width / 2 - (this.health * UIRatio) / (this.startHealth / 1000) / 20, UIRatio, (this.health * UIRatio) / (this.startHealth / 1000) / 10, 5 * UIRatio);
    }
  }
}
