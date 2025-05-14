
//Funkcija iskviesti tarpine reklama.
function showInterstitial(){
    window.Android.showInterstitial();
}
function showAdError() {
    alert("Sorry, the service is currently unavailable. Please try again later.");
}

function showRewardAd() {
    console.log("showRewardAd() called");
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

function onInterstitialEnded() {
    console.log("onInterstitialEnded() called from Android");
    soundsMuted = false;

    // kai reklama baigiasi, pereinam prie kito container
    if (typeof window.nextContainer === "function") {
        window.nextContainer();
        window.nextContainer = null; // išvalom, kad netyčia nesikartotų
    }

    // atnaujinam garsus
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

function callNextContainer() {
    if (window.nextContainer && typeof window.nextContainer === 'function') {
        window.nextContainer(); // Kviečiame nextContainer, jei jis egzistuoja
    } else {
      rulesContainer.style.display = "block";
      overlayContainer.style.display = "none";
    }
}

// Funkcija pašalinti overlay
function removeOverlay() {
    overlayContainer.style.display = "none";
}