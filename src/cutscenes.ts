import { canvas, c, settings, } from "./global";
import { cutsceneTextures, playerTextures, flashLightInvImg, swordInvImg, gunInvImg, gunInv1Img, sheildInvImg, dashInvImg } from "./textures"
import { keyMap } from "./keypress"
import { languageText } from "./text"
import { drawImage } from "./util"
import { levelSettings } from "./levels"

let playerWalkFrame = 0;

export class Cutscene {
  scene: number;
  frameCounter: number;

  constructor(scene: number, frameCounter: number = 0) {
    this.scene = scene;
    this.frameCounter = frameCounter
  }

  update(ls: levelSettings) {
    switch (this.scene) {
      case 0:
        this.cutscene1(ls.level);
        break;
      case 1:
        this.cutscene2(ls.level)
        break;
      case 2:
        this.cutscene3(ls.level)
        break;
      case 3:
        this.cutscene4(ls.level)
        break;
      case 4:
        this.cutscene5(ls.level)
        break;
      case 5:
        this.cutscene6(ls.level)
        break;
      case 6:
        this.cutscene7(ls.level)
        break;
      case 7:
        this.cutscene8(ls.level)
        break;
      case 8:
        this.cutscene9(ls.level)
        break;
      case 9:
        this.cutscene10(ls.level)
        break;
      case 10:
        this.bossCutscene();
        break;
      case 11:
        this.winCutscene(ls);
        break;

      default:
        break;
    }
    this.cutsceneBars()
    this.skipText()

    if (this.frameCounter !== 0) {
      this.frameCounter++;
    }

    if (keyMap.get("Escape")) {
      this.frameCounter = 0
      if (this.scene === 11) {
        ls.screen = 8;
        ls.backScreen = [];
      }
      keyMap.set("Escape", false)
    }

  }

  private cutsceneBars() {
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, settings.UIRatio * 10)
    c.fillRect(0, canvas.height - settings.UIRatio * 10, canvas.width, settings.UIRatio * 15)
  }

  private cutscene1(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 3000) {
      this.frameCounter = 0;
    }
    if (this.frameCounter === 1) {
      playerWalkFrame = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 700) {
      c.drawImage(cutsceneTextures[6], 0, 0, canvas.width, canvas.height)


      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (30 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (30 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (30 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }

      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    } else if (this.frameCounter >= 700 && this.frameCounter < 800) {
      c.drawImage(cutsceneTextures[6], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[7], settings.UIRatio * 160, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 800 && this.frameCounter < 850) {
      c.drawImage(cutsceneTextures[6], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[8], settings.UIRatio * 160, settings.UIRatio * (90 + (this.frameCounter - 800) / 5), settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 850 && this.frameCounter < 1400) {
      c.drawImage(cutsceneTextures[3], 0, settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[3], 0, canvas.height + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[3], 0, canvas.height * 2 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[3], 0, canvas.height * 3 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[4], 0, canvas.height * 4 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[4], 0, canvas.height * 5 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[4], 0, canvas.height * 6 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[4], 0, canvas.height * 7 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[4], 0, canvas.height * 8 + settings.UIRatio * (-1 * (this.frameCounter - 850) * 2), canvas.width, canvas.height)

      if (this.frameCounter % 100 > 50) {
        c.drawImage(playerTextures[7], canvas.width / 2 - settings.UIRatio * 20, canvas.height / 2 - settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 40)
      } else {

        c.drawImage(playerTextures[8], canvas.width / 2 - settings.UIRatio * 20, canvas.height / 2 - settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    } else if (this.frameCounter >= 1400 && this.frameCounter < 1500) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[7], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * (this.frameCounter - 1400), settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 1500 && this.frameCounter < 1700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[9], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 100, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 1700 && this.frameCounter < 1900) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[0], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 1900 && this.frameCounter < 2000) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[4], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 2000 && this.frameCounter < 2700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[5], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      c.drawImage(flashLightInvImg, canvas.width / 2 + settings.UIRatio * 5, settings.UIRatio * 85, settings.UIRatio * 20, settings.UIRatio * 20)

      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.font = `bold ${15 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 2 * settings.UIRatio / 10;

      c.fillText(text.get("getFlashlight")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
      c.strokeText(text.get("getFlashlight")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
    }

    if (this.frameCounter < 850 && this.frameCounter > 100) {
      c.drawImage(cutsceneTextures[8], settings.UIRatio * (75 + this.frameCounter / 50), settings.UIRatio * 30, settings.UIRatio * 35 * 2, settings.UIRatio * 11 * 2)
      c.drawImage(cutsceneTextures[9], settings.UIRatio * (30 + this.frameCounter / 40), settings.UIRatio * 45, settings.UIRatio * 35 * 2, settings.UIRatio * 11 * 2)
      c.drawImage(cutsceneTextures[10], settings.UIRatio * (0 + this.frameCounter / 60), settings.UIRatio * 45, settings.UIRatio * 35, settings.UIRatio * 11)

      c.drawImage(cutsceneTextures[10], settings.UIRatio * (150 + this.frameCounter / 30), settings.UIRatio * 25, settings.UIRatio * 35 * 3, settings.UIRatio * 11 * 3)
    }

    if (this.frameCounter > 2700) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene2(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 2200) {
      this.frameCounter = 0;
    }
    if (this.frameCounter === 1) {
      playerWalkFrame = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (140 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (140 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (140 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }

      if (this.frameCounter % 100 > 50) {
        c.drawImage(cutsceneTextures[11], settings.UIRatio * (this.frameCounter - 100) / 4, settings.UIRatio * 85, settings.UIRatio * 40, settings.UIRatio * 40)
      } else {

        c.drawImage(cutsceneTextures[12], settings.UIRatio * (this.frameCounter - 100) / 4, settings.UIRatio * 85, settings.UIRatio * 40, settings.UIRatio * 40)
      }

    } else if (this.frameCounter >= 600 && this.frameCounter < 1100) {
      c.drawImage(cutsceneTextures[7], 0, 0, canvas.width, canvas.height)
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * ((this.frameCounter - 650) / 4.2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * ((this.frameCounter - 650) / 4.2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * ((this.frameCounter - 650) / 4.2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      c.drawImage(swordInvImg, canvas.width / 2 - settings.UIRatio * 5, settings.UIRatio * 95, settings.UIRatio * 30, settings.UIRatio * 30)
    }

    if (this.frameCounter > 100 && this.frameCounter < 1100) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }


    if (this.frameCounter >= 1100 && this.frameCounter < 1250) {
      c.drawImage(cutsceneTextures[7], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[2], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      c.drawImage(swordInvImg, canvas.width / 2 - settings.UIRatio * 5, settings.UIRatio * 95, settings.UIRatio * 30, settings.UIRatio * 30)
    } else if (this.frameCounter >= 1250 && this.frameCounter < 1350) {
      c.drawImage(cutsceneTextures[7], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[6], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      c.drawImage(swordInvImg, canvas.width / 2 - settings.UIRatio * 5, settings.UIRatio * 95, settings.UIRatio * 30, settings.UIRatio * 30)
    } else if (this.frameCounter >= 1350 && this.frameCounter < 1900) {
      c.drawImage(cutsceneTextures[7], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[5], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      c.drawImage(swordInvImg, canvas.width / 2 - settings.UIRatio * 10, settings.UIRatio * 75, settings.UIRatio * 30, settings.UIRatio * 30)

      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.font = `bold ${15 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 2 * settings.UIRatio / 10;

      c.fillText(text.get("findSword")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
      c.strokeText(text.get("findSword")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
    }

    if (this.frameCounter > 1900) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene3(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 1700) {
      this.frameCounter = 0;
    }
    if (this.frameCounter === 1) {
      playerWalkFrame = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 400) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    } else if (this.frameCounter >= 400 && this.frameCounter < 550) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[0], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 550 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[8], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 400) {
      c.drawImage(cutsceneTextures[14], settings.UIRatio * (this.frameCounter - 600) / 8, settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    } else if (this.frameCounter >= 400 && this.frameCounter < 500) {
      c.drawImage(cutsceneTextures[15], settings.UIRatio * -25, settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }

    if (this.frameCounter >= 500 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[14], settings.UIRatio * -25, settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[13], settings.UIRatio * (this.frameCounter - 500) / 2, settings.UIRatio * 80, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 600 && this.frameCounter < 1400) {
      c.drawImage(cutsceneTextures[5], settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[7], canvas.width + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width * 2 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width * 3 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width * 4 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)

      c.drawImage(cutsceneTextures[14], settings.UIRatio * (-25 + (this.frameCounter - 600) * -1), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[13], settings.UIRatio * (50 - (this.frameCounter - 600) / 30), settings.UIRatio * 80, settings.UIRatio * 40, settings.UIRatio * 40)

      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }

    if (this.frameCounter >= 700 && this.frameCounter < 1400) {
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.font = `bold ${15 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 2 * settings.UIRatio / 10;

      c.fillText(text.get("getRun")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
      c.strokeText(text.get("getRun")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
    }

    if (this.frameCounter > 100 && this.frameCounter < 400) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 600 && this.frameCounter < 1400) {
      if (this.frameCounter % 15 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 1400) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene4(level: number) {
    const text = languageText[settings.language]
    if (this.frameCounter > 1300) {
      this.frameCounter = 0;
    }
    if (this.frameCounter === 1) {
      playerWalkFrame = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 1000) {
      c.drawImage(cutsceneTextures[18], 0, 0, canvas.width, canvas.height)
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }


      c.globalAlpha = 0.3;
      c.fillStyle = "white"
      c.beginPath();
      const path = new Path2D();
      path.moveTo(settings.UIRatio * (-15 + (this.frameCounter - 100) / 2), settings.UIRatio * 95);

      path.lineTo(settings.UIRatio * (100 + (this.frameCounter - 100) / 2), settings.UIRatio * 57);
      path.lineTo(settings.UIRatio * (100 + (this.frameCounter - 100) / 2), settings.UIRatio * 137);
      path.lineTo(settings.UIRatio * (-15 + (this.frameCounter - 100) / 2), settings.UIRatio * 95);
      c.fill(path);

      c.globalAlpha = 1;
      drawImage(c, flashLightInvImg, settings.UIRatio * (-28 + (this.frameCounter - 100) / 2), settings.UIRatio * 85, settings.UIRatio * 20, settings.UIRatio * 20, 135);

      c.globalAlpha = 0.5;
      c.fillStyle = "black"
      c.fillRect(0, 0, canvas.width, canvas.height)

      c.globalAlpha = 1;


      if (this.frameCounter % 100 > 50) {
        c.drawImage(cutsceneTextures[16], settings.UIRatio * (-100 + (this.frameCounter - 100) / 2.5), settings.UIRatio * 85, settings.UIRatio * 40, settings.UIRatio * 40)
      } else {
        c.drawImage(cutsceneTextures[17], settings.UIRatio * (-100 + (this.frameCounter - 100) / 2.5), settings.UIRatio * 85, settings.UIRatio * 40, settings.UIRatio * 40)
      }

    }

    if (this.frameCounter > 100 && this.frameCounter < 1000) {
      if (this.frameCounter % 15 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 1000) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene5(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 2300) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)


      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    } else if (this.frameCounter >= 600 && this.frameCounter < 700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[2], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 700 && this.frameCounter < 800) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[6], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 800 && this.frameCounter < 1500) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[5], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("findGun")!, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("findGun")!, canvas.width / 2, canvas.height / 2)

    } else if (this.frameCounter >= 1500 && this.frameCounter < 1700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[3], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)

    } else if (this.frameCounter >= 1700 && this.frameCounter < 1750) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[7], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 1750 && this.frameCounter < 2000) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[0], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 800) {

      c.drawImage(gunInvImg, settings.UIRatio * 125, settings.UIRatio * 105, settings.UIRatio * 20, settings.UIRatio * 20)
    } else if (this.frameCounter >= 800 && this.frameCounter < 1500) {
      c.drawImage(gunInvImg, settings.UIRatio * 128, settings.UIRatio * 90, settings.UIRatio * 20, settings.UIRatio * 20)
    } else if (this.frameCounter >= 1500 && this.frameCounter < 1700) {
      drawImage(c, gunInv1Img, settings.UIRatio * 127, settings.UIRatio * 98, settings.UIRatio * 20, settings.UIRatio * 20, 45)
    } else if (this.frameCounter >= 1700 && this.frameCounter < 1750) {
      c.drawImage(gunInv1Img, settings.UIRatio * 128, settings.UIRatio * 85, settings.UIRatio * 20, settings.UIRatio * 20)
    } else if (this.frameCounter >= 1750 && this.frameCounter < 2000) {
      drawImage(c, gunInv1Img, settings.UIRatio * 130, settings.UIRatio * 105, settings.UIRatio * 20, settings.UIRatio * 20, 90)
    }

    if (this.frameCounter >= 1700 && this.frameCounter < 1720) {
      c.fillStyle = "yellow"
      c.globalAlpha = 0.1
      c.fillRect(0, 0, canvas.width, canvas.height)
      c.globalAlpha = 0.05
      c.fillStyle = "red"
      c.beginPath();
      c.arc(settings.UIRatio * 147, settings.UIRatio * 107, settings.UIRatio * 10, 0, 2 * Math.PI);
      c.fill();
      c.globalAlpha = 1
    }

    if (this.frameCounter >= 1000 && this.frameCounter < 1700) {
      if (this.frameCounter % 100 > 50) {
        c.drawImage(cutsceneTextures[18], canvas.width - settings.UIRatio * (this.frameCounter - 1000) / 10, settings.UIRatio * 75, settings.UIRatio * 50, settings.UIRatio * 50)
      } else {
        c.drawImage(cutsceneTextures[19], canvas.width - settings.UIRatio * (this.frameCounter - 1000) / 10, settings.UIRatio * 75, settings.UIRatio * 50, settings.UIRatio * 50)
      }
    } else if (this.frameCounter >= 1700 && this.frameCounter < 1750) {
      c.drawImage(cutsceneTextures[20], canvas.width - settings.UIRatio * 70, settings.UIRatio * 75, settings.UIRatio * 50, settings.UIRatio * 50)
    } else if (this.frameCounter >= 1750 && this.frameCounter < 1800) {
      c.drawImage(cutsceneTextures[21], canvas.width - settings.UIRatio * 70, settings.UIRatio * 75, settings.UIRatio * 50, settings.UIRatio * 50)
    }



    if (this.frameCounter > 100 && this.frameCounter < 600) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 2000) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene6(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 1100) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter >= 100 && this.frameCounter < 750) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[23], canvas.width - settings.UIRatio * (-10 + (this.frameCounter - 100) / 2), settings.UIRatio * 95, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 350 || this.frameCounter >= 450 && this.frameCounter < 800) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    } else if (this.frameCounter >= 350 && this.frameCounter < 400) {
      c.drawImage(playerTextures[7], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * (90 - (this.frameCounter - 350) / 2), settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 400 && this.frameCounter < 450) {
      c.drawImage(playerTextures[7], settings.UIRatio * (-40 + (this.frameCounter - 100) / 2), settings.UIRatio * (65 + (this.frameCounter - 400) / 2), settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter > 100 && this.frameCounter < 750) {
      if (this.frameCounter % 15 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 750) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene7(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 3000) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter >= 100 && this.frameCounter < 2700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 900) {
      c.drawImage(cutsceneTextures[25], canvas.width / 2 - settings.UIRatio * 30, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 900 && this.frameCounter < 960) {
      c.drawImage(cutsceneTextures[25], canvas.width / 2 + settings.UIRatio * (-30 + (this.frameCounter - 900) / 2), settings.UIRatio * (65 + (this.frameCounter - 900) / 2),
        settings.UIRatio * (60 - (this.frameCounter - 900)), settings.UIRatio * (60 - (this.frameCounter - 900)))
    }
    else if (this.frameCounter >= 1060 && this.frameCounter < 1120) {
      c.drawImage(cutsceneTextures[25], canvas.width / 2 + settings.UIRatio * (110 - (this.frameCounter - 1060) / 2), settings.UIRatio * (95 - (this.frameCounter - 1060) / 2),
        settings.UIRatio * (this.frameCounter - 1060), settings.UIRatio * (this.frameCounter - 1060))
    } else if (this.frameCounter >= 1120 && this.frameCounter < 1800) {
      c.drawImage(cutsceneTextures[25], canvas.width / 2 + settings.UIRatio * 80, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1800 && this.frameCounter < 1860) {
      c.drawImage(cutsceneTextures[25], canvas.width / 2 + settings.UIRatio * (80 + (this.frameCounter - 1800) / 2), settings.UIRatio * (65 + (this.frameCounter - 1800) / 2),
        settings.UIRatio * (60 - (this.frameCounter - 1800)), settings.UIRatio * (60 - (this.frameCounter - 1800)))
    }
    else if (this.frameCounter >= 1860 && this.frameCounter < 1920) {
      c.drawImage(cutsceneTextures[24], settings.UIRatio * (5 - (this.frameCounter - 1860) / 2), settings.UIRatio * (95 - (this.frameCounter - 1860) / 2),
        settings.UIRatio * (this.frameCounter - 1860), settings.UIRatio * (this.frameCounter - 1860))
    }
    else if (this.frameCounter >= 1920 && this.frameCounter < 2700) {
      c.drawImage(cutsceneTextures[24], settings.UIRatio * -25, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 840) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (-40 + (this.frameCounter - 100) / 4.5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (-40 + (this.frameCounter - 100) / 4.5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (-40 + (this.frameCounter - 100) / 4.5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }

    if (this.frameCounter >= 1110 && this.frameCounter < 1200) {
      c.drawImage(playerTextures[8], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * (-40 + (this.frameCounter - 1110) * 1.4), settings.UIRatio * 40, settings.UIRatio * 40)
    }
    else if (this.frameCounter >= 1200 && this.frameCounter < 1400) {
      c.drawImage(playerTextures[9], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 100, settings.UIRatio * 40, settings.UIRatio * 40)
    }
    else if (this.frameCounter >= 1400 && this.frameCounter < 1500) {
      c.drawImage(playerTextures[0], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 1500 && this.frameCounter < 1800) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], canvas.width / 2 + settings.UIRatio * (-20 + (this.frameCounter - 1500) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], canvas.width / 2 + settings.UIRatio * (-20 + (this.frameCounter - 1500) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], canvas.width / 2 + settings.UIRatio * (-20 + (this.frameCounter - 1500) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }

    if (this.frameCounter >= 2000 && this.frameCounter < 2600) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (-40 + (this.frameCounter - 2000) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (-40 + (this.frameCounter - 2000) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (-40 + (this.frameCounter - 2000) / 2), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }


    if (this.frameCounter >= 100 && this.frameCounter < 900) {
      c.drawImage(cutsceneTextures[24], canvas.width / 2 - settings.UIRatio * 30, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 900 && this.frameCounter < 960) {
      c.drawImage(cutsceneTextures[24], canvas.width / 2 + settings.UIRatio * (-30 + (this.frameCounter - 900) / 2), settings.UIRatio * (65 + (this.frameCounter - 900) / 2),
        settings.UIRatio * (60 - (this.frameCounter - 900)), settings.UIRatio * (60 - (this.frameCounter - 900)))
    }
    else if (this.frameCounter >= 1060 && this.frameCounter < 1120) {
      c.drawImage(cutsceneTextures[24], canvas.width / 2 + settings.UIRatio * (110 - (this.frameCounter - 1060) / 2), settings.UIRatio * (95 - (this.frameCounter - 1060) / 2),
        settings.UIRatio * (this.frameCounter - 1060), settings.UIRatio * (this.frameCounter - 1060))
    }
    else if (this.frameCounter >= 1120 && this.frameCounter < 1800) {
      c.drawImage(cutsceneTextures[24], canvas.width / 2 + settings.UIRatio * 80, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1800 && this.frameCounter < 1860) {
      c.drawImage(cutsceneTextures[24], canvas.width / 2 + settings.UIRatio * (80 + (this.frameCounter - 1800) / 2), settings.UIRatio * (65 + (this.frameCounter - 1800) / 2),
        settings.UIRatio * (60 - (this.frameCounter - 1800)), settings.UIRatio * (60 - (this.frameCounter - 1800)))
    }
    else if (this.frameCounter >= 1860 && this.frameCounter < 1920) {
      c.drawImage(cutsceneTextures[25], settings.UIRatio * (5 - (this.frameCounter - 1860) / 2), settings.UIRatio * (95 - (this.frameCounter - 1860) / 2),
        settings.UIRatio * (this.frameCounter - 1860), settings.UIRatio * (this.frameCounter - 1860))
    }
    else if (this.frameCounter >= 1920 && this.frameCounter < 2700) {
      c.drawImage(cutsceneTextures[25], settings.UIRatio * -25, settings.UIRatio * 65, settings.UIRatio * 60, settings.UIRatio * 60)
    }

    if (this.frameCounter > 100 && this.frameCounter < 840) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 1500 && this.frameCounter < 2600) {
      if (this.frameCounter % 25 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }


    if (this.frameCounter > 2700) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene8(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 2700) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter > 100 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)

      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (0 + (this.frameCounter - 100) / 5), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    } else if (this.frameCounter >= 600 && this.frameCounter < 700) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[2], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 700 && this.frameCounter < 800) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[6], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    } else if (this.frameCounter >= 800 && this.frameCounter < 1500) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
      c.drawImage(playerTextures[5], settings.UIRatio * 100, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    else if (this.frameCounter >= 1500 && this.frameCounter < 2500) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)

      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (100 + (this.frameCounter - 1500) / 6), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (100 + (this.frameCounter - 1500) / 6), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (100 + (this.frameCounter - 1500) / 6), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }

    if (this.frameCounter >= 100 && this.frameCounter < 800) {
      c.drawImage(sheildInvImg, canvas.width / 2, settings.UIRatio * 100, settings.UIRatio * 30, settings.UIRatio * 30)
    }
    else if (this.frameCounter >= 800 && this.frameCounter < 1500) {
      c.drawImage(sheildInvImg, canvas.width / 2 + settings.UIRatio * -5, settings.UIRatio * 85, settings.UIRatio * 30, settings.UIRatio * 30)
    }
    else if (this.frameCounter >= 1500 && this.frameCounter < 2500) {
      c.drawImage(cutsceneTextures[26], settings.UIRatio * (115 + (this.frameCounter - 1500) / 6), settings.UIRatio * 86, settings.UIRatio * 40, settings.UIRatio * 40)
    }

    if (this.frameCounter >= 100 && this.frameCounter < 500) {
      c.drawImage(cutsceneTextures[13], settings.UIRatio * (300 - (this.frameCounter - 100)), settings.UIRatio * 60, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 400 && this.frameCounter < 800) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 400), settings.UIRatio * 45, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 500 && this.frameCounter < 900) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 500), settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 700 && this.frameCounter < 1100) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 700), settings.UIRatio * 55, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1000 && this.frameCounter < 1400) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1000), settings.UIRatio * 115, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1200 && this.frameCounter < 1600) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1200), settings.UIRatio * 10, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1450 && this.frameCounter < 1570) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1450), settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1500 && this.frameCounter < 1900) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1500), settings.UIRatio * 35, settings.UIRatio * 40, settings.UIRatio * 40);
    }


    if (this.frameCounter >= 1600 && this.frameCounter < 2000) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1600), settings.UIRatio * 55, settings.UIRatio * 40, settings.UIRatio * 40);
    }


    if (this.frameCounter >= 1700 && this.frameCounter < 1780) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1700), settings.UIRatio * 85, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1750 && this.frameCounter < 2150) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1750), settings.UIRatio * 15, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1800 && this.frameCounter < 2200) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1800), settings.UIRatio * 40, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 1900 && this.frameCounter < 1950) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 1900), settings.UIRatio * 100, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 2000 && this.frameCounter < 2040) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 2000), settings.UIRatio * 70, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 2100 && this.frameCounter < 2500) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 2100), settings.UIRatio * 20, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 2200 && this.frameCounter < 2215) {
      c.drawImage(cutsceneTextures[13], canvas.width - settings.UIRatio * (this.frameCounter - 2200), settings.UIRatio * 80, settings.UIRatio * 40, settings.UIRatio * 40);
    }

    if (this.frameCounter >= 800 && this.frameCounter < 1500) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("findSheild")!, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("findSheild")!, canvas.width / 2, canvas.height / 2)
    }



    if (this.frameCounter > 100 && this.frameCounter < 600) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 1500 && this.frameCounter < 2500) {
      if (this.frameCounter % 70 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }


    if (this.frameCounter > 2500) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }
  private cutscene9(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 1700) {
      this.frameCounter = 0;
    }
    if (this.frameCounter === 1) {
      playerWalkFrame = 0;
    }
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (this.frameCounter >= 100 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[5], 0, 0, canvas.width, canvas.height)
    }
    if (this.frameCounter >= 100 && this.frameCounter < 400) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], settings.UIRatio * (105 + this.frameCounter - 100) / 4, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }

      drawImage(c, dashInvImg, canvas.width / 2 + settings.UIRatio * 5, settings.UIRatio * 100, settings.UIRatio * 40, settings.UIRatio * 40, 180)

    } else if (this.frameCounter >= 400 && this.frameCounter < 450) {
      c.drawImage(playerTextures[6], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      drawImage(c, dashInvImg, canvas.width / 2 + settings.UIRatio * 5, settings.UIRatio * 100, settings.UIRatio * 40, settings.UIRatio * 40, 180)
    } else if (this.frameCounter >= 450 && this.frameCounter < 600) {
      c.drawImage(playerTextures[8], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      drawImage(c, dashInvImg, canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 70, settings.UIRatio * 40, settings.UIRatio * 40, 180)
    }

    if (this.frameCounter >= 600 && this.frameCounter < 1400) {
      c.drawImage(cutsceneTextures[5], settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[7], canvas.width * 2 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width * 3 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
      c.drawImage(cutsceneTextures[5], canvas.width * 4 + settings.UIRatio * (this.frameCounter - 600) * -1, 0, canvas.width, canvas.height)
    }


    if (this.frameCounter >= 800 && this.frameCounter < 880) {
      drawImage(c, dashInvImg, canvas.width / 2 + settings.UIRatio * (50 - (this.frameCounter - 800) + (this.frameCounter - 800) / 4),
        settings.UIRatio * (90 + (this.frameCounter - 800) / 4),
        settings.UIRatio * (40 - (this.frameCounter - 800) / 2), settings.UIRatio * (40 - (this.frameCounter - 800) / 2), 180)
    }
    else if (this.frameCounter >= 1100 && this.frameCounter < 1180) {
      drawImage(c, dashInvImg, canvas.width / 2 + settings.UIRatio * (90 - (this.frameCounter - 1100) + (this.frameCounter - 1100) / 4),
        settings.UIRatio * (90 + (this.frameCounter - 1100) / 4),
        settings.UIRatio * (40 - (this.frameCounter - 1100) / 2), settings.UIRatio * (40 - (this.frameCounter - 1100) / 2), 180)
    }
    else if (this.frameCounter >= 1300 && this.frameCounter < 1380) {
      drawImage(c, dashInvImg, canvas.width / 2 + settings.UIRatio * (130 - (this.frameCounter - 1300) + (this.frameCounter - 1300) / 4),
        settings.UIRatio * (90 + (this.frameCounter - 1300) / 4),
        settings.UIRatio * (40 - (this.frameCounter - 1300) / 2), settings.UIRatio * (40 - (this.frameCounter - 1300) / 2), 180)
    }


    if (this.frameCounter >= 600 && this.frameCounter < 800) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], canvas.width / 2 - settings.UIRatio * 20, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }
    else if (this.frameCounter >= 800 && this.frameCounter < 1100) {

      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], canvas.width / 2 + settings.UIRatio * 50, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], canvas.width / 2 + settings.UIRatio * 50, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], canvas.width / 2 + settings.UIRatio * 50, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }
    else if (this.frameCounter >= 1100 && this.frameCounter < 1300) {
      if (playerWalkFrame === 0 || playerWalkFrame === 1) {
        c.drawImage(playerTextures[1], canvas.width / 2 + settings.UIRatio * 90, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 2) {
        c.drawImage(playerTextures[2], canvas.width / 2 + settings.UIRatio * 90, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
      if (playerWalkFrame === 3) {
        c.drawImage(playerTextures[3], canvas.width / 2 + settings.UIRatio * 90, settings.UIRatio * 90, settings.UIRatio * 40, settings.UIRatio * 40)
      }
    }

    if (this.frameCounter >= 500 && this.frameCounter < 600) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * -30, settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 600 && this.frameCounter < 650) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (-30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 650 && this.frameCounter < 700) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (-30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 700 && this.frameCounter < 750) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (-30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 750 && this.frameCounter < 800) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 800 && this.frameCounter < 850) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (30 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 850 && this.frameCounter < 900) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 900 && this.frameCounter < 950) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (90 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 950 && this.frameCounter < 1000) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1000 && this.frameCounter < 1050) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1050 && this.frameCounter < 1100) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (150 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }

    else if (this.frameCounter >= 1100 && this.frameCounter < 1150) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1150 && this.frameCounter < 1200) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (210 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (690 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1200 && this.frameCounter < 1250) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (690 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (750 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1250 && this.frameCounter < 1300) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (270 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (690 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (750 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (810 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1300 && this.frameCounter < 1350) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (690 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (750 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (810 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (870 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }
    else if (this.frameCounter >= 1350 && this.frameCounter < 1400) {
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (330 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (390 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (450 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (510 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (570 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (630 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (690 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (750 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (810 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (870 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
      c.drawImage(cutsceneTextures[27], settings.UIRatio * (930 - (this.frameCounter - 600)), settings.UIRatio * 70, settings.UIRatio * 60, settings.UIRatio * 60)
    }

    if (this.frameCounter >= 450 && this.frameCounter < 1150) {
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.font = `bold ${15 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 2 * settings.UIRatio / 10;

      c.fillText(text.get("learnDash")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
      c.strokeText(text.get("learnDash")!, canvas.width / 2, canvas.height / 2 - settings.UIRatio * 10)
    }

    if (this.frameCounter > 100 && this.frameCounter < 400) {
      if (this.frameCounter % 40 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 600 && this.frameCounter < 1400) {
      if (this.frameCounter % 15 === 0) {
        if (playerWalkFrame === 0) {
          playerWalkFrame = 2;
        } else if (playerWalkFrame === 1) {
          playerWalkFrame = 3;
        } else if (playerWalkFrame === 2) {
          playerWalkFrame = 1;
        } else if (playerWalkFrame === 3) {
          playerWalkFrame = 0;
        }
      }
    }

    if (this.frameCounter > 1400) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  private cutscene10(level: number) {
    const text = languageText[settings.language]

    if (this.frameCounter > 1300) {
      this.frameCounter = 0;
    }

    if (this.frameCounter > 1000) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }



  private bossCutscene() {
    if (this.frameCounter > 1850) {
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
    else if (this.frameCounter < 1850) {
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
      c.font = `bold ${9 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 3 * settings.UIRatio / 10;
    }

    if (this.frameCounter > 1550) {
      const text = languageText[settings.language]
      c.fillText(text.get("boss")!, canvas.width / 2, canvas.height / 2)
      c.strokeText(text.get("boss")!, canvas.width / 2, canvas.height / 2)

    }


  }

  private winCutscene(ls: levelSettings) {
    // const text = languageText[settings.language]

    if (this.frameCounter > 1300) {
      this.frameCounter = 0;
      ls.screen = 8;
      ls.backScreen = [];
    }

    if (this.frameCounter > 1000) {
      c.font = `bold ${10 * settings.UIRatio}px Arial`
      c.fillStyle = "white"
      c.strokeStyle = "black"
      c.lineWidth = 1 * settings.UIRatio / 10;

      // c.fillText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
      // c.strokeText(text.get("level")! + ` ${level}`, canvas.width / 2, canvas.height / 2)
    }
  }

  skipText() {
    c.font = `bold ${5 * settings.UIRatio}px Arial`
    c.fillStyle = "white"
    c.strokeStyle = "black"
    c.lineWidth = 1 * settings.UIRatio / 10;

    const text = languageText[settings.language]
    c.fillText(text.get("skip")!, canvas.width - settings.UIRatio * 40, canvas.height - settings.UIRatio * 5)
    c.strokeText(text.get("skip")!, canvas.width - settings.UIRatio * 40, canvas.height - settings.UIRatio * 5)
  }
}
