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

const texWidth = 32;
const texHeight = 32;

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
  goal: number;
}

export class Player {
  posX: number;
  posY: number;
  dirX = -1;
  dirY = 0;
  planeX: number = 0;
  planeY: number = 1.5;

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
    // this.x = x;
    // this.y = y;
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw(c: any, scale: number, blockSize: number): void {
    console.log(this.dirX, this.dirY);
    const angleRad = (this.direction * Math.PI) / 180;
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

  drawView(c: any, canvas: any, map: number[][], mapSize: number) {
    for (let x = 0; x < canvas.width; x++) {
      const cameraX = (2 * x) / canvas.width - 0.5;
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
        if (map[mapX][mapY] > 0) {
          hit = 1;
        }
      }

      if (side === 0) {
        perpWallDist = sideDistX - deltaDistX;
      } else {
        perpWallDist = sideDistY - deltaDistY;
      }

      const height = Math.floor(canvas.height / perpWallDist);
      let color: string;
      if (side === 0) {
        color = "red";
      } else {
        color = "green";
      }

      c.fillStyle = color;
      c.fillRect(x * 2, canvas.height / 2 - height / 2, 2, height);
    }

    // const lu = this.viewDist / 255;
    // c.fillStyle = `rgb(${17 * lu}, ${10 * lu}, ${10 * lu})`;
    // c.fillRect(0, 0, canvas.width, canvas.height / 2);
    //
    // c.fillStyle = `rgb(${30 * lu}, ${10 * lu}, ${10 * lu})`;
    // c.fillRect(0, canvas.height / 2, canvas.width, canvas.height);

    // for (let x = 0; x < canvas.width; x++) {
    //   const viewAngle = (130 * x) / (canvas.width / 2) - 75;
    //   const newAngle = this.direction + viewAngle;
    //   const distanceOut = this.distance(newAngle, map, mapSize);
    //
    //   if (distanceOut.distance === -1) {
    //     continue;
    //   }
    //
    //   let height =
    //     ((1 / (distanceOut.distance / 100) - 1) * canvas.height) / 10;
    //
    //   height = Math.min(height, canvas.height);
    //
    //   const color = ((height / canvas.height) * this.viewDist) / 2;
    //   c.fillStyle = `rgb(${color},${color},${color})`;
    //   c.fillRect(x * 2, canvas.height / 2 - height / 2, 2, height);
    //
    //   if (distanceOut.goal != -1) {
    //     let goalHeight =
    //       ((1 / (distanceOut.goal / 100) - 1) * canvas.height) / 10;
    //
    //     goalHeight = Math.min(goalHeight, canvas.height);
    //
    //     c.globalAlpha = 0.05;
    //     c.fillStyle = "#2ecc71";
    //     c.fillRect(x * 2, canvas.height / 2 - goalHeight / 2, 2, goalHeight);
    //     c.globalAlpha = 1;
    //   }
    // }

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

  // private distance(
  //   angle: number,
  //   map: number[][],
  //   mapSize: number,
  // ): distanceOutput {
  //   const result: distanceOutput = { distance: -1, goal: -1 };
  //   // for (let i = 1; i <= 100; i += 0.3) {
  //   //   const nX = this.x + i * Math.cos((angle * Math.PI) / 180);
  //   //   const nY = this.y + i * Math.sin((angle * Math.PI) / 180);
  //   //
  //   //   const blockX = Math.floor(nX / mapSize);
  //   //   const blockY = Math.floor(nY / mapSize);
  //   //
  //   //   if (
  //   //     blockX < 0 ||
  //   //     blockX >= map[0].length ||
  //   //     blockY < 0 ||
  //   //     blockY >= map.length
  //   //   ) {
  //   //     return result;
  //   //   }
  //   //
  //   //   if (result.goal === -1 && map[blockY][blockX] === 2) {
  //   //     result.goal = i;
  //   //   }
  //   //
  //   //   if (map[blockY][blockX] === 1) {
  //   //     result.distance = i;
  //   //     return result;
  //   //   }
  //   // }
  //   //
  //   return result;
  // }

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
        map[Math.floor(this.posX + this.dirX * this.speed)][
          Math.floor(this.posY)
        ] === 0
      ) {
        this.posX += this.dirX * this.speed;
      }
      if (
        map[Math.floor(this.posX)][
          Math.floor(this.posY + this.dirY * this.speed)
        ] === 0
      ) {
        this.posY += this.dirY * this.speed;
      }
    }

    if (keyMap.get("ArrowDown")) {
      if (
        map[Math.floor(this.posX)][
          Math.floor(this.posY - this.dirY * this.speed)
        ] === 0
      ) {
        this.posY -= this.dirY * this.speed;
      }
      if (
        map[Math.floor(this.posX - this.dirX * this.speed)][
          Math.floor(this.posY)
        ] === 0
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
