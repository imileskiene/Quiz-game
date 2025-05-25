
function showInterstitial(){
    window.Android.showInterstitial();
}
function showAdError() {
    window.Android.showToast("Sorry, the service is currently unavailable. Please try again later.");
}

function showRewardAd() {
    window.Android.showRewardAd();
}

let soundsMuted = false;

function onInterstitialStarted() {
    stopAllSounds()
    soundsMuted = true;
}

function onInterstitialEnded() {
    soundsMuted = false;


    if (typeof window.nextContainer === "function") {
        window.nextContainer();
        window.nextContainer = null;
    }

    if (currentSound == "loop") {
        playLoopSound();
    } else if (currentSound == "quiz") {
        playQuizSound();
    }
}

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

function callNextContainer() {
    if (window.nextContainer && typeof window.nextContainer === 'function') {
        window.nextContainer();
    } else {
      rulesContainer.style.display = "block";
      overlayContainer.style.display = "none";
    }
}

function removeOverlay() {
    overlayContainer.style.display = "none";
}