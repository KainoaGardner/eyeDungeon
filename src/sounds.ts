const sfxSounds: HTMLAudioElement[] = [];
const musicSounds: HTMLAudioElement[] = [];

function createSound(path: string, category: HTMLAudioElement[]) {
  const sound = new Audio(path);
  if (!sound) {
    console.error("could not make " + path + "sound")
    return
  }
  category.push(sound)
}

createSound("/sound/shoot.wav", sfxSounds)//0
createSound("/sound/ammo.wav", sfxSounds)//1
createSound("/sound/mine.wav", sfxSounds)//2
createSound("/sound/reflect.wav", sfxSounds)//3
createSound("/sound/hitHurt.wav", sfxSounds)//4
createSound("/sound/swordSlash0.wav", sfxSounds)//5
createSound("/sound/swordSlash1.wav", sfxSounds)//6
createSound("/sound/swordSlash2.wav", sfxSounds)//7
createSound("/sound/swordSlash3.wav", sfxSounds)//8
createSound("/sound/swordSlash4.wav", sfxSounds)//9
createSound("/sound/walkingRight.wav", sfxSounds)//10
createSound("/sound/walkingLeft.wav", sfxSounds)//11
createSound("/sound/flashOn.wav", sfxSounds)//12
createSound("/sound/flashOff.wav", sfxSounds)//13
createSound("/sound/dash.wav", sfxSounds)//14
createSound("/sound/sheild.wav", sfxSounds)//15
createSound("/sound/sheildUp.wav", sfxSounds)//16
createSound("/sound/horn.wav", sfxSounds)//17
createSound("/sound/clockTick.wav", sfxSounds)//18
sfxSounds[18].loop = true
createSound("/sound/clock0.wav", sfxSounds)//19
createSound("/sound/clock1.wav", sfxSounds)//20
createSound("/sound/firewall.wav", sfxSounds)//21
createSound("/sound/movewall.wav", sfxSounds)//22
createSound("/sound/mageDeath.wav", sfxSounds)//23
createSound("/sound/slimeDeath.wav", sfxSounds)//24
createSound("/sound/skeletonDeath.wav", sfxSounds)//25
createSound("/sound/hitEnemy.wav", sfxSounds)//26
createSound("/sound/button.wav", sfxSounds)//27
createSound("/sound/gameOver.wav", sfxSounds)//28
createSound("/sound/heal.wav", sfxSounds)//29
sfxSounds[29].loop = true
createSound("/sound/slimeSpawn.wav", sfxSounds)//30
createSound("/sound/mageSpawn.wav", sfxSounds)//31
createSound("/sound/skeletonSpawn.wav", sfxSounds)//32
createSound("/sound/ghostSpawn.wav", sfxSounds)//33
createSound("/sound/chain.wav", sfxSounds)//34
createSound("/sound/bossDeath.wav", sfxSounds)//35
createSound("/sound/inBlock.wav", sfxSounds)//36
createSound("/sound/windFall.wav", sfxSounds)//37
createSound("/sound/fallLand.wav", sfxSounds)//38
createSound("/sound/getItem.wav", sfxSounds)//39
createSound("/sound/birds.wav", sfxSounds)//40

createSound("/music/windChimes.wav", musicSounds)//0
createSound("/music/drums.wav", musicSounds)//1
createSound("/music/normal.wav", musicSounds)//2
createSound("/music/level4.wav", musicSounds)//3
createSound("/music/boss.wav", musicSounds)//4
musicSounds[1].loop = true
musicSounds[2].loop = true
musicSounds[3].loop = true
musicSounds[4].loop = true

function setSFXVolume(volume: number) {
  for (let i = 0; i < sfxSounds.length; i++) {
    sfxSounds[i].volume = volume / 100;
  }
}

function setMusicVolume(volume: number) {
  for (let i = 0; i < musicSounds.length; i++) {
    musicSounds[i].volume = volume / 100;
  }
}

export {
  sfxSounds,
  musicSounds,
  setSFXVolume,
  setMusicVolume
};
