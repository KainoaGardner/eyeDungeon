import { Player } from "./player";
import { Map } from "./map";
import { keyMap } from "./keypress";
import { makeMap } from "./maze";

const canvas = document.querySelector("canvas")!;

canvas.width = 1280;
canvas.height = 720;

const c = canvas.getContext("2d")!;

document.body.style.overflow = "hidden";

// window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });
//
const map = new Map(makeMap(10, c, 3), 100, canvas.height);

// const player = new Player(
//   map.size + map.size / 2,
//   map.size + map.size / 2,
//   5,
//   0.1,
// );

const player = new Player(1.5, 1.5, 5, 0.01);

function main(): void {
  requestAnimationFrame(main);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(keyMap, map.map, map.size);
  player.drawView(c, canvas, map.map, map.size);
  player.drawUi(c, canvas);
  map.draw(c, 1);
  player.draw(c, 1, map.size);
}

main();
