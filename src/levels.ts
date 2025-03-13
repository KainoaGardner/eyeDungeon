import { Player } from "./player";
import { Map } from "./map";
import { makeMap } from "./maze";
import { sprite } from "./sprite";
import { CloseBlock } from "./closeblock";
import { FireballWall } from "./fireball";
import { Slime, Mage, Ghost } from "./enemy";
import { SpikeBall } from "./spikeball";

interface direction {
  dirX: number;
  dirY: number;
  planeX: number;
  planeY: number;
}
function getPlayerDirection(angle: number): direction {
  angle = (angle * Math.PI) / 180;
  let dirX = 1;
  let dirY = 0;
  let planeX = 0;
  let planeY = -1;

  dirX = Math.cos(-angle);
  dirY = Math.sin(-angle);

  planeX = Math.sin(-angle);
  planeY = -Math.cos(-angle);

  return { dirX: dirX, dirY: dirY, planeX: planeX, planeY: planeY };
}

interface levelSettings {
  level: number;
  player: Player;
  map: Map;
  sprites: sprite[];
  moveWall: CloseBlock[];
  fireWall: FireballWall[];
  floorTex: number;
  ceilingTex: number;
}

function setLevel(ls: levelSettings) {
  switch (ls.level) {
    case 1:
      level1(ls);
      break;
    case 2:
      level2(ls);
      break;
    case 3:
      level3(ls);
      break;
    case 4:
      level4(ls);
      break;
    case 5:
      level5(ls);
      break;
    case 6:
      level6(ls);
      break;

    default:
      level0(ls);
      break;
  }
}

function level1(ls: levelSettings) {
  //player
  const direction = getPlayerDirection(-90);
  ls.player.posX = 1.5;
  ls.player.posY = 1.5;
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
  ls.player.holding = 1;

  ls.player.inventory = {
    flashlight: true,
    gun: false,
    run: false,
    horn: false,
    sword: false,
    sheild: false,
    dash: false,
    teleport: false,
  };

  //map

  ls.map.map = [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 0, 0, 0, 6, 0, 0, 0,
      1, 6, 0, 0, 0, 4, 1,
    ],
    [
      1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 6, 0, 0, 1, 0, 5,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2,
      1, 6, 0, 0, 1, 0, 5,
    ],
    [
      1, 1, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
      1, 6, 0, 1, 1, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 6, 0, 1, 0, 0,
      0, 0, 0, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 6,
      0, 0, 0, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 1, 1, 6, 0, 2, 0, 1, 0, 1, 0, 6,
      0, 0, 6, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 1, 1, 1, 6, 6, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 1, 1, 1, 2, 5, 1,
    ],
    [
      1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1, 5, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 2, 2, 1, 6, 6, 1, 1, 6, 6, 1, 1, 6, 6, 1, 2, 2, 0, 0, 0, 0, 6, 1, 1, 0,
      1, 0, 1, 1, 1, 0, 1,
    ],
    [
      1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 0, 1, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      1, 1, 1, 2, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 0,
      1, 0, 0, 0, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 5, 5, 1, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5,
      1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  ls.moveWall = [
    new CloseBlock(5, 3, 50, 30),
    new CloseBlock(5, 5, 50, 30),
    new CloseBlock(5, 7, 50, 30),
    new CloseBlock(5, 9, 50, 30),
    new CloseBlock(5, 11, 50, 30),

    new CloseBlock(6, 4, 50, 30),
    new CloseBlock(6, 6, 50, 30),
    new CloseBlock(6, 8, 50, 30),
    new CloseBlock(6, 10, 50, 30),
    new CloseBlock(6, 12, 50, 30),

    new CloseBlock(9, 4, 100, 20),
    new CloseBlock(9, 5, 100, 20),
    new CloseBlock(9, 6, 100, 20, 60),
    new CloseBlock(9, 7, 100, 20, 60),
    new CloseBlock(9, 8, 100, 20),
    new CloseBlock(9, 9, 100, 20),
    new CloseBlock(9, 10, 100, 20, 60),
    new CloseBlock(9, 11, 100, 20, 60),
    new CloseBlock(9, 12, 100, 20),
    new CloseBlock(9, 13, 100, 20),

    new CloseBlock(9, 15, 50, 30),
    new CloseBlock(10, 16, 50, 30),
    new CloseBlock(10, 20, 50, 30),
    new CloseBlock(9, 21, 50, 30),

    new CloseBlock(4, 20, 50, 30),
    new CloseBlock(5, 19, 50, 30),
    new CloseBlock(5, 21, 50, 30),

    new CloseBlock(6, 16, 50, 30),
    new CloseBlock(7, 17, 50, 30),

    new CloseBlock(3, 16, 50, 30),
    new CloseBlock(2, 17, 50, 30),
    new CloseBlock(1, 18, 50, 30),

    new CloseBlock(1, 20, 50, 30),
    new CloseBlock(2, 21, 50, 30),
    new CloseBlock(1, 22, 50, 30),

    new CloseBlock(5, 24, 50, 30),
    new CloseBlock(6, 23, 50, 30),
    new CloseBlock(7, 23, 50, 30),
    new CloseBlock(6, 25, 50, 30),
    new CloseBlock(7, 25, 50, 30),

    new CloseBlock(7, 26, 50, 30),
    new CloseBlock(6, 27, 50, 30),

    new CloseBlock(5, 26, 50, 30),
    new CloseBlock(4, 27, 50, 30),
    new CloseBlock(3, 27, 50, 30),
    new CloseBlock(2, 27, 50, 30),
    new CloseBlock(1, 27, 50, 30),
  ];

  ls.fireWall = [
    new FireballWall(1.5, 15.5, 0, -0.1, 100),
    new FireballWall(2.5, 15.5, 0, -0.1, 100, 50),

    new FireballWall(15.5, 1.5, -0.1, 0, 100),
    new FireballWall(15.5, 2.5, -0.1, 0, 100, 50),

    new FireballWall(15.5, 4.5, -0.1, 0, 100, 100),
    new FireballWall(15.5, 5.5, -0.1, 0, 100, 80),
    new FireballWall(15.5, 6.5, -0.1, 0, 100, 60),
    new FireballWall(15.5, 7.5, -0.1, 0, 100, 40),
    new FireballWall(15.5, 8.5, -0.1, 0, 100, 20),

    new FireballWall(15.5, 10.5, -0.1, 0, 100, 0),
    new FireballWall(15.5, 11.5, -0.1, 0, 100, 80),
    new FireballWall(15.5, 12.5, -0.1, 0, 100, 60),
    new FireballWall(15.5, 13.5, -0.1, 0, 100, 40),
    new FireballWall(15.5, 14.5, -0.1, 0, 100, 20),

    new FireballWall(15.5, 19.5, -0.1, 0, 50),

    new FireballWall(15.5, 24.5, -0.1, 0, 150),

    new FireballWall(9.5, 23, 0, 0.1, 150),

    new FireballWall(14.5, 31.5, 0, -0.1, 150),

    new FireballWall(8.5, 30.5, -0.1, 0, 150),
    new FireballWall(8.5, 30.5, 0, -0.1, 150),
    new FireballWall(8.5, 30.5, 0.1, 0, 150),

    new FireballWall(2.5, 31.5, 0, -0.1, 150, 0),
    new FireballWall(3.5, 31.5, 0, -0.1, 150, 50),
    new FireballWall(4.5, 31.5, 0, -0.1, 150, 100),
  ];

  ls.map.brightness = 0.2;
  ls.floorTex = 0;
  ls.ceilingTex = 1;
  ls.sprites = [];
}
function level2(ls: levelSettings) {
  //player
  ls.player.posX = 1.5;
  ls.player.posY = 1.5;
  ls.player.dirX = 1;
  ls.player.dirY = 0;
  ls.player.planeX = 0;
  ls.player.planeY = -1;
  ls.player.holding = 2;

  ls.player.inventory = {
    flashlight: true,
    gun: false,
    run: false,
    horn: false,
    sword: true,
    sheild: false,
    dash: false,

    teleport: false,
  };

  //map

  ls.map.map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [1, 0, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 1, 10, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 6, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 1],
    [1, 5, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [1, 0, 0, 0, 1, 6, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 10, 0, 1, 6, 6, 6, 6, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 10, 0, 2, 0, 0, 0, 0, 2, 4, 1],
    [1, 1, 1, 1, 1, 6, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  ls.map.lightList = [];
  ls.map.brightness = 0.5;

  ls.moveWall = [
    new CloseBlock(3, 10, 50, 50),
    new CloseBlock(5, 10, 50, 50, 50),
    new CloseBlock(13, 5, 50, 50),
    new CloseBlock(14, 5, 50, 50),

    new CloseBlock(14, 9, 100, 25, 75),
    new CloseBlock(14, 10, 100, 25, 50),
    new CloseBlock(14, 11, 100, 25, 25),
    new CloseBlock(14, 12, 100, 25),
  ];
  ls.fireWall = [
    new FireballWall(4.5, 7.5, 0, -0.1, 150),
    new FireballWall(1.5, 15.5, 0, -0.1, 100),
    new FireballWall(8.5, 0.5, 0, 0.1, 100),
    new FireballWall(7.5, 1.5, 0.1, 0, 100),
    new FireballWall(15.5, 7.5, -0.1, 0, 150),
    new FireballWall(11.5, 15.5, 0, -0.1, 150),
    new FireballWall(11.5, 15.5, 0, -0.1, 150),
    new FireballWall(11.5, 5.5, 0, -0.1, 100),
  ];
  ls.floorTex = 4;
  ls.ceilingTex = 1;

  ls.sprites = [
    { x: 4.5, y: 6.5, texture: 5, type: new Slime(4.5, 6.5, 100, 2, 5) },

    { x: 8.5, y: 13.5, texture: 5, type: new Slime(8.5, 13.5, 50, 2, 5) },
    { x: 8, y: 11.5, texture: 5, type: new Slime(8, 11.5, 50, 2, 6) },
    { x: 4.5, y: 13.5, texture: 5, type: new Slime(4.5, 13.5, 50, 2, 6) },

    { x: 8, y: 2.5, texture: 5, type: new Slime(8, 2.5, 100, 3, 10) },
    { x: 10, y: 3.5, texture: 5, type: new Slime(10, 3.5, 100, 2, 8) },
    { x: 12, y: 3, texture: 5, type: new Slime(12, 3, 100, 2, 6) },
    { x: 14, y: 2.5, texture: 5, type: new Slime(14, 2.5, 100, 2, 6) },
    { x: 13.5, y: 4.5, texture: 5, type: new Slime(13.5, 4.5, 100, 2, 4) },
  ];
}
function level3(ls: levelSettings) {
  //player
  ls.player.posX = 1.5;
  ls.player.posY = 1.5;
  const direction = getPlayerDirection(-90);
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;

  ls.player.inventory = {
    flashlight: true,
    gun: false,
    run: true,
    horn: false,
    sword: true,
    sheild: false,
    dash: false,
    teleport: false,
  };

  //map

  ls.map.map = [
    [
      1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 5,
    ],
    [
      1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 10, 10, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 10, 10, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 10, 10, 1, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 13, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      6, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 1,
    ],
    [
      6, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  ls.map.lightList = [];
  ls.map.brightness = 0.5;

  ls.moveWall = [
    new CloseBlock(1, 4, 100, 20, 90),
    new CloseBlock(1, 5, 100, 20, 80),
    new CloseBlock(1, 6, 100, 20, 70),
    new CloseBlock(1, 7, 100, 20, 60),

    new CloseBlock(1, 8, 100, 20, 50),
    new CloseBlock(1, 9, 100, 20, 40),
    new CloseBlock(1, 10, 100, 20, 30),
    new CloseBlock(1, 11, 100, 20, 20),
    new CloseBlock(1, 12, 100, 20, 10),

    new CloseBlock(30, 1, 60, 20),
    new CloseBlock(29, 1, 60, 20, 10),
    new CloseBlock(28, 1, 60, 20, 20),
    new CloseBlock(27, 1, 60, 20, 30),
    new CloseBlock(26, 1, 60, 20, 40),
    new CloseBlock(25, 1, 60, 20, 50),
    new CloseBlock(24, 1, 60, 20, 60),
  ];

  ls.fireWall = [
    new FireballWall(3.5, 14.5, 0, 0.1, 200),
    new FireballWall(4.5, 14.5, 0, 0.1, 200),
    new FireballWall(5.5, 14.5, 0, 0.1, 200),
    new FireballWall(6.5, 14.5, 0, 0.1, 200),
    new FireballWall(7.5, 14.5, 0, 0.1, 200),
    new FireballWall(8.5, 14.5, 0, 0.1, 200),
    new FireballWall(9.5, 14.5, 0, 0.1, 200),

    new FireballWall(1.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(2.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(3.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(4.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(5.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(6.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(7.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(8.5, 31.5, 0, -0.1, 200, 100),
    new FireballWall(9.5, 31.5, 0, -0.1, 200, 100),

    new FireballWall(13.5, 13.5, 0, 0.1, 100),
    new FireballWall(14.5, 31.5, 0, -0.1, 100),

    new FireballWall(3.5, 11.5, 0.1, 0, 30),

    new FireballWall(3.5, 1.5, 0.1, 0, 100),
    new FireballWall(3.5, 2.5, 0.1, 0, 100),
    new FireballWall(3.5, 3.5, 0.1, 0, 100),
    new FireballWall(3.5, 4.5, 0.1, 0, 100),
    new FireballWall(3.5, 5.5, 0.1, 0, 100),
    new FireballWall(3.5, 6.5, 0.1, 0, 100),
    new FireballWall(3.5, 7.5, 0.1, 0, 100),
    new FireballWall(3.5, 8.5, 0.1, 0, 100),
  ];
  ls.floorTex = 0;
  ls.ceilingTex = 1;

  ls.sprites = [
    { x: 13, y: 28, texture: 5, type: new Slime(13, 28, 50, 2, 10) },
    { x: 14, y: 24, texture: 5, type: new Slime(14, 24, 100, 2, 10) },
    { x: 15, y: 16, texture: 5, type: new Slime(15, 16, 100, 2, 10) },
    { x: 12, y: 17, texture: 5, type: new Slime(12, 17, 100, 1, 10) },
    { x: 12, y: 20, texture: 5, type: new Slime(12, 20, 50, 3, 10) },

    { x: 22, y: 16, texture: 5, type: new Slime(22, 16, 100, 2, 10) },
    { x: 22, y: 18, texture: 5, type: new Slime(22, 18, 100, 2, 10) },
    { x: 22, y: 24, texture: 5, type: new Slime(22, 24, 100, 1, 6) },
    { x: 18, y: 26, texture: 5, type: new Slime(18, 26, 50, 3, 6) },

    { x: 18, y: 26, texture: 5, type: new Slime(18, 26, 100, 3, 6) },
    { x: 22, y: 26, texture: 5, type: new Slime(22, 26, 100, 3, 6) },
    { x: 20, y: 29, texture: 3, type: new Mage(20, 29, 10, 0.2, 50, 20) },

    {
      x: 27.5,
      y: 14.5,
      texture: 3,
      type: new Mage(27.5, 14.5, 10, 0.2, 10, 20, 70),
    },

    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(1, 0.04, { x: 27.5, y: 9.5 }),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(2, 0.04, { x: 27.5, y: 9.5 }),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(3.1, 0.04, { x: 27.5, y: 9.5 }),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-1, 0.04, { x: 27.5, y: 9.5 }),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-2, 0.04, { x: 27.5, y: 9.5 }),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-3.1, 0.04, { x: 27.5, y: 9.5 }),
    },

    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(1, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(2, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(3.1, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-1, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-2, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
    {
      x: 27.5,
      y: 9.5,
      texture: 13,
      type: new SpikeBall(-3.1, 0.04, { x: 27.5, y: 9.5 }, 90),
    },
  ];
}
function level4(ls: levelSettings) {
  //player
  ls.player.posX = 1.5;
  ls.player.posY = 1.5;
  ls.player.dirX = 1;
  ls.player.dirY = 0;
  ls.player.planeX = 0;
  ls.player.planeY = -1;

  ls.player.inventory = {
    flashlight: true,
    gun: false,
    run: true,
    horn: false,
    sword: true,
    sheild: false,
    dash: false,
    teleport: false,
  };

  //map

  ls.map.map = makeMap(16, 5, 15);

  const goal = ls.map.map.length - 1;
  ls.map.lightList = [{ x: goal, y: goal }];
  ls.map.brightness = 0.2;

  ls.moveWall = [];
  ls.fireWall = [];
  ls.floorTex = 2;
  ls.ceilingTex = 1;

  ls.sprites = [
    { x: 16, y: 16, texture: 14, type: new Ghost(16, 16, 0.01, 1, 100) },
  ];
}
function level5(ls: levelSettings) {
  //player
  const direction = getPlayerDirection(180);
  ls.player.posX = 13.5;
  ls.player.posY = 12;
  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
  ls.player.holding = 3;
  ls.player.ammo = 3;

  ls.player.inventory = {
    flashlight: true,
    gun: true,
    run: true,
    horn: false,
    sword: true,
    sheild: false,
    dash: false,
    teleport: false,
  };

  //map

  ls.map.map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 5, 0, 0, 0, 5],
    [6, 0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 10, 1, 1, 1, 10, 10, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 5, 0, 0, 0, 5],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 13, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 6, 1, 6, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [6, 0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  ls.moveWall = [
    new CloseBlock(19, 10, 30, 30, 30),
    new CloseBlock(19, 12, 30, 30),

    new CloseBlock(4, 1, 50, 25),
    new CloseBlock(4, 2, 50, 25),
    new CloseBlock(4, 4, 50, 25),

    new CloseBlock(19, 1, 50, 25),
    new CloseBlock(19, 2, 50, 25),
    new CloseBlock(19, 4, 50, 25),
  ];

  ls.fireWall = [
    new FireballWall(5.5, 5.5, 0, 0.1, 100),
    new FireballWall(5.5, 5.5, 0, -0.1, 100),
    new FireballWall(8.5, 5.5, 0, 0.1, 100),
    new FireballWall(8.5, 5.5, 0, -0.1, 100),

    new FireballWall(15.5, 9.5, 0, -0.1, 50, 25),
    new FireballWall(16.5, 9.5, 0, -0.1, 50),

    new FireballWall(1.5, 18.5, 0, -0.1, 100, 50),
    new FireballWall(2.5, 18.5, 0, -0.1, 100),

    new FireballWall(21.5, 23.5, 0, -0.1, 100),
    new FireballWall(22.5, 23.5, 0, -0.1, 100, 50),

    new FireballWall(14.5, 19.5, 0, 0.1, 75),
    new FireballWall(14.5, 23.5, 0, -0.1, 75),

    new FireballWall(3.5, 19.5, 0, 0.1, 75),
    new FireballWall(3.5, 23.5, 0, -0.1, 75),
  ];

  ls.map.brightness = 0.7;
  ls.floorTex = 0;
  ls.ceilingTex = 5;
  ls.sprites = [
    { x: 4, y: 10, texture: 5, type: new Slime(4, 10, 100, 2, 8) },
    { x: 6, y: 7, texture: 5, type: new Slime(6, 7, 50, 3, 8) },
    { x: 8, y: 12, texture: 5, type: new Slime(8, 12, 50, 2, 8) },

    { x: 13, y: 6, texture: 5, type: new Slime(13, 6, 100, 3, 8) },
    { x: 13, y: 8, texture: 5, type: new Slime(13, 8, 100, 3, 8) },

    { x: 19, y: 7, texture: 3, type: new Mage(19, 7, 10, 0.15, 50, 20) },

    { x: 8, y: 14.5, texture: 5, type: new Slime(8, 14.5, 50, 2, 8) },
    { x: 11, y: 16.5, texture: 5, type: new Slime(11, 16.5, 100, 3, 8) },
    { x: 11, y: 16.5, texture: 5, type: new Slime(4.5, 16.5, 100, 3, 8) },
    { x: 8, y: 18.5, texture: 3, type: new Slime(8, 18.5, 50, 2, 8) },

    {
      x: 4.5,
      y: 18.5,
      texture: 3,
      type: new Mage(4.5, 18.5, 10, 0.15, 100, 20),
    },
    {
      x: 4.5,
      y: 14.5,
      texture: 3,
      type: new Mage(4.5, 14.5, 10, 0.15, 100, 20, 50),
    },

    { x: 10, y: 1.5, texture: 5, type: new Slime(10, 1.5, 100, 2, 6) },
    { x: 10, y: 2.5, texture: 5, type: new Slime(10, 2.5, 100, 2, 6) },
    { x: 12, y: 1.5, texture: 5, type: new Slime(12, 1.5, 100, 2, 6) },
    { x: 12, y: 2.5, texture: 5, type: new Slime(12, 2.5, 100, 2, 6) },
    { x: 14, y: 1.5, texture: 5, type: new Slime(14, 1.5, 100, 2, 6) },
    { x: 14, y: 2.5, texture: 5, type: new Slime(14, 2.5, 100, 2, 6) },

    { x: 18.5, y: 22.5, texture: 5, type: new Slime(18.5, 22.5, 50, 2, 6) },
    { x: 18.5, y: 20.5, texture: 5, type: new Slime(18.5, 20.5, 50, 2, 6) },

    { x: 14, y: 22.5, texture: 5, type: new Slime(14, 22.5, 50, 2, 6) },
    { x: 14, y: 21.5, texture: 5, type: new Slime(14, 21.5, 100, 2, 6) },
    { x: 14, y: 20.5, texture: 5, type: new Slime(14, 20.5, 50, 2, 6) },

    { x: 10, y: 21.5, texture: 5, type: new Slime(10, 21.5, 100, 2, 6) },

    { x: 2, y: 21.5, texture: 5, type: new Slime(2, 21.5, 50, 2, 6) },

    {
      x: 1.5,
      y: 22.5,
      texture: 3,
      type: new Mage(1.5, 22.5, 10, 0.15, 100, 20, 50),
    },
    {
      x: 1.5,
      y: 20.5,
      texture: 3,
      type: new Mage(1.5, 20.5, 10, 0.15, 100, 20, 50),
    },

    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(1, -0.05, { x: 17.5, y: 16.5 }),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(2.1, -0.05, { x: 17.5, y: 16.5 }),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(-1, -0.05, { x: 17.5, y: 16.5 }),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(-2.1, -0.05, { x: 17.5, y: 16.5 }),
    },

    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(1, -0.05, { x: 17.5, y: 16.5 }, 90),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(2.1, -0.05, { x: 17.5, y: 16.5 }, 90),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(-1, -0.05, { x: 17.5, y: 16.5 }, 90),
    },
    {
      x: 17.5,
      y: 16.5,
      texture: 13,
      type: new SpikeBall(-2.1, -0.05, { x: 17.5, y: 16.5 }, 90),
    },
  ];
}
function level6(ls: levelSettings) {
  //player
  const direction = getPlayerDirection(-90);
  // ls.player.posX = 12.5;
  // ls.player.posY = 9.5;
  ls.player.posX = 12.5;
  ls.player.posY = 9.5;

  ls.player.dirX = direction.dirX;
  ls.player.dirY = direction.dirY;
  ls.player.planeX = direction.planeX;
  ls.player.planeY = direction.planeY;
  ls.player.holding = 1;
  ls.player.holding = 3;

  ls.player.inventory = {
    flashlight: true,
    gun: true,
    run: true,
    horn: false,
    sword: true,
    sheild: false,
    dash: false,

    teleport: false,
  };
  ls.player.ammo = 3;

  //map

  ls.map.map = [
    [
      1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 13, 13, 13, 13,
      1, 1,
    ],
    [5, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 6, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 0, 1],
    [5, 0, 2, 0, 0, 0, 2, 0, 5, 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 0, 1],
    [5, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 0, 1, 1, 0, 0, 1],
    [5, 0, 0, 0, 2, 0, 0, 0, 5, 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 0, 1, 5, 0, 0, 1],
    [5, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 1, 6, 0, 0, 0, 6, 1, 0, 0, 1, 5, 0, 0, 1],
    [5, 0, 2, 0, 0, 0, 2, 0, 5, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 5, 0, 0, 1],
    [5, 0, 0, 0, 0, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 5, 1, 0, 0, 1, 5, 0, 0, 1],
    [1, 5, 5, 5, 0, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 5, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 5, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 5, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 5, 0, 0, 1],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 1, 5, 0, 0,
      1,
    ],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 10, 10,
      1,
    ],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 6, 0, 0, 0, 0, 0, 1],
    [
      1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0,
      1,
    ],
    [1, 0, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 6],
    [
      1, 1, 1, 1, 0, 0, 1, 0, 6, 0, 0, 6, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 10,
      1,
    ],
    [1, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [
      1, 1, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      1,
    ],
    [
      1, 0, 1, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 10, 0, 0, 13, 0, 0,
      1,
    ],
    [1, 0, 0, 0, 1, 0, 1, 0, 6, 0, 0, 6, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1],
  ];

  ls.map.lightList = [];
  ls.map.brightness = 0.5;

  ls.moveWall = [
    new CloseBlock(17, 23, 50, 25),
    new CloseBlock(17, 22, 50, 25),
    new CloseBlock(17, 20, 50, 25),
    new CloseBlock(16, 21, 50, 25),
    new CloseBlock(15, 19, 50, 25),

    new CloseBlock(23, 8, 50, 25),
    new CloseBlock(23, 11, 50, 25),

    new CloseBlock(21, 8, 50, 25),
    new CloseBlock(21, 11, 50, 25),

    new CloseBlock(19, 8, 50, 25),
    new CloseBlock(19, 11, 50, 25),

    new CloseBlock(17, 8, 50, 25),
    new CloseBlock(17, 11, 50, 25),

    new CloseBlock(22, 12, 50, 25),
    new CloseBlock(22, 10, 50, 25),
    new CloseBlock(22, 9, 50, 25),
    new CloseBlock(22, 7, 50, 25),

    new CloseBlock(18, 12, 50, 25),
    new CloseBlock(18, 10, 50, 25),
    new CloseBlock(18, 9, 50, 25),
    new CloseBlock(18, 7, 50, 25),

    new CloseBlock(1, 15, 60, 20),
    new CloseBlock(1, 14, 60, 20),
    new CloseBlock(1, 13, 60, 20),

    new CloseBlock(2, 15, 60, 20, 40),
    new CloseBlock(2, 14, 60, 20, 40),
    new CloseBlock(2, 13, 60, 20, 40),

    new CloseBlock(3, 15, 60, 20),
    new CloseBlock(3, 14, 60, 20),
    new CloseBlock(3, 13, 60, 20),

    new CloseBlock(4, 15, 60, 20, 40),
    new CloseBlock(4, 14, 60, 20, 40),
    new CloseBlock(4, 13, 60, 20, 40),

    new CloseBlock(5, 15, 60, 20),
    new CloseBlock(5, 14, 60, 20),
    new CloseBlock(5, 13, 60, 20),
  ];
  ls.fireWall = [
    new FireballWall(4.5, 21.5, 0, 0.1, 100, 90),
    new FireballWall(5.5, 21.5, 0, 0.1, 100, 80),
    new FireballWall(6.5, 21.5, 0, 0.1, 100, 70),
    new FireballWall(7.5, 21.5, 0, 0.1, 100, 60),
    new FireballWall(8.5, 21.5, 0, 0.1, 100, 50),
    new FireballWall(9.5, 21.5, 0, 0.1, 100, 40),
    new FireballWall(10.5, 21.5, 0, 0.1, 100, 30),
    new FireballWall(11.5, 21.5, 0, 0.1, 100, 20),
    new FireballWall(12.5, 21.5, 0, 0.1, 100, 10),
    new FireballWall(13.5, 21.5, 0, 0.1, 100),

    new FireballWall(24.5, 17.5, -0.1, 0, 640),
    new FireballWall(24.5, 16.5, -0.1, 0, 640, 80),
    new FireballWall(24.5, 15.5, -0.1, 0, 640, 160),
    new FireballWall(24.5, 14.5, -0.1, 0, 640, 240),

    new FireballWall(16.5, 14.5, 0.1, 0, 640, 320),
    new FireballWall(16.5, 15.5, 0.1, 0, 640, 400),
    new FireballWall(16.5, 16.5, 0.1, 0, 640, 480),
    new FireballWall(16.5, 17.5, 0.1, 0, 640, 560),

    new FireballWall(1.5, 0.5, 0, 0.1, 400),
    new FireballWall(2.5, 0.5, 0, 0.1, 400),
    new FireballWall(3.5, 0.5, 0, 0.1, 400),
    new FireballWall(4.5, 0.5, 0, 0.1, 400),
    new FireballWall(5.5, 0.5, 0, 0.1, 400),
    new FireballWall(6.5, 0.5, 0, 0.1, 400),
    new FireballWall(7.5, 0.5, 0, 0.1, 400),

    new FireballWall(0.5, 1.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 2.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 3.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 4.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 5.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 6.5, 0.1, 0, 400, 100),
    new FireballWall(0.5, 7.5, 0.1, 0, 400, 100),

    new FireballWall(2.5, 8.5, 0, -0.1, 400, 200),
    new FireballWall(3.5, 8.5, 0, -0.1, 400, 200),
    new FireballWall(4.5, 8.5, 0, -0.1, 400, 200),
    new FireballWall(5.5, 8.5, 0, -0.1, 400, 200),
    new FireballWall(6.5, 8.5, 0, -0.1, 400, 200),
    new FireballWall(7.5, 8.5, 0, -0.1, 400, 200),

    new FireballWall(8.5, 1.5, -0.1, 0, 400, 300),
    new FireballWall(8.5, 2.5, -0.1, 0, 400, 300),
    new FireballWall(8.5, 3.5, -0.1, 0, 400, 300),
    new FireballWall(8.5, 5.5, -0.1, 0, 400, 300),
    new FireballWall(8.5, 6.5, -0.1, 0, 400, 300),
    new FireballWall(8.5, 7.5, -0.1, 0, 400, 300),

    new FireballWall(7.5, 16.5, 0, -0.1, 75),
  ];
  ls.floorTex = 4;
  ls.ceilingTex = 1;

  ls.sprites = [
    { x: 12.5, y: 13.5, texture: 5, type: new Slime(12.5, 13.5, 50, 2, 6) },
    { x: 10.5, y: 13.5, texture: 5, type: new Slime(10.5, 13.5, 50, 2, 6) },
    { x: 14.5, y: 14.5, texture: 5, type: new Slime(14.5, 14.5, 50, 2, 6) },

    { x: 8.5, y: 19, texture: 5, type: new Slime(8.5, 19, 100, 3, 6) },
    { x: 12.5, y: 19, texture: 5, type: new Slime(12.5, 19, 100, 3, 6) },

    { x: 15.5, y: 23, texture: 5, type: new Slime(15.5, 23, 50, 2, 6) },
    { x: 17.5, y: 19.5, texture: 5, type: new Slime(17.5, 19.5, 100, 2, 6) },
    { x: 14.5, y: 20.5, texture: 5, type: new Slime(14.5, 20.5, 50, 2, 6) },

    { x: 23, y: 23, texture: 5, type: new Slime(23, 23, 100, 2, 6) },
    { x: 23, y: 20, texture: 5, type: new Slime(23, 20, 100, 2, 6) },
    { x: 20, y: 23, texture: 5, type: new Slime(20, 23, 100, 2, 6) },
    { x: 20, y: 20, texture: 5, type: new Slime(20, 20, 100, 2, 6) },

    { x: 22, y: 17.5, texture: 5, type: new Slime(22, 17.5, 100, 2, 6) },
    { x: 22, y: 14.5, texture: 5, type: new Slime(22, 14.5, 100, 2, 6) },
    { x: 18, y: 17.5, texture: 5, type: new Slime(18, 17.5, 100, 2, 6) },
    { x: 18, y: 14.5, texture: 5, type: new Slime(18, 14.5, 100, 2, 6) },

    { x: 23.5, y: 12.5, texture: 5, type: new Slime(23.5, 12.5, 100, 2, 6) },
    { x: 23.5, y: 7.5, texture: 5, type: new Slime(23.5, 7.5, 100, 2, 6) },

    { x: 23.5, y: 1.5, texture: 5, type: new Slime(23.5, 1.5, 50, 2, 6) },
    { x: 23.5, y: 3.5, texture: 5, type: new Slime(23.5, 3.5, 50, 2, 6) },

    { x: 19.5, y: 1.5, texture: 5, type: new Slime(19.5, 1.5, 50, 2, 6) },

    { x: 17.5, y: 4.5, texture: 5, type: new Slime(17.5, 4.5, 50, 2, 6) },

    { x: 14.5, y: 2.5, texture: 5, type: new Slime(14.5, 2.5, 50, 2, 6) },
    { x: 14.5, y: 4.5, texture: 5, type: new Slime(14.5, 4.5, 50, 2, 6) },
    { x: 14.5, y: 6.5, texture: 5, type: new Slime(14.5, 6.5, 50, 2, 6) },

    {
      x: 4.5,
      y: 19,
      texture: 3,
      type: new Mage(4.5, 19, 10, 0.15, 50, 20, 50),
    },

    {
      x: 21.5,
      y: 7.5,
      texture: 3,
      type: new Mage(21.5, 7.5, 10, 0.15, 50, 20, 25),
    },

    {
      x: 19.5,
      y: 7.5,
      texture: 3,
      type: new Mage(19.5, 7.5, 10, 0.15, 50, 20),
    },

    {
      x: 23.5,
      y: 5.5,
      texture: 3,
      type: new Mage(23.5, 5.5, 10, 0.15, 50, 20),
    },

    {
      x: 11.5,
      y: 2.5,
      texture: 3,
      type: new Mage(11.5, 2.5, 10, 0.15, 50, 20),
    },

    {
      x: 11.5,
      y: 6.5,
      texture: 3,
      type: new Mage(11.5, 6.5, 10, 0.15, 50, 20),
    },

    {
      x: 0.5,
      y: 21,
      texture: 13,
      type: new SpikeBall(1, 0.1, { x: 0.5, y: 21 }),
    },
    {
      x: 0.5,
      y: 21,
      texture: 13,
      type: new SpikeBall(2, 0.1, { x: 0.5, y: 21 }),
    },

    {
      x: 21.5,
      y: 21.5,
      texture: 13,
      type: new SpikeBall(1, 0.04, { x: 21.5, y: 21.5 }),
    },
    {
      x: 21.5,
      y: 21.5,
      texture: 13,
      type: new SpikeBall(2.1, 0.04, { x: 21.5, y: 21.5 }),
    },
  ];
}
function level7(ls: levelSettings) {}
function level8(ls: levelSettings) {}
function level9(ls: levelSettings) {}
function level10(ls: levelSettings) {}

function level0(ls: levelSettings) {
  //player
  ls.player.posX = 1.5;
  ls.player.posY = 1.5;
  ls.player.dirX = 1;
  ls.player.dirY = 0;
  ls.player.planeX = 0;
  ls.player.planeY = -1;
  ls.player.ammo = 10;

  ls.player.inventory = {
    flashlight: true,
    gun: true,
    run: true,
    horn: true,
    sword: true,
    sheild: true,
    dash: true,
    teleport: true,
  };

  //map

  ls.map.map = [
    [1, 4, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 10, 0, 1],
    [1, 5, 6, 1, 1, 1, 1, 1],
  ];

  ls.map.lightList = [];
  ls.map.brightness = 0.5;

  ls.moveWall = [new CloseBlock(6, 2, 50, 30)];
  ls.fireWall = [new FireballWall(7.5, 1.5, -0.1, 0, 50)];
  ls.floorTex = 3;
  ls.ceilingTex = 1;

  ls.sprites = [];
}

export { type levelSettings, setLevel };
