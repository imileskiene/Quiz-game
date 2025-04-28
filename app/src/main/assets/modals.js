function showModal(message) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const modalClose = document.getElementById("modal-close");

    modalText.innerText = message;
    modal.style.display = "flex";

    modalClose.onclick = function() {
        modal.style.display = "none";
    };
}

function mobileIconPopup(){
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const mobilePopup = document.createElement("div");
  mobilePopup.classList.add("mobile-container");

  // Sukuriame Font Awesome telefoną
  const cloneMobileIcon = document.createElement("i");
  cloneMobileIcon.classList.add("fa", "fa-mobile-screen-button", "clone-mobile");

  // Sukuriame ekraną (tikrą teksto vietą)
  const mobileScreen = document.createElement("div");
  mobileScreen.classList.add("mobile-screen");


  const text = document.createElement("p");
  text.innerHTML = `${currentQuestion.answer}`;

  const mobileCloseBtn = document.createElement("button");
  mobileCloseBtn.classList.add("mobile-close-btn");
  mobileCloseBtn.innerHTML = "X";

  // Ikonos wrapperis (kad ekraną įdėtume į vidų)
  const iconWrapper = document.createElement("div");
  iconWrapper.classList.add("icon-wrapper");

  mobileScreen.appendChild(text);
  iconWrapper.appendChild(cloneMobileIcon);
  iconWrapper.appendChild(mobileScreen);
  iconWrapper.appendChild(mobileCloseBtn);

  mobilePopup.appendChild(iconWrapper);
  quizContainer.appendChild(mobilePopup);

  // Išjungiam mobileBtn, kad nebūtų galima kelis kartus spausti
  //mobileBtn.disabled = true;

  mobileCloseBtn.addEventListener("click", ()=>{
    mobilePopup.remove();
  });

}

function showRewardPopupDiv() {
    // Patikriname ar elementas jau egzistuoja
    let rewardPopupContainer = document.getElementById("reward-popup-container");
    if (!rewardPopupContainer) {
        rewardPopupContainer = document.createElement("div");
        rewardPopupContainer.id = "reward-popup-container";
        rewardPopupContainer.classList.add("reward-popup-container");

        const rewardPopupText = document.createElement("p");
        rewardPopupText.textContent = "Need some extra help?";
        rewardPopupContainer.appendChild(rewardPopupText);

        // Sukuriame mygtuką reklamai rodyti
        const showAdBtn = document.createElement("button");
        showAdBtn.textContent = "Watch Ad";
        showAdBtn.classList.add("show-ad-btn");
        showAdBtn.addEventListener("click", () => {
            showRewardAd(); // Kviečiam reklama
            rewardPopupContainer.remove(); // Pašalinam popupa
        });
        rewardPopupContainer.appendChild(showAdBtn);

        // Sukuriame uždarymo mygtuką
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "X";
        closeBtn.classList.add("close-reward-btn");
        closeBtn.addEventListener("click", () => {
            rewardPopupContainer.remove(); // Panaikina visą div
        });
        rewardPopupContainer.appendChild(closeBtn);

        quizContainer.appendChild(rewardPopupContainer);
    }else{
        rewardPopupContainer.remove(); // Panaikina visą div
    }
}

function backBtnPopup() {
  // Patikriname ar modalas jau egzistuoja
  let backBtnContainer = document.getElementById("back-btn-container");

  if (!backBtnContainer) {
    backBtnContainer = document.createElement("div");
    backBtnContainer.id = "back-btn-container";
    backBtnContainer.classList.add("back-btn-container");

    // Sukuriame tekstą
    const backBtnPopupText = document.createElement("p");
    backBtnPopupText.textContent = "Going back now will reset your score. Return to the levels?";
    backBtnContainer.appendChild(backBtnPopupText);

    // Sukuriame mygtuką "Yes"
    const showApplyBtn = document.createElement("button");
    showApplyBtn.textContent = "Yes";
    showApplyBtn.classList.add("show-apply-btn");

    showApplyBtn.addEventListener("click", () => {
      // Jei vartotojas paspaudžia "Yes"
      backBtnContainer.remove(); // Panaikiname modalą
      showInterstitial(); // Parodome reklamas
      returnToLevels(); // Grįžtame į lygių ekraną
    });

    backBtnContainer.appendChild(showApplyBtn);

    // Sukuriame uždarymo mygtuką
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-back-btn");
    closeBtn.addEventListener("click", async () => {
      await playOtherSounds("press");
      await playQuizSound();
      backBtnContainer.remove(); // Pašalina modalą
    });

    backBtnContainer.appendChild(closeBtn);

    quizContainer.appendChild(backBtnContainer); // Įdedame modalą į žaidimo konteinerį
  } else {
    backBtnContainer.remove(); // Jei modalas jau yra, uždarome jį
  }
}

function returnToLevels() {
  // Grįžtame į lygių ekraną
  updateUserPointsDisplay(); // Atnaujiname taškų skaičių
  levelContainer.style.display = "block"; // Parodome lygius
  pointsContainer.style.display = "block"; // Parodome taškų informaciją
  quizContainer.style.display = "none"; // Paslepiame klausimų ekraną
  bubbleContainer.style.display = "none"; // Paslepiame burbulą
  stopLoopSound(); // Sustabdome garso ciklą
  playLoopSound(); // Grojame garso ciklą
}

//function popUp(row, callback) {
//  const popup = document.createElement("div");
//  const popupText = document.createElement("p");
//  popupText.classList.add("popupTxt");
//  popup.classList.add("popup");
//
//  // Įdedame tekstą
//  popupText.textContent = "Congratulations! Your winning points:";
//  popup.appendChild(popupText);
//
//  // Nukopijuojame eilutės HTML turinį
//  const rowClone = document.createElement("div");
//  rowClone.innerHTML = row.innerHTML;
//
//  popup.appendChild(rowClone); // Dabar eilutė bus po tekstu
//
//  document.body.appendChild(popup);
//
//  playSound("winning");
//
//  setTimeout(() => {
//    popup.remove();
//    if (callback) callback(); // Toliau vykdoma kita funkcija
//  }, 2500);
//}

function popUp(row, isCorrect, callback) { // Pridedame isCorrect parametrą
    const popup = document.createElement("div");
    const popupText = document.createElement("p");
    popupText.classList.add("popupTxt");
    popup.classList.add("popup");

    // Keičiame tekstą pagal isCorrect
    if (isCorrect) {
        const randomIndex = Math.floor(Math.random() * correctMessages.length);
                popupText.textContent = correctMessages[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
                popupText.textContent = incorrectMessages[randomIndex];
        popup.classList.remove("popup");
        popup.classList.add("lost");

    }

    popup.appendChild(popupText);

    const rowClone = document.createElement("div");
    rowClone.innerHTML = row.innerHTML;

    popup.appendChild(rowClone);

    document.body.appendChild(popup);

    if (isCorrect) {
        playSound("winning");
    } else {
        playSound("loose");
    }

    setTimeout(() => {
        popup.remove();
        if (callback) callback();
    }, 2500);
}