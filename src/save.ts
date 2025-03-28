import { setLevel, levelSettings } from "./levels"
import { settings, unlockedLevels } from "./global";
import { updateVolume, updateDisplaySettings } from "./screens"
import { downloadTextFile } from "./util"

function getSaveData(ls: levelSettings) {
  let result = "";
  for (let i = 1; i < 12; i++) {
    if (unlockedLevels.get(i)) {
      result += "1";
    } else {
      result += "0"
    }
  }

  result += ","
  if (ls.player.inventory.horn) {
    result += "1"
  } else {
    result += "0"
  }

  result += ","
  if (ls.level) {
    result += "1"
  } else {
    result += "0"
  }

  result += ","
  result += "" + settings.displayWidth + ","
  result += "" + settings.displayHeight + ","
  result += "" + settings.graphicsWidth + ","
  result += "" + settings.graphicsHeight + ","
  result += "" + settings.musicVolume + ","
  result += "" + settings.sfxVolume + ","
  result += "" + settings.language

  return result
}

export function saveData(ls: levelSettings) {
  const data = getSaveData(ls)
  downloadTextFile("save", data)
}



function loadData(data: string, ls: levelSettings): boolean {
  const splitData = data.split(",")
  if (splitData.length !== 10) {
    return false
  }

  if (splitData[0].length !== 11) {
    return false
  }


  const level = parseInt(splitData[2]);
  if (level < 1 || level > 11) {
    return false
  }

  if (splitData[0][level - 1] !== "1") {
    return false
  }

  const displayWidth = parseInt(splitData[3])
  const displayHeight = parseInt(splitData[4])

  const graphicsWidth = parseInt(splitData[5])
  const graphicsHeight = parseInt(splitData[6])

  const ratio = 1920 / 1080
  if (displayWidth / displayHeight !== ratio) {
    return false
  }
  if (graphicsWidth / graphicsHeight !== ratio) {
    return false
  }

  const musicVolume = parseInt(splitData[7])
  const sfxVolume = parseInt(splitData[8])
  const language = parseInt(splitData[9])

  if (musicVolume < 0 || musicVolume > 100) {
    return false
  }
  if (sfxVolume < 0 || sfxVolume > 100) {
    return false
  }

  if (language !== 0 && language !== 1) {
    return false
  }

  for (let i = 0; i < 11; i++) {
    const level = splitData[0][i]
    unlockedLevels.set(i + 1, level === "1")
  }

  ls.player.inventory.horn = splitData[1] === "1"
  ls.level = level


  updateDisplaySettings(displayWidth, displayHeight, graphicsWidth, graphicsHeight);
  settings.musicVolume = musicVolume
  settings.sfxVolume = sfxVolume
  settings.language = language
  updateVolume(0, 0);
  updateVolume(0, 1);


  return true;
}

export function uploadData(ls: levelSettings) {
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none'; // Hide the input element

  input.onchange = (event: Event) => {
    const fileTarget = event.target as HTMLInputElement
    if (fileTarget.files) {
      const file = fileTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          if (e.target) {
            const text = e.target.result;
            if (typeof text === "string") {
              if (text !== null) {
                const loaded = loadData(text, ls);
                if (loaded) {
                  ls.screen = -1;
                  ls.backScreen = [];
                  setLevel(ls)
                }
              }
            }
          }
        };

        reader.onerror = function() {
        };
        reader.readAsText(file);
      }
    }
  };

  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

