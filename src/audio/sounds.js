const HOME_SOUND_PATH = "/sounds/3%20home.wav";
const BUTTON_SOUND_PATH = "/sounds/1%20button.wav";
const BACK_SOUND_PATH = "/sounds/2%20back.wav";
const HOME_SOUND_START = 0.04;

const homeSound = new Audio(HOME_SOUND_PATH);
const buttonSound = new Audio(BUTTON_SOUND_PATH);
const backSound = new Audio(BACK_SOUND_PATH);

homeSound.preload = "auto";
buttonSound.preload = "auto";
backSound.preload = "auto";

function restartSound(sound, startAt = 0) {
  sound.currentTime = startAt;
  return sound.play();
}

export function playHomeSound() {
  return restartSound(homeSound, HOME_SOUND_START);
}

export function playButtonSound() {
  return restartSound(buttonSound);
}

export function playBackSound() {
  return restartSound(backSound);
}

export function startOpeningSound() {
  playHomeSound().catch(() => {
    const playAfterFirstTouch = (event) => {
      window.removeEventListener("pointerdown", playAfterFirstTouch);

      if (
        event.target instanceof Element &&
        event.target.closest("button, .tile, .wordmark")
      ) {
        return;
      }

      playHomeSound().catch(() => {});
    };

    window.addEventListener("pointerdown", playAfterFirstTouch);
  });
}
