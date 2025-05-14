

const allThemes = [
  { name: "Books", color: "Turquoise", id: "10"},
  { name: "Movies and TV Shows", color: "MediumSpringGreen", id: "11" },
  { name: "Music", color: "tomato", id: "12" },
  { name: "Musicals & Theatres", color: "LightBlue", id: "13" },
  { name: "Video Games", color: "orange",id: "15"  },
  { name: "Board Games", color: "Magenta", id: "16" },
  { name: "Science & Nature", color: "DeepPink", id: "17" },
  { name: "IT and Programming", color: "aquamarine", id: "18" },//Computers
  { name: "Mathematics", color: "Yellow",id: "19"},
  { name: "Mythology", color: "violet", id: "20" },
  { name: "Sports", color: "DodgerBlue", id: "21" },
  { name: "Geography", color: "Aqua", id: "22" },
  { name: "History", color: "gold", id: "23" },
  { name: "Politics and World Leaders", color: "LightSalmon", id: "24"},
  { name: "Art", color: "Fuchsia", id: "25" },
  { name: "Pop Culture and Celebrities", color: "Coral", id: "26" },//Celebrities
{ name: "Animals", color: "DarkGoldenRod",id: "27" },
{ name: "Vehicles", color: "MediumPurple",id: "28" },
{ name: " Comics", color: "DeepSkyBlue",id: "29" },
{ name: "Gadgets", color: "Plum",id: "30" },
{ name: "Japanese Anime & Manga", color: "Teal",id: "31" },
{ name: "Cartoon & Animations", color: "OrangeRed",id: "32" },
];

const quizLevels = {
  easy: { title: "Easy", color: "MediumSpringGreen", themes: allThemes },
  medium: { title: "Medium", color: "DodgerBlue", themes: allThemes },
  hard: { title: "Hard", color: "tomato",  themes: allThemes }
};


const correctMessages = [
        "Congratulations! Your winning points:",
        "Correct! Your winning points:",
        "That's right! Your winning points:",
        "You are correct! Your winning points:",
        "Well done! Your winning points:",
        "Awesome! You got it! Your winning points:",
        "Great job! You're right! Your winning points:",
        "You nailed it! Your winning points:",
        "Perfect! You got it right! Your winning points:",
        "Fantastic! You are right! Your winning points:",
        "Yes! You're a winner! Your winning points:",
        "Boom! You smashed it! Your winning points:",
        "You rock! That's the right answer! Your winning points:",
        "Winner! You got it! Your winning points:",
         "Super! You answered correctly! Your winning points:",
         "Bullseye! Correct answer! Your winning points:",
        "You got it! Correct! Your winning points:"
    ];
    const incorrectMessages = [
        "Sorry, that's not correct. Your lost points:",
        "Not quite right. Your lost points:",
        "That wasn't the right answer. Your lost points:",
        "Oops, not this time. Your lost points:",
         "Almost there, but not quite. Lost points:",
        "Nope, that's wrong. Your lost points:",
        "That's incorrect. Your lost points:",
        "Wrong answer! Your lost points:",
        "Incorrect! Your lost points:",
        "False! Your lost points:",
        "Bummer! That was incorrect. Your lost points:",
        "Missed it! That's wrong. Your lost points:",
        "Try again next time! Your lost points:",
        "Strike! Wrong answer! Your lost points:",
         "Not this time. Wrong answer. Your lost points:"
    ];