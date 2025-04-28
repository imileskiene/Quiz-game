
//Funkcija iskviesti tarpine reklama.
//function showInterstitial(){
//    window.Android.showInterstitial();
//}
function showInterstitial() {
    return new Promise((resolve, reject) => {
        window.Android.showInterstitial();

        // Kviečiame metodą, kai reklama baigiasi
        window.Android.onInterstitialEnded = () => {
            console.log("Interstitial ad ended.");
            resolve(); // Užbaigiame promise, kad pereitumėte prie kito žingsnio
        };
    });
}

function showRewardAd() {
    console.log("showRewardAd() called");
    // Kviečiame Android'o "Android" objektą (sukurtą per addJavascriptInterface).
    window.Android.showRewardAd();
}

// Naujos funkcijos garso valdymui
let soundsMuted = false;

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus pradėta rodyti interstitial reklama
function onInterstitialStarted() {
    console.log("onInterstitialStarted() called from Android");
    stopAllSounds()
    soundsMuted = true;
}

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus baigta rodyti interstitial reklama
//async function onInterstitialEnded() {
//    console.log("onInterstitialEnded() called from Android");
//    soundsMuted = false;
//    if(currentSound == "loop"){
//       await playLoopSound()
//    } else if(currentSound == "quiz"){
//      await playQuizSound()
//    }
//}
function onInterstitialEnded() {
    console.log("onInterstitialEnded() called from Android");
    soundsMuted = false;

    // Atsnaukiame garsą, kai reklama baigiasi
    if (currentSound == "loop") {
        playLoopSound();
    } else if (currentSound == "quiz") {
        playQuizSound();
    }
}

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus pradėta rodyti reward reklama
function onRewardStarted() {
    console.log("onRewardStarted() called from Android");
    stopAllSounds()
    soundsMuted = true;
}

async function onRewardEnded() {
    console.log("onRewardEnded() called from Android");
    soundsMuted = false;
    if(currentSound == "loop"){
       await playLoopSound()
    } else if(currentSound == "quiz"){
      await playQuizSound()
    }
}

