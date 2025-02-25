import { c } from "./global";

const flashlightImg = new Image();
if (flashlightImg instanceof HTMLElement)
  flashlightImg.src = "/img/flashlight.png";
const flashlightoffImg = new Image();
if (flashlightoffImg instanceof HTMLElement)
  flashlightoffImg.src = "/img/flashlightoff.png";

const gunImg = new Image();
if (gunImg instanceof HTMLElement) gunImg.src = "/img/gun.png";

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

const textures = new Array(6).fill(null).map(() => Array(texWidth).fill(0));

function getTexture(tex: any, texList: number[][], index: number) {
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

const spikeTexList = new Array(texWidth).fill(null).map(() => Array(3).fill(0));
const spikeTex = new Image();
if (spikeTex instanceof HTMLElement) {
  spikeTex.src = "/img/walls/spikeWall.png";
  spikeTex.addEventListener("load", function () {
    getTexture(spikeTex, spikeTexList, 5);
  });
}

export {
  texWidth,
  texHeight,
  textures,
  gunImg,
  flashlightImg,
  gunInvImg,
  flashLightInvImg,
  flashlightoffImg,
  shootImgs,
  ammoImg,
  ammoSound,
  shootSound,
};
