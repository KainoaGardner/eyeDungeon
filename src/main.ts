import { Player } from "./player";
import { Map } from "./map";
import { keyMap } from "./keypress";
import { makeMap } from "./maze";

const canvas = document.querySelector("canvas")!;

canvas.width = 1280;
canvas.height = 720;

const c = canvas.getContext("2d")!;

document.body.style.overflow = "hidden";

const map = new Map(makeMap(3, c, 1), 100, canvas.height);

const player = new Player(1.5, 1.5, 5, 0.01);

function main(): void {
  requestAnimationFrame(main);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(keyMap, map.map, map.size);
  player.drawView(c, canvas, map.map);
  player.drawUi(c, canvas);
  map.draw(c, 1);
  player.draw(c, 1, map.size);
}

main();
