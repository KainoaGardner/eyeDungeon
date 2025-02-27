import { Fireball } from "./fireball";
import { levelSettings } from "./levels";
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
    if (ls.sprites[i].type instanceof Fireball) {
      const sprite = ls.sprites[i];
      sprite.type.update(ls.map.map);
      sprite.x = sprite.type.x;
      sprite.y = sprite.type.y;
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
