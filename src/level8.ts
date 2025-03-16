import { levelSettings } from "./levels";
import { Slime, Mage, Ghost } from "./enemy";

let timer = 0;

function level8Update(ls: levelSettings) {
  if (timer < 3000) {
    timer++;
  }

  if (timer === 3000) {
    ls.map.map[0][10] = 4;
    ls.map.map[20][10] = 4;
    ls.map.map[10][0] = 4;
    ls.map.map[10][20] = 4;
    console.log("over");
  }

  if (timer === 500) {
    ls.sprites.push({
      x: 6.5,
      y: 6.5,
      texture: 14,
      type: new Ghost(6.5, 6.5, 0.01, 1, 100),
    });

    ls.sprites.push({
      x: 14.5,
      y: 14.5,
      texture: 14,
      type: new Ghost(14.5, 14.5, 0.01, 1, 100),
    });
  }

  if (timer === 1000) {
    ls.sprites.push(
      {
        x: 4.5,
        y: 4.5,
        texture: 3,
        type: new Mage(4.5, 4.5, 10, 0.15, 200, 20),
      },
      {
        x: 4.5,
        y: 16.5,
        texture: 3,
        type: new Mage(4.5, 16.5, 10, 0.15, 200, 20, 50),
      },
      {
        x: 16.5,
        y: 4.5,
        texture: 3,
        type: new Mage(16.5, 4.5, 10, 0.15, 200, 20, 100),
      },
      {
        x: 16.5,
        y: 16.5,
        texture: 3,
        type: new Mage(16.5, 16.5, 10, 0.15, 200, 20, 150),
      },
    );
  }
  if (timer === 1500) {
    ls.sprites.push(
      {
        x: 3.5,
        y: 3.5,
        texture: 5,
        type: new Slime(3.5, 3.5, 100, 2, 10),
      },
      {
        x: 3.5,
        y: 17.5,
        texture: 5,
        type: new Slime(3.5, 17.5, 100, 2, 10),
      },
      {
        x: 17.5,
        y: 3.5,
        texture: 5,
        type: new Slime(17.5, 3.5, 100, 2, 10),
      },
      {
        x: 17.5,
        y: 17.5,
        texture: 5,
        type: new Slime(17.5, 17.5, 100, 2, 10),
      },
    );
  }

  if (timer === 2000) {
    ls.sprites.push(
      { x: 1.5, y: 10.5, texture: 5, type: new Slime(1.5, 10.5, 50, 2, 20) },
      { x: 19.5, y: 10.5, texture: 5, type: new Slime(19.5, 10.5, 50, 2, 20) },

      { x: 10.5, y: 1.5, texture: 5, type: new Slime(10.5, 1.5, 50, 2, 20) },
      { x: 10.5, y: 19.5, texture: 5, type: new Slime(10.5, 19.5, 50, 2, 20) },

      { x: 3.5, y: 3.5, texture: 5, type: new Slime(3.5, 3.5, 100, 1, 20) },
      { x: 17.5, y: 3.5, texture: 5, type: new Slime(17.5, 3.5, 100, 1, 20) },

      { x: 3.5, y: 17.5, texture: 5, type: new Slime(3.5, 17.5, 100, 1, 20) },
      { x: 17.5, y: 17.5, texture: 5, type: new Slime(17.5, 17.5, 100, 1, 20) },
    );
  }

  if (timer === 2500) {
    ls.sprites.push(
      {
        x: 1.5,
        y: 10.5,
        texture: 3,
        type: new Mage(1.5, 10.5, 10, 0.15, 200, 20),
      },
      {
        x: 10.5,
        y: 1.5,
        texture: 3,
        type: new Mage(10.5, 1.5, 10, 0.15, 200, 20, 50),
      },
      {
        x: 10.5,
        y: 19.5,
        texture: 3,
        type: new Mage(10.5, 19.5, 10, 0.15, 200, 20, 100),
      },
      {
        x: 19.5,
        y: 10.5,
        texture: 3,
        type: new Mage(19.5, 10.5, 10, 0.15, 200, 20, 150),
      },
    );
  }

  if (timer === 3000) {
    ls.sprites.push({
      x: 6.5,
      y: 14.5,
      texture: 14,
      type: new Ghost(6.5, 14.5, 0.01, 1, 100),
    });

    ls.sprites.push({
      x: 14.5,
      y: 6.5,
      texture: 14,
      type: new Ghost(14.5, 6.5, 0.01, 1, 100),
    });
  }
}

export { level8Update };
