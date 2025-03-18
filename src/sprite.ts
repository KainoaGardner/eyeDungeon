import { Fireball } from "./fireball";
import { levelSettings } from "./levels";
import { Teleport } from "./player";
import { Slime, Mage, Ghost, Skeleton } from "./enemy";
import { Boss } from "./boss";
import { SpikeBall } from "./spikeball";
import { Bullet } from "./player";

interface sprite {
  x: number;
  y: number;
  texture: number;
  type: any;
}

interface spriteOrder {
  index: number;
  distance: number;
}

const spriteDistance: spriteOrder[] = [];

function sortSprites(spriteDistance: spriteOrder[]) {
  spriteDistance.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });
}

function spriteUpdate(ls: levelSettings) {
  for (let i = ls.sprites.length - 1; i > -1; i--) {
    const sprite = ls.sprites[i];
    if (ls.sprites[i].type instanceof Fireball) {
      sprite.type.update(ls.map.map);
      sprite.type.reflectDamage(ls);
      sprite.x = sprite.type.x;
      sprite.y = sprite.type.y;

      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Bullet) {
      sprite.type.update(ls);
      sprite.type.hitEnemy(ls);
      sprite.x = sprite.type.x;
      sprite.y = sprite.type.y;

      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Teleport) {
      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Mage) {
      if (sprite.type.deadCounter === 0) {
        sprite.type.update(ls);
      }

      sprite.type.hurtUpdate();

      if (sprite.type.deadCounter > 0 && sprite.type.deadCounter < 10) {
        sprite.texture = 6;
      } else if (sprite.type.deadCounter > 9) {
        sprite.texture = 7;
      } else if (sprite.type.shootCount > sprite.type.shootTimer - 15) {
        sprite.texture = 4;
      } else if (sprite.type.hurtCounter > 0) {
        sprite.texture = 5;
      } else {
        sprite.texture = 3;
      }

      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Slime) {
      if (sprite.type.deadCounter === 0) {
        sprite.x = sprite.type.x;
        sprite.y = sprite.type.y;

        sprite.type.walkCounterUpdate();
        sprite.type.moveUpdate(
          { x: ls.player.posX, y: ls.player.posY },
          ls.map.map,
        );
      }

      sprite.type.hurtUpdate();
      if (sprite.type.deadCounter > 0 && sprite.type.deadCounter < 10) {
        sprite.texture = 11;
      } else if (sprite.type.deadCounter > 9) {
        sprite.texture = 12;
      } else if (sprite.type.hurtCounter > 0) {
        sprite.texture = 10;
      } else if (sprite.type.walkCounter > 15) {
        sprite.texture = 9;
      } else {
        sprite.texture = 8;
      }
      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof SpikeBall) {
      sprite.type.update();
      sprite.x = sprite.type.x;
      sprite.y = sprite.type.y;
    } else if (ls.sprites[i].type instanceof Ghost) {
      if (sprite.type.deadCounter === 0) {
        sprite.x = sprite.type.x;
        sprite.y = sprite.type.y;

        sprite.type.update(ls);
      }

      sprite.type.hurtUpdate();
      if (sprite.type.deadCounter > 0 && sprite.type.deadCounter < 10) {
        sprite.texture = 16;
      } else if (sprite.type.deadCounter > 9) {
        sprite.texture = 17;
      } else if (sprite.type.walkCounter > 15) {
        sprite.texture = 14;
      } else {
        sprite.texture = 14;
      }
      if (!sprite.type.alive) {
        sprite.type.killed(ls);
      }

      if (sprite.type.timeCounter > sprite.type.timeLimit) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Skeleton) {
      if (sprite.type.deadCounter === 0) {
        sprite.x = sprite.type.x;
        sprite.y = sprite.type.y;

        sprite.type.walkCounterUpdate();
        sprite.type.moveUpdate(
          { x: ls.player.posX, y: ls.player.posY },
          ls.map.map,
        );
      }

      sprite.type.hurtUpdate();
      if (sprite.type.deadCounter > 0 && sprite.type.deadCounter < 10) {
        sprite.texture = 23;
      } else if (sprite.type.deadCounter > 9) {
        sprite.texture = 22;
      } else if (sprite.type.hurtCounter > 0) {
        sprite.texture = 21;
      } else if (sprite.type.walkCounter > 15) {
        sprite.texture = 19;
      } else {
        sprite.texture = 20;
      }
      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    } else if (ls.sprites[i].type instanceof Boss) {
      if (sprite.type.deadCounter === 0) {
        sprite.x = sprite.type.x;
        sprite.y = sprite.type.y;

        sprite.type.update(ls);
      }

      sprite.type.hurtUpdate();
      if (sprite.type.deadCounter > 0 && sprite.type.deadCounter < 20) {
        sprite.texture = 31;
      } else if (sprite.type.deadCounter > 19 && sprite.type.deadCounter < 40) {
        sprite.texture = 32;
      } else if (sprite.type.deadCounter > 39) {
        sprite.texture = 33;
      } else if (sprite.type.hurtCounter > 0) {
        sprite.texture = 30;
      } else {
        switch (sprite.type.attack) {
          case 1:
          case 2:
            sprite.texture = 25;
            break;
          case 3:
          case 4:
            sprite.texture = 26;
            break;
          case 5:
          case 6:
            sprite.texture = 27;
            break;
          case 7:
          case 8:
            sprite.texture = 28;
            break;
          case 9:
          case 10:
            sprite.texture = 29;
            break;

          default:
            sprite.texture = 24;
            break;
        }
      }
      if (!sprite.type.alive) {
        ls.sprites.splice(i, 1);
      }
    }
  }
}

export {
  sortSprites,
  type sprite,
  type spriteOrder,
  spriteDistance,
  spriteUpdate,
};
