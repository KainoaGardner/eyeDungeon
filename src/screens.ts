import { canvas, c, settings, mouse } from "./global";
import { screens, frame0Img, frame1Img, controlsImg } from "./textures"
import { levelSettings } from "./levels"
import { keyMap } from "./keypress";

function checkHover(left: number, right: number, top: number, bottom: number): boolean {
  if (mouse.x > left && mouse.x < right && mouse.y > top && mouse.y < bottom) return true;
  return false;
}

function updateDisplaySettings(displayWidth: number, displayHeight: number, graphicsWidth: number, graphicsHeight: number) {
  settings.displayWidth = displayWidth;
  settings.displayHeight = displayHeight;
  settings.graphicsWidth = graphicsWidth;
  settings.graphicsHeight = graphicsHeight;

  settings.bufferRatio = displayWidth / graphicsWidth
  settings.UIRatio = settings.bufferRatio * graphicsWidth / 256

  canvas.width = settings.displayWidth;
  canvas.height = settings.displayHeight;

  c.textBaseline = "middle";
  c.textAlign = "center";
}

export class Screen {
  constructor() {
  }

  homeScreen() {
    c.drawImage(screens[1], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 6 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 6, settings.UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);

    c.font = "bold 45px Arial"
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"

    c.lineWidth = 3;

    c.fillText("NEW", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("NEW", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.fillText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.font = "bold 100px Arial"
    c.lineWidth = 4;

    c.fillText("EYE DUNGEON", canvas.width / 2, settings.UIRatio * 39.5)
    c.strokeText("EYE DUNGEON", canvas.width / 2, settings.UIRatio * 39.5)
    // c.drawImage(screens[4], canvas.width / 2 - settings.UIRatio * 30 * 4 / 2, settings.UIRatio * 25, settings.UIRatio * 30 * 4, settings.UIRatio * 25);

  }

  homeScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4;

    //new
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) ls.screen = -1;
    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) ls.screen = -1;
    }

    //settings
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) ls.screen = 3;
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) ls.screen = 2;
    }


    if (mouse.click) mouse.click = false;
  }


  pauseScreen() {
    c.drawImage(screens[0], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 2 / 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 2 / 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);

    c.font = "bold 125px Arial"
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4;

    c.fillText("PAUSED", canvas.width / 2, settings.UIRatio * 40)
    c.strokeText("PAUSED", canvas.width / 2, settings.UIRatio * 40)


    c.font = "bold 45px Arial"
    c.lineWidth = 3;

    c.fillText("CONTROLS", canvas.width / 2, settings.UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2, settings.UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2, settings.UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2, settings.UIRatio * 87.5)
  }

  controls() {
    c.drawImage(screens[2], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);
    c.font = "bold 100px Arial"
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4;

    c.fillText("CONTROLS", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("CONTROLS", canvas.width / 2, settings.UIRatio * 18)

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, canvas.height - settings.UIRatio * 16 * 7, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 7);
    c.drawImage(controlsImg, canvas.width / 2 - settings.UIRatio * 75 / 2, settings.UIRatio * 54, 75 * settings.UIRatio, 70 * settings.UIRatio);
  }


  backUpdate(ls: levelSettings) {
    if (keyMap.get("Escape")) {
      keyMap.set("Escape", false)
      ls.screen = ls.backScreen
    }


    if (mouse.click) mouse.click = false;
  }


  settings() {
    c.drawImage(screens[3], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);
    c.font = "bold 100px Arial"
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4;

    c.fillText("SETTINGS", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("SETTINGS", canvas.width / 2, settings.UIRatio * 18)

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 7, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);


    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 7, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);

    c.font = "bold 75px Arial"
    c.lineWidth = 3;
    c.fillText("Display", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText("Display", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)

    c.fillText("Graphics", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText("Graphics", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.font = "bold 50px Arial"
    c.lineWidth = 2;

    c.fillText("1920x1080", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 73)
    c.strokeText("1920x1080", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 73)
    c.fillText("1600x900", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88.5)
    c.strokeText("1600x900", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88.5)
    c.fillText("1280x720", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 105)
    c.strokeText("1280x720", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 105)
    c.fillText("960x540", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 121)
    c.strokeText("960x540", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 121)
    c.fillText("640x360", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 137)
    c.strokeText("640x360", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 137)

    c.fillText("Extra High", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 73)
    c.strokeText("Extra High", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 73)
    c.fillText("High", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88.5)
    c.strokeText("High", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88.5)
    c.fillText("Normal", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 105)
    c.strokeText("Normal", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 105)
    c.fillText("Low", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 121)
    c.strokeText("Low", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 121)
    c.fillText("Extra Low", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 137)
    c.strokeText("Extra Low", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 137)
  }

  settingsUpdate() {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4;


    //1920x1080
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 5, canvas.height - settings.UIRatio * 16 * 4)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(1920, 1080, settings.graphicsWidth, settings.graphicsHeight);
    }
    //1600x900
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, canvas.height - settings.UIRatio * 16 * 3)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(1600, 900, settings.graphicsWidth, settings.graphicsHeight);
    }
    //1280x720
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 3, canvas.height - settings.UIRatio * 16 * 2)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(1280, 720, settings.graphicsWidth, settings.graphicsHeight);
    }
    //960x540
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 2, canvas.height - settings.UIRatio * 16 * 1)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(960, 540, settings.graphicsWidth, settings.graphicsHeight);
    }
    //640x360
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 1, canvas.height)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(640, 360, settings.graphicsWidth, settings.graphicsHeight);
    }

    //ExtraHigh
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 5, canvas.height - settings.UIRatio * 16 * 4)) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(settings.displayWidth, settings.displayHeight, 512, 288);
    }
    //High
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, canvas.height - settings.UIRatio * 16 * 3)) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(settings.displayWidth, settings.displayHeight, 384, 216);
    }
    //Normal
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 3, canvas.height - settings.UIRatio * 16 * 2)) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(settings.displayWidth, settings.displayHeight, 256, 144);
    }
    //Low
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 2, canvas.height - settings.UIRatio * 16 * 1)) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(settings.displayWidth, settings.displayHeight, 192, 108);
    }
    //ExtraLow
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 1, canvas.height)) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) updateDisplaySettings(settings.displayWidth, settings.displayHeight, 128, 72);
    }

    if (mouse.click) mouse.click = false;
  }

}




