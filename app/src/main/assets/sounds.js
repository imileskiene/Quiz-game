
let quizSoundPlaying = false;
let loopSoundMuted = false;
let quizSoundMuted = false;
let currentSound = null;

const sounds = new Map([
    ["press", new Audio(window.Android.getSoundPath("press"))],
    ["correct", new Audio(window.Android.getSoundPath("correct"))],
    ["incorrect", new Audio(window.Android.getSoundPath("incorrect"))],
    ["notActiveSound", new Audio(window.Android.getSoundPath("inactive"))],
    ["winning", new Audio(window.Android.getSoundPath("winning"))],
    ["finished", new Audio(window.Android.getSoundPath("finished"))],
    ["loose", new Audio(window.Android.getSoundPath("loose"))]
]);


async function playOtherSounds(type) {
  const sound = sounds.get(type);
  if (sound) {
    sound.currentTime = 0;

    return new Promise((resolve) => {
      sound.muted = false;
      sound.play().catch(() => resolve());
      sound.addEventListener("ended", resolve, { once: true });
    });
  } else {
    return Promise.resolve();
  }
}

async function stopAllSounds() {
    await stopLoopSound();
    await stopQuizSound();

    for (const [key, sound] of sounds.entries()) {
        sound.pause();
        sound.muted = true;
        sound.currentTime = 0;
    }
}

async function playSound(type) {
    const sound = sounds.get(type);
    if (sound) {
        return new Promise((resolve) => {
             sound.muted = false;
            sound.play();
            sound.addEventListener("ended", resolve, { once: true });
        });
    }
}

async function playLoopSound() {
    if (typeof Android !== "undefined") {
        if (!loopSoundMuted) {
            await Android.playLoopSound();
            currentSound = "loop"
        }
    }
}

async function stopLoopSound() {
  if (typeof Android !== "undefined") {
   await Android.stopLoopSound();
  }
}

async function playQuizSound() {
   if (typeof Android !== "undefined") {
        if (!quizSoundMuted) {
            await Android.playQuizSound();
            currentSound = "quiz";
        }
    }
}

async function stopQuizSound() {
    if (typeof Android !== "undefined") {
        await Android.stopQuizSound();
    }
}
