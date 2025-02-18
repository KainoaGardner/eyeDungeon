const flashlightImg = new Image();
flashlightImg.src = "/img/flashlight.png";
const flashlightoffImg = new Image();
flashlightoffImg.src = "/img/flashlightoff.png";

const gunImg = new Image();
gunImg.src = "/img/gun.png";

const flashLightInvImg = new Image();
flashLightInvImg.src = "/img/flashlight-inv.png";

const gunInvImg = new Image();
gunInvImg.src = "/img/gun-inv.png";

const shootImgs: [] = [];

const shoot0 = new Image();
shoot0.src = "/img/gun-inv.png";

for (let i = 0; i < 3; i++) {
  const shoot = new Image();
  shoot.src = `/img/shoot${i}.png`;
  shootImgs.push(shoot);
}

const ammoImg = new Image();
ammoImg.src = "/img/ammo.png";

const shootSound = new Audio("/sound/shoot.wav");
shootSound.volume = 0.3;

const ammoSound = new Audio("/sound/ammo.wav");
ammoSound.volume = 0.3;

const texWidth = 16;
const texHeight = 16;

const textures: [][] = [];
textures.push([]);

for (let i = 0; i < texWidth; i++) {
  const slice = new Image();
  slice.src = `/img/walls/stone${i}.png`;
  textures[0].push(slice);
}

const bufferRatio = 10;
const bufferHeight = Math.floor(720 / bufferRatio);

function drawImage(
  ctx: any,
  image: typeof Image,
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

interface distanceOutput {
  distance: number;
  texX: number;
  wallType: number;
  goalDistance: number;
  pos: string;
}

export class Player {
  posX: number;
  posY: number;
  dirX = -1;
  dirY = 0;
  planeX: number = 0;
  planeY: number = 1;

  radius: number;
  direction: number = 0;
  turnSpeed: number = 0.01;

  viewDist: number = 32;

  battery: number = 1000;
  flashlight: boolean = true;

  shootingCounter = 0;
  ammo: number = 10;
  speed: number;
  ammoCounter = 0;

  holding: number = 1;
  //0 nothing 1 gun 2 flashlight

  constructor(x: number, y: number, radius: number, speed: number) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw(c: any, scale: number, blockSize: number): void {
    c.beginPath();
    c.arc(
      this.posX * scale * blockSize,
      this.posY * scale * blockSize,
      this.radius * scale,
      0,
      2 * Math.PI,
    );
    c.fillStyle = "red";
    c.fill();

    c.lineWidth = 2;
    c.strokeStyle = "white";

    c.beginPath();
    c.moveTo(
      (this.posX + this.dirX + this.planeX) * scale * blockSize,
      (this.posY + this.dirY + this.planeY) * scale * blockSize,
    );
    c.lineTo(
      (this.posX + this.dirX - this.planeX) * scale * blockSize,
      (this.posY + this.dirY - this.planeY) * scale * blockSize,
    );
    c.stroke();
  }

  drawView(c: any, canvas: any, map: number[][], lights: string[]) {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < bufferHeight; y++) {
      const p = y - bufferHeight / 2;
      const posZ = 0.5 * bufferHeight;

      const rowDistance = posZ / p;

      let brightness = ((256 * 1) / rowDistance) * 0.5;
      if (brightness > 256) {
        brightness = 256;
      }

      const color = `rgb(${brightness} 0 0)`;
      c.fillStyle = color;
      c.fillRect(0, y * bufferRatio, canvas.width, bufferRatio);
      c.fillRect(
        0,
        (bufferHeight - y - 1) * bufferRatio,
        canvas.width,
        bufferRatio,
      );
    }

    for (let x = 0; x < canvas.width; x++) {
      const result = this.distance(x, map, canvas);
      const height = Math.floor(canvas.height / result.distance);

      c.globalAlpha = 1;

      let brightness = this.getBrightness(result, lights);
      let alpha: number;
      if (
        this.viewDist === 64 ||
        (this.shootingCounter > 0 && this.shootingCounter < 15)
      ) {
        alpha = brightness / 7;
      } else {
        alpha = brightness / 4;
      }

      if (result.wallType === 1) {
        c.drawImage(
          textures[0][result.texX],
          x,
          canvas.height / 2 - height / 2,
          1,
          height,
        );
      }
      if (alpha > 1) {
        c.globalAlpha = 1;
        c.fillStyle = "black";
        c.fillRect(x, canvas.height / 2 - height / 2, 1, height);
      }

      if (result.goalDistance !== -1) {
        const goalHeight = Math.floor(canvas.height / result.goalDistance);
        c.globalAlpha = 0.5;
        c.fillStyle = "green";
        c.fillRect(x, canvas.height / 2 - goalHeight / 2, 1, goalHeight);
      }

      c.globalAlpha = alpha;
      c.fillStyle = "black";
      c.fillRect(x, canvas.height / 2 - height / 2, 1, height);
    }

    if (this.shootingCounter > 0 && this.shootingCounter < 10) {
      c.globalAlpha = 0.1;
      c.fillStyle = "#f39c12";
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (this.viewDist === 64) {
      c.globalAlpha = 0.05;
      c.fillStyle = "#f1c40f";
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.globalAlpha = 0.05;
      c.fillStyle = "white";
      c.beginPath();
      c.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2,
        0,
        2 * Math.PI,
      );
      c.fill();

      c.beginPath();
      c.arc(canvas.width / 2, canvas.height - 150, 125, 0, 2 * Math.PI);
      c.fill();

      c.globalAlpha = 1;
    }
  }

  private getBrightness(result: distanceOutput, lights: string[]): number {
    let min = Infinity;
    const wallPos = result.pos.split(",");

    for (let i = 0; i < lights.length; i++) {
      const lightPos = lights[i].split(",");
      const distance = Math.sqrt(
        Math.pow(Number(lightPos[0]) - Number(wallPos[0]), 2) +
          Math.pow(Number(lightPos[1]) - Number(wallPos[1]), 2),
      );

      if (distance < min) {
        min = distance;
      }
    }
    const distance = Math.sqrt(
      Math.pow(this.posX - Number(wallPos[0]), 2) +
        Math.pow(this.posY - Number(wallPos[1]), 2),
    );

    if (distance < min) {
      min = distance;
    }
    return min;
  }

  private distance(x: number, map: number[][], canvas: any): distanceOutput {
    const result: distanceOutput = {
      distance: -1,
      texX: -1,
      wallType: -1,
      goalDistance: -1,
      pos: "",
    };

    const cameraX = (2 * x) / canvas.width - 1;
    const rayDirX = this.dirX + this.planeX * cameraX;
    const rayDirY = this.dirY + this.planeY * cameraX;

    let mapX = Math.floor(this.posX);
    let mapY = Math.floor(this.posY);

    let sideDistX: number;
    let sideDistY: number;

    let deltaDistX = Math.abs(1 / rayDirX);
    let deltaDistY = Math.abs(1 / rayDirY);
    let perpWallDist: number;

    let stepX: number;
    let stepY: number;

    let hit = 0;
    let side = 0;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (this.posX - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - this.posX) * deltaDistX;
    }
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (this.posY - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - this.posY) * deltaDistY;
    }

    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }
      if (map[mapX][mapY] === 2 && result.goalDistance === -1) {
        if (side === 0) {
          result.goalDistance = sideDistX - deltaDistX;
        } else {
          result.goalDistance = sideDistY - deltaDistY;
        }
      }
      if (map[mapX][mapY] === 1) {
        hit = 1;
      }
    }

    result.wallType = map[mapX][mapY];

    if (side === 0) {
      perpWallDist = sideDistX - deltaDistX;
    } else {
      perpWallDist = sideDistY - deltaDistY;
    }

    result.distance = perpWallDist;

    let wallX: number;
    if (side === 0) {
      wallX = this.posY + perpWallDist * rayDirY;
      result.pos = `${mapX},${wallX}`;
    } else {
      wallX = this.posX + perpWallDist * rayDirX;
      result.pos = `${wallX},${mapY}`;
    }
    wallX -= Math.floor(wallX);
    let texX = Math.floor(wallX * texWidth);
    if (side === 0 && rayDirX > 0) {
      texX = texWidth - texX - 1;
    }
    if (side === 1 && rayDirY < 0) {
      texX = texWidth - texX - 1;
    }

    result.texX = texX;

    return result;
  }

  drawUi(c: any, canvas: any) {
    c.beginPath();
    c.globalAlpha = 0.5;
    c.fillStyle = "#7f8c8d";
    c.fillRect(10, canvas.height - 85, 75, 75);
    c.fillRect(95, canvas.height - 85, 75, 75);
    c.globalAlpha = 1;
    c.drawImage;

    c.drawImage(gunInvImg, 10, canvas.height - 82, 75, 75);
    c.drawImage(flashLightInvImg, 95, canvas.height - 82, 75, 75);

    c.globalAlpha = 0.5;
    c.fillStyle = "black";
    if (this.holding !== 1) {
      c.fillRect(10, canvas.height - 85, 75, 75);
    }
    if (this.holding !== 2) {
      c.fillRect(95, canvas.height - 85, 75, 75);
    }

    c.globalAlpha = 1;

    for (let i = 0; i < this.ammo; i++) {
      drawImage(
        c,
        ammoImg,
        canvas.width - 75,
        canvas.height - 110 - i * 50,
        37,
        84,
        -90,
      );
    }

    if (this.flashlight) {
      c.fillStyle = "#f1c40f";
    } else {
      c.fillStyle = "#b33939";
    }
    c.fillRect(
      canvas.width - 210,
      canvas.height - 30,
      (this.battery / 1000) * 200,
      20,
    );

    if (this.shootingCounter > 0 && this.shootingCounter < 10) {
      c.drawImage(
        shootImgs[0],
        canvas.width / 2 - 80,
        canvas.height - 370,
        160,
        160,
      );
    } else if (this.shootingCounter > 9 && this.shootingCounter < 30) {
      c.drawImage(
        shootImgs[1],
        canvas.width / 2 - 80,
        canvas.height - 370,
        160,
        160,
      );
    }

    let recoil = 0;
    if (this.shootingCounter !== 0) {
      recoil = 1 - (100 / this.shootingCounter) * 3;
    }
    if (this.holding === 1) {
      c.drawImage(
        gunImg,
        canvas.width / 2 - 140,
        canvas.height - 260 + recoil,
        280,
        280,
      );
      c.fillStyle = "#e74c3c";
      c.fillRect(
        canvas.width / 2 - 50,
        canvas.height - 20,
        this.shootingCounter,
        10,
      );
    } else if (this.holding === 2) {
      if (this.viewDist === 64) {
        c.drawImage(flashlightImg, canvas.width / 2 - 120, canvas.height - 200);
      } else {
        c.drawImage(
          flashlightoffImg,
          canvas.width / 2 - 120,
          canvas.height - 200,
        );
      }
    }
  }

  update(
    keyMap: Map<string, boolean>,
    map: number[][],
    blockSize: number,
  ): void {
    if (this.battery <= 0) {
      this.flashlight = false;
    }
    if (!this.flashlight && this.battery >= 1000) {
      this.flashlight = true;
    }
    if (keyMap.get("Space")) {
      if (this.holding === 2 && this.battery > 0 && this.flashlight) {
        this.viewDist = 64;
        this.battery--;
      }
      if (this.holding === 1) {
        if (this.ammo > 0 && this.shootingCounter === 0) {
          shootSound.play();
          this.ammo--;
          this.shootingCounter = 1;
        }
      }
    }

    if (this.ammoCounter === 1000) {
      if (this.ammo < 10) {
        ammoSound.play();
        this.ammo += 1;
      }
      this.ammoCounter = 0;
    }
    this.ammoCounter += 1;

    if (this.shootingCounter !== 0 && this.shootingCounter < 100) {
      this.shootingCounter += 1;
    }
    if (this.shootingCounter == 100 && !keyMap.get("Space")) {
      this.shootingCounter = 0;
    }

    if (
      !this.flashlight ||
      (this.holding === 2 && !keyMap.get("Space")) ||
      this.holding !== 2
    ) {
      this.viewDist = 16;
      if (this.battery < 1000) {
        this.battery += 0.5;
      }
    }

    if (keyMap.get("ArrowUp")) {
      if (
        map[Math.floor(this.posX + this.dirX * this.speed * 25)][
          Math.floor(this.posY)
        ] !== 1
      ) {
        this.posX += this.dirX * this.speed;
      }
      if (
        map[Math.floor(this.posX)][
          Math.floor(this.posY + this.dirY * this.speed * 25)
        ] !== 1
      ) {
        this.posY += this.dirY * this.speed;
      }
    }

    if (keyMap.get("ArrowDown")) {
      if (
        map[Math.floor(this.posX)][
          Math.floor(this.posY - this.dirY * this.speed * 25)
        ] !== 1
      ) {
        this.posY -= this.dirY * this.speed;
      }
      if (
        map[Math.floor(this.posX - this.dirX * this.speed * 25)][
          Math.floor(this.posY)
        ] !== 1
      ) {
        this.posX -= this.dirX * this.speed;
      }
    }

    if (keyMap.get("ArrowRight")) {
      const oldDirX = this.dirX;
      this.dirX =
        this.dirX * Math.cos(-this.turnSpeed) -
        this.dirY * Math.sin(-this.turnSpeed);
      this.dirY =
        oldDirX * Math.sin(-this.turnSpeed) +
        this.dirY * Math.cos(-this.turnSpeed);

      const oldPlaneX = this.planeX;
      this.planeX =
        this.planeX * Math.cos(-this.turnSpeed) -
        this.planeY * Math.sin(-this.turnSpeed);
      this.planeY =
        oldPlaneX * Math.sin(-this.turnSpeed) +
        this.planeY * Math.cos(-this.turnSpeed);
    }

    if (keyMap.get("ArrowLeft")) {
      const oldDirX = this.dirX;
      this.dirX =
        this.dirX * Math.cos(this.turnSpeed) -
        this.dirY * Math.sin(this.turnSpeed);
      this.dirY =
        oldDirX * Math.sin(this.turnSpeed) +
        this.dirY * Math.cos(this.turnSpeed);
      const oldPlaneX = this.planeX;
      this.planeX =
        this.planeX * Math.cos(this.turnSpeed) -
        this.planeY * Math.sin(this.turnSpeed);
      this.planeY =
        oldPlaneX * Math.sin(this.turnSpeed) +
        this.planeY * Math.cos(this.turnSpeed);
    }

    if (keyMap.get("Digit1")) {
      this.holding = 1;
      this.shootingCounter = 30;
    } else if (keyMap.get("Digit2")) {
      this.holding = 2;
    }
  }
}
