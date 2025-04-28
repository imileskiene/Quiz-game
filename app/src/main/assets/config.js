function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();


window.addEventListener('backbutton', async function(event) {
    event.preventDefault(); // Sustabdome įprastą naršyklės elgesį

    if (typeof Android !== "undefined") {
        try {
            await stopAllSounds(); // Laukiame, kol garsai bus sustabdyti
            Android.goBack(); // Po sustabdymo grįžtame
        } catch (error) {
            console.error("Error stopping sounds:", error);
        }
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