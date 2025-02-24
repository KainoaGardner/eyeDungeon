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
      1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 8, 0, 0, 0, 8, 0, 0, 0,
      1, 8, 0, 0, 0, 2, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 8, 0, 0, 1, 0, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0,
      1, 8, 0, 0, 1, 0, 1,
    ],
    [
      1, 1, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
      1, 8, 0, 1, 9, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 8, 0, 1, 0, 0,
      0, 0, 0, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 8,
      0, 0, 0, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 1, 1, 8, 0, 0, 0, 1, 0, 1, 0, 8,
      0, 0, 8, 1, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 1, 1, 8, 8, 1, 1, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
      1, 1, 1, 1, 0, 9, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 1, 1, 0, 0, 1, 9, 0,
      0, 0, 0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 1, 8, 8, 1, 1, 8, 8, 1, 1, 8, 8, 1, 0, 0, 0, 0, 0, 0, 8, 1, 1, 0,
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
      0, 0, 0, 0, 0, 0, 9,
    ],
    [
      1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 1, 1, 9, 1, 1, 1, 1, 9,
      1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  sprites = [{ x: 2.5, y: 2.5, texture: 1 }];
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
