
let quizSoundPlaying = false;
//let quizSoundPromise = null; // Naujas kintamasis saugoti quiz garso Promise
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
    ["quiz", new Audio(window.Android.getSoundPath("quiz"))],
    ["loose", new Audio(window.Android.getSoundPath("loose"))]
]);

async function playOtherSounds(type) {
    const sound = sounds.get(type);
    if (sound) {
        return new Promise((resolve) => {
            sound.muted = false;
            sound.play();
            sound.addEventListener("ended", resolve, { once: true });
        });
    }
}

// Funkcija sustabdyti visus garsus ir juos užmutinti
async function stopAllSounds() {
    await stopLoopSound();
    await stopQuizSound();

    // Sustabdome kitus garsus ir juos mutiname
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
// Funkcija, kuri nutildo loop garsą
//async function muteLoopSound() {
//    console.log("muteLoopSound()");
//    if (!loopSoundMuted && typeof Android !== "undefined") {
//        await Android.stopLoopSound();
//        loopSoundMuted = true;
//    }
//}

// Funkcija, kuri vėl įjungia loop garsą
//async function unmuteLoopSound() {
//    console.log("unmuteLoopSound()");
//    if (loopSoundMuted && typeof Android !== "undefined") {
//        await Android.playLoopSound();
//        loopSoundMuted = false;
//    }
//}
// Loop garso paleidimas
async function playLoopSound() {
    if (typeof Android !== "undefined") {
        if (!loopSoundMuted) {
            await Android.playLoopSound();
            currentSound = "loop"
        }
    }
}

// Loop garso sustabdymas
async function stopLoopSound() {
  if (typeof Android !== "undefined") {
   await Android.stopLoopSound();
  }
}
// Funkcija, kuri nutildo quiz garsą
//async function muteQuizSound() {
//    console.log("muteQuizSound()");
//    if (!quizSoundMuted) {
//        await stopQuizSound();
//        quizSoundMuted = true;
//    }
//}

// Funkcija, kuri vėl įjungia quiz garsą
//async function unmuteQuizSound() {
//    console.log("unmuteQuizSound()");
//    if (quizSoundMuted) {
//         await playQuizSound();
//        quizSoundMuted = false;
//    }
//}

async function playQuizSound() {
    if (!quizSoundPlaying) {
        const sound = sounds.get("quiz");
        if (sound) {
            await stopAllSounds()
            sound.loop = true; // pridedama kilpa
            sound.muted = quizSoundMuted;
            sound.play();
            quizSoundPlaying = true;
            currentSound = "quiz";
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
// Funkcija sustabdyti visus kitus garsus, išskyrus loop ir quiz
function muteAllOtherSounds() {
    for (const [key, sound] of sounds.entries()) {
        if (key !== "quiz") { // neimutiname quiz garso
            sound.muted = true; // Nutildome garsą
            sound.pause();
            sound.currentTime = 0;
        }
    }
}

  // Funkcija atkurti visus kitus garsus
   function unmuteAllOtherSounds() {
       for (const [key, sound] of sounds.entries()) {
           sound.muted = false;
       }
   }