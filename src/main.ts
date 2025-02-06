import { Player } from "./player";
import { keyMap } from "./keypress";

const canvas = document.querySelector("canvas")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d")!;

document.body.style.overflow = "hidden";

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const player = new Player(canvas.width / 2, canvas.height / 2, 2);

function main(): void {
  requestAnimationFrame(main);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(keyMap, canvas);
  player.draw(c);
}

main();
