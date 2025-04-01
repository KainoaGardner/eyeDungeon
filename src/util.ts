import { canvas, mouse } from "./global"
import { musicSounds, sfxSounds } from "./sounds";

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

function downloadTextFile(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const playingAudio: HTMLAudioElement[] = []

function stopAudio() {
  for (let i = 0; i < musicSounds.length; i++) {
    musicSounds[i].pause();
  }
  for (let i = 0; i < sfxSounds.length; i++) {
    sfxSounds[i].pause();
  }
  while (playingAudio.length > 0) {
    playingAudio.pop();
  }
}

function pauseAudio() {
  for (let i = 0; i < sfxSounds.length; i++) {
    if (!sfxSounds[i].paused) {
      playingAudio.push(sfxSounds[i]);
      sfxSounds[i].pause();
    }
  }

  for (let i = 0; i < musicSounds.length; i++) {
    if (!musicSounds[i].paused) {
      playingAudio.push(musicSounds[i]);
      musicSounds[i].pause();
    }
  }
}

function unpauseAudio() {
  while (playingAudio.length > 0) {
    const audio = playingAudio.pop();
    if (audio) {
      audio.play();
    }
  }
}


export { stopAudio, downloadTextFile, drawImage, pauseAudio, unpauseAudio }

