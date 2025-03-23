import { canvas, c, UIRatio } from "./global";
import { screens, frame0Img, frame1Img } from "./textures"

export class Screen {

  constructor() {
  }

  homeScreen() {
    c.drawImage(screens[1], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame0Img, canvas.width / 2 - UIRatio * 32 * 5 / 2, UIRatio * 14, UIRatio * 32 * 5, UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 32 * 6 / 2, UIRatio * 14, UIRatio * 32 * 6, UIRatio * 16 * 3);
    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 34 * 2, UIRatio * 70, UIRatio * 32 * 2, UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 34 * 2, UIRatio * 105, UIRatio * 32 * 2, UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + UIRatio * 4, UIRatio * 70, UIRatio * 32 * 2, UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 + UIRatio * 4, UIRatio * 105, UIRatio * 32 * 2, UIRatio * 16 * 2);

    c.font = "bold 45px Arial"
    c.fillStyle = "#922727"
    c.strokeStyle = "black"
    c.lineWidth = 3;

    c.fillText("NEW", canvas.width / 2 - UIRatio * 36 * 2 / 2, UIRatio * 87.5)
    c.strokeText("NEW", canvas.width / 2 - UIRatio * 36 * 2 / 2, UIRatio * 87.5)

    c.fillText("LOAD", canvas.width / 2 - UIRatio * 36 * 2 / 2, UIRatio * 122.5)
    c.strokeText("LOAD", canvas.width / 2 - UIRatio * 36 * 2 / 2, UIRatio * 122.5)

    c.fillText("CONTROLS", canvas.width / 2 + UIRatio * 36 * 2 / 2, UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2 + UIRatio * 36 * 2 / 2, UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2 + UIRatio * 36 * 2 / 2, UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2 + UIRatio * 36 * 2 / 2, UIRatio * 87.5)

    c.font = "bold 100px Arial"
    c.fillStyle = "#922727"
    c.strokeStyle = "black"
    c.lineWidth = 3;

    c.fillText("EYE DUNGEON", canvas.width / 2, UIRatio * 39.5)
    c.strokeText("EYE DUNGEON", canvas.width / 2, UIRatio * 39.5)
    // c.drawImage(screens[4], canvas.width / 2 - UIRatio * 30 * 4 / 2, UIRatio * 25, UIRatio * 30 * 4, UIRatio * 25);
  }

  pauseScreen() {
    c.drawImage(screens[0], 0, 0, canvas.width, canvas.height);
    c.drawImage(frame0Img, canvas.width / 2 - UIRatio * 32 * 5 / 2, UIRatio * 14, UIRatio * 32 * 5, UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 32 * 5 / 2, UIRatio * 14, UIRatio * 32 * 5, UIRatio * 16 * 3);

    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 32 * 2 / 2, UIRatio * 70, UIRatio * 32 * 2, UIRatio * 16 * 2);
    c.drawImage(frame1Img, canvas.width / 2 - UIRatio * 32 * 2 / 2, UIRatio * 105, UIRatio * 32 * 2, UIRatio * 16 * 2);

    c.font = "bold 125px Arial"
    c.fillStyle = "#922727"
    c.strokeStyle = "black"
    c.lineWidth = 5;

    c.fillText("PAUSED", canvas.width / 2, UIRatio * 40)
    c.strokeText("PAUSED", canvas.width / 2, UIRatio * 40)


    c.font = "bold 45px Arial"
    c.lineWidth = 3;

    c.fillText("CONTROLS", canvas.width / 2, UIRatio * 122.5)
    c.strokeText("CONTROLS", canvas.width / 2, UIRatio * 122.5)

    c.fillText("SETTINGS", canvas.width / 2, UIRatio * 87.5)
    c.strokeText("SETTINGS", canvas.width / 2, UIRatio * 87.5)
  }

  controls() {
    c.drawImage(screens[2], 0, 0, canvas.width, canvas.height);
  }
}




