import { canvas, mouse } from "./global"
function drawImage(
  ctx: any,
  image: any,
  x: number,
  y: number,
  w: number,
  h: number,
  degrees: number,
) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((degrees * Math.PI) / 180.0);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h);
  ctx.restore();
}

function getMousePos(canvas: HTMLCanvasElement, event: any) {
  let rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  mouse.x = x;
  mouse.y = y;
}

canvas.addEventListener("mousemove", function(e: any) {
  getMousePos(canvas, e)
})

canvas.addEventListener("mousedown", function(e: any) {
  if (e.button === 0) mouse.click = true;
})

canvas.addEventListener("mouseup", function(e: any) {
  if (e.button === 0) mouse.click = false;
})

export { drawImage };

