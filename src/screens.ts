import { canvas, c, settings, mouse, unlockedLevels } from "./global";
import { screens, frame0Img, frame1Img } from "./textures"
import { levelSettings, setLevel, newGame } from "./levels"
import { keyMap } from "./keypress";
import { setSFXVolume, setMusicVolume } from "./sounds";
import { languageText } from "./text"
import { saveData, uploadData } from "./save"
import { sfxSounds, musicSounds } from "./sounds";

function checkHover(left: number, right: number, top: number, bottom: number): boolean {
  if (mouse.x > left && mouse.x < right && mouse.y > top && mouse.y < bottom) return true;
  return false;
}

export function updateDisplaySettings(displayWidth: number, displayHeight: number, graphicsWidth: number, graphicsHeight: number) {
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

export function updateVolume(change: number, type: number) {
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
    c.drawImage(screens[4], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 6 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 6, settings.UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);

    c.font = `bold ${9 * settings.UIRatio}px Kappa20`
    c.strokeStyle = "black"
    c.fillStyle = "#d63031"

    c.lineWidth = 2 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87)
    c.strokeText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87)

    c.fillText(text.get("load")!, canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122)
    c.strokeText(text.get("load")!, canvas.width / 2 - settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122)

    c.fillText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122)
    c.strokeText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 122)

    c.fillText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87)
    c.strokeText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 36 * 2 / 2, settings.UIRatio * 87)

    c.font = `bold ${20 * settings.UIRatio}px Kappa20`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText(text.get("title")!, canvas.width / 2, settings.UIRatio * 39.5)
    c.strokeText(text.get("title")!, canvas.width / 2, settings.UIRatio * 39.5)

  }

  homeScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;
    let buttonClick = false;

    //new
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        newGame(ls);
      }
    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 34 * 2, canvas.width / 2 - settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 34 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        uploadData(ls)
      }
    }

    //settings
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        ls.screen = 3;
        ls.backScreen.push(0);
      }
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 4, canvas.width / 2 + settings.UIRatio * 68, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 4, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        ls.screen = 2;
        ls.backScreen.push(0);
      }
    }


    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();

      }
    }
  }


  pauseScreen() {
    c.drawImage(screens[4], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 6 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 6, settings.UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);


    c.font = `bold ${9 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 2 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 87)
    c.strokeText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 87)

    c.fillText(text.get("levels")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 122)
    c.strokeText(text.get("levels")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 122)

    c.fillText(text.get("save")!, canvas.width / 2, settings.UIRatio * 87)
    c.strokeText(text.get("save")!, canvas.width / 2, settings.UIRatio * 87)

    c.fillText(text.get("load")!, canvas.width / 2, settings.UIRatio * 122)
    c.strokeText(text.get("load")!, canvas.width / 2, settings.UIRatio * 122)

    c.fillText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 122)
    c.strokeText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 122)

    c.fillText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 87)
    c.strokeText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 87)

    c.font = `bold ${20 * settings.UIRatio}px Kappa20`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText(text.get("paused")!, canvas.width / 2, settings.UIRatio * 39)
    c.strokeText(text.get("paused")!, canvas.width / 2, settings.UIRatio * 39)

  }

  pauseScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false;

    //settigns
    if (checkHover(canvas.width / 2 + settings.UIRatio * 34, canvas.width / 2 + settings.UIRatio * 98, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        ls.screen = 3;
        ls.backScreen.push(1);
      }
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 34, canvas.width / 2 + settings.UIRatio * 98, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        ls.screen = 2;
        ls.backScreen.push(1);
      }
    }

    //save
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        saveData(ls)
      }
    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        uploadData(ls)
      }
    }

    //new
    if (checkHover(canvas.width / 2 - settings.UIRatio * 49 * 2, canvas.width / 2 - settings.UIRatio * 17 * 2, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        newGame(ls);
      }
    }

    //levels
    if (checkHover(canvas.width / 2 - settings.UIRatio * 49 * 2, canvas.width / 2 - settings.UIRatio * 17 * 2, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true;
        ls.screen = 7;
        ls.backScreen.push(1)
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }


  controls() {
    c.drawImage(screens[2], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("controls")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("controls")!, canvas.width / 2, settings.UIRatio * 16)

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, canvas.height - settings.UIRatio * 16 * 7, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 7);
    // c.drawImage(controlsImg, canvas.width / 2 - settings.UIRatio * 75 / 2, settings.UIRatio * 54, 75 * settings.UIRatio, 70 * settings.UIRatio);


    c.font = `bold ${10 * settings.UIRatio}px Kappa20`
    c.lineWidth = 3 * settings.UIRatio / 10;

    c.fillText(text.get("controlsMove")!, canvas.width / 2, settings.UIRatio * 61)
    c.strokeText(text.get("controlsMove")!, canvas.width / 2, settings.UIRatio * 61)

    c.fillText(text.get("controlsSprint")!, canvas.width / 2, settings.UIRatio * 72)
    c.strokeText(text.get("controlsSprint")!, canvas.width / 2, settings.UIRatio * 72)

    c.fillText(text.get("controlsUse")!, canvas.width / 2, settings.UIRatio * 83)
    c.strokeText(text.get("controlsUse")!, canvas.width / 2, settings.UIRatio * 83)

    c.fillText(text.get("controlsItems")!, canvas.width / 2, settings.UIRatio * 94)
    c.strokeText(text.get("controlsItems")!, canvas.width / 2, settings.UIRatio * 94)

    c.fillText(text.get("controlsDash")!, canvas.width / 2, settings.UIRatio * 105)
    c.strokeText(text.get("controlsDash")!, canvas.width / 2, settings.UIRatio * 105)

    c.fillText(text.get("controlsTeleport")!, canvas.width / 2, settings.UIRatio * 116)
    c.strokeText(text.get("controlsTeleport")!, canvas.width / 2, settings.UIRatio * 116)
  }


  backScreen() {
  }

  backUpdate(ls: levelSettings) {
    let buttonClick = false;
    if (keyMap.get("Escape")) {
      keyMap.set("Escape", false)
      sfxSounds[27].pause();
      sfxSounds[27].currentTime = 0;
      sfxSounds[27].play();
      if (ls.backScreen.length > 0) {
        ls.screen = ls.backScreen[ls.backScreen.length - 1]
        ls.backScreen.pop()
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }


  videoSettings() {
    c.drawImage(screens[3], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 3 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("video")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("video")!, canvas.width / 2, settings.UIRatio * 16)

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

    c.font = `bold ${13 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;
    c.fillText(text.get("display")!, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText(text.get("display")!, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)

    c.fillText(text.get("graphics")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)
    c.strokeText(text.get("graphics")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 49)

    c.font = `bold ${7 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;

    c.fillText("1920x1080", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 72)
    c.strokeText("1920x1080", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 72)
    c.fillText("1600x900", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88)
    c.strokeText("1600x900", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88)
    c.fillText("1280x720", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 104)
    c.strokeText("1280x720", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 104)
    c.fillText("960x540", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 120)
    c.strokeText("960x540", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 120)
    c.fillText("640x360", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 136)
    c.strokeText("640x360", canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 136)

    c.fillText(text.get("extraHigh")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 72)
    c.strokeText(text.get("extraHigh")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 72)
    c.fillText(text.get("high")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88)
    c.strokeText(text.get("high")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 88)
    c.fillText(text.get("normal")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 104)
    c.strokeText(text.get("normal")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 104)
    c.fillText(text.get("low")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 120)
    c.strokeText(text.get("low")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 120)
    c.fillText(text.get("extraLow")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 136)
    c.strokeText(text.get("extraLow")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 136)
  }

  videoSettingsUpdate() {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false;

    //1920x1080
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 5, canvas.height - settings.UIRatio * 16 * 4) ||
      settings.displayWidth === 1920) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        updateDisplaySettings(1920, 1080, settings.graphicsWidth, settings.graphicsHeight);
        buttonClick = true;
      }
    }
    //1600x900
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, canvas.height - settings.UIRatio * 16 * 3) ||
      settings.displayWidth === 1600) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(1600, 900, settings.graphicsWidth, settings.graphicsHeight);
      }
    }
    //1280x720
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 3, canvas.height - settings.UIRatio * 16 * 2) ||
      settings.displayWidth === 1280) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(1280, 720, settings.graphicsWidth, settings.graphicsHeight)
      };
    }
    //960x540
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 2, canvas.height - settings.UIRatio * 16 * 1) ||
      settings.displayWidth === 960) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(960, 540, settings.graphicsWidth, settings.graphicsHeight)
      };
    }
    //640x360
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.width / 2, canvas.height - settings.UIRatio * 16 * 1, canvas.height) ||
      settings.displayWidth === 640) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(640, 360, settings.graphicsWidth, settings.graphicsHeight)
      };
    }

    //ExtraHigh
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 5, canvas.height - settings.UIRatio * 16 * 4) ||
      settings.graphicsWidth === 512) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(settings.displayWidth, settings.displayHeight, 512, 288)
      };
    }
    //High
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 4, canvas.height - settings.UIRatio * 16 * 3) ||
      settings.graphicsWidth === 384) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 4, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(settings.displayWidth, settings.displayHeight, 384, 216)
      };
    }
    //Normal
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 3, canvas.height - settings.UIRatio * 16 * 2) ||
      settings.graphicsWidth === 256) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 3, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(settings.displayWidth, settings.displayHeight, 256, 144)
      };
    }
    //Low
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 2, canvas.height - settings.UIRatio * 16 * 1) ||
      settings.graphicsWidth === 192) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 2, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true
        updateDisplaySettings(settings.displayWidth, settings.displayHeight, 192, 108)
      };
    }
    //ExtraLow
    if (checkHover(canvas.width / 2, canvas.width / 2 + settings.UIRatio * 8 * 25 / 2, canvas.height - settings.UIRatio * 16 * 1, canvas.height) ||
      settings.graphicsWidth === 128) {
      c.strokeRect(canvas.width / 2, canvas.height - settings.UIRatio * 16 * 1, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        updateDisplaySettings(settings.displayWidth, settings.displayHeight, 128, 72)
      };
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
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

    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("audio")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("audio")!, canvas.width / 2, settings.UIRatio * 16)

    c.font = `bold ${13 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;

    c.fillText(text.get("sfx")!, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)
    c.strokeText(text.get("sfx")!, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)

    c.fillText(text.get("music")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)
    c.strokeText(text.get("music")!, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 65)


    c.fillText(`${settings.sfxVolume}`, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 112)
    c.strokeText(`${settings.sfxVolume}`, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 112)

    c.fillText(`${settings.musicVolume}`, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 112)
    c.strokeText(`${settings.musicVolume}`, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 112)


    c.fillText("-", canvas.width / 2 - settings.UIRatio * 9.95 * 29 / 4, settings.UIRatio * 112)
    c.strokeText("-", canvas.width / 2 - settings.UIRatio * 9.95 * 29 / 4, settings.UIRatio * 112)

    c.fillText("+", canvas.width / 2 - settings.UIRatio * 4 * 28 / 4, settings.UIRatio * 112)
    c.strokeText("+", canvas.width / 2 - settings.UIRatio * 4 * 28 / 4, settings.UIRatio * 112)

    c.fillText("-", canvas.width / 2 + settings.UIRatio * 10.9 * 21 / 8, settings.UIRatio * 112)
    c.strokeText("-", canvas.width / 2 + settings.UIRatio * 10.9 * 21 / 8, settings.UIRatio * 112)

    c.fillText("+", canvas.width / 2 + settings.UIRatio * 27 * 21 / 8, settings.UIRatio * 112)
    c.strokeText("+", canvas.width / 2 + settings.UIRatio * 27 * 21 / 8, settings.UIRatio * 112)
  }

  audioSettingsUpdate() {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false;

    //MUSIC -
    if (checkHover(canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.width / 2 + settings.UIRatio * 8 * 37 / 8, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 8 * 21 / 8, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(-10, 1);
        buttonClick = true;
      }
    }

    //MUSIC +
    if (checkHover(canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.width / 2 + settings.UIRatio * 15 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 12 * 21 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(10, 1);
        buttonClick = true;
      }
    }

    //SFX -
    if (checkHover(canvas.width / 2 - settings.UIRatio * 11 * 29 / 4, canvas.width / 2 - settings.UIRatio * 11 * 23 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {

      c.strokeRect(canvas.width / 2 - settings.UIRatio * 11 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(-10, 0);
        buttonClick = true;

      }
    }

    //SFX +
    if (checkHover(canvas.width / 2 - settings.UIRatio * 5 * 29 / 4, canvas.width / 2 - settings.UIRatio * 5 * 16 / 4, canvas.height - settings.UIRatio * 8 * 5, canvas.height - settings.UIRatio * 8 * 3)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 5 * 29 / 4, canvas.height - settings.UIRatio * 8 * 5, settings.UIRatio * 16, settings.UIRatio * 16);
      if (mouse.click) {
        updateVolume(10, 0);
        buttonClick = true;
      }
    }


    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }

  languageSettings() {
    c.drawImage(screens[6], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 8, settings.UIRatio * 32 * 2, settings.UIRatio * 16);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 + settings.UIRatio * 12, settings.UIRatio * 32 * 2, settings.UIRatio * 16);

    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;


    const text = languageText[settings.language]
    c.fillText(text.get("language")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("language")!, canvas.width / 2, settings.UIRatio * 16)

    c.font = `bold ${7 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;

    c.fillText("ENGLISH", canvas.width / 2, settings.UIRatio * 72)
    c.strokeText("ENGLISH", canvas.width / 2, settings.UIRatio * 72)

    c.fillText("日本語", canvas.width / 2, settings.UIRatio * 92)
    c.strokeText("日本語", canvas.width / 2, settings.UIRatio * 92)
  }

  languageSettingsUpdate() {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false;

    if (settings.language === 0)
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 8, settings.UIRatio * 32 * 2, settings.UIRatio * 16);

    if (settings.language === 1)
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 + settings.UIRatio * 12, settings.UIRatio * 32 * 2, settings.UIRatio * 16);

    //english
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 8, canvas.height / 2 + settings.UIRatio * 8)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 8, settings.UIRatio * 32 * 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        settings.language = 0;
      }
    }

    //日本語
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, canvas.height / 2 + settings.UIRatio * 12, canvas.height / 2 + settings.UIRatio * 28)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 + settings.UIRatio * 12, settings.UIRatio * 32 * 2, settings.UIRatio * 16);
      if (mouse.click) {
        buttonClick = true;
        settings.language = 1;
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }

  settings() {
    c.drawImage(screens[1], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 2.25, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 4.5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 6.75, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);

    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("settings")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("settings")!, canvas.width / 2, settings.UIRatio * 16)

    c.font = `bold ${10 * settings.UIRatio}px Kappa20`
    c.lineWidth = 3 * settings.UIRatio / 10;

    c.fillText(text.get("video")!, canvas.width / 2, settings.UIRatio * 53)
    c.strokeText(text.get("video")!, canvas.width / 2, settings.UIRatio * 53)

    c.fillText(text.get("audio")!, canvas.width / 2, settings.UIRatio * 89)
    c.strokeText(text.get("audio")!, canvas.width / 2, settings.UIRatio * 89)
    105.
    c.fillText(text.get("language")!, canvas.width / 2, settings.UIRatio * 125)
    c.strokeText(text.get("language")!, canvas.width / 2, settings.UIRatio * 125)

  }

  settingsUpdate(ls: levelSettings) {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false

    //Video
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 2.25, settings.UIRatio * 16 * 4.25)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 2.25, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen.push(3);
        ls.screen = 4;
      }
    }
    //Audio
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 4.5, settings.UIRatio * 16 * 6.5)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 4.5, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen.push(3);
        ls.screen = 5;
      }
    }
    //Language
    if (checkHover(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, canvas.width / 2 + settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 6.75, settings.UIRatio * 16 * 8.75)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 8 * 25 / 4, settings.UIRatio * 16 * 6.75, settings.UIRatio * 8 * 25 / 2, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen.push(3);
        ls.screen = 6;
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }


  levelSelect() {
    c.drawImage(screens[4], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, 0, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 2);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 106, settings.UIRatio * 32, settings.UIRatio * 32);


    c.font = `bold ${16 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 4 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("levels")!, canvas.width / 2, settings.UIRatio * 16)
    c.strokeText(text.get("levels")!, canvas.width / 2, settings.UIRatio * 16)

    c.font = `bold ${15 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;


    c.fillText("1", canvas.width / 2 - settings.UIRatio * 72, settings.UIRatio * 57)
    c.strokeText("1", canvas.width / 2 - settings.UIRatio * 72, settings.UIRatio * 57)
    c.fillText("2", canvas.width / 2 - settings.UIRatio * 36, settings.UIRatio * 57)
    c.strokeText("2", canvas.width / 2 - settings.UIRatio * 36, settings.UIRatio * 57)
    c.fillText("3", canvas.width / 2, settings.UIRatio * 57)
    c.strokeText("3", canvas.width / 2, settings.UIRatio * 57)
    c.fillText("4", canvas.width / 2 + settings.UIRatio * 36, settings.UIRatio * 57)
    c.strokeText("4", canvas.width / 2 + settings.UIRatio * 36, settings.UIRatio * 57)
    c.fillText("5", canvas.width / 2 + settings.UIRatio * 72, settings.UIRatio * 57)
    c.strokeText("5", canvas.width / 2 + settings.UIRatio * 72, settings.UIRatio * 57)

    c.fillText("6", canvas.width / 2 - settings.UIRatio * 72, settings.UIRatio * 90)
    c.strokeText("6", canvas.width / 2 - settings.UIRatio * 72, settings.UIRatio * 90)
    c.fillText("7", canvas.width / 2 - settings.UIRatio * 36, settings.UIRatio * 90)
    c.strokeText("7", canvas.width / 2 - settings.UIRatio * 36, settings.UIRatio * 90)
    c.fillText("8", canvas.width / 2, settings.UIRatio * 90)
    c.strokeText("8", canvas.width / 2, settings.UIRatio * 90)
    c.fillText("9", canvas.width / 2 + settings.UIRatio * 36, settings.UIRatio * 90)
    c.strokeText("9", canvas.width / 2 + settings.UIRatio * 36, settings.UIRatio * 90)
    c.fillText("10", canvas.width / 2 + settings.UIRatio * 72, settings.UIRatio * 90)
    c.strokeText("10", canvas.width / 2 + settings.UIRatio * 72, settings.UIRatio * 90)

    c.font = `bold ${9 * settings.UIRatio}px Kappa20`
    c.lineWidth = 2 * settings.UIRatio / 10;

    c.fillText(text.get("boss")!, canvas.width / 2, settings.UIRatio * 123)
    c.strokeText(text.get("boss")!, canvas.width / 2, settings.UIRatio * 123)

    c.globalAlpha = 0.5;
    c.fillStyle = "black"


    if (!unlockedLevels.get(1))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(2))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(3))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(4))
      c.fillRect(canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(5))
      c.fillRect(canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(7))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(6))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(8))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(9))
      c.fillRect(canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(10))
      c.fillRect(canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);

    if (!unlockedLevels.get(11))
      c.fillRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 106, settings.UIRatio * 32, settings.UIRatio * 32);

    c.globalAlpha = 1;
  }


  levelSelectUpdate(ls: levelSettings) {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false

    if (unlockedLevels.get(1) && checkHover(canvas.width / 2 - settings.UIRatio * 88, canvas.width / 2 - settings.UIRatio * 56, settings.UIRatio * 40, settings.UIRatio * 72)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 1;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(2) && checkHover(canvas.width / 2 - settings.UIRatio * 52, canvas.width / 2 - settings.UIRatio * 18, settings.UIRatio * 40, settings.UIRatio * 72)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 2;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(3) && checkHover(canvas.width / 2 - settings.UIRatio * 16, canvas.width / 2 + settings.UIRatio * 16, settings.UIRatio * 40, settings.UIRatio * 72)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 3;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(4) && checkHover(canvas.width / 2 + settings.UIRatio * 20, canvas.width / 2 + settings.UIRatio * 52, settings.UIRatio * 40, settings.UIRatio * 72)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 4;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(5) && checkHover(canvas.width / 2 + settings.UIRatio * 56, canvas.width / 2 + settings.UIRatio * 88, settings.UIRatio * 40, settings.UIRatio * 72)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 40, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 5;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(6) && checkHover(canvas.width / 2 - settings.UIRatio * 88, canvas.width / 2 - settings.UIRatio * 56, settings.UIRatio * 73, settings.UIRatio * 105)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 88, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 6;
        setLevel(ls)

      }
    }

    if (unlockedLevels.get(7) && checkHover(canvas.width / 2 - settings.UIRatio * 52, canvas.width / 2 - settings.UIRatio * 18, settings.UIRatio * 73, settings.UIRatio * 105)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 52, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 7;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(8) && checkHover(canvas.width / 2 - settings.UIRatio * 16, canvas.width / 2 + settings.UIRatio * 16, settings.UIRatio * 73, settings.UIRatio * 105)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 8;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(9) && checkHover(canvas.width / 2 + settings.UIRatio * 20, canvas.width / 2 + settings.UIRatio * 52, settings.UIRatio * 73, settings.UIRatio * 105)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 20, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 9;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(10) && checkHover(canvas.width / 2 + settings.UIRatio * 56, canvas.width / 2 + settings.UIRatio * 88, settings.UIRatio * 73, settings.UIRatio * 105)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 56, settings.UIRatio * 73, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 10;
        setLevel(ls)
      }
    }

    if (unlockedLevels.get(11) && checkHover(canvas.width / 2 - settings.UIRatio * 16, canvas.width / 2 + settings.UIRatio * 16, settings.UIRatio * 106, settings.UIRatio * 138)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 16, settings.UIRatio * 106, settings.UIRatio * 32, settings.UIRatio * 32);
      if (mouse.click) {
        buttonClick = true
        ls.backScreen = [];
        ls.screen = -1
        ls.level = 11;
        setLevel(ls)
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }

  winScreen() {
    c.drawImage(screens[4], 0, 0, canvas.width, canvas.height);

    c.drawImage(frame0Img, canvas.width / 2 - settings.UIRatio * 32 * 5 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 5, settings.UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32 * 6 / 2, settings.UIRatio * 14, settings.UIRatio * 32 * 6, settings.UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);


    c.font = `bold ${9 * settings.UIRatio}px Kappa20`
    c.fillStyle = "#d63031"
    c.strokeStyle = "black"
    c.lineWidth = 2 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 87)
    c.strokeText(text.get("new")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 87)

    c.fillText(text.get("levels")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 122)
    c.strokeText(text.get("levels")!, canvas.width / 2 - settings.UIRatio * 33 * 2, settings.UIRatio * 122)

    c.fillText(text.get("save")!, canvas.width / 2, settings.UIRatio * 87)
    c.strokeText(text.get("save")!, canvas.width / 2, settings.UIRatio * 87)

    c.fillText(text.get("load")!, canvas.width / 2, settings.UIRatio * 122)
    c.strokeText(text.get("load")!, canvas.width / 2, settings.UIRatio * 122)

    c.fillText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 122)
    c.strokeText(text.get("controls")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 122)

    c.fillText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 87)
    c.strokeText(text.get("settings")!, canvas.width / 2 + settings.UIRatio * 66, settings.UIRatio * 87)

    c.font = `bold ${20 * settings.UIRatio}px Kappa20`
    c.lineWidth = 4 * settings.UIRatio / 10;

    c.fillText(text.get("win")!, canvas.width / 2, settings.UIRatio * 39)
    c.strokeText(text.get("win")!, canvas.width / 2, settings.UIRatio * 39)

  }

  winScreenUpdate(ls: levelSettings) {
    c.strokeStyle = "#d63031"
    c.lineWidth = 10 * settings.UIRatio / 10;

    let buttonClick = false

    //settigns
    if (checkHover(canvas.width / 2 + settings.UIRatio * 34, canvas.width / 2 + settings.UIRatio * 98, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        ls.screen = 3;
        ls.backScreen.push(8);
      }
    }

    //controls
    if (checkHover(canvas.width / 2 + settings.UIRatio * 34, canvas.width / 2 + settings.UIRatio * 98, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 + settings.UIRatio * 34, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        ls.screen = 2;
        ls.backScreen.push(8);
      }
    }

    //save
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        saveData(ls)
      }
    }

    //load
    if (checkHover(canvas.width / 2 - settings.UIRatio * 32, canvas.width / 2 + settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 32, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        uploadData(ls)
      }
    }

    //new
    if (checkHover(canvas.width / 2 - settings.UIRatio * 49 * 2, canvas.width / 2 - settings.UIRatio * 17 * 2, settings.UIRatio * 70, settings.UIRatio * 102)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 70, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        newGame(ls);
      }
    }

    //levels
    if (checkHover(canvas.width / 2 - settings.UIRatio * 49 * 2, canvas.width / 2 - settings.UIRatio * 17 * 2, settings.UIRatio * 105, settings.UIRatio * 137)) {
      c.strokeRect(canvas.width / 2 - settings.UIRatio * 49 * 2, settings.UIRatio * 105, settings.UIRatio * 32 * 2, settings.UIRatio * 16 * 2);
      if (mouse.click) {
        buttonClick = true
        ls.screen = 7;
        ls.backScreen.push(8)
      }
    }

    if (mouse.click) {
      mouse.click = false;
      if (buttonClick) {
        sfxSounds[27].pause();
        sfxSounds[27].currentTime = 0;
        sfxSounds[27].play();
      }
    }
  }
}

