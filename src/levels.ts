import { Player } from "./player";
import { Map } from "./map";
import { sprite } from "./sprite";
import { CloseBlock } from "./closeblock";
// import { pos } from "./global";

interface levelSettings {
  level: number;
  player: Player;
  map: Map;
  sprites: sprite[];
  moveWall: CloseBlock[];
}

function setLevel(ls: levelSettings) {
  switch (ls.level) {
    case 1:
      level1(ls);
      break;
    case 2:
      level2(ls);
      break;
    default:
      level0(ls);
      break;
  }
}

function level1(ls: levelSettings) {
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
    run: false,
    horn: false,
    sword: false,
    sheild: false,
    dash: false,
  };

  //map

  ls.map.map = [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 0, 0, 0, 6, 0, 0, 0,
      1, 6, 0, 0, 0, 4, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 6, 0, 0, 1, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0,
      1, 6, 0, 0, 1, 0, 1,
    ],
    [
      1, 1, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
      1, 6, 0, 1, 5, 0, 1,
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
      1, 0, 0, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 1, 1, 6, 0, 0, 0, 1, 0, 1, 0, 6,
      0, 0, 6, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 1, 1, 6, 6, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 1, 1, 1, 0, 5, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 0, 0, 1, 5, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 1, 6, 6, 1, 1, 6, 6, 1, 1, 6, 6, 1, 0, 0, 0, 0, 0, 0, 6, 1, 1, 0,
      1, 0, 1, 1, 1, 0, 1,
    ],
    [
      1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 0, 1, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      1, 1, 1, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0,
      1, 0, 0, 0, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 5,
    ],
    [
      1, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5,
      1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  // ls.map.lightList = ls.map.getLightList(ls.map.map);

  ls.moveWall = [
    new CloseBlock(3, 5, 50, 30),
    new CloseBlock(5, 5, 50, 30),
    new CloseBlock(7, 5, 50, 30),
    new CloseBlock(9, 5, 50, 30),
    new CloseBlock(11, 5, 50, 30),

    new CloseBlock(4, 6, 50, 30),
    new CloseBlock(6, 6, 50, 30),
    new CloseBlock(8, 6, 50, 30),
    new CloseBlock(10, 6, 50, 30),
    new CloseBlock(12, 6, 50, 30),

    new CloseBlock(4, 9, 100, 20),
    new CloseBlock(5, 9, 100, 20),
    new CloseBlock(6, 9, 100, 20, 60),
    new CloseBlock(7, 9, 100, 20, 60),
    new CloseBlock(8, 9, 100, 20),
    new CloseBlock(9, 9, 100, 20),
    new CloseBlock(10, 9, 100, 20, 60),
    new CloseBlock(11, 9, 100, 20, 60),
    new CloseBlock(12, 9, 100, 20),
    new CloseBlock(13, 9, 100, 20),

    new CloseBlock(15, 9, 50, 30),
    new CloseBlock(16, 10, 50, 30),
    new CloseBlock(20, 10, 50, 30),
    new CloseBlock(21, 9, 50, 30),

    new CloseBlock(20, 4, 50, 30),
    new CloseBlock(19, 5, 50, 30),
    new CloseBlock(21, 5, 50, 30),

    new CloseBlock(16, 6, 50, 30),
    new CloseBlock(17, 7, 50, 30),

    new CloseBlock(16, 3, 50, 30),
    new CloseBlock(17, 2, 50, 30),
    new CloseBlock(18, 1, 50, 30),

    new CloseBlock(20, 1, 50, 30),
    new CloseBlock(21, 2, 50, 30),
    new CloseBlock(22, 1, 50, 30),

    new CloseBlock(24, 5, 50, 30),
    new CloseBlock(23, 6, 50, 30),
    new CloseBlock(23, 7, 50, 30),
    new CloseBlock(25, 6, 50, 30),
    new CloseBlock(25, 7, 50, 30),

    new CloseBlock(26, 7, 50, 30),
    new CloseBlock(27, 6, 50, 30),

    new CloseBlock(26, 5, 50, 30),
    new CloseBlock(27, 4, 50, 30),
    new CloseBlock(27, 3, 50, 30),
    new CloseBlock(27, 2, 50, 30),
    new CloseBlock(27, 1, 50, 30),
  ];
  ls.map.brightness = 0.3;
  // ls.sprites = [{ x: 1.5, y: 10, texture: 6 }];
}
function level2(ls: levelSettings) {}
function level3(ls: levelSettings) {}
function level4(ls: levelSettings) {}
function level5(ls: levelSettings) {}
function level6(ls: levelSettings) {}
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

  ls.player.inventory = {
    flashlight: true,
    gun: true,
    run: true,
    horn: true,
    sword: true,
    sheild: true,
    dash: true,
  };

  //map

  ls.map.map = [
    [1, 1, 1, 1, 1, 1, 4, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 5, 0, 0, 0, 0, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];

  ls.map.lightList = [{ x: 6.5, y: 0.5 }];
  ls.map.brightness = 0.5;

  ls.moveWall = [new CloseBlock(5, 6, 50, 30), new CloseBlock(6, 5, 50, 30)];

  // ls.sprites = [{ x: 2.5, y: 2.5, texture: 6 }];
}

export { type levelSettings, setLevel };
