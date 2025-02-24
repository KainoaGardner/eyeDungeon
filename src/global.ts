const canvas = document.querySelector("canvas")!;

canvas.width = 1280;
canvas.height = 720;
// canvas.width = 960;
// canvas.height = 540;
const c = canvas.getContext("2d")!;
c.textBaseline = "middle";
c.textAlign = "center";

document.body.style.overflow = "hidden";

const bufferRatio = 20;
const bufferWidth = Math.floor(canvas.width / bufferRatio);
const bufferHeight = Math.floor(canvas.height / bufferRatio);

const buffer = new Array(bufferHeight)
  .fill(null)
  .map(() => Array(bufferWidth).fill(""));

export { canvas, c, buffer, bufferWidth, bufferHeight, bufferRatio };
