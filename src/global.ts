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
}

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
const zBuffer = new Array(maxGraphicsWidth).fill(undefined);

const mouse: mouseType = { x: 0, y: 0, click: false }



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
  mouse
};
