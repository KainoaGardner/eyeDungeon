import { levelSettings, getPlayerDirection } from "./levels";
import { FireballWall } from "./fireball";
import { SpikeBall } from "./spikeball";
import { sfxSounds } from "./sounds"

let fireballCount = 0;
let spikeballCount = 0;

function level7Update(ls: levelSettings) {
  const playerXBlock = Math.floor(ls.player.posX);
  const playerYBlock = Math.floor(ls.player.posY);

  const playerBlock = ls.map.map[playerXBlock][playerYBlock];

  if (playerBlock === 14) {
    const tpBlock = playerXBlock.toString() + "," + playerYBlock;
    switch (tpBlock) {
      case "16,12":
        sfxSounds[41].play();
        lampRoom(ls);
        break;
      case "17,12":
        enemyRoom1(ls);
        sfxSounds[41].play();
        break;
      case "18,12":
        wallRoom(ls);
        sfxSounds[41].play();
        break;
      case "19,12":
        walkRoom(ls);
        sfxSounds[41].play();
        break;
      case "20,12":
        fireballRoom(ls);
        sfxSounds[41].play();
        break;
      case "21,12":
        enemyRoom2(ls);
        sfxSounds[41].play();
        break;
      case "22,12":
        strikeballRoom(ls);
        sfxSounds[41].play();
        break;
      default:
        ls.player.posX = 19.5;
        ls.player.posY = 9.5;
        const direction = getPlayerDirection(-90);
        ls.player.dirX = direction.dirX;
        ls.player.dirY = direction.dirY;
        ls.player.planeX = direction.planeX;
        ls.player.planeY = direction.planeY;
        ls.map.brightness = 0.5;

        break;
    }

    ls.map.map[playerXBlock][playerYBlock] = 1;
  }

  if (fireballCount !== 0) {
    fireballCount++;
  }

  if (fireballCount === 500) {
    fireballRoomEnd(ls);
    fireballCount = 0;
  }

  if (spikeballCount !== 0) {
    spikeballCount++;
  }

  if (spikeballCount === 500) {
    spikeballRoomEnd(ls);
    spikeballCount = 0;
  }

  if (lampComplete(ls.map.map)) {
    ls.map.map[17][2] = 0;
    ls.map.map[17][4] = 0;
    ls.map.map[17][6] = 0;
    ls.map.map[19][2] = 0;
    ls.map.map[19][4] = 14;
    ls.map.map[19][6] = 0;
    ls.map.map[21][2] = 0;
    ls.map.map[21][4] = 0;
    ls.map.map[21][6] = 0;

    ls.map.map[17][2] = 8;
    ls.player.posX = 19.5;
    ls.player.posY = 9.5;
    const direction = getPlayerDirection(-90);
    ls.player.dirX = direction.dirX;
    ls.player.dirY = direction.dirY;
    ls.player.planeX = direction.planeX;
    ls.player.planeY = direction.planeY;
    ls.map.brightness = 0.5;
  }

  if (checkClear(ls)) {
    ls.map.map[16][12] = 1;
    ls.map.map[17][12] = 1;
    ls.map.map[18][12] = 1;
    ls.map.map[19][12] = 4;
    ls.map.map[20][12] = 1;
    ls.map.map[21][12] = 1;
    ls.map.map[22][12] = 1;
  }
}

function level7BlockHit(xHit: number, yHit: number, ls: levelSettings) {
  lampSwap(xHit, yHit, ls);
  lampSwap(xHit - 2, yHit, ls);
  lampSwap(xHit + 2, yHit, ls);
  lampSwap(xHit, yHit - 2, ls);
  lampSwap(xHit, yHit + 2, ls);
}

function lampSwap(xHit: number, yHit: number, ls: levelSettings) {
  const block = ls.map.map[xHit][yHit];
  if (block === 8) {
    ls.map.map[xHit][yHit] = 9;
  } else if (block === 9) {
    ls.map.map[xHit][yHit] = 8;
  }
}

function lampComplete(map: number[][]) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const state = map[17 + i * 2][2 + j * 2];
      if (state !== 9) {
        return false;
      }
    }
  }

  return true;
}

function lampRoom(ls: levelSettings) {
  ls.map.map[17][2] = 9;
  ls.map.map[17][4] = 9;
  ls.map.map[17][6] = 9;
  ls.map.map[19][2] = 9;
  ls.map.map[19][4] = 9;
  ls.map.map[19][6] = 9;
  ls.map.map[21][2] = 9;
  ls.map.map[21][4] = 9;
  ls.map.map[21][6] = 9;

  while (lampComplete(ls.map.map)) {
    for (let i = 0; i < Math.floor(5 + Math.random() * 5); i++) {
      const choice = Math.floor(Math.random() * 9);
      let xHit = 0;
      let yHit = 0;
      switch (choice) {
        case 0:
          xHit = 17;
          yHit = 2;
          break;
        case 1:
          xHit = 17;
          yHit = 4;
          break;
        case 2:
          xHit = 17;
          yHit = 6;
          break;
        case 3:
          xHit = 19;
          yHit = 2;
          break;
        case 4:
          xHit = 19;
          yHit = 4;
          break;
        case 5:
          xHit = 19;
          yHit = 6;
          break;
        case 6:
          xHit = 21;
          yHit = 2;
          break;
        case 7:
          xHit = 21;
          yHit = 4;
          break;
        case 8:
          xHit = 21;
          yHit = 6;
          break;
      }
      level7BlockHit(xHit, yHit, ls);
    }
  }

  ls.player.posX = 16.5;
  ls.player.posY = 1.5;
  const direction = getPlayerDirection(-45);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

function walkRoom(ls: levelSettings) {
  ls.player.posX = 2;
  ls.player.posY = 1.5;
  const direction = getPlayerDirection(-90);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
  ls.map.brightness = 0.2;
}

function enemyRoom1(ls: levelSettings) {
  ls.player.posX = 22.5;
  ls.player.posY = 14.5;
  const direction = getPlayerDirection(-90);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

function enemyRoom2(ls: levelSettings) {
  ls.player.posX = 11.5;
  ls.player.posY = 27.5;
  const direction = getPlayerDirection(135);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

function wallRoom(ls: levelSettings) {
  ls.player.posX = 14.5;
  ls.player.posY = 3;
  const direction = getPlayerDirection(180);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

function fireballRoom(ls: levelSettings) {
  ls.player.posX = 8;
  ls.player.posY = 16;
  const direction = getPlayerDirection(-90);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;

  fireballCount = 1;

  ls.fireWall = [
    new FireballWall(4.5, 13.5, 0.1, 0, 500, 120),
    new FireballWall(4.5, 14.5, 0.1, 0, 500, 100),
    new FireballWall(4.5, 15.5, 0.1, 0, 500, 80),
    new FireballWall(4.5, 16.5, 0.1, 0, 500, 60),
    new FireballWall(4.5, 17.5, 0.1, 0, 500, 40),
    new FireballWall(4.5, 18.5, 0.1, 0, 500, 20),

    new FireballWall(5.5, 12.5, 0, 0.1, 500, 140),
    new FireballWall(6.5, 12.5, 0, 0.1, 500, 160),
    new FireballWall(7.5, 12.5, 0, 0.1, 500, 180),
    new FireballWall(8.5, 12.5, 0, 0.1, 500, 200),
    new FireballWall(9.5, 12.5, 0, 0.1, 500, 220),
    new FireballWall(10.5, 12.5, 0, 0.1, 500, 240),

    new FireballWall(11.5, 13.5, -0.1, 0, 500, 260),
    new FireballWall(11.5, 14.5, -0.1, 0, 500, 280),
    new FireballWall(11.5, 15.5, -0.1, 0, 500, 300),
    new FireballWall(11.5, 16.5, -0.1, 0, 500, 320),
    new FireballWall(11.5, 17.5, -0.1, 0, 500, 340),
    new FireballWall(11.5, 18.5, -0.1, 0, 500, 360),

    new FireballWall(5.5, 19.5, 0, -0.1, 500, 480),
    new FireballWall(6.5, 19.5, 0, -0.1, 500, 460),
    new FireballWall(7.5, 19.5, 0, -0.1, 500, 440),
    new FireballWall(8.5, 19.5, 0, -0.1, 500, 420),
    new FireballWall(9.5, 19.5, 0, -0.1, 500, 400),
    new FireballWall(10.5, 19.5, 0, -0.1, 500, 380),
  ];
}

function strikeballRoom(ls: levelSettings) {
  ls.player.posX = 16.5;
  ls.player.posY = 28.5;
  const direction = getPlayerDirection(0);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;

  spikeballCount = 1;

  ls.sprites.push(
    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(2, -0.03, { x: 19.5, y: 24.5 }, 90),
    },
    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(3, -0.03, { x: 19.5, y: 24.5 }, 90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(6, -0.03, { x: 19.5, y: 24.5 }, 90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(7, -0.03, { x: 19.5, y: 24.5 }, 90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(1, -0.03, { x: 19.5, y: 24.5 }, -90),
    },
    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(2, -0.03, { x: 19.5, y: 24.5 }, -90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(3, -0.03, { x: 19.5, y: 24.5 }, -90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(4, -0.03, { x: 19.5, y: 24.5 }, -90),
    },

    {
      x: 19.5,
      y: 24.5,
      texture: 13,
      type: new SpikeBall(7, -0.03, { x: 19.5, y: 24.5 }, -90),
    },

    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(1, 0.03, { x: 19.5, y: 31.5 }, 0),
    },
    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(4, 0.03, { x: 19.5, y: 31.5 }, 0),
    },

    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(5, 0.03, { x: 19.5, y: 31.5 }, 0),
    },

    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(6, 0.03, { x: 19.5, y: 31.5 }, 0),
    },

    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(1, 0.03, { x: 19.5, y: 31.5 }, 180),
    },
    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(2, 0.03, { x: 19.5, y: 31.5 }, 180),
    },

    {
      x: 19.5,
      y: 31.5,
      texture: 13,
      type: new SpikeBall(3, 0.03, { x: 19.5, y: 31.5 }, 180),
    },
  );
}

function fireballRoomEnd(ls: levelSettings) {
  ls.map.map[4][13] = 1;
  ls.map.map[4][14] = 1;
  ls.map.map[4][15] = 1;
  ls.map.map[4][16] = 1;
  ls.map.map[4][17] = 1;
  ls.map.map[4][18] = 14;

  ls.map.map[11][13] = 1;
  ls.map.map[11][14] = 1;
  ls.map.map[11][15] = 1;
  ls.map.map[11][16] = 1;
  ls.map.map[11][17] = 1;
  ls.map.map[11][18] = 1;

  ls.map.map[5][12] = 1;
  ls.map.map[6][12] = 1;
  ls.map.map[7][12] = 1;
  ls.map.map[8][12] = 1;
  ls.map.map[9][12] = 1;
  ls.map.map[10][12] = 1;

  ls.map.map[5][19] = 1;
  ls.map.map[6][19] = 1;
  ls.map.map[7][19] = 1;
  ls.map.map[8][19] = 1;
  ls.map.map[9][19] = 1;
  ls.map.map[10][19] = 1;

  ls.fireWall = [];
}

function spikeballRoomEnd(ls: levelSettings) {
  ls.map.map[22][25] = 1;
  ls.map.map[21][25] = 1;
  ls.map.map[20][25] = 1;
  ls.map.map[19][25] = 1;
  ls.map.map[18][25] = 1;
  ls.map.map[17][25] = 1;
  ls.map.map[16][25] = 1;

  ls.map.map[22][31] = 1;
  ls.map.map[21][31] = 1;
  ls.map.map[20][31] = 1;
  ls.map.map[19][31] = 1;
  ls.map.map[18][31] = 1;
  ls.map.map[17][31] = 1;
  ls.map.map[16][31] = 1;

  ls.map.map[23][28] = 14;

  for (let i = ls.sprites.length - 1; i > -1; i--) {
    if (ls.sprites[i].type instanceof SpikeBall) {
      ls.sprites.splice(i, 1);
    }
  }
}

function checkClear(ls: levelSettings) {
  for (let i = 0; i < 7; i++) {
    if (ls.map.map[16 + i][12] !== 1) {
      return false;
    }
  }

  return true;
}

export { level7Update, level7BlockHit };
