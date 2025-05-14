function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();


window.addEventListener('backbutton', async function(event) {
    event.preventDefault(); // Sustabdome įprastą naršyklės elgesį

    if (typeof Android !== "undefined") {
            Android.goBack(); // Po sustabdymo grįžtame
    } else {
        // Jei esame ne Android aplinkoje, tiesiog grįžtame atgal
        window.history.back();
    }
});

function sendSupportEmail() {
        console.log("Button clicked");
        if (typeof Android !== "undefined" && Android.sendSupportEmail) {
            console.log("Calling Android interface");
            Android.sendSupportEmail();
        } else {
            console.log("Fallback to mailto");
            window.location.href = "mailto:...";
        }
    }


//Quizly: Color Challenge