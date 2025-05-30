
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
  if (answerButtons) {
    answerButtonsList = [...answerButtons.querySelectorAll("button")];
  } else {
//    console.error("answerButtons DOM element not found when trying to cache.");
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
        overlayContainer.style.display = "block";
        startContainer.style.display = "none";
        window.nextContainer = () => {
            requestAnimationFrame(() => {
                playLoopSound();
                rulesContainer.style.display = "block";
                overlayContainer.style.display = "none";
            });
        };

        showInterstitial();
    } else {
        overlayContainer.style.display = "none";
        startContainer.style.display = "none";
        rulesContainer.style.display = "block";
        playLoopSound();
    }
});

backBtn.addEventListener("click", async () => {
  await playOtherSounds("press");
  backBtnPopup();
});

document.addEventListener("DOMContentLoaded", function () {
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

function showLevels() {
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

    if (levelKey === "easy") {
      button.disabled = false;
    }
    else if (levelKey === "medium") {
      if (savedPoints < 3000) {
        button.disabled = true;
        button.textContent = `${level.title} 🔒 (Unlock at 3000 points)`;
      } else {
        button.disabled = false;
        button.classList.add("unlock-animated");
      }
    }
    else if (levelKey === "hard") {
      if (savedPoints < 5000) {
        button.disabled = true;
        button.textContent = `${level.title} 🔒 (Unlock at 5000 points)`;
      } else {
        button.disabled = false;
        button.classList.add("unlock-animated");
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


function getQuestionsFromAndroid(categoryId, difficulty) {
    return new Promise((resolve) => {
        window.questionCallback = function (dataString) {
            if (dataString) {
                try {
                    const data = JSON.parse(dataString);
                    resolve(data.results || []);
                } catch (e) {
//                    console.error("JSON parsing error:", e);
                    resolve([]);
                }
            } else {
                resolve([]);
            }
        };

        Android.getQuestionsFromAPI(categoryId, difficulty, "questionCallback");
    });
}

async function getValidQuestions(themeName, level) {
            let selectedThemeObject = allThemes.find((theme) => theme.name === themeName);
            if (!selectedThemeObject || !selectedThemeObject.id) {
//                console.error("[JS] Category ID not found for theme:", themeName);
                showModal("Internal error: Theme category not found.");
                return null;
            }
            const categoryId = selectedThemeObject.id;
            try {
                const questions = await getQuestionsFromAndroid(categoryId.toString(), level);
                if (questions && questions.length > 0) {
                    return questions;
                }
//                console.warn("[JS] No questions received or empty array from Android.");
                return null;
            } catch (error) {
//                console.error("[JS] Error in getValidQuestions (calling getQuestionsFromAndroid):", error);
                return null;
            }
        }


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function decodeHtmlEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

async function getThemes() {
    loaderAtribute.style.display = "block";
    pointsContainer.style.display = "none";
    rulesContainer.style.display = "none";
    themeContainer.style.display = "none";
    startContainer.style.display = "none";
    finishedContainer.style.display = "none";
    scoreTable.style.display = "none";

    try {
        await new Promise(resolve => setTimeout(resolve, 5000));

            if (!selectedLevel) {
              throw new Error("No level selected");
            }
            if (!quizLevels[selectedLevel] || !quizLevels[selectedLevel].themes) {
              throw new Error(`No themes available for level: ${selectedLevel}`);
            }

        loaderAtribute.style.display = "none";
        pointsContainer.style.display = "block";
        themeContainer.style.display = "block";
        stopQuizSound();
        playLoopSound();

        themeSelector.innerHTML = "";

let isThemeLoading = false;

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

            firstSpan.style.setProperty("--theme-color", theme.color);
            secondSpan.style.setProperty("--theme-color", theme.color);
            newSpan.style.setProperty("--theme-color", theme.color);

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

startQuiz(theme.name, selectedLevel,questions);

                overlayContainer.style.display = "none";
                isThemeLoading = false;
                }
            });

            themeSelector.appendChild(button);
        });

    } catch (error) {
//              console.error("Error fetching themes:", error);
                  showModal("Failed to load themes, please try logging in again.");
                  document.getElementById("modal-close").onclick = function() {
                              stopGame();
                          };
}
}

function stopGame() {
    startContainer.style.display = "none";
    rulesContainer.style.display = "none";
    levelContainer.style.display = "none";
    themeContainer.style.display = "none";
    finishedContainer.style.display = "none";
scoreTable.style.display = "none";
    if (typeof Android !== "undefined") {
            Android.stopGame();
        }
}

let themeColor = "";

async function startQuiz(themeName, level, questions) {
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
  mobileBtn.disabled = false;
  mobileBtn.classList.remove("disabled");
  mobileIcon.disabled = false;

  boltBtn.disabled  = false;
  const boltIcon = boltBtn.querySelector('i');
  boltIcon.style.color = 'aqua';
  isBoltBtnProcessing = false;
  playQuizSound();
  quizContainer.style.display = "block";
  starContainer.style.display = "none";

}catch (error) {
//         console.error(error.message);
         showModal(error.message);
     } finally {
         loaderAtribute.style.display = "none";
     }
 }

function showQuestion() {
    if (selectedQuestions.length === 0) {
//        console.error("There are no questions for this theme.");
        window.Android.showNativeDialog("There are no questions for this theme. Returning you to the theme list.");
        themeContainer.style.display = "block";
        quizContainer.style.display = "none";
        return;
    }

    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    let fullText = `${questionNo}. ${currentQuestion.question}`;
    let i = 0;

    setTimeout(disableButtons, 0);
    questionElement.innerHTML = "";

    cacheAnswerButtons();
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

    function playSoundBasedOn(isCorrect) {
        if (isCorrect) {
            playOtherSounds("correct");
        } else {
            playOtherSounds("incorrect");
        }
    }

   const questionClickListener = async function () {
        disableButtons();

        const correctAnswer = currentQuestion.answer;
        let isCorrect = this.textContent === correctAnswer;

        playSoundBasedOn(isCorrect);

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
        cacheAnswerButtons();
        button.addEventListener("click", questionClickListener);
    });
}

let mobileBtnFirstClick = false;
let isMobileHelpActive = false;

function enableMobileHelpAfterReward() {
    overlayContainer.style.display = "none";
    mobileBtn.classList.remove("disabled");
    const mobileIconElement = mobileBtn.querySelector("i") || mobileIcon;
    isMobileHelpActive = false;
    mobileBtnFirstClick = false;
   isMobileBtnProcessing = false;

   const popup = document.getElementById("reward-popup-container");
       if (popup) popup.remove(); // uždaro modalą po sėkmingos reklamos
}

mobileBtn.addEventListener("click", async (event) => {
if (isMobileBtnProcessing) {
        return;
    }
    isMobileBtnProcessing = true;
    try{
    await playOtherSounds("press");
    const isIconClicked = event.target.closest("#mobile-icon");
    if (!mobileBtnFirstClick && isMobileHelpActive === false) {
        mobileIconPopup();
        isMobileHelpActive = true;
        mobileBtnFirstClick = true;
    } else {
        if (isMobileHelpActive === true && mobileBtnFirstClick === true) {
            showRewardPopupDiv();
        } else {
            isMobileBtnProcessing = false;
        }
    }
    }catch (error) {
//    console.error("Error during mobileBtn click processing:", error);
            isMobileBtnProcessing = false;
    }
});
boltBtn.addEventListener("click", async function () {
if (isBoltBtnProcessing || boltBtn.disabled) {
        if (isBoltBtnProcessing) {
        }
        return;
    }

    isBoltBtnProcessing = true;
    try{
    await playOtherSounds("press");
    selectTwoIncorrectBtnsWithHelp();

    boltBtn.disabled = true;

    const boltIcon = boltBtn.querySelector('i');
    boltIcon.style.color = '#ccc';
    }catch (error) {
//    console.error("Error during boltBtn click processing:", error);
            if (!boltBtn.disabled) {
                        isBoltBtnProcessing = false;
                    }
    }
});

boltIcon.addEventListener("click", async () => {
if(boltBtn.disabled){
await playOtherSounds("notActiveSound");
}
});

function selectTwoIncorrectBtnsWithHelp(){
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const allAnswers = currentQuestion.options;
  const correctAnswer = currentQuestion.answer;

  const incorrectAnswers = [];

  allAnswers.forEach(allAnswer => {
    if (allAnswer !== correctAnswer) {
      incorrectAnswers.push(allAnswer);
    }
  });

if (incorrectAnswers.length > 0) {
  const twoIncorrectAnswers = getRandomAnswers(incorrectAnswers, 2);
  twoIncorrectAnswers.forEach(answer => {
    const button = [...answerButtons.querySelectorAll("button")].find(btn => btn.textContent === answer);
    if (button) {
      button.style.background = "grey";
      button.disabled = true;
    }
  });
} else {
  return;
}
}

function getRandomAnswers(incorrectAnswers, count) {
  return incorrectAnswers.sort(() => Math.random() - 0.5).slice(0, count);
}

function updateScoreTable(isCorrect) {
  const earnedPoints = points[currentQuestionIndex];
  answerStatuses[currentQuestionIndex] = isCorrect;

  scoreTable.innerHTML = "";
  starContainer.innerHTML = "";
createStars();
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("answer-card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.style.backgroundColor = "#5DADE2";

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.style.backgroundColor = isCorrect ? "#58D68D" : "#EC7063";

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

  setTimeout(() => {
    cardFront.style.backgroundColor = isCorrect ? "#58D68D" : "#EC7063";
  }, 400);

  setTimeout(() => {
    cardInner.classList.add("flipped");
  }, 500);
}

function createStars() {
starContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const stars = document.createElement("div");
    stars.classList.add("star");

    stars.style.left = Math.random() * window.innerWidth + "px";
    stars.style.top = Math.random() * window.innerHeight + "px";

    const size = Math.random() * 3 + 1;
    stars.style.width = size + "px";
    stars.style.height = size + "px";

    starContainer.appendChild(stars);
}
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  bubble.style.left = Math.random() * window.innerWidth + "px";

  const size = Math.random() * 100 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  bubbleContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

setInterval(createBubble, 300);

function showResults() {
stopQuizSound();
 if (typeof Android !== "undefined") {
    Android.playLoopSound();
  }
  let totalPoints = 0;

  for (let i = 0; i < selectedQuestions.length; i++) {
      if (answerStatuses[i]) {
        totalPoints += points[i];
      }
    }
starContainer.style.display = "none";
  scoreTable.style.display = "none";
  pointsContainer.style.display = "none";

const formattedTotalPoints = totalPoints.toLocaleString('lt-LT');

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

  document.getElementById("again-btn").addEventListener("click", async () => {
    await playSound("press");
    if (typeof Android !== "undefined") {

                overlayContainer.style.display = "block";
                finishedContainer.style.display = "none";
                bubbleContainer.style.display = "none";

                window.nextContainer = () => {
                    requestAnimationFrame(async () => {
                        stopLoopSound();
                        updateUserPointsDisplay();
                        questionElement.innerHTML = "";
                        answerButtons.innerHTML = "";
                        scoreTable.style.display = "none";
                        quizContainer.style.display = "block";

                         const newQuestions = await getValidQuestions(currentTheme, selectedLevel);
                              if (!newQuestions) {
                               showModal("Failed to retrieve questions. Please try again.");
                               overlayContainer.style.display = "none";
                               return;
                             }
                             startQuiz(currentTheme, selectedLevel, newQuestions);
                             overlayContainer.style.display = "none";
                         });
                };
                showInterstitial();


            } else {
                stopLoopSound();
        updateUserPointsDisplay();
        questionElement.innerHTML = "";
            answerButtons.innerHTML = "";
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
              overlayContainer.style.display = "block";
              finishedContainer.style.display = "none";
              bubbleContainer.style.display = "none";

              window.nextContainer = () => {
                  requestAnimationFrame(() => {
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
  const lifetimePointsDisplay = document.createElement("p");
  lifetimePointsDisplay.innerHTML = `<strong>Total points:</strong> ${newTotal.toLocaleString('lt-LT')}`;
  finishedContainer.appendChild(lifetimePointsDisplay);

}


//isvalyti loclastorage
//localStorage.removeItem("totalPoints");
