interface sprite {
  x: number;
  y: number;
  texture: number;
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

export { sortSprites, type sprite, type spriteOrder, spriteDistance };
