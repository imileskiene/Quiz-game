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
const overlayContainer = document.getElementById("overlay");

//300
const points = [10, 10, 10, 15, 15, 15, 20, 20, 20, 25];
let answerStatuses = [];
let selectedLevel = null;
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let currentTheme = null;
let isMobileBtnProcessing = false;
let isBoltBtnProcessing = false;
let answerButtonsList = [];

function cacheAnswerButtons() {
  if (answerButtons) { // Patikrinimas, ar answerButtons jau egzistuoja
    answerButtonsList = [...answerButtons.querySelectorAll("button")];
  } else {
    console.error("answerButtons DOM element not found when trying to cache.");
    answerButtonsList = [];
  }
}

function disableButtons() {
  if (answerButtonsList && answerButtonsList.length > 0) {
    answerButtonsList.forEach((button) => {
      button.disabled = true;
    });
  }
}

function enableButtons() {
  if (answerButtonsList && answerButtonsList.length > 0) {
    answerButtonsList.forEach((button) => {
      button.disabled = false;
    });
  }
}

function showCorrectAnswer(answer) {
  answerButtonsList.forEach((button) => {
    if (button.textContent === answer) {
      button.style.background = "#ADFF2F";
    }
  });
}

pointsContainer.style.display = "none";
rulesContainer.style.display = "none";
levelContainer.style.display = "none";
themeContainer.style.display = "none";
quizContainer.style.display = "none";
finishedContainer.style.display = "none";
scoreTable.style.display = "none";
overlayContainer.style.display = "none";
starContainer.style.display = "none";

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

function waitForAnimationEnd(element) {
  return new Promise(resolve => {
    element.addEventListener("animationend", resolve, { once: true });
  });
}

start.addEventListener("click", async () => {
    await playOtherSounds("press");
    if (typeof Android !== "undefined") {
        console.log("Start button clicked");

        // Uždenkam viską prieš reklamą
        overlayContainer.style.display = "block";
        startContainer.style.display = "none"; // Slėpti turinį, kol reklama vyksta

        window.nextContainer = () => {
            requestAnimationFrame(() => {
                playLoopSound();
                rulesContainer.style.display = "block";
                overlayContainer.style.display = "none";
            });
        };

        showInterstitial(); // Paleidžiame reklamą
    } else {
        // jei Androido nėra – pereinam be reklamos
        overlayContainer.style.display = "none";
        startContainer.style.display = "none";
        rulesContainer.style.display = "block";
        playLoopSound();
    }
});

backBtn.addEventListener("click", async () => {
  await playOtherSounds("press");
  backBtnPopup();  // Iššaukia modalą
//  stopQuizSound();
});

document.addEventListener("DOMContentLoaded", function () {
//playLoopSound();
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
      playLoopSound()
      updateUserPointsDisplay();
      showLevels();
    });
  }
});

// Funkcija lygiu mygtukams
function showLevels() {
//  playLoopSound();
  pointsContainer.style.display = "block";
  rulesContainer.style.display = "none";
  themeContainer.style.display = "none";
  quizContainer.style.display = "none";
  finishedContainer.style.display = "none";

  levelSelector.innerHTML = "";

  if (!quizLevels || Object.keys(quizLevels).length === 0) {
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

//

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
    });

    levelSelector.appendChild(button);
  }

  levelContainer.style.display = "block";
}

//funkcija pasiekti klausimus is API
//async function getQuestionsFromAPI(amount, themeName, difficulty) {
////    console.log("getQuestionsFromAPI is called with:", { amount, themeName, difficulty });
//        let selectedTheme = allThemes.find((theme) => theme.name === themeName); // <== randame tema
//        if (selectedTheme) {
//           categoryId = selectedTheme.id; // <== pasiimame id
//        }
////        console.log("categoryId:", categoryId);
//
//    if (!categoryId) {
//       console.error("Error: Theme category not found:", themeName);
//       return [];
//    }
//        let apiUrl = "https://opentdb.com/api.php?amount=" + amount + "&category=" + categoryId + "&difficulty=" + difficulty + "&type=multiple"; // <== Naudojame kategorijos ID
//    try {
//        const response = await fetch(apiUrl);
//        const data = await response.json();
//        if (data.results && Array.isArray(data.results)) {
//            return data.results;
//        } else {
//            console.error("Error: Invalid API response", data);
//            return [];
//        }
//    } catch (error) {
//        console.error("Error fetching questions from API:", error);
//        return [];
//    }
//}

function getQuestionsFromAndroid(categoryId, difficulty) {
    return new Promise((resolve) => {
        window.questionCallback = function (dataString) {
            if (dataString) {
                try {
                    const data = JSON.parse(dataString);
                    resolve(data.results || []);
                } catch (e) {
                    console.error("JSON parsing error:", e);
                    resolve([]);
                }
            } else {
                resolve([]);
            }
        };

        Android.getQuestionsFromAPI(categoryId, difficulty, "questionCallback");
    });
}

//async function getValidQuestions(themeName, level) {
//    try {
//        const questions = await getQuestionsFromAPI(10, themeName, level);
//        if (questions && questions.length > 0) {
//            return questions;
//        }
//        return null;
//    } catch (error) {
//        console.error("Error checking for questions:", error);
//        return null;
//    }
//}
async function getValidQuestions(themeName, level) {
            console.log("[JS] getValidQuestions called with theme:", themeName, "level:", level);
            let selectedThemeObject = allThemes.find((theme) => theme.name === themeName);
            if (!selectedThemeObject || !selectedThemeObject.id) {
                console.error("[JS] Category ID not found for theme:", themeName);
                showModal("Internal error: Theme category not found.");
                return null;
            }
            const categoryId = selectedThemeObject.id;
            console.log("[JS] Calling getQuestionsFromAndroid with categoryId:", categoryId, "difficulty:", level);

            try {
                // Svarbu: Kviečiame getQuestionsFromAndroid, o ne užkomentuotą getQuestionsFromAPI
                const questions = await getQuestionsFromAndroid(categoryId.toString(), level); // Įsitikinkite, kad categoryId yra string
                console.log("[JS] Received questions from Android:", questions);

                if (questions && questions.length > 0) {
                    return questions;
                }
                console.warn("[JS] No questions received or empty array from Android.");
                return null;
            } catch (error) {
                console.error("[JS] Error in getValidQuestions (calling getQuestionsFromAndroid):", error);
                return null;
            }
        }

// Funkcija, kuri sumaiso atsakymus
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funkcija pataisyti specialius simbolius
function decodeHtmlEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
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
              throw new Error("No level selected");
            }

            // Tikriname, ar `quizLevels[selectedLevel].themes` egzistuoja
            if (!quizLevels[selectedLevel] || !quizLevels[selectedLevel].themes) {
              throw new Error(`No themes available for level: ${selectedLevel}`);
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

let isThemeLoading = false;

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
            if (isThemeLoading) return;
                isThemeLoading = true;
                await playOtherSounds("press");

                const questions = await getValidQuestions(theme.name, selectedLevel);
                      if (!questions) {
                          showModal("There are no questions available for this theme and level at this moment. Please choose another theme.");
isThemeLoading = false;
                          return;
                      }
                if (typeof Android !== "undefined") {
                    console.log("Start button clicked");
                    stopLoopSound();
overlayContainer.style.display = "block";

                          window.nextContainer = () => {
                                     requestAnimationFrame(() => {
startQuiz(theme.name, selectedLevel, questions);
                                          overlayContainer.style.display = "none";
                                          isThemeLoading = false;
                                          });
                          };
                          showInterstitial();
                        }else{
                        stopLoopSound();
//
startQuiz(theme.name, selectedLevel,questions);
//playQuizSound();
                overlayContainer.style.display = "none";
                isThemeLoading = false;
                }
            });

            themeSelector.appendChild(button);
        });

    } catch (error) {
              console.error("Error fetching themes:", error);
                  showModal("Failed to load themes, please try logging in again.");
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
async function startQuiz(themeName, level, questions) {
console.log("Calling stopLoopSound() before quiz");
stopLoopSound();
loaderAtribute.style.display = "block";
pointsContainer.style.display = "none";
starContainer.style.display = "none";
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
     const difficulty = level;
             selectedQuestions = questions.map(question => ({
                         question: decodeHtmlEntities(question.question),
                         options: shuffleArray([...question.incorrect_answers, question.correct_answer].map(decodeHtmlEntities)),
                         answer: decodeHtmlEntities(question.correct_answer)
                     }));
            console.log("selectedQuestions", selectedQuestions);

            if (!selectedQuestions || selectedQuestions.length === 0) {
                  showModal("There are no questions available for this theme and level at this moment. Please choose another theme.");
                  themeContainer.style.display = "block";
                  playLoopSound();
                  quizContainer.style.display = "none";
                  return;
                }


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
  isBoltBtnProcessing = false;
  playQuizSound();
  quizContainer.style.display = "block";
  starContainer.style.display = "none";

}catch (error) {
         console.error(error.message);
         showModal(error.message);
     } finally {
         loaderAtribute.style.display = "none"; // visada paslepia loaderį
     }
 }

function showQuestion() {
    if (selectedQuestions.length === 0) {
        console.error("There are no questions for this theme.");
        alert("There are no questions for this theme. Returning you to the theme list.");
        themeContainer.style.display = "block";
        quizContainer.style.display = "none";
        return;
    }

    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    let fullText = `${questionNo}. ${currentQuestion.question}`;
    let i = 0;

    //  Atnaujiname taškų reikšmę inpute**
//        if (points[currentQuestionIndex] !== undefined) {
//            document.querySelector(".points-value").value = points[currentQuestionIndex]
//                .toLocaleString('lt-LT');
//        }

    // Užblokuokime mygtukus po uždelsimo, kad tikrai pasirodytų klausimas pirmiausia
    setTimeout(disableButtons, 0); // Užblokuosime mygtukus tik po to, kai klausimas parodomas
    questionElement.innerHTML = "";

    cacheAnswerButtons(); // Čia išsaugome mygtukus
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


    //pakeitem, kad funkcija butu matoma visur
    function playSoundBasedOn(isCorrect) {
        if (isCorrect) {
            playOtherSounds("correct");
        } else {
            playOtherSounds("incorrect");
        }
    }
    // Funkcija, kuri tvarko atsakymų paspaudimus
   const questionClickListener = async function () {
        disableButtons();

        const correctAnswer = currentQuestion.answer;
        let isCorrect = this.textContent === correctAnswer;

        playSoundBasedOn(isCorrect);

        //paspaudus mygtuka jeigu teisingas nusispalvina zaliai, kitu atveju raudonai
        if (isCorrect) {
            this.classList.remove("btn");
            this.classList.add("correct-answer-btn");

            const thumbsIcon = document.createElement("i");
            thumbsIcon.classList.add("fa-solid", "fa-thumbs-up");
            thumbsIcon.style.color = "#FFD700";
            thumbsIcon.style.marginLeft = "3px";
            thumbsIcon.style.padding = "3px";
            thumbsIcon.style.fontSize = "5vw";
            this.appendChild(thumbsIcon);

            score++;
        } else {
            this.classList.remove("btn");
            this.classList.add("incorrect-answer-btn");

            const faceIcon = document.createElement("i");
            faceIcon.classList.add("fa-solid", "fa-face-frown");
            faceIcon.style.color = "#FFD700";
            faceIcon.style.marginLeft = "3px";
            faceIcon.style.fontSize = "5vw";
            faceIcon.style.padding = "3px";
            this.appendChild(faceIcon);

            //funkcija pateikia teisinga atsakyma zaliai
            showCorrectAnswer(currentQuestion.answer);
        }
                await new Promise((resolve) => setTimeout(resolve, 1700));
        const questionResultModal = document.getElementById("question-result-modal");
            const resultBtn = document.getElementById("result-btn");
questionResultModal.style.display = "block";

resultBtn.onclick = async () => {
        questionResultModal.style.display = "none";
        stopQuizSound();
        quizContainer.style.display = "none";
        scoreTable.style.display = "block";
        starContainer.style.display = "block";


        updateScoreTable(isCorrect);
        createStars();

await playOtherSounds(isCorrect ? "winning" : "loose");
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (currentQuestionIndex < selectedQuestions.length - 1) {
            currentQuestionIndex++;
            scoreTable.style.display = "none";
            starContainer.style.display = "none";
            quizContainer.style.display = "block";
            showQuestion();
        } else {
            quizContainer.style.display = "none";

            if (typeof Android !== "undefined") {
                overlayContainer.style.display = "block";

                window.nextContainer = () => {
                requestAnimationFrame(() => {
                    finishedContainer.style.display = "block";
                    overlayContainer.style.display = "none";
                    showResults();
                    });
                };

                showInterstitial();
            } else {
                overlayContainer.style.display = "none";
                finishedContainer.style.display = "block";
                showResults();
            }
            }
        };
    };
    // Išvalome mygtukus ir pašaliname senus event listeners po const questionClickListener
    while (answerButtons.firstChild) {
            answerButtons.firstChild.removeEventListener("click", questionClickListener);
            answerButtons.removeChild(answerButtons.firstChild);
        }
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.style.backgroundColor = themeColor;
        answerButtons.appendChild(button);
        cacheAnswerButtons(); // Čia išsaugome mygtukus iškart po jų pridėjimo
        //Pakeitem, kad questionClickListener butu priskirta prie visu mygtuku
        button.addEventListener("click", questionClickListener);
    });
}

// Naujas kintamasis, kuris seks, ar vartotojas jau spaudė pirmą kartą
let mobileBtnFirstClick = false;
let isMobileHelpActive = false;

function enableMobileHelpAfterReward() {
    console.log("enableMobileHelpAfterReward() called from Android");
    overlayContainer.style.display = "none";
    // Čia dabar įjungsime mobileBtn, nes reward reklama baigėsi.
    //mobileBtn.disabled = false; // Įjungiam mygtuką
    mobileBtn.classList.remove("disabled"); // pašalina disabled klasę
    const mobileIconElement = mobileBtn.querySelector("i") || mobileIcon;
//    if (mobileIconElement) {
//        mobileIconElement.style.color = "aqua";
//    }
    isMobileHelpActive = false;
    mobileBtnFirstClick = false; // kad paspaudus is naujo veiktų
   isMobileBtnProcessing = false;
}

//Ši funkcija iškviečia Android kodą, kad būtų parodyta reward reklama.
//if (typeof Android !== "undefined") {
//                    console.log("Start button clicked");
//                           showRewardAd();
//                        }


mobileBtn.addEventListener("click", async (event) => {
if (isMobileBtnProcessing) {
        console.log("Mobile button is currently processing a previous click. Ignoring.");
        return; // Išeiname, jei ankstesnis paspaudimas dar nebaigtas
    }
    // 2. Nustatome flag'ą, kad šis paspaudimas pradėtas apdoroti
    isMobileBtnProcessing = true;
    try{
    console.log("mobileBtn.addEventListener");
    console.log("mobileBtnFirstClick", mobileBtnFirstClick);
    await playOtherSounds("press"); // Groja "press" garsą
    // Patikrinu ar paspaudimas buvo ant ikonos
    const isIconClicked = event.target.closest("#mobile-icon");
//    console.log("isIconClicked", isIconClicked);
    if (!mobileBtnFirstClick && isMobileHelpActive === false) {
//        console.log("Pirmas paspaudimas");
        // Pirmas paspaudimas
        mobileIconPopup(); // Rodomas mobilus popup
        //  mobileBtn.disabled = true; // nebenaudosim disabled
        isMobileHelpActive = true;
        mobileBtnFirstClick = true; // Nustatom, kad mygtukas jau paspaustas pirmą kartą
    } else {
//        console.log("Antras paspaudimas");
        // Antras paspaudimas (mygtukas jau buvo paspaustas)
        if (isMobileHelpActive === true && mobileBtnFirstClick === true) {
//            console.log("mygtukas deaktyvuotas");
//            await playSound("notActiveSound"); // Groja "notActiveSound"
            showRewardPopupDiv(); // Keičiame showMobileRewardPopup į showRewardPopupDiv
        } else {
            console.log("button is active");
            isMobileBtnProcessing = false;
        }
    }
    }catch (error) {
    console.error("Error during mobileBtn click processing:", error);
            isMobileBtnProcessing = false;
    }
});


boltBtn.addEventListener("click", async function () {
if (isBoltBtnProcessing || boltBtn.disabled) {
        if (isBoltBtnProcessing) {
            console.log("%cBolt button is currently processing. Click ignored.", "color: orange;");
        }
        return;
    }

    isBoltBtnProcessing = true;
    try{
    await playOtherSounds("press");
    selectTwoIncorrectBtnsWithHelp(); // Po garso aktyvuojame funkciją

    // Disable the help button after it has been clicked
    boltBtn.disabled = true;

    const boltIcon = boltBtn.querySelector('i');
    boltIcon.style.color = '#ccc';
    }catch (error) {
    console.error("Error during boltBtn click processing:", error);
            if (!boltBtn.disabled) {
                        isBoltBtnProcessing = false;
                        console.log("%cisBoltBtnProcessing set to FALSE due to error before disable", "color: green;");
                    }
    }
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

//let answerButtonsList = [];

//function cacheAnswerButtons() {
//  answerButtonsList = [...answerButtons.querySelectorAll("button")];
//}
//
//// Funkcija išjungti mygtukus
//function disableButtons() {
//  answerButtonsList.forEach((button) => {
//    button.disabled = true;
////    button.addEventListener("click", async()=>{
////    await playSound("notActiveSound")});
//  });
//}
//
//// Funkcija įjungti mygtukus
//function enableButtons() {
//  answerButtonsList.forEach((button) => {
//    button.disabled = false;
////    button.removeEventListener("click", ()=>{
////    playSound("notActiveSound")});
//  });
//}

// Parodo, kuris atsakymas yra teisingas
//function showCorrectAnswer(answer) {
//  answerButtonsList.forEach((button) => {
//    if (button.textContent === answer) {
//      button.style.background = "#ADFF2F";
//    }
//  });
//}


function updateScoreTable(isCorrect) {
//  const scoreContainer = document.getElementById("score");
        console.log("updateScoreTable called with:", { isCorrect });
  const earnedPoints = points[currentQuestionIndex];
  answerStatuses[currentQuestionIndex] = isCorrect;

  // Išvalom prieš tai buvusią kortelę (jeigu reikia)
  scoreTable.innerHTML = "";
  starContainer.innerHTML = "";
createStars();
//starContainer.style.display = "block";
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

  const reactionImg = document.createElement("img");
    reactionImg.src = isCorrect ? "images/owlcoin.png" : "images/owlsad.png";
    reactionImg.alt = isCorrect ? "Correct answer" : "Incorrect answer";
    reactionImg.classList.add("owl-reaction-img");
    reactionImg.style.display = "block";


  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardWrapper.appendChild(cardInner);
  scoreTable.appendChild(reactionImg);
  scoreTable.appendChild(cardWrapper);


  // Animacija: pirmiau keičiam spalvą
  setTimeout(() => {
    cardFront.style.backgroundColor = isCorrect ? "#58D68D" : "#EC7063";
  }, 400);

  // Tada po dar truputį vėliau apsuka
  setTimeout(() => {
    cardInner.classList.add("flipped");
  }, 500);
}

function createStars() {
starContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) { // Sukuriame 50 žvaigždžių
    const stars = document.createElement("div");
    stars.classList.add("star");

    // Atsitiktinė pozicija žvaigždės ekrane
    stars.style.left = Math.random() * window.innerWidth + "px";
    stars.style.top = Math.random() * window.innerHeight + "px";

    // Atsitiktinis dydis žvaigždei
    const size = Math.random() * 3 + 1; // Atsitiktinis dydis nuo 1px iki 4px
    stars.style.width = size + "px";
    stars.style.height = size + "px";

    // Pridedame žvaigždę į konteinerį
    starContainer.appendChild(stars);
}
}
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

 // ==================== FUNKCIJA ATVAIZDUOJANTI FINISHED CONTAINER ====================
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
starContainer.style.display = "none";
  scoreTable.style.display = "none";
  pointsContainer.style.display = "none";

const formattedTotalPoints = totalPoints.toLocaleString('lt-LT');

  // Atvaizduojame rezultatą
  finishedContainer.innerHTML = `
  <img src="images/owlfinished.png" alt="owlFinished" class="owl-finished">
    <h2>Quiz Finished!</h2>
    <p>You answered <strong>${score}</strong> out of <strong>${selectedQuestions.length}</strong> correctly.</p>
    <p>Round points: <strong>${formattedTotalPoints}</strong></p>
    <button id="again-btn">Reset</button>
    <button id="return-btn">Start new game</button>
  `;
  bubbleContainer.style.display = "block";
  createBubble();

  // Pridedame event listener'ius naujai sugeneruotiems mygtukams
  document.getElementById("again-btn").addEventListener("click", async () => {
    await playSound("press");
    if (typeof Android !== "undefined") {
                console.log("Reset button clicked - attempting to show interstitial ad");

                // Uždenkam viską prieš reklamą
                overlayContainer.style.display = "block";
                finishedContainer.style.display = "none"; // Slėpti turinį, kol reklama vyksta
                bubbleContainer.style.display = "none"; // Slėpti burbulus

                // Funkcija, kuri bus iškviesta iš Android, kai reklama užsidarys
                window.nextContainer = () => {
                    requestAnimationFrame(async () => {
                        console.log("Interstitial ad dismissed - continuing Reset action");
                        // Tęsiame "Reset" veiksmus
                        stopLoopSound(); // Sustabdome loop garsą
                        updateUserPointsDisplay();
                        questionElement.innerHTML = "";
                        answerButtons.innerHTML = "";
//                        document.querySelector(".points-value").value = "";
                        scoreTable.style.display = "none"; // Paslepiame rezultatų lentelę
                        // bubbleContainer.style.display = "none"; // Jau paslėpta viršuje
                        quizContainer.style.display = "block"; // Rodyti viktorinos konteinerį

                        // Paskutinis asinhroninis veiksmas gauti klausimus ir pradėti viktoriną
                         const newQuestions = await getValidQuestions(currentTheme, selectedLevel);
                              if (!newQuestions) {
                               showModal("Failed to retrieve questions. Please try again.");
                               overlayContainer.style.display = "none"; // Atskleidziame, net jei nepavyko
                               return;
                             }
                             startQuiz(currentTheme, selectedLevel, newQuestions);
                             overlayContainer.style.display = "none"; // Atskleidziame, kai quizas pradedamas
                         });
                };
                showInterstitial();


            } else {
                // Ne Android aplinkoje – tęsiame be reklamos
                console.log("Not in Android environment - continuing Reset action without ad");
                stopLoopSound();
        updateUserPointsDisplay();

        questionElement.innerHTML = "";
            answerButtons.innerHTML = "";
//            document.querySelector(".points-value").value = "";

    finishedContainer.style.display = "none";
    scoreTable.style.display = "none";
    bubbleContainer.style.display = "none";
    quizContainer.style.display = "block";
     const newQuestions = await getValidQuestions(currentTheme, selectedLevel);
     if (!newQuestions) {
       showModal("Failed to retrieve questions. Please try again.");
       return;
     }
     startQuiz(currentTheme, selectedLevel, newQuestions);
     }
  });

  document.getElementById("return-btn").addEventListener("click", async () => {
          await playSound("press");


          if (typeof Android !== "undefined") {
              console.log("Start new game button clicked - attempting to show interstitial ad");


              overlayContainer.style.display = "block";
              finishedContainer.style.display = "none";
              bubbleContainer.style.display = "none";

              window.nextContainer = () => {
                  requestAnimationFrame(() => {
                       console.log("Interstitial ad dismissed - continuing Start new game action");
                       playLoopSound();
                       updateUserPointsDisplay();
                       finishedContainer.style.display = "none";
                       themeContainer.style.display = "none";
                       pointsContainer.style.display = "block";
                       quizContainer.style.display = "none";
                       scoreTable.style.display = "none";
                       bubbleContainer.style.display = "none";
                       showLevels();
                       overlayContainer.style.display = "none";
                  });
              };
              showInterstitial();

          } else {
              console.log("Not in Android environment - continuing Start new game action without ad");
              playLoopSound();
              updateUserPointsDisplay();
              finishedContainer.style.display = "none";
              themeContainer.style.display = "none";
              pointsContainer.style.display = "block";
              quizContainer.style.display = "none";
              scoreTable.style.display = "none";
              bubbleContainer.style.display = "none";
              showLevels();
          }
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
  lifetimePointsDisplay.innerHTML = `<strong>Total points:</strong> ${newTotal.toLocaleString('lt-LT')}`;
  finishedContainer.appendChild(lifetimePointsDisplay);

}


//isvalyti loclastorage
//localStorage.removeItem("totalPoints");
