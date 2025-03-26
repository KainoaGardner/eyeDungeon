import { canvas, c, settings, mouse } from "./global";
import { screens, frame0Img, frame1Img, controlsImg } from "./textures"
import { levelSettings } from "./levels"
import { keyMap } from "./keypress";
import { setSFXVolume, setMusicVolume } from "./sounds";

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

function updateVolume(change: number, type: number) {
  //sfx 0 music 1
  if (type === 0) {
    if (settings.sfxVolume + change >= 0 && settings.sfxVolume + change <= 100) {
      settings.sfxVolume += change;
      setSFXVolume(settings.sfxVolume)
    }

  } else {
    if (settings.musicVolume + change >= 0 && settings.musicVolume + change <= 100) {
      settings.musicVolume += change;
      setMusicVolume(settings.musicVolume)
    }

  }
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

    c.font = `bold ${9 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"

    c.lineWidth = 3 * settings.UIRatio / 10;

    c.fillText("NEW", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("NEW", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.fillText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("EYE DUNGEON", canvas.width / 2, settings.UIRatio * 39.5)
    c.strokeText("EYE DUNGEON", canvas.width / 2, settings.UIRatio * 39.5)
    // c.drawImage(screens[4], canvas.width / 2 - settings.UIRatio * 30 * 4 / 2, settings.UIRatio * 25, settings.UIRatio * 30 * 4, settings.UIRatio * 25);

  }

  homeScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4 * settings.UIRatio / 10;

    //new
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = -1;
        ls.backScreen.push(-1);
      }

    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = -1;
        ls.backScreen.push(-1);
      }
    }

    //settings
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = 3;
        ls.backScreen.push(0);
      }
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = 2;
        ls.backScreen.push(0);
      }
    }


    if (mouse.click) mouse.click = false;
  }


  pauseScreen() {
    c.drawImage(screens[0], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 6 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 6, settings.UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);

    c.font = `bold ${9 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"

    c.lineWidth = 3 * settings.UIRatio / 10;

    c.fillText("SAVE", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("SAVE", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.fillText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("LOAD", canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87.5)

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("PAUSED", canvas.width / 2, settings.UIRatio * 39.5)
    c.strokeText("PAUSED", canvas.width / 2, settings.UIRatio * 39.5)
    // c.drawImage(screens[4], canvas.width / 2 - settings.UIRatio * 30 * 4 / 2, settings.UIRatio * 25, settings.UIRatio * 30 * 4, settings.UIRatio * 25);

  }

  pauseScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4 * settings.UIRatio / 10;

    //save
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        // ls.screen = -1;
        // ls.backScreen.push(-1);
      }

    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        // ls.screen = -1;
        // ls.backScreen.push(-1);
      }
    }

    //settings
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = 3;
        ls.backScreen.push(-1);
      }
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        ls.screen = 2;
        ls.backScreen.push(-1);
      }
    }


    if (mouse.click) mouse.click = false;
  }


  controls() {
    c.drawImage(screens[2], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("CONTROLS", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("CONTROLS", canvas.width / 2, settings.UIRatio * 18)

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, canvas.height - settings.UIRatio * 16 * 7, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 7);
    c.drawImage(controlsImg, canvas.width / 2 - settings.UIRatio * 75 / 2, settings.UIRatio * 54, 75 * settings.UIRatio, 70 * settings.UIRatio);
  }


  backUpdate(ls: levelSettings) {
    if (keyMap.get("Escape")) {
      keyMap.set("Escape", false)
      if (ls.backScreen.length > 0) {
        ls.screen = ls.backScreen[ls.backScreen.length - 1]
        ls.backScreen.pop()
      }
    }


    if (mouse.click) mouse.click = false;
  }


  videoSettings() {
    c.drawImage(screens[3], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("VIDEO", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("VIDEO", canvas.width / 2, settings.UIRatio * 18)

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


    c.font = `bold ${15 * settings.UIRatio}px Arial`
    c.lineWidth = 3 * settings.UIRatio / 10;
    c.fillText("Display", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText("Display", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)

    c.fillText("Graphics", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText("Graphics", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)

    c.font = `bold ${10 * settings.UIRatio}px Arial`
    c.lineWidth = 2 * settings.UIRatio / 10;

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

  videoSettingsUpdate() {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4 * settings.UIRatio / 10;

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

  audioSettings() {
    c.drawImage(screens[5], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 6, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 6, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 4);
    c.drawImage(frame1Img, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16 * 4);

    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 11 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 5 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("AUDIO", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("AUDIO", canvas.width / 2, settings.UIRatio * 18)

    c.font = `bold ${15 * settings.UIRatio}px Arial`
    c.lineWidth = 3 * settings.UIRatio / 10;

    c.fillText("SFX", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)
    c.strokeText("SFX", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)

    c.fillText("MUSIC", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)
    c.strokeText("MUSIC", canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)


    c.fillText(`${settings.sfxVolume}`, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 114)
    c.strokeText(`${settings.sfxVolume}`, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 114)

    c.fillText(`${settings.musicVolume}`, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 114)
    c.strokeText(`${settings.musicVolume}`, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 114)


    c.fillText("-", canvas.width / 2 - settings.UIRatio * 9.95 * 29 / 4, settings.UIRatio * 112)
    c.strokeText("-", canvas.width / 2 - settings.UIRatio * 9.95 * 29 / 4, settings.UIRatio * 112)

    c.fillText("+", canvas.width / 2 - settings.UIRatio * 4 * 28 / 4, settings.UIRatio * 113.5)
    c.strokeText("+", canvas.width / 2 - settings.UIRatio * 4 * 28 / 4, settings.UIRatio * 113.5)

    c.fillText("-", canvas.width / 2 + settings.UIRatio * 10.9 * 21 / 8, settings.UIRatio * 112)
    c.strokeText("-", canvas.width / 2 + settings.UIRatio * 10.9 * 21 / 8, settings.UIRatio * 112)

    c.fillText("+", canvas.width / 2 + settings.UIRatio * 27 * 21 / 8, settings.UIRatio * 113.5)
    c.strokeText("+", canvas.width / 2 + settings.UIRatio * 27 * 21 / 8, settings.UIRatio * 113.5)
  }

  audioSettingsUpdate() {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4 * settings.UIRatio / 10;

    // c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
    // c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);


    //MUSIC -
    if (checkHover(canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.width / 2 + settings.UIRatio * 8 * 37 / 8, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(-10, 1);
      }
    }

    //MUSIC +
    if (checkHover(canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.width / 2 + settings.UIRatio * 15 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(10, 1);
      }
    }

    //SFX -
    if (checkHover(canvas.width / 2 - settings.UIRatio * 11 * 29 / 4, canvas.width / 2 - settings.UIRatio * 11 * 23 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {

      c.strokeRect(canvas.width / 2 - settings.UIRatio * 11 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(-10, 0);
      }
    }

    //SFX +
    if (checkHover(canvas.width / 2 - settings.UIRatio * 5 * 29 / 4, canvas.width / 2 - settings.UIRatio * 5 * 16 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 5 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(10, 0);
      }
    }
  }


  settings() {
    c.drawImage(screens[4], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 5.5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);

    c.font = `bold ${20 * settings.UIRatio}px Arial`
    c.fillStyle = "#bcbcbc"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("SETTINGS", canvas.width / 2, settings.UIRatio * 18)
    c.strokeText("SETTINGS", canvas.width / 2, settings.UIRatio * 18)

    c.font = `bold ${10 * settings.UIRatio}px Arial`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText("VIDEO", canvas.width / 2, settings.UIRatio * 65.5)
    c.strokeText("VIDEO", canvas.width / 2, settings.UIRatio * 65.5)

    c.fillText("AUDIO", canvas.width / 2, settings.UIRatio * 105.5)
    c.strokeText("AUDIO", canvas.width / 2, settings.UIRatio * 105.5)

  }

  settingsUpdate(ls: levelSettings) {
    c.strokeStyle = "#bcbcbc"
    c.lineWidth = 4 * settings.UIRatio / 10;

    //Video
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 3, settings.UIRatio * 16 * 5)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
      if (mouse.click) {
        ls.backScreen.push(3);
        ls.screen = 4;
      }
    }
    //Audio
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 5.5, settings.UIRatio * 16 * 8)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 5.5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
      if (mouse.click) {
        ls.backScreen.push(3);
        ls.screen = 5;
      }
    }

    if (mouse.click) mouse.click = false;
  }

}




