const canvas = document.querySelector("canvas")!;

canvas.width = 1280;
canvas.height = 720;
// canvas.width = 960;
// canvas.height = 540;

const c = canvas.getContext("2d")!;

document.body.style.overflow = "hidden";

export { canvas, c };
