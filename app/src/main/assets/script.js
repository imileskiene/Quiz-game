console.log("script.js failas buvo įkeltas!");


const container = document.querySelector(".container");
const startContainer = document.querySelector(".start-container");
const start = document.querySelector(".start-btn");
const rulesContainer = document.getElementById("rules");
const nextBtn = document.getElementById("next-btn");
const levelSelector = document.getElementById("level-selection");
const levelContainer = document.querySelector(".level-container");
const themeSelector = document.getElementById("theme-selection");
const themeContainer = document.querySelector(".theme-container");
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const scoreTable = document.getElementById("score");
const finishedContainer = document.querySelector(".finished-container");
const loaderAtribute = document.querySelector(".loader");
const mobileBtn = document.querySelector(".mobile-btn");
const boltBtn = document.querySelector(".bolt-btn");
const boltIcon = document.getElementById("bolt-icon");
const mobileIcon = document.getElementById("mobile-icon");
const bubbleContainer = document.querySelector(".bubble-container");
const backBtn = document.querySelector(".backBtn");
const pointsContainer = document.getElementById("points-container");

//300
const points = [10, 10, 10, 15, 15, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30];
let answerStatuses = [];


let selectedLevel = null;
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let currentTheme = null;

pointsContainer.style.display = "none";
rulesContainer.style.display = "none";
levelContainer.style.display = "none";
themeContainer.style.display = "none";
quizContainer.style.display = "none";
finishedContainer.style.display = "none";
scoreTable.style.display = "none";

playLoopSound();

function updateUserPointsDisplay() {
  const userPointsElement = document.getElementById("user-total-points");
  let savedPoints = localStorage.getItem("totalPoints");

  if (!savedPoints) {
    savedPoints = 0;
  }

  if (userPointsElement) {
    userPointsElement.textContent = parseInt(savedPoints).toLocaleString('lt-LT');
  }
}

//start.addEventListener("click", async () => {
//    await playOtherSounds("press");
//    if (typeof Android !== "undefined") {
//        console.log("Start button clicked");
//        showInterstitial();
//    }
//    startContainer.style.display = "none";
//    rulesContainer.style.display = "block";
//});
start.addEventListener("click", async () => {
    await playOtherSounds("press");

    // Pirmiausia parodome reklama
    if (typeof Android !== "undefined") {
        console.log("Start button clicked");

        // Parodyti tarpinę reklamą ir palaukti, kol ji pasibaigs
        await showInterstitial();
    }

    // Kai reklama pasibaigia, rodyti kitą containerį
    startContainer.style.display = "none";
    rulesContainer.style.display = "block";
});


backBtn.addEventListener("click", async () => {
  await playOtherSounds("press");
  backBtnPopup();  // Iššaukia modalą
  stopQuizSound();
});

document.addEventListener("DOMContentLoaded", function () {
playLoopSound();
  const instructionBtns = document.querySelectorAll(".instructionBtn");
  const instructionContainer = document.getElementById("instruction-container");
  const closeBtn = instructionContainer.querySelector(".closeBtn");

  instructionBtns.forEach(btn => {
    btn.addEventListener("click", async function () {
    await playOtherSounds("press");
      instructionContainer.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", async function () {
  await playOtherSounds("press");
    instructionContainer.style.display = "none";
  });

  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", async () => {
      await playSound("press");
      stopLoopSound();
      updateUserPointsDisplay();
      showLevels();
    });
  }
});

// Funkcija lygiu mygtukams
function showLevels() {
  playLoopSound();
  pointsContainer.style.display = "block";
  rulesContainer.style.display = "none";
  themeContainer.style.display = "none";
  quizContainer.style.display = "none";
  finishedContainer.style.display = "none";

  levelSelector.innerHTML = "";

  if (!quizLevels || Object.keys(quizLevels).length === 0) {
    console.error("Nėra lygio duomenų!");
    return;
  }

  let savedPoints = parseInt(localStorage.getItem("totalPoints") || "0");

  for (const levelKey in quizLevels) {
    const level = quizLevels[levelKey];
    const button = document.createElement("button");
    button.classList.add("level-btn");
    button.textContent = level.title;

    let firstSpan = document.createElement("span");
    firstSpan.classList.add("level-span-btn");

    let secondSpan = document.createElement("span");
    secondSpan.classList.add("level-span-btn");

    let newSpan = document.createElement("span");
    newSpan.classList.add("level-extra-span");

    button.appendChild(firstSpan);
    button.appendChild(secondSpan);
    button.appendChild(newSpan);

    firstSpan.style.setProperty("--level-color", level.color);
    secondSpan.style.setProperty("--level-color", level.color);
    newSpan.style.setProperty("--level-color", level.color);

    // ====== Unlock logika ======

    if (levelKey === "easy") {
      button.disabled = false;
    }
    else if (levelKey === "medium") {
      if (savedPoints < 3000) {
        button.disabled = true;
        button.textContent = `${level.title} 🔒 (Unlock at 5000 points)`;
      } else {
        button.disabled = false;
        button.classList.add("unlock-animated"); // <- Pridedam švytėjimą kai atrakinta
      }
    }
    else if (levelKey === "hard") {
      if (savedPoints < 5000) {
        button.disabled = true;
        button.textContent = `${level.title} 🔒 (Unlock at 10000 points)`;
      } else {
        button.disabled = false;
        button.classList.add("unlock-animated"); // <- Pridedam švytėjimą kai atrakinta
      }
    }

    button.addEventListener("click", async () => {
      if (button.disabled) return;
      await playOtherSounds("press");
      selectedLevel = levelKey;
      levelContainer.style.display = "none";
      stopLoopSound();
      getThemes();
      console.log(`Pasirinktas lygis: ${selectedLevel}`);
    });

    levelSelector.appendChild(button);
  }

  levelContainer.style.display = "block";
}



async function getThemes() {
    // Rodome loaderį ir paslepiame kitus konteinerius
    loaderAtribute.style.display = "block";
    pointsContainer.style.display = "none";
    rulesContainer.style.display = "none";
    themeContainer.style.display = "none";
    startContainer.style.display = "none";
    finishedContainer.style.display = "none";
    scoreTable.style.display = "none";

    try {
        // Simuliuojame uždelsimą (jei reikia)
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Tikriname, ar yra pasirinktas lygis
            if (!selectedLevel) {
              throw new Error("Nepasirinktas lygis");
            }

            // Tikriname, ar `quizLevels[selectedLevel].themes` egzistuoja
            if (!quizLevels[selectedLevel] || !quizLevels[selectedLevel].themes) {
              throw new Error(`Nėra temų lygiui: ${selectedLevel}`);
            }

//        // Tikriname, ar `themes` egzistuoja
//        if (!Array.isArray(themes) || themes.length === 0) {
//            throw new Error("Nėra galimų temų");
//        }

        // Paslepiame loaderį ir rodome temas
        loaderAtribute.style.display = "none";
        pointsContainer.style.display = "block";
        themeContainer.style.display = "block";
        stopQuizSound();
        playLoopSound();

        // Išvalome senus mygtukus
        themeSelector.innerHTML = "";

        // Kuriame naujus mygtukus
        quizLevels[selectedLevel].themes.forEach((theme) => {
            let button = document.createElement("button");
            button.classList.add("theme-btn");
            button.innerText = theme.name;

            let firstSpan = document.createElement("span");
            firstSpan.classList.add("theme-span-btn");

            let secondSpan = document.createElement("span");
            secondSpan.classList.add("theme-span-btn");

            let newSpan = document.createElement("span");
            newSpan.classList.add("extra-span");

            button.appendChild(firstSpan);
            button.appendChild(secondSpan);
            button.appendChild(newSpan);

            // Nustatome spalvas pagal temą
            firstSpan.style.setProperty("--theme-color", theme.color);
            secondSpan.style.setProperty("--theme-color", theme.color);
            newSpan.style.setProperty("--theme-color", theme.color);

            // Paspaudimo eventas
            button.addEventListener("click", async () => {
                await playOtherSounds("press");
                if (typeof Android !== "undefined") {
                    console.log("Start button clicked");
                          await showInterstitial();
                        }
                        stopLoopSound();
                startQuiz(theme.name);
            });

            themeSelector.appendChild(button);
        });

    } catch (error) {
              console.error("Klaida gaunant temas:", error);
                  showModal("Nepavyko įkelti temų, bandykite prisijungti iš naujo.");
                  document.getElementById("modal-close").onclick = function() {
                              stopGame();  // Kai paspaudžiamas "OK" (Close), suveikia stopGame
                          };
}
}
function stopGame() {
    // Paslepiame visus žaidimo elementus
    startContainer.style.display = "none";
    rulesContainer.style.display = "none";
    levelContainer.style.display = "none";
    themeContainer.style.display = "none";
    finishedContainer.style.display = "none";
scoreTable.style.display = "none";
    // Skambinkite į Android'ą, kad uždarytumėte arba nukreiptumėte vartotoją
    if (typeof Android !== "undefined") {
            Android.stopGame();  // Skambiname metodą iš Android
        }
}

let themeColor = "";

// Funkcija, kuri pradeda testą su pasirinkta tema
async function startQuiz(themeName) {
console.log("Calling stopLoopSound() before quiz");
stopLoopSound();
loaderAtribute.style.display = "block";
pointsContainer.style.display = "none";
    themeContainer.style.display = "none";
    quizContainer.style.display = "none";
    finishedContainer.style.display = "none";
    stopQuizSound();
try{
  currentTheme = themeName;

  // Randame temos spalvą iš themes objekto
    let selectedTheme = allThemes.find((theme) => theme.name === themeName);
    if (selectedTheme) {
      themeColor = selectedTheme.color;
    }

  if (!questionsByTheme[themeName] || !questionsByTheme[themeName][selectedLevel] || questionsByTheme[themeName][selectedLevel].length === 0) {
           showModal("There are no questions available for this theme and level. Please choose another theme.");
          themeContainer.style.display = "block";
          playLoopSound();
          quizContainer.style.display = "none";
          return;
      }

      selectedQuestions = getRandomQuestions(questionsByTheme[themeName][selectedLevel], 15);

      if (selectedQuestions.length === 0) {
          alert("An error occurred while generating questions.");
          themeContainer.style.display = "block";
          playLoopSound();
          quizContainer.style.display = "none";
          return;
      }

//  createScoreTable();

  mobileBtnFirstClick = false;
          isMobileHelpActive = false;

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  cacheAnswerButtons();
  // Čia įjungiame mobileBtn, kai pradedamas quizas
  mobileBtn.disabled = false;
  mobileBtn.classList.remove("disabled"); // pašalina disabled klasę
  mobileIcon.disabled = false;
  boltBtn.disabled  = false;
  const boltIcon = boltBtn.querySelector('i');
  boltIcon.style.color = 'aqua'; // Grąžiname pradinę spalvą
  quizContainer.style.display = "block";
  playQuizSound();
}catch (error) {
         console.error(error.message);
         showModal(error.message);
     } finally {
         loaderAtribute.style.display = "none"; // visada paslepia loaderį
     }
 }

// Funkcija, kuri paima random 10 klausimų
function getRandomQuestions(themeArray, count) {
  return themeArray.sort(() => Math.random() - 0.5).slice(0, count);
}

function showQuestion() {
if (selectedQuestions.length === 0) {
        console.error("Nėra klausimų pasirinktoje temoje.");
        alert("There are no questions for this theme. Returning you to the theme list.");
        themeContainer.style.display = "block";
        quizContainer.style.display = "none";
        return;
    }

  let currentQuestion = selectedQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  let fullText = `${questionNo}. ${currentQuestion.question}`;
  let i = 0;

  // Užblokuokime mygtukus po uždelsimo, kad tikrai pasirodytų klausimas pirmiausia
  setTimeout(disableButtons, 0); // Užblokuosime mygtukus tik po to, kai klausimas parodomas
  questionElement.innerHTML = "";

  answerButtons.innerHTML = "";
  cacheAnswerButtons(); // Čia išsaugome mygtukus
//  console.log(answerButtonsList)

playQuizSound();

  function typeWords() {
      let i = 0;
      function step() {
          if (i < fullText.length) {
              questionElement.innerHTML += fullText[i];
              i++;
              requestAnimationFrame(step);
          } else {
              enableButtons();
          }
      }
      requestAnimationFrame(step);
  }

  typeWords();

  //  Atnaujiname taškų reikšmę inpute**
  if (points[currentQuestionIndex] !== undefined) {
    document.querySelector(".points-value").value = points[currentQuestionIndex]
    .toLocaleString('lt-LT');
  }

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn");
    button.style.backgroundColor = themeColor;
    answerButtons.appendChild(button);
    cacheAnswerButtons(); // Čia išsaugome mygtukus iškart po jų pridėjimo

function playSoundBasedOn(isCorrect) {
        if (isCorrect) {
            playOtherSounds("correct");
        } else {
            playOtherSounds("incorrect");
        }
    }

    button.addEventListener("click", () => {
      disableButtons();

      const correctAnswer = currentQuestion.answer;
     let isCorrect = option === correctAnswer;

         playSoundBasedOn(isCorrect);

      //paspaudus mygtuka jeigu teisingas nusispalvina zaliai, kitu atveju raudonai
      if (isCorrect) {
        button.classList.remove("btn");
        button.classList.add("correct-answer-btn");

        const thumbsIcon = document.createElement("i");
        thumbsIcon.classList.add("fa-solid", "fa-thumbs-up");
        thumbsIcon.style.color = "#FFD700";
        thumbsIcon.style.marginLeft = "3px";
        thumbsIcon.style.padding = "3px";
        thumbsIcon.style.fontSize = "5vw";
        button.appendChild(thumbsIcon);

        score++;
        isCorrect = true;
      } else {
        button.classList.remove("btn");
        button.classList.add("incorrect-answer-btn");

        const faceIcon = document.createElement("i");
        faceIcon.classList.add("fa-solid", "fa-face-frown");
        faceIcon.style.color = "#FFD700";
        faceIcon.style.marginLeft = "3px";
        faceIcon.style.fontSize = "5vw";
        faceIcon.style.padding = "3px";
        button.appendChild(faceIcon);

        //funkcija pateikia teisinga atsakyma zaliai
        showCorrectAnswer(currentQuestion.answer);
        // updateScoreTable(false); // Atsakymas klaidingas
      }

      stopQuizSound();

      // Uždelsimas prieš rodyti score div'ą (pvz., 1500ms)
      setTimeout(() => {
        quizContainer.style.display = "none";
        scoreTable.style.display = "block";

        // Atnaujiname lentelę, pažymint teisingą ar klaidingą atsakymą
        updateScoreTable(isCorrect);
        createStars();
      }, 2500);

      setTimeout(() => {
        if (currentQuestionIndex < selectedQuestions.length - 1) {
          currentQuestionIndex++;
          quizContainer.style.display = "block";
          scoreTable.style.display = "none";
          showQuestion(); // Parodome kitą klausimą
        } else {
          quizContainer.style.display = "none";
          finishedContainer.style.display = "block";
          showResults();
        }
      }, 6500);
    });
  });
}

// Naujas kintamasis, kuris seks, ar vartotojas jau spaudė pirmą kartą
let mobileBtnFirstClick = false;
let isMobileHelpActive = false;

function enableMobileHelpAfterReward() {
    console.log("enableMobileHelpAfterReward() called from Android");
    // Čia dabar įjungsime mobileBtn, nes reward reklama baigėsi.
    //mobileBtn.disabled = false; // Įjungiam mygtuką
    mobileBtn.classList.remove("disabled"); // pašalina disabled klasę
    const mobileIconElement = mobileBtn.querySelector("i") || mobileIcon;
//    if (mobileIconElement) {
//        mobileIconElement.style.color = "aqua";
//    }
    isMobileHelpActive = false;
    mobileBtnFirstClick = false; // kad paspaudus is naujo veiktų
    // Galima pridėti daugiau logikos, pvz., pakeisti mygtuko tekstą arba padaryti kitus veiksmus
}

//Ši funkcija iškviečia Android kodą, kad būtų parodyta reward reklama.
if (typeof Android !== "undefined") {
                    console.log("Start button clicked");
                           showRewardAd();
                        }


mobileBtn.addEventListener("click", async (event) => {
    console.log("mobileBtn.addEventListener");
    console.log("mobileBtnFirstClick", mobileBtnFirstClick);
    await playOtherSounds("press"); // Groja "press" garsą
    // Patikrinu ar paspaudimas buvo ant ikonos
    const isIconClicked = event.target.closest("#mobile-icon");
    console.log("isIconClicked", isIconClicked);
    if (!mobileBtnFirstClick && isMobileHelpActive === false) {
        console.log("Pirmas paspaudimas");
        // Pirmas paspaudimas
        mobileIconPopup(); // Rodomas mobilus popup
        //  mobileBtn.disabled = true; // nebenaudosim disabled
        isMobileHelpActive = true;
        mobileBtnFirstClick = true; // Nustatom, kad mygtukas jau paspaustas pirmą kartą
    } else {
        console.log("Antras paspaudimas");
        // Antras paspaudimas (mygtukas jau buvo paspaustas)
        if (isMobileHelpActive === true && mobileBtnFirstClick === true) {
            console.log("mygtukas deaktyvuotas");
            await playSound("notActiveSound"); // Groja "notActiveSound"
            showRewardPopupDiv(); // Keičiame showMobileRewardPopup į showRewardPopupDiv
        } else {
            console.log("mygtukas aktyvus");
        }
    }
});


boltBtn.addEventListener("click", async function () {
    await playOtherSounds("press");

    selectTwoIncorrectBtnsWithHelp(); // Po garso aktyvuojame funkciją

    // Disable the help button after it has been clicked
    boltBtn.disabled = true;

    const boltIcon = boltBtn.querySelector('i');
    boltIcon.style.color = '#ccc';
});

boltIcon.addEventListener("click", async () => {
if(boltBtn.disabled){
await playOtherSounds("notActiveSound");  // Groja "press" garsą, kai mygtukas įjungtas
}
});

//funkcija kuri atrenka du neteisingus atsakymus
function selectTwoIncorrectBtnsWithHelp(){
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const allAnswers = currentQuestion.options;
  // console.log("get all answers", allAnswer);
  const correctAnswer = currentQuestion.answer;

  const incorrectAnswers = [];

  allAnswers.forEach(allAnswer => {
    if (allAnswer !== correctAnswer) {
      incorrectAnswers.push(allAnswer);
    }
  });

  // console.log(inccorectAnsers);


// Jei radome klaidingus atsakymus, pasirenkame 2 atsitiktinius
if (incorrectAnswers.length > 0) {
  const twoIncorrectAnswers = getRandomAnswers(incorrectAnswers, 2); // Pasiimame 2 atsitiktinius klaidingus atsakymus
  // Loop through and apply style to each button
  twoIncorrectAnswers.forEach(answer => {
    const button = [...answerButtons.querySelectorAll("button")].find(btn => btn.textContent === answer); // Paieška pagal tekstą
    if (button) {
      button.style.background = "grey";  // Apply color to each button
      button.disabled = true; // Užblokuojame klaidingus atsakymus, kad žaidėjas negalėtų jų pasirinkti
    }
  });
  // console.log("Pasirinkti klaidingi atsakymai:", twoIncorrectAnswers);
} else {
  // console.error("Nepavyko rasti klaidingų atsakymų");
  return;
}
}

// Funkcija, kuri paima random 2 stsakymus
function getRandomAnswers(incorrectAnswers, count) {
  return incorrectAnswers.sort(() => Math.random() - 0.5).slice(0, count);
}

let answerButtonsList = [];

function cacheAnswerButtons() {
  answerButtonsList = [...answerButtons.querySelectorAll("button")];
}

// Funkcija išjungti mygtukus
function disableButtons() {
  answerButtonsList.forEach((button) => {
    button.disabled = true;
//    button.addEventListener("click", async()=>{
//    await playSound("notActiveSound")});
  });
}

// Funkcija įjungti mygtukus
function enableButtons() {
  answerButtonsList.forEach((button) => {
    button.disabled = false;
//    button.removeEventListener("click", ()=>{
//    playSound("notActiveSound")});
  });
}

// Parodo, kuris atsakymas yra teisingas
function showCorrectAnswer(answer) {
  answerButtonsList.forEach((button) => {
    if (button.textContent === answer) {
      button.style.background = "#ADFF2F";
    }
  });
}


function updateScoreTable(isCorrect) {
//  const scoreContainer = document.getElementById("score");

  const earnedPoints = points[currentQuestionIndex];
  answerStatuses[currentQuestionIndex] = isCorrect;

  // Išvalom prieš tai buvusią kortelę (jeigu reikia)
  scoreTable.innerHTML = "";

  // Kortelės struktūra
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("answer-card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.style.backgroundColor = "#5DADE2"; // Pradinė mėlyna

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.style.backgroundColor = isCorrect ? "#58D68D" : "#EC7063"; // Žalia arba raudona

  // -- Random tekstas iš masyvo --
  let message = "";
  if (isCorrect) {
    const randomIndex = Math.floor(Math.random() * correctMessages.length);
    message = correctMessages[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
    message = incorrectMessages[randomIndex];
  }

  const resultText = document.createElement("p");
  resultText.classList.add("result-text");
  resultText.textContent = `${message} ${earnedPoints}`;

  cardBack.appendChild(resultText);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardWrapper.appendChild(cardInner);
  scoreTable.appendChild(cardWrapper);

  // Animacija: pirmiau keičiam spalvą
  setTimeout(() => {
    cardFront.style.backgroundColor = isCorrect ? "#58D68D" : "#EC7063";
  }, 400);

  // Tada po dar truputį vėliau apsuka
  setTimeout(() => {
    cardInner.classList.add("flipped");

    // Leisti garsą po apsivertimo
    if (isCorrect) {
      playSound("winning");
    } else {
      playSound("loose");
    }
  }, 800);
}

//function createStars() {
//  const starContainer = document.getElementById("starContainer");
//  if (!starContainer) {
//      console.error("Nepavyko rasti starContainer!");
//      return; // sustabdom funkciją
//    }
//
//  for (let i = 0; i < 50; i++) { // Sukuriame 50 žvaigždžių
//    const star = document.createElement("div");
//    star.classList.add("star");
//
//    // Atsitiktinė pozicija žvaigždės ekrane
//    star.style.left = Math.random() * window.innerWidth + "px";
//    star.style.top = Math.random() * window.innerHeight + "px";
//
//    // Atsitiktinis dydis žvaigždei
//    const size = Math.random() * 3 + 1; // Atsitiktinis dydis nuo 1px iki 4px
//    star.style.width = size + "px";
//    star.style.height = size + "px";
//
//    // Pridedame žvaigždę į konteinerį
//    starContainer.appendChild(star);
//}

// Kviečiame funkciją, kad sukurti žvaigždes
//createStars();

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // console.log("Bubble created!");

  // Atsitiktinė X pozicija ekrano apačioje
  bubble.style.left = Math.random() * window.innerWidth + "px";

  // Atsitiktinis dydis burbului
  const size = Math.random() * 100 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

// Pridėti burbulą į konteinerį
  bubbleContainer.appendChild(bubble);

  // Pašaliname burbulą iš DOM po 5 sekundžių (kai jis pasiekia viršų)
  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

// Kiekvieną 0.3 sekundės generuoja naują burbulą
setInterval(createBubble, 300);


function showResults() {
stopQuizSound();
 if (typeof Android !== "undefined") {
    Android.playLoopSound();
  }
  // Apskaičiuojame bendrą taškų sumą
  let totalPoints = 0;

  for (let i = 0; i < selectedQuestions.length; i++) {
      if (answerStatuses[i]) { // JEIGU atsakymas buvo teisingas
        totalPoints += points[i];
      }
    }

  scoreTable.style.display = "none";
  pointsContainer.style.display = "none";

const formattedTotalPoints = totalPoints.toLocaleString('lt-LT');

  // Atvaizduojame rezultatą
  finishedContainer.innerHTML = `
    <h2>Quiz Finished!</h2>
    <p>You answered <strong>${score}</strong> out of <strong>${selectedQuestions.length}</strong> correctly.</p>
    <p>Total points: <strong>${formattedTotalPoints}</strong></p>
    <button id="again-btn">Reset</button>
    <button id="return-btn">Start new game</button>
  `;
  bubbleContainer.style.display = "block";
  createBubble();


  // Pridedame event listener'ius naujai sugeneruotiems mygtukams
  document.getElementById("again-btn").addEventListener("click", async () => {
    await playSound("press");
    // Sustabdome loop garsą (kviečiame Android pusėje esančią funkciją)
        stopLoopSound();
        updateUserPointsDisplay();
    finishedContainer.style.display = "none";
    quizContainer.style.display = "block";
    scoreTable.style.display = "none";
    bubbleContainer.style.display = "none";
     // Iš naujo paleidžiame quiz'ą su išsaugota tema
        startQuiz(currentTheme);
  });

  document.getElementById("return-btn").addEventListener("click", async() => {
    await playSound("press");
    playLoopSound();
    updateUserPointsDisplay();
                 finishedContainer.style.display = "none";
                     themeContainer.style.display = "none";
                     pointsContainer.style.display = "block";
                     quizContainer.style.display = "none";
                     scoreTable.style.display = "none";
                     bubbleContainer.style.display = "none";

                     showLevels();
  });

  finishedContainer.style.display = "block";

  // ==================== LOCAL STORAGE: Saugom bendrą taškų kiekį ====================
  let savedPoints = localStorage.getItem("totalPoints");
  if (!savedPoints) {
    savedPoints = 0;
  }

  let newTotal = parseInt(savedPoints) + totalPoints;
  localStorage.setItem("totalPoints", newTotal);

  const userPointsElement = document.getElementById("user-total-points");
  if (userPointsElement) {
    userPointsElement.textContent = newTotal.toLocaleString('lt-LT');
  }

  // Rodom papildomai bendrą visų laikų rezultatą
  const lifetimePointsDisplay = document.createElement("p");
  lifetimePointsDisplay.innerHTML = `<strong>Viso taškų per visus žaidimus:</strong> ${newTotal.toLocaleString('lt-LT')}`;
  finishedContainer.appendChild(lifetimePointsDisplay);

}


//isvalyti loclastorage
//localStorage.removeItem("totalPoints");
