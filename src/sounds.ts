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

createSound("/sound/shoot.wav", sfxSounds)
createSound("/sound/ammo.wav", sfxSounds)
createSound("/sound/mine.wav", sfxSounds)
createSound("/sound/reflect.wav", sfxSounds)
createSound("/sound/hitHurt.wav", sfxSounds)
createSound("/sound/swordSlash0.wav", sfxSounds)
createSound("/sound/swordSlash1.wav", sfxSounds)
createSound("/sound/swordSlash2.wav", sfxSounds)
createSound("/sound/swordSlash3.wav", sfxSounds)
createSound("/sound/swordSlash4.wav", sfxSounds)

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
