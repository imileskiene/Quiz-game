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
        rewardPopupText.textContent = "Ar norite peržiūrėti reklamą, kad gautumėte papildomą pagalbą?";
        rewardPopupContainer.appendChild(rewardPopupText);

        // Sukuriame mygtuką reklamai rodyti
        const showAdBtn = document.createElement("button");
        showAdBtn.textContent = "Peržiūrėti reklamą";
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