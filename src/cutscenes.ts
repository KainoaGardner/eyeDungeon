import { canvas, c, settings, } from "./global";
import { cutsceneTextures } from "./textures"
import { keyMap } from "./keypress"
import { languageText } from "./text"

export class Cutscene {
  scene: number;
  frameCounter: number;

  constructor(scene: number, frameCounter: number = 0) {
    this.scene = scene;
    this.frameCounter = frameCounter
  }

  update() {
    switch (this.scene) {
      case 0:
        this.cutscene1();
        break;
      case 1:
        this.cutscene2()
        break;
      case 10:
        this.bossCutscene();
        break;
      default:
        break;
    }

    if (this.frameCounter !== 0) {
      this.frameCounter++;
    }

    if (keyMap.get("Escape")) {
      this.frameCounter = 0
      keyMap.set("Escape", false)
    }

  }

  private cutscene1() {
    if (this.frameCounter > 150) {
      this.frameCounter = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
  }

  private cutscene2() {
    if (this.frameCounter > 150) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

  }


  private bossCutscene() {
    if (this.frameCounter > 1800) {
      this.frameCounter = 0;
    }

    if (this.frameCounter < 50) {
      c.globalAlpha = 0.05;
      c.fillStyle = "black"
      c.fillRect(0, 0, canvas.width, canvas.height)
      c.globalAlpha = 1;
    }
    else if (this.frameCounter < 100) {
      c.globalAlpha = 0.05;
      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 200, 0, 2 * Math.PI);
      c.fillStyle = "#140202";
      c.fill();

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 100, 0, 2 * Math.PI);
      c.fillStyle = "#210808";
      c.fill();

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 50, 0, 2 * Math.PI);
      c.fillStyle = "#420a0a";
      c.fill();
      c.globalAlpha = 1;
    }
    else if (this.frameCounter < 1800) {
      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 200, 0, 2 * Math.PI);
      c.fillStyle = "#140202";
      c.fill();

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 100, 0, 2 * Math.PI);
      c.fillStyle = "#210808";
      c.fill();

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height / 2, settings.UIRatio * 50, 0, 2 * Math.PI);
      c.fillStyle = "#420a0a";
      c.fill();
    }

    if (this.frameCounter > 100 && this.frameCounter < 1000) {
      c.drawImage(cutsceneTextures[0], canvas.width / 2 - settings.UIRatio * 32, canvas.height - (this.frameCounter / 100 * settings.UIRatio * 11.3) + settings.UIRatio * 10, settings.UIRatio * 64, settings.UIRatio * 64);
    } else if (this.frameCounter < 1300 && this.frameCounter >= 1000) {
      c.drawImage(cutsceneTextures[0], canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 32, settings.UIRatio * 64, settings.UIRatio * 64);
    } else if (this.frameCounter < 1350 && this.frameCounter >= 1300) {
      c.drawImage(cutsceneTextures[1], canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 32, settings.UIRatio * 64, settings.UIRatio * 64);
    } else if (this.frameCounter < 1500 && this.frameCounter >= 1350) {
      c.drawImage(cutsceneTextures[2], canvas.width / 2 - settings.UIRatio * 32, canvas.height / 2 - settings.UIRatio * 32, settings.UIRatio * 64, settings.UIRatio * 64);
    } else if (this.frameCounter < 1550 && this.frameCounter >= 1500) {
      c.drawImage(
        cutsceneTextures[2], canvas.width / 2 - settings.UIRatio * (64 + this.frameCounter - 1500) / 2,
        canvas.height / 2 - settings.UIRatio * (64 + this.frameCounter - 1500) / 2,
        settings.UIRatio * (64 + this.frameCounter - 1500),
        settings.UIRatio * (64 + this.frameCounter - 1500));
    } else {
      c.fillStyle = "black"
      c.fillRect(0, 0, canvas.width, canvas.height)
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, settings.UIRatio * 15)
    c.fillRect(0, canvas.height - settings.UIRatio * 15, canvas.width, settings.UIRatio * 15)
  }

  skipText() {
    c.font = `bold ${5 * settings.UIRatio}px Arial`
    c.fillStyle = "white"
    c.strokeStyle = "black"
    c.lineWidth = 1 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("skip")!, canvas.width - settings.UIRatio * 40, canvas.height - settings.UIRatio * 10)
    c.strokeText(text.get("skip")!, canvas.width - settings.UIRatio * 40, canvas.height - settings.UIRatio * 10)
  }
}
