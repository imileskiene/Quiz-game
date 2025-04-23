
let quizSoundPlaying = false; // Naujas kintamasis, nurodantis, ar quiz garsas groja
let quizSoundPromise = null; // Naujas kintamasis saugoti quiz garso Promise

const sounds = new Map([
    ["press", new Audio(window.Android.getSoundPath("press"))],
    ["correct", new Audio(window.Android.getSoundPath("correct"))],
    ["incorrect", new Audio(window.Android.getSoundPath("incorrect"))],
    ["notActiveSound", new Audio(window.Android.getSoundPath("inactive"))],
    ["winning", new Audio(window.Android.getSoundPath("winning"))],
    ["finished", new Audio(window.Android.getSoundPath("finished"))],
    ["quiz", new Audio(window.Android.getSoundPath("quiz"))],
    ["loose", new Audio(window.Android.getSoundPath("loose"))]
]);

async function playSound(type) {
    const sound = sounds.get(type);
    if (sound) {
        return new Promise((resolve) => {
            sound.play();
            sound.addEventListener("ended", resolve, { once: true });
        });
    }
}

// Loop garso paleidimas
async function playLoopSound() {
  if (typeof Android !== "undefined") {
   await Android.playLoopSound();
  }
}

// Loop garso sustabdymas
async function stopLoopSound() {
  if (typeof Android !== "undefined") {
   await Android.stopLoopSound();
  }
}

async function playQuizSound() {
    if (!quizSoundPlaying) {
         const sound = sounds.get("quiz");
        //sound.loop = true;
        if (sound) {
          sound.loop = true; // pridedama kilpa
          sound.play();
            quizSoundPlaying = true;
        }
    }
}

async function stopQuizSound() {
    if (quizSoundPlaying) {
        const sound = sounds.get("quiz");
         sound.pause();
         sound.currentTime = 0;
         sound.loop = false;// pašalinam kilpa
         quizSoundPlaying = false;
    }
}

async function stopAllSounds() {
    // Sustabdome loop garsą
    await stopLoopSound();

    // Sustabdome kitus garsus
    for (const [key, sound] of sounds.entries()) {
        sound.pause();
        sound.currentTime = 0;
    }
    // Sustabdom quiz garsa
   await stopQuizSound();
}

