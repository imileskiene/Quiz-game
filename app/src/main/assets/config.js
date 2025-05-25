function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();


window.addEventListener('backbutton', async function(event) {
    event.preventDefault();

    if (typeof Android !== "undefined") {
            Android.goBack();
    } else {
        window.history.back();
    }
});

function sendSupportEmail() {
        console.log("Button clicked");
        if (typeof Android !== "undefined" && Android.sendSupportEmail) {
            Android.sendSupportEmail();
        } else {
            window.location.href = "mailto:...";
        }
    }
