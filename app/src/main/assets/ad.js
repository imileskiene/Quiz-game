

// Naujos funkcijos garso valdymui
let soundsMuted = false;

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus pradėta rodyti interstitial reklama
function onInterstitialStarted() {
    console.log("onInterstitialStarted() called from Android");
    // Vykdome garsų nutildymo logiką
   if(!soundsMuted){
        muteAllOtherSounds();
        muteLoopSound();
        muteQuizSound();
        soundsMuted = true;
   }
}

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus baigta rodyti interstitial reklama
function onInterstitialEnded() {
    console.log("onInterstitialEnded() called from Android");
     if(soundsMuted){
        unmuteAllOtherSounds();
        unmuteLoopSound();
        unmuteQuizSound();
        soundsMuted = false;
    }
}

// Nauja funkcija, kuri bus iškviesta iš Android'o, kai bus pradėta rodyti reward reklama
function onRewardStarted() {
    console.log("onRewardStarted() called from Android");
    if(!soundsMuted){
       muteAllOtherSounds();
       muteLoopSound();
       muteQuizSound();
        soundsMuted = true;
   }
}