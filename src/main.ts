import { canvas, c, targetFps } from "./global";
import { Player } from "./player";
import { Map } from "./map";
import { sprite } from "./sprite";
import { setLevel, levelSettings } from "./levels";
import { CloseBlock } from "./closeblock";

document.body.style.overflow = "hidden";

const sprites: sprite[] = [];
const moveWall: CloseBlock[] = [];
const map = new Map([], 100, canvas.height, 1);
const player = new Player(0, 0, 5, 0.04, 0.05);

const ls = {
  level: 0,
  player: player,
  map: map,
  sprites: sprites,
  moveWall: moveWall,
};

setLevel(ls);

function main(): void {
  drawFrame();
}

function drawFrame(): void {
  requestAnimationFrame(main);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ls.player.drawView(
    ls.map.map,
    ls.map.lightList,
    ls.sprites,
    ls.map.brightness,
  );
  ls.player.drawUi(ls.map.map);
}

function updateFrame(): void {
  clearInterval(interval);
  // showFps();
  ls.player.update(ls.map.map);

  for (let i = 0; i < ls.moveWall.length; i++) {
    ls.moveWall[i].update(ls.map);
  }

  interval = setInterval(updateFrame, 1000 / targetFps);
}

let times: number[] = [];
function showFps(): void {
  const now: number = performance.now();
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  const fps: number = times.length;
  console.log(fps);
}

let interval = setInterval(updateFrame, 1000 / targetFps);

main();
