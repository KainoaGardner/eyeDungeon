import { c } from "./global";

const flashlightImg = new Image();
if (flashlightImg instanceof HTMLElement)
  flashlightImg.src = "/img/flashlight.png";
const flashlightoffImg = new Image();
if (flashlightoffImg instanceof HTMLElement)
  flashlightoffImg.src = "/img/flashlightoff.png";

const gunImg = new Image();
if (gunImg instanceof HTMLElement) gunImg.src = "/img/gun.png";

const swordImg = new Image();
if (swordImg instanceof HTMLElement) swordImg.src = "/img/sword.png";

const flashLightInvImg = new Image();
if (flashLightInvImg instanceof HTMLElement)
  flashLightInvImg.src = "/img/flashlight-inv.png";

const gunInvImg = new Image();
if (gunInvImg instanceof HTMLElement) gunInvImg.src = "/img/gun-inv.png";

const shootImgs: any[] = [];

for (let i = 0; i < 3; i++) {
  const shoot = new Image();
  if (shoot instanceof HTMLElement) {
    shoot.src = `/img/shoot${i}.png`;
    shootImgs.push(shoot);
  }
}

const ammoImg = new Image();
if (ammoImg instanceof HTMLElement) ammoImg.src = "/img/ammo.png";

const shootSound = new Audio("/sound/shoot.wav");
if (shootSound instanceof HTMLElement) shootSound.volume = 0.3;

const ammoSound = new Audio("/sound/ammo.wav");
if (ammoSound instanceof HTMLElement) ammoSound.volume = 0.3;

const texWidth = 16;
const texHeight = 16;

const textures = new Array(12).fill(null).map(() => Array(texWidth).fill(0));

function getTexture(tex: any, texList: number[][], index: number) {
  c.clearRect(0, 0, texWidth, texHeight);
  c.drawImage(tex, 0, 0, texWidth, texHeight);

  let texData;
  texData = c.getImageData(0, 0, texWidth, texHeight).data;
  for (let i = 0; i < texData.length; i += 4) {
    const red = texData[i];
    const green = texData[i + 1];
    const blue = texData[i + 2];

    texList[i / 4] = [red, green, blue];
  }
  textures[index] = texList;
}

const wallTexList = new Array(texWidth).fill(null).map(() => Array(3).fill(0));
const wallTex = new Image();
if (wallTex instanceof HTMLElement) {
  wallTex.src = "/img/walls/stone.png";
  wallTex.addEventListener("load", function () {
    getTexture(wallTex, wallTexList, 0);
    getTexture(wallTex, wallTexList, 8);
  });
}

const floorTexList = new Array(texWidth).fill(null).map(() => Array(3).fill(0));
const floorTex = new Image();
if (floorTex instanceof HTMLElement) {
  floorTex.src = "/img/roof.png";

  floorTex.addEventListener("load", function () {
    getTexture(floorTex, floorTexList, 1);
  });
}

const roofTexList = new Array(texWidth).fill(null).map(() => Array(3).fill(0));

const roofTex = new Image();
if (roofTex instanceof HTMLElement) {
  roofTex.src = "/img/roof1.png";
  roofTex.addEventListener("load", function () {
    getTexture(roofTex, roofTexList, 2);
  });
}

const goalTexList = new Array(texWidth).fill(null).map(() => Array(3).fill(0));
const goalTex = new Image();
if (goalTex instanceof HTMLElement) {
  goalTex.src = "/img/walls/goal.png";
  goalTex.addEventListener("load", function () {
    getTexture(goalTex, goalTexList, 3);
  });
}

const fireBallWallTexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const fireBallWallTex = new Image();
if (fireBallWallTex instanceof HTMLElement) {
  fireBallWallTex.src = "/img/walls/fireBallWall.png";
  fireBallWallTex.addEventListener("load", function () {
    getTexture(fireBallWallTex, fireBallWallTexList, 4);
  });
}

const moveWallTexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const moveWallTex = new Image();
if (moveWallTex instanceof HTMLElement) {
  moveWallTex.src = "/img/walls/moveWall.png";
  moveWallTex.addEventListener("load", function () {
    getTexture(moveWallTex, moveWallTexList, 5);
  });
}

const closeWallTexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const closeWallTex = new Image();
if (closeWallTex instanceof HTMLElement) {
  closeWallTex.src = "/img/walls/closeWall.png";
  closeWallTex.addEventListener("load", function () {
    getTexture(closeWallTex, closeWallTexList, 6);
  });
}

const fireBallTexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const fireBallTex = new Image();
if (fireBallTex instanceof HTMLElement) {
  fireBallTex.src = "/img/fireball.png";
  fireBallTex.addEventListener("load", function () {
    getTexture(fireBallTex, fireBallTexList, 7);
  });
}

const break0TexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const break0Tex = new Image();
if (break0Tex instanceof HTMLElement) {
  break0Tex.src = "/img/walls/break0.png";
  break0Tex.addEventListener("load", function () {
    getTexture(break0Tex, break0TexList, 9);
  });
}

const break1TexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const break1Tex = new Image();
if (break1Tex instanceof HTMLElement) {
  break1Tex.src = "/img/walls/break1.png";
  break1Tex.addEventListener("load", function () {
    getTexture(break1Tex, break1TexList, 10);
  });
}

const break2TexList = new Array(texWidth)
  .fill(null)
  .map(() => Array(3).fill(0));
const break2Tex = new Image();
if (break2Tex instanceof HTMLElement) {
  break2Tex.src = "/img/walls/break2.png";
  break2Tex.addEventListener("load", function () {
    getTexture(break2Tex, break2TexList, 11);
  });
}

export {
  texWidth,
  texHeight,
  textures,
  gunImg,
  swordImg,
  flashlightImg,
  gunInvImg,
  flashLightInvImg,
  flashlightoffImg,
  shootImgs,
  ammoImg,
  ammoSound,
  shootSound,
};
