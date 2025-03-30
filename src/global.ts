interface pos {
  x: number;
  y: number;
}

interface mouseType {
  x: number;
  y: number;
  click: boolean;
}

interface gameSettings {
  displayWidth: number;
  displayHeight: number;

  graphicsWidth: number;
  graphicsHeight: number;

  UIRatio: number;
  bufferRatio: number;

  musicVolume: number;
  sfxVolume: number;

  language: number; //0 english 1 japanese
}


document.body.style.backgroundColor = "#000000";

const canvas = document.querySelector("canvas")!;
const targetFps = 30;

const settings: gameSettings = {
  displayWidth: 1280,
  displayHeight: 720,

  graphicsWidth: 256,
  graphicsHeight: 144,

  UIRatio: (1280 / 256) * (256 / 256),
  bufferRatio: 1280 / 256,
  musicVolume: 50,
  sfxVolume: 50,

  language: 0,
}

const unlockedLevels = new Map<number, boolean>();
// unlockedLevels.set(1, false)
// unlockedLevels.set(2, false)
// unlockedLevels.set(3, false)
// unlockedLevels.set(4, false)
// unlockedLevels.set(5, false)
// unlockedLevels.set(6, false)
// unlockedLevels.set(7, false)
// unlockedLevels.set(8, false)
// unlockedLevels.set(9, false)
// unlockedLevels.set(10, false)
// unlockedLevels.set(11, false)

unlockedLevels.set(1, true)
unlockedLevels.set(2, true)
unlockedLevels.set(3, true)
unlockedLevels.set(4, true)
unlockedLevels.set(5, true)
unlockedLevels.set(6, true)
unlockedLevels.set(7, true)
unlockedLevels.set(8, true)
unlockedLevels.set(9, true)
unlockedLevels.set(10, true)
unlockedLevels.set(11, true)

canvas.width = settings.displayWidth;
canvas.height = settings.displayHeight;

const maxGraphicsHeight = 512;
const maxGraphicsWidth = 288;



const c = canvas.getContext("2d")!;
c.textBaseline = "middle";
c.textAlign = "center";

document.body.style.overflow = "hidden";

const buffer = new Array(maxGraphicsHeight)
  .fill(null)
  .map(() => Array(maxGraphicsWidth).fill(undefined));

const lightingBuffer = new Array(maxGraphicsWidth).fill(undefined);
const invisBlockBuffer = new Array(maxGraphicsWidth).fill(undefined);
const zBuffer = new Array(maxGraphicsHeight)
  .fill(null)
  .map(() => Array(maxGraphicsWidth).fill(undefined));


const mouse: mouseType = { x: 0, y: 0, click: false }

const userLang = navigator.language
if (userLang === "ja") {
  settings.language = 1;
}


export {
  canvas,
  c,
  buffer,
  lightingBuffer,
  invisBlockBuffer,
  settings,
  targetFps,
  zBuffer,
  type pos,
  mouse,
  unlockedLevels
};
