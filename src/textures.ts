import { c } from "./global";

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

const shootImgs: any[] = [];

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

// const textures: [][] = [];
const textures = new Array(3).fill(null).map(() => Array(texWidth).fill(0));

for (let i = 0; i < texWidth; i++) {
  const stoneSlice = new Image();
  stoneSlice.src = `/img/walls/stone${i}.png`;
  textures[0][i] = stoneSlice;
}

const floorTexList = new Array(texWidth).fill("");
const floorTex = new Image();
floorTex.src = "/img/roof.png";
floorTex.addEventListener("load", () => {
  c.drawImage(floorTex, 0, 0, 16, 16);

  let floorTexData;
  floorTexData = c.getImageData(0, 0, 16, 16).data;
  for (let i = 0; i < floorTexData.length; i += 4) {
    const red = floorTexData[i];
    const green = floorTexData[i + 1];
    const blue = floorTexData[i + 2];
    const color = `rgb(${red} ${green} ${blue})`;

    floorTexList[i / 4] = color;
  }
  textures[1] = floorTexList;
});

const roofTexList = new Array(texWidth).fill("");
const roofTex = new Image();
roofTex.src = "/img/roof1.png";
roofTex.addEventListener("load", () => {
  c.drawImage(roofTex, 0, 0, 16, 16);

  let roofTexData;
  roofTexData = c.getImageData(0, 0, 16, 16).data;
  for (let i = 0; i < roofTexData.length; i += 4) {
    const red = roofTexData[i];
    const green = roofTexData[i + 1];
    const blue = roofTexData[i + 2];
    const color = `rgb(${red} ${green} ${blue})`;

    roofTexList[i / 4] = color;
  }
  textures[2] = roofTexList;
});

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
