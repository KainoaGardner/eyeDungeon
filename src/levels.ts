import { Player } from "./player";
import { Map } from "./map";
import { sprite } from "./sprite";

export function setLevel(
  level: number,
  player: Player,
  map: Map,
  sprites: sprite[],
) {
  switch (level) {
    case 1:
      level1(player, map, sprites);
      break;
    case 2:
      level2(player, map, sprites);
      break;
    default:
      level0(player, map, sprites);
      break;
  }
}

function level1(player: Player, map: Map, sprites: sprite[]) {
  //player
  player.posX = 1.5;
  player.posY = 1.5;
  player.dirX = 1;
  player.dirY = 0;
  player.planeX = 0;
  player.planeY = -1;

  //map

  map.map = [
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
      1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5,
      1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  map.lightList = map.getLightList(map.map);
  map.brightness = 0.3;
  sprites = [{ x: 1.5, y: 10, texture: 1 }];
}
function level2(player: Player, map: Map, sprites: sprite[]) {}
function level3(player: Player, map: Map, sprites: sprite[]) {}
function level4(player: Player, map: Map, sprites: sprite[]) {}
function level5(player: Player, map: Map, sprites: sprite[]) {}
function level6(player: Player, map: Map, sprites: sprite[]) {}
function level7(player: Player, map: Map, sprites: sprite[]) {}
function level8(player: Player, map: Map, sprites: sprite[]) {}
function level9(player: Player, map: Map, sprites: sprite[]) {}
function level10(player: Player, map: Map, sprites: sprite[]) {}

function level0(player: Player, map: Map, sprites: sprite[]) {
  //player
  player.posX = 1.5;
  player.posY = 1.5;
  player.dirX = 1;
  player.dirY = 0;
  player.planeX = 0;
  player.planeY = -1;

  //map

  map.map = [
    [1, 1, 1, 1, 1, 1, 4, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 5, 0, 0, 0, 0, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];

  // map.lightList = map.getLightList(map.map);
  map.lightList = ["1.5,6.5", "4.5,4.5"];
  map.brightness = 1;

  sprites = [{ x: 2.5, y: 2.5, texture: 1 }];
}
