function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();


window.addEventListener('backbutton', function(event) {
    event.preventDefault(); // Sustabdome įprastą naršyklės elgesį

    if (typeof Android !== "undefined") {
        stopAllSounds().then(() => { // Sustabdome visus garsus
            Android.goBack(); // Iškviečiame goBack metodą iš Android
        });
    } else {
        // Jei esame ne Android aplinkoje, tiesiog grįžtame atgal
        window.history.back();
    }
});

// Po lygio pabaigos
//Android.showInterstitial();

//function levelComplete() {
//    // parodyti rezultatą...
//    Android.showInterstitial();
//}