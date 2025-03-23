import {
  canvas,
  c,
} from "./global";

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
      default:
        break;
    }

    if (this.frameCounter !== 0) {
      this.frameCounter++;
    }

  }

  private cutscene1() {
    if (this.frameCounter > 150) {
      this.frameCounter = 0;
    }

    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

  }



}
