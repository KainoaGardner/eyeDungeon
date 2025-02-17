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

const ammoImg = new Image();
ammoImg.src = "/img/ammo.png";

const texWidth = 16;

const textures: [][] = [];
textures.push([]);

for (let i = 0; i < texWidth; i++) {
  const slice = new Image();
  slice.src = `/img/walls/stone${i}.png`;
  textures[0].push(slice);
}

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

  ammo: number = 3;
  speed: number;

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

  drawView(c: any, canvas: any, map: number[][]) {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      const result = this.distance(x, map, canvas);
      const height = Math.floor(canvas.height / result.distance);

      c.globalAlpha = 1;

      let brightness = result.distance;
      let alpha: number;
      if (this.viewDist === 64) {
        alpha = brightness / 6;
      } else {
        alpha = brightness / 3;
      }
      if (alpha > 1) {
        continue;
      }

      if (result.wallType === 1) {
        c.drawImage(
          textures[0][result.texX],
          x,
          canvas.height / 2 - height / 2,
          1,
          height,
        );
      } // let brightness = Math.min(, 1000);

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

    if (this.viewDist === 64) {
      c.globalAlpha = 0.02;
      c.fillStyle = "#f1c40f";
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.globalAlpha = 0.02;
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

  private distance(x: number, map: number[][], canvas: any): distanceOutput {
    const result: distanceOutput = {
      distance: -1,
      texX: -1,
      wallType: -1,
      goalDistance: -1,
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
    } else {
      wallX = this.posX + perpWallDist * rayDirX;
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

    if (this.holding === 1) {
      c.drawImage(
        gunImg,
        canvas.width / 2 - 140,
        canvas.height - 260,
        280,
        280,
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
      if (this.holding === 1 && this.ammo > 0) {
        this.ammo--;
      }
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

    // const nx =
    //   this.posX + this.speed * Math.cos((this.direction * Math.PI) / 180);
    // const ny =
    //   this.y + this.speed * Math.sin((this.direction * Math.PI) / 180);
    //
    // const xBlock = Math.floor(nx / blockSize);
    // const yBlock = Math.floor(ny / blockSize);
    // if (
    //   xBlock >= map[0].length ||
    //   yBlock >= map.length ||
    //   (xBlock >= 0 &&
    //     xBlock < map[0].length &&
    //     yBlock >= 0 &&
    //     yBlock < map.length &&
    //     map[yBlock][xBlock] !== 1)
    // ) {
    //   this.x = nx;
    //   this.y = ny;
    // }

    // if (keyMap.get("ArrowDown")) {
    //   const nx =
    //     this.x - this.speed * Math.cos((this.direction * Math.PI) / 180);
    //   const ny =
    //     this.y - this.speed * Math.sin((this.direction * Math.PI) / 180);

    //   const xBlock = Math.floor(nx / blockSize);
    //   const yBlock = Math.floor(ny / blockSize);
    //   if (
    //     xBlock >= map[0].length ||
    //     yBlock >= map.length ||
    //     (xBlock >= 0 &&
    //       xBlock < map[0].length &&
    //       yBlock >= 0 &&
    //       yBlock < map.length &&
    //       map[yBlock][xBlock] === 0)
    //   ) {
    //     this.x = nx;
    //     this.y = ny;
    //   }
    // }

    if (keyMap.get("Digit1")) {
      this.holding = 1;
    } else if (keyMap.get("Digit2")) {
      this.holding = 2;
    }
  }
}
