import { canvas, c, targetFps } from "./global";
import { Player } from "./player";
import { Map } from "./map";
import { Cutscene } from "./cutscenes";
import { spriteUpdate, sprite } from "./sprite";
import { CloseBlock } from "./closeblock";
import { setLevel, levelUpdate } from "./levels";
import { FireballWall } from "./fireball";
import { Boss } from "./boss";
import { Screen } from "./screens"

document.body.style.overflow = "hidden";

const ls = {
  level: 1,
  player: new Player(0, 0, 1, 0.04, 0.05, {
    flashlight: false,
    gun: false,
    run: false,
    horn: false,
    sword: false,
    sheild: false,
    dash: false,
    teleport: false,
  }),
  map: new Map([], 100, canvas.height, 1),
  sprites: new Array<sprite>(),
  moveWall: new Array<CloseBlock>(),
  fireWall: new Array<FireballWall>(),
  floorTex: 1,
  ceilingTex: 2,
  cutscene: new Cutscene(0, 1),
  screen: 0,
  backScreen: 0,
};

setLevel(ls);

const uiScreen = new Screen();

function main(): void {
  drawFrame();
}

function drawFrame(): void {
  requestAnimationFrame(main);
  switch (ls.screen) {
    case 0:
      uiScreen.homeScreen();
      uiScreen.homeScreenUpdate(ls);
      break;
    case 1:
      uiScreen.pauseScreen();
      uiScreen.backUpdate(ls);
      break;
    case 2:
      uiScreen.controls();
      uiScreen.backUpdate(ls);
      break;
    case 3:
      uiScreen.settings();
      uiScreen.settingsUpdate();
      uiScreen.backUpdate(ls);
      break;

    default:
      c.clearRect(0, 0, canvas.width, canvas.height);
      if (ls.cutscene.frameCounter !== 0) {
        ls.cutscene.update();
      } else {
        ls.player.drawView(ls);
        ls.player.drawUi(ls.map.map);

        for (let i = 0; i < ls.sprites.length; i++) {
          if (ls.sprites[i].type instanceof Boss) {
            ls.sprites[i].type.drawHealthBar();
          }
        }
      }


  }

}

function updateFrame(): void {
  clearInterval(interval);
  if (ls.cutscene.frameCounter === 0 && ls.screen === -1) {
    // showFps();
    ls.player.update(ls);
    spriteUpdate(ls);
    levelUpdate(ls);

    for (let i = 0; i < ls.moveWall.length; i++) {
      ls.moveWall[i].update(ls.map);
    }

    for (let i = 0; i < ls.fireWall.length; i++) {
      ls.fireWall[i].update(ls);
    }

    if (ls.player.goal(ls.map.map)) {
      ls.level++;
      setLevel(ls);
    }
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
