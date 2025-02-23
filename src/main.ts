import { canvas, c } from "./global";
import { Player } from "./player";
import { Map } from "./map";
import { sprite } from "./sprite";
import { setLevel } from "./levels";

document.body.style.overflow = "hidden";

const map = new Map([], 100, canvas.height);
const sprites: sprite[] = [];
const player = new Player(0, 0, 5, 0.01);

let level = 1;
setLevel(1, player, map, sprites);

function main(): void {
  requestAnimationFrame(main);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(map.map);
  player.drawView(map.map, map.lightList, sprites);
  player.drawUi(level);
}

main();
