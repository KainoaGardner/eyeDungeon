import { levelSettings, getPlayerDirection } from "./levels";

function level7Update(ls: levelSettings) {
  const playerXBlock = Math.floor(ls.player.posX);
  const playerYBlock = Math.floor(ls.player.posY);

  const playerBlock = ls.map.map[playerXBlock][playerYBlock];

  if (playerBlock === 14) {
    const tpBlock = playerXBlock.toString() + "," + playerYBlock;
    switch (tpBlock) {
      case "16,12":
        lampRoom(ls);
        break;
      case "17,12":
        enemyRoom1(ls);
        break;
      case "18,12":
        wallRoom(ls);
        break;
      case "19,12":
        walkRoom(ls);
        break;
      case "20,12":
        fireballRoom(ls);
        break;
      case "21,12":
        enemyRoom2(ls);
        break;
      case "22,12":
        strikeballRoom(ls);
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
  const direction = getPlayerDirection(90);
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
  const direction = getPlayerDirection(180);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

function strikeballRoom(ls: levelSettings) {
  ls.player.posX = 17.5;
  ls.player.posY = 25.5;
  const direction = getPlayerDirection(-45);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
}

export { level7Update, level7BlockHit };
