
const themes = [
  { name: "Geography", color: "Aqua" },
  { name: "Movies and TV Shows", color: "MediumSpringGreen" },
  { name: "Music", color: "tomato" },
  { name: "Science and Technology", color: "DeepPink" },
  { name: "History", color: "gold" },
  { name: "Sports", color: "DodgerBlue" },
  { name: "Nature and Animals", color: "orange" },
  { name: "IT and Programming", color: "aquamarine" },
  { name: "Mythology and Legends", color: "violet" },
  { name: "Pop Culture and Celebrities", color: "Coral" },
  { name: "Literature", color: "Turquoise" }, // Pakeista iš Coral
    { name: "Art", color: "Fuchsia" }, // Pakeista iš Coral
    { name: "World Capitals", color: "LightBlue" }, // Pakeista iš Coral
    { name: "Space and Astronomy", color: "DeepSkyBlue" }, // Pakeista iš Coral
    { name: "Languages", color: "DarkGoldenRod" }, // Pakeista iš Coral
    { name: "Food and Cuisine", color: "Magenta" }, // Pakeista iš Coral
    { name: "Fashion", color: "Yellow" }, // Pakeista iš Coral
    { name: "Famous Landmarks", color: "MediumPurple" }, // Pakeista iš Coral
    { name: "Travel and Tourism", color: "OrangeRed" }, // Pakeista iš Coral
    { name: "Health and Fitness", color: "Teal" }, // Pakeista iš Coral
    { name: "Politics and World Leaders", color: "LightSalmon" }, // Pakeista iš Coral
    { name: "Finance and Economics", color: "Plum" },

];


const geography = [
  {
    question: "What is the largest country in the world by area?",
    options: ["USA", "Canada", "Russia", "China"],
    answer: "Russia",
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Kanchenjunga", "Makalu", "Everest"],
    answer: "Everest",
  },
  {
    question: "Which country has the longest coastline?",
    options: ["Australia", "Indonesia", "Canada", "Russia"],
    answer: "Canada",
  },
  {
    question: "What is the largest island in the world?",
    options: ["Australia", "Greenland", "Borneo", "Madagascar"],
    answer: "Greenland",
  },
  {
    question: "What is the largest lake in the world by area?",
    options: ["Caspian Sea", "Superior", "Victoria", "Baikal"],
    answer: "Caspian Sea",
  },
  {
    question: "Which city is considered the world's financial capital?",
    options: ["Tokyo", "London", "New York", "Hong Kong"],
    answer: "New York",
  },
  {
    question: "Which continent is the least populated?",
    options: ["Africa", "Antarctica", "Europe", "Australia"],
    answer: "Antarctica",
  },
  {
    question: "Which country has the largest population?",
    options: ["USA", "India", "China", "Indonesia"],
    answer: "India",
  },
  {
    question: "What is the deepest point on Earth in the ocean?",
    options: ["Puerto Rico Trench", "Mariana Trench", "Java Trench", "Philippine Trench"],
    answer: "Mariana Trench",
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Gobi", "Sahara", "Arabian", "Antarctica"],
    answer: "Antarctica",
  },
  {
    question: "Which country is known as the 'Land of a Thousand Lakes'?",
    options: ["Sweden", "Finland", "Norway", "Canada"],
    answer: "Finland",
  },
  {
    question: "What is the largest canyon in the world?",
    options: ["Colorado", "Verdon", "Fish River", "Capertee"],
    answer: "Colorado",
  },
  {
    question: "Which capital is the highest above sea level?",
    options: ["Lhasa", "Other", "Bogotá", "La Paz"],
    answer: "La Paz",
  },
  {
    question: "What is the largest coral reef in the world?",
    options: ["New Caledonian Barrier Reef", "Great Barrier Reef", "Belize Barrier Reef", "Tubbataha Reefs"],
    answer: "Great Barrier Reef",
  },
  {
      question: "Which country has the highest number of time zones, including overseas territories?",
      options: ["France", "Russia", "USA", "UK"],
      answer: "France",
    },
    {
      question: "What is the most remote inhabited island in the world?",
      options: ["Pitcairn Island", "Tristan da Cunha", "Easter Island", "Saint Helena"],
      answer: "Tristan da Cunha",
    },
    {
      question: "Which desert is the oldest in the world?",
      options: ["Kalahari", "Sahara", "Namib", "Gobi"],
      answer: "Namib",
    },
  {
    question: "Which country is divided into two parts by the Bering Strait?",
    options: ["Canada and USA", "Russia and USA", "Japan and Russia", "Greenland and Canada"],
    answer: "Russia and USA",
  },
  {
      question: "Which is the only sea with no coastline?",
      options: ["Red Sea", "Baltic Sea", "Sargasso Sea", "Arabian Sea"],
      answer: "Sargasso Sea",
    },
    {
      question: "Which country has the most volcanoes?",
      options: ["Japan", "USA", "Indonesia", "Russia"],
      answer: "Indonesia",
    },
    {
      question: "Which city is geographically closest to the equator?",
      options: ["Quito", "Kampala", "Singapore", "Jakarta"],
      answer: "Quito",
    },
    {
      question: "Which river flows through the most countries?",
      options: [ "Amazon", "Nile", "Mekong", "Danube"],
      answer: "Danube",
    },
    {
      question: "What is the largest enclosed inland body of water by volume?",
      options: ["Caspian Sea", "Lake Baikal", "Lake Tanganyika", "Lake Superior"],
      answer: "Lake Baikal",
    },
    {
      question: "Which continent has the most countries?",
      options: ["Asia", "Africa", "Europe", "South America"],
      answer: "Africa",
    },
    {
      question: "Which mountain range contains the greatest number of high peaks (over 7,000 meters)?",
      options: ["Andes", "Himalayas", "Tian Shan", "Karakoram"],
      answer: "Himalayas",
    },
  {
    question: "What is the longest river in Europe?",
    options: ["Dnieper", "Danube", "Volga", "Rhine"],
    answer: "Volga",
  },
  {
    question: "Which country is known for its fjords?",
    options: ["Iceland", "Norway", "Sweden", "Greenland"],
    answer: "Norway",
  },
  {
    question: "Which country is famous for its geysers?",
    options: ["Iceland", "Canada", "Scotland", "Switzerland"],
    answer: "Iceland",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Malta", "Vatican", "San Marino"],
    answer: "Vatican",
  },
  {
    question: "Which sea is the largest by area?",
    options: ["Mediterranean Sea", "Caribbean Sea", "South China Sea", "Bering Sea"],
    answer: "South China Sea",
  },
  {
    question: "Which country shares borders with the most other countries?",
    options: ["Russia", "China", "Brazil", "India"],
    answer: "China",
  },
  {
    question: "Which desert is considered the driest in the world?",
    options: ["Sahara", "Atacama", "Gobi", "Arabian"],
    answer: "Atacama",
  },
  {
    question: "What is the largest volcano in the world?",
    options: ["Mauna Loa", "Vesuvius", "Krakatoa", "Etna"],
    answer: "Mauna Loa",
  },
  {
    question: "What is the largest forest in the world?",
    options: ["Congo", "Taiga", "Amazon", "Valdivian"],
    answer: "Amazon",
  },
  {
    question: "Which country is known as the largest by the number of islands?",
    options: ["Philippines", "Japan", "Canada", "Indonesia"],
    answer: "Indonesia",
  },
  {
    question: "Which country is known as the 'Maple Leaf Country'?",
    options: [ "USA", "Canada", "Australia", "New Zealand"],
    answer: "Canada",
  },
  {
    question: "What is the deepest river in the world?",
    options: ["Amazon", "Congo", "Nile", "Yangtze"],
    answer: "Congo",
  },
  {
    question: "What is the largest canal in the world?",
    options: ["Panama", "Suez", "Kiel", "Corinth"],
    answer: "Suez",
  },
  {
    question: "What is the longest railway line in the world?",
    options: ["Trans-Canada", "Australian Transcontinental", "Indian Railway Line", "Trans-Siberian"],
    answer: "Trans-Siberian",
  },
  {
    question: "In which city is the Eiffel Tower?",
    options: ["Rome", "London", "Paris", "Berlin"],
    answer: "Paris",
  },
  {
    question: "What is the largest continent by area?",
    options: ["Africa", "Asia", "North America", "South America"],
    answer: "Asia",
  },
  {
    question: "What is the most populous country in Africa?",
    options: ["Egypt", "Ethiopia", "Nigeria", "Democratic Republic of the Congo"],
    answer: "Nigeria",
  },
  {
    question: "What is the highest peak in North America?",
    options: ["McKinley", "Logan", "Elbert", "Whitney"],
    answer: "McKinley",
  },
  {
    question: "Which city is known as the 'City of Seven Hills'?",
    options: ["Athens", "Rome", "Lisbon", "Istanbul"],
    answer: "Rome",
  },
  {
    question: "What is the largest country in South America?",
    options: ["Argentina", "Brazil", "Colombia", "Peru"],
    answer: "Brazil",
  },
  {
    question: "Which country is known for its tulip fields?",
    options: ["Belgium", "Netherlands", "Denmark", "France"],
    answer: "Netherlands",
  },
  {
    question: "Where is the Grand Canyon?",
    options: ["Australia", "USA", "Canada", "Mexico"],
    answer: "USA",
  },
  {
    question: "Which country shares a border with Italy?",
    options: ["Greece", "Spain", "France", "Turkey"],
    answer: "France",
  },
  {
    question: "Which capital city is the southernmost in the world?",
    options: ["Cape Town", "Canberra", "Wellington", "Buenos Aires"],
    answer: "Wellington",
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "What is the largest country by area in Central America?",
    options: ["Costa Rica", "Panama", "Nicaragua", "Guatemala"],
    answer: "Nicaragua",
  },
  {
    question: "Which country is known for its 'Mount Kilimanjaro'?",
    options: ["Kenya", "Egypt", "Tanzania", "Ethiopia"],
    answer: "Tanzania",
  },
  {
    question: "What is the most populous city in Europe?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "London",
  },
  {
    question: "What is the largest Arctic archipelago?",
    options: ["New Siberian Islands", "Spitsbergen", "Greenland", "Canadian Arctic Archipelago"],
    answer: "Canadian Arctic Archipelago",
  },
  {
    question: "Which country is known for its 'Scottish Highlands'?",
    options: ["Wales", "Ireland", "Scotland", "England"],
    answer: "Scotland",
  },
  {
    question: "Which country is known as the 'Island of Freedom'?",
    options: ["Dominican Republic", "Cuba", "Haiti", "Jamaica"],
    answer: "Cuba",
  },
  {
    question: "Which country is most famous for its pyramids?",
    options: ["Greece", "Egypt", "Italy", "Peru"],
    answer: "Egypt",
  },
  {
    question: "Which city is known as the 'Eternal City'?",
    options: ["Athens", "Rome", "Jerusalem", "Istanbul"],
    answer: "Rome",
  },
  {
      question: "Which unrecognized country has its own government, currency, and military, but is considered part of Moldova by most of the world?",
      options: ["Transnistria", "Nagorno-Karabakh", "Abkhazia", "South Ossetia"],
      answer: "Transnistria",
    },
    {
      question: "What is the only country in the world without an official capital city?",
      options: ["Tuvalu", "Vatican City", "Nauru", "San Marino"],
      answer: "Nauru",
    },
    {
      question: "Which country has the highest lowest point in the world (i.e., the highest minimum elevation)?",
      options: ["Nepal", "Bhutan", "Lesotho", "Switzerland"],
      answer: "Lesotho",
    },
    {
      question: "What is the only landlocked country in Southeast Asia?",
      options: ["Laos", "Thailand", "Cambodia", "Myanmar"],
      answer: "Laos",
    },
    {
      question: "Which is the northernmost permanently inhabited place on Earth?",
      options: ["Barrow, Alaska", "Longyearbyen, Norway", "Alert, Canada", "Qaanaaq, Greenland"],
      answer: "Alert, Canada",
    },
    {
      question: "Which country has the most official languages?",
      options: ["India", "South Africa", "Zimbabwe", "Switzerland"],
      answer: "Zimbabwe",
    },
    {
      question: "Which country's territory is entirely within another country?",
      options: ["San Marino", "Vatican City", "Lesotho", "All of them"],
      answer: "All of them",
    },
    {
      question: "Which country has coastlines on both the Atlantic and Indian Oceans?",
      options: ["Namibia", "South Africa", "Angola", "Mozambique"],
      answer: "South Africa",
    },
    {
      question: "What is the name of the region between Egypt and Sudan that is claimed by neither country?",
      options: ["Bir Tawil", "Hala'ib Triangle", "Sinai Peninsula", "Darfur"],
      answer: "Bir Tawil",
    },
    {
      question: "Which is the flattest country in the world, by average elevation?",
      options: ["Netherlands", "Denmark", "Maldives", "Qatar"],
      answer: "Maldives",
    },
  {
    question: "In which city is the Statue of Liberty?",
    options: ["London", "Paris", "New York", "Washington D.C."],
    answer: "New York",
  },
];

const movies = [
      {
        question: "Who directed the movie 'Titanic'?",
        options: ["Steven Spielberg", "James Cameron", "Quentin Tarantino", "Martin Scorsese"],
        answer: "James Cameron",
      },
      {
        question: "Which movie won the most Academy Awards?",
        options: ["Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King", "Awakenings"],
        answer: "The Lord of the Rings: The Return of the King",
      },
      {
        question: "Who played the main role in 'The Godfather'?",
        options: ["Marlon Brando", "Al Pacino", "Robert De Niro", "Robert Duvall"],
        answer: "Marlon Brando",
      },
      {
        question: "Which movie was the first Pixar animated feature film?",
        options: ["Monsters, Inc.", "Toy Story", "Finding Nemo", "Cars"],
        answer: "Toy Story",
      },
      {
        question: "Who directed the movie 'Pulp Fiction'?",
        options: ["Martin Scorsese", "Francis Ford Coppola", "Quentin Tarantino", "Christopher Nolan"],
        answer: "Quentin Tarantino",
      },
      {
        question: "In which movie does Keanu Reeves play Neo?",
        options: ["The Matrix", "John Wick", "Speed", "Constantine"],
        answer: "The Matrix",
      },
      {
        question: "Which movie is considered one of the greatest westerns of all time?",
        options: ["The Good, the Bad, and the Ugly", "The Wild Bunch", "High Noon", "The Legend of the Sharpshooters"],
        answer: "The Good, the Bad, and the Ugly",
      },
      {
        question: "In which movie does Leonardo DiCaprio play Jack Dawson?",
        options: ["Inception", "Titanic", "Catch Me If You Can", "The Aviator"],
        answer: "Titanic",
      },
      {
        question: "Which director is known for his superhero films?",
        options: ["Tim Burton", "Christopher Nolan", "Zack Snyder", "Joss Whedon"],
        answer: "Christopher Nolan",
      },
      {
        question: "In which movie does Tom Hanks play Forrest Gump?",
        options: ["The Green Mile", "Cast Away", "Philadelphia", "Forrest Gump"],
        answer: "Forrest Gump",
      },
      {
        question: "Which movie is considered one of the greatest science fiction films?",
        options: ["Blade Runner", "2001: A Space Odyssey", "Alien", "The Terminator"],
        answer: "2001: A Space Odyssey",
      },
      {
        question: "In which movie does Audrey Hepburn play Holly Golightly?",
        options: ["Breakfast at Tiffany's", "Roman Holiday", "Sabrina", "My Fair Lady"],
        answer: "Breakfast at Tiffany's",
      },
      {
        question: "Which movie is considered one of the greatest horror films of all time?",
        options: ["Psycho", "The Exorcist", "The Shining", "Halloween"],
        answer: "The Exorcist",
      },
      {
        question: "In which movie does Harrison Ford play Indiana Jones?",
        options: ["Star Wars", "Blade Runner", "Indiana Jones: Raiders of the Lost Ark", "Witness"],
        answer: "Indiana Jones: Raiders of the Lost Ark",
      },
      {
        question: "In which movie do Brad Pitt and Edward Norton star?",
        options: ["Troy", "Fight Club", "12 Monkeys", "Seven"],
        answer: "Fight Club",
      },
      {
        question: "In which movie does Natalie Portman star?",
        options: ["Black Swan", "Star Wars", "Lion", "Closer"],
        answer: "Black Swan",
      },
      {
        question: "Which movie is about a Nazi concentration camp?",
        options: ["The Pianist", "Life is Beautiful", "Schindler's List", "The Liberators"],
        answer: "Schindler's List",
      },
      {
        question: "In which movie does Anthony Hopkins play Hannibal Lecter?",
        options: ["The Silence of the Lambs", "Dragon's Lair", "Red Dragon", "Hannibal"],
        answer: "The Silence of the Lambs",
      },
      {
        question: "Who directed the movie 'Inception'?",
        options: ["Ridley Scott", "Steven Spielberg", "James Cameron", "Christopher Nolan"],
        answer: "Christopher Nolan",
      },
      {
        question: "In which movie does Christian Bale play Batman?",
        options: ["American Psycho", "The Dark Knight", "The Prestige", "American Hustle"],
        answer: "The Dark Knight",
      },
      {
        question: "Which movie is considered one of the best animated films of all time?",
        options: ["The Lion King", "Snow White and the Seven Dwarfs", "Beauty and the Beast", "Aladdin"],
        answer: "The Lion King",
      },
      {
        question: "In which movie does Tom Cruise play Ethan Hunt?",
        options: ["Top Gun", "Mission: Impossible", "Minority Report", "War of the Worlds"],
        answer: "Mission: Impossible",
      },
      {
        question: "In which movie does Meryl Streep play Miranda Priestly?",
        options: ["Out of Africa", "Mamma Mia!", "The Devil Wears Prada", "Kramer vs. Kramer"],
        answer: "The Devil Wears Prada",
      },
      {
        question: "Who directed 'The Lord of the Rings: The Return of the King'?",
        options: ["Peter Jackson", "Guillermo del Toro", "Ridley Scott", "James Cameron"],
        answer: "Peter Jackson",
      },
      {
        question: "In which movie does Robin Williams play the Genie?",
        options: ["Jumanji", "Mrs. Doubtfire", "Good Will Hunting", "Aladdin"],
        answer: "Aladdin",
      },
      {
        question: "In which movie does Robert De Niro play Travis Bickle?",
        options: ["Reservoir Dogs", "Casino", "Taxi Driver", "Goodfellas"],
        answer: "Taxi Driver",
      },
      {
        question: "In which movie does Johnny Depp play Jack Sparrow?",
        options: ["Pirates of the Caribbean", "Edward Scissorhands", "Alice in Wonderland", "Charlie and the Chocolate Factory"],
        answer: "Pirates of the Caribbean",
      },
      {
        question: "Which movie is about a wizard named Harry Potter?",
        options: ["The Lord of the Rings", "The Chronicles", "The Chronicles of Narnia", "Harry Potter and the Philosopher's Stone"],
        answer: "Harry Potter and the Philosopher's Stone",
      },
      {
        question: "In which movie do Ryan Gosling and Emma Stone star?",
        options: ["Crazy, Stupid, Love", "La La Land", "Obstacle", "One Day"],
        answer: "La La Land",
      },
      {
        question: "In which movie does Sylvester Stallone play Rocky Balboa?",
        options: ["Rambo", "Rocky", "Judge Dredd", "Cliffhanger"],
        answer: "Rocky",
      },
      {
        question: "Which movie is about World War II?",
        options: ["Saving Private Ryan", "Schindler's List", "Fighters", "Glory of Death"],
        answer: "Saving Private Ryan",
      },
      {
        question: "In which movie does Will Smith play Agent J?",
        options: ["I Am Legend", "War of the Worlds", "Men in Black", "Escape"],
        answer: "Men in Black",
      },
      {
        question: "Which movie is about a family dealing with ghosts?",
        options: ["Paranormal Activity", "Poltergeist", "Ghosts", "Silence"],
        answer: "Poltergeist",
      },
      {
        question: "In which movie does Mel Gibson play William Wallace?",
        options: ["Braveheart", "Lethal Weapon", "Signs", "The Patriot"],
        answer: "Braveheart",
      },
      {
        question: "Which movie is based on a true story about a mathematical genius?",
        options: ["A Beautiful Mind", "The Social Network", "The Da Vinci Code", "Unknown"],
        answer: "A Beautiful Mind",
      },
      {
        question: "In which movie does Bruce Willis play John McClane?",
        options: ["The Sixth Sense", "Armageddon", "Pulp Fiction", "Die Hard",],
        answer: "Die Hard",
      },
      {
        question: "In which movie does Matt Damon play Jason Bourne?",
        options: ["Bourne", "The Martian", "Good Will Hunting", "The River's Edge"],
        answer: "Bourne",
      },
      {
          question: "Which 2019 film won the Palme d'Or at the Cannes Film Festival?",
          options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"],
          answer: "Parasite",
        },
        {
          question: "Which silent film won Best Picture at the first Academy Awards?",
          options: ["The Gold Rush", "Metropolis", "Wings", "Sunrise"],
          answer: "Wings",
        },
        {
          question: "Which actress has won the most Academy Awards for Best Actress?",
          options: ["Katharine Hepburn", "Meryl Streep", "Ingrid Bergman", "Bette Davis"],
          answer: "Katharine Hepburn",
        },
        {
          question: "Which movie was shot entirely on an iPhone?",
          options: ["Unsane", "Searching", "Tangerine", "The Blair Witch Project"],
          answer: "Tangerine",
        },
        {
          question: "Which country produced the film 'City of God'?",
          options: ["Brazil", "Mexico", "Portugal", "Spain"],
          answer: "Brazil",
        },
        {
          question: "Which movie famously flopped at the box office but gained cult status later?",
          options: ["Waterworld", "Blade Runner", "The Room", "Fight Club"],
          answer: "Blade Runner",
        },
        {
          question: "Which actor starred in both 'The Lighthouse' and 'Tenet'?",
          options: ["Robert Pattinson", "Willem Dafoe", "Cillian Murphy", "Tom Hardy"],
          answer: "Robert Pattinson",
        },
        {
          question: "Which foreign film won Best Picture at the Oscars for the first time?",
          options: ["Roma", "Parasite",  "Life is Beautiful", "Amour"],
          answer: "Parasite",
        },
        {
          question: "Which director is known for long takes and minimal cuts in films like 'Children of Men'?",
          options: ["Alejandro G. Iñárritu", "Denis Villeneuve", "Paul Thomas Anderson", "Alfonso Cuarón"],
          answer: "Alfonso Cuarón",
        },
        {
          question: "Which 1982 film featured the music of Vangelis and is considered a sci-fi classic?",
          options: ["Blade Runner", "Tron", "Dune", "Solaris"],
          answer: "Blade Runner",
        },
      {
        question: "In which movie does Jim Carrey play Truman Burbank?",
        options: ["The Mask", "Ace Ventura", "Dumb and Dumber", "The Truman Show"],
        answer: "The Truman Show",
      },
      {
        question: "Which movie is about robots?",
        options: ["The Terminator", "Star Wars", "I, Robot", "Transformers"],
        answer: "The Terminator",
      },
      {
        question: "In which movie do Julia Roberts and Richard Gere star?",
        options: ["Notting Hill", "Pretty Woman", "The Fugitive", "Ocean's Eleven"],
        answer: "Pretty Woman",
      },
      {
        question: "Which movie is about time travel?",
        options: ["Back to the Future", "The Terminator", "Interstellar", "Inception"],
        answer: "Back to the Future",
      },
      {
        question: "In which movie does Arnold Schwarzenegger star?",
        options: ["The Terminator", "Commando", "Predator", "True Lies"],
        answer: "The Terminator",
      },
      {
        question: "In which movie does Sandra Bullock star?",
        options: ["Speed", "The Blind Side", "Miss Congeniality", "Wedding Crashers"],
        answer: "Speed",
      },
      {
        question: "In which movie does Denzel Washington star?",
        options: ["Training Day", "Man on Fire", "Déjà Vu", "The Equalizer"],
        answer: "Training Day",
      },
      {
        question: "In which movie does Nicole Kidman star?",
        options: ["Moulin Rouge!", "The Others", "The Clock", "Cold Mountain"],
        answer: "Moulin Rouge!",
      },
      {
        question: "In which movie does Keira Knightley star?",
        options: ["Pirates of the Caribbean", "Pride and Prejudice", "Atonement", "King Arthur"],
        answer: "Pirates of the Caribbean",
      },
      {
        question: "In which movie does Charlize Theron star?",
        options: ["Monster", "Mad Max: Fury Road", "Snow White and the Huntsman", "The Italian Job"],
        answer: "Monster",
      },
      {
        question: "In which movie does Daniel Radcliffe star?",
        options: ["Harry Potter", "The Woman in Black", "Jungle", "Victor Frankenstein"],
        answer: "Harry Potter",
      },
      {
          question: "Which experimental film by David Lynch features disturbing dream logic and is often debated for its meaning?",
          options: ["Eraserhead", "Blue Velvet", "Mulholland Drive", "Lost Highway"],
          answer: "Eraserhead",
        },
        {
          question: "Which Japanese director is considered the father of modern cinema and directed 'Rashomon'?",
          options: ["Akira Kurosawa", "Yasujiro Ozu", "Kenji Mizoguchi", "Hayao Miyazaki"],
          answer: "Akira Kurosawa",
        },
        {
          question: "Which Soviet film is often cited as one of the most influential films in history due to its montage technique?",
          options: ["Battleship Potemkin", "Ivan the Terrible", "Andrei Rublev", "Man with a Movie Camera"],
          answer: "Battleship Potemkin",
        },
        {
          question: "Which film was originally a short YouTube video before being adapted into a full-length feature?",
          options: ["Lights Out", "Smile", "The Babadook", "Hereditary"],
          answer: "Lights Out",
        },
       {
           question: "Which film holds the record for the longest continuous take in a single shot film?",
           options: ["Birdman", "Russian Ark", "Victoria", "1917"],
           answer: "Russian Ark",
         },
         {
           question: "Which film by Lars von Trier sparked controversy at Cannes and was called 'torture porn' by critics?",
           options: ["Dogville", "The House That Jack Built", "Melancholia", "Antichrist"],
           answer: "The House That Jack Built",
         },
         {
           question: "Which French film is known for having no dialogue and winning an Oscar?",
           options: ["Amour", "La Haine", "The Artist", "Blue is the Warmest Color"],
           answer: "The Artist",
         },
         {
           question: "Which cult film by Tommy Wiseau is famous for being 'so bad it's good'?",
           options: ["Troll 2", "The Room", "Birdemic", "Plan 9 from Outer Space"],
           answer: "The Room",
         },
         {
           question: "What was the first feature-length animated film ever made?",
           options: ["Gertie the Dinosaur", "Fantasia", "Snow White and the Seven Dwarfs", "El Apóstol"],
           answer: "El Apóstol",
         },
         {
           question: "Which Italian director is known for his surrealist masterpiece '8½'?",
           options: ["Michelangelo Antonioni", "Sergio Leone", "Pier Paolo Pasolini", "Federico Fellini"],
           answer: "Federico Fellini",
         },
         {
           question: "In which movie does Jennifer Lawrence star?",
           options: ["X-Men", "The Hunger Games", "The Spider's Web", "Joy"],
           answer: "The Hunger Games",
         },
  ];

const music = [
  {
    question: "Who is the lead singer of the rock band 'Queen'?",
    options: ["Mick Jagger", "Freddie Mercury", "Robert Plant", "David Bowie"],
    answer: "Freddie Mercury",
  },
  {
    question: "Which band performed the song 'Smells Like Teen Spirit'?",
    options: ["Nirvana", "Pearl Jam", "Soundgarden", "Alice in Chains"],
    answer: "Nirvana",
  },
  {
    question: "Who is known as the 'King of Rock and Roll'?",
    options: ["Chuck Berry", "Elvis Presley", "Little Richard", "Jerry Lee Lewis"],
    answer: "Elvis Presley",
  },
  {
    question: "Which singer is known for the song 'Billie Jean'?",
    options: ["Prince", "Michael Jackson", "Stevie Wonder", "Lionel Richie"],
    answer: "Michael Jackson",
  },
  {
    question: "Which band is known for the album 'The Dark Side of the Moon'?",
    options: ["The Beatles", "Pink Floyd", "Led Zeppelin", "The Rolling Stones"],
    answer: "Pink Floyd",
  },
  {
    question: "Which artist is known for the song 'Imagine'?",
    options: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"],
    answer: "John Lennon",
  },
  {
    question: "Which instrument is commonly used in jazz music?",
    options: ["Violin", "Trumpet", "Guitar", "Flute"],
    answer: "Trumpet",
  },
  {
    question: "Which composer wrote the 'Ninth Symphony'?",
    options: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Franz Schubert"],
    answer: "Ludwig van Beethoven",
  },
  {
    question: "Which singer is known for the song 'Respect'?",
    options: ["Aretha Franklin", "Diana Ross", "Tina Turner", "Etta James"],
    answer: "Aretha Franklin",
  },
  {
    question: "Which music genre originated in Jamaica?",
    options: ["Ska", "Reggae", "Dub", "Dancehall"],
    answer: "Reggae",
  },
  {
    question: "Which band performed the song 'Bohemian Rhapsody'?",
    options: ["The Rolling Stones", "Queen", "The Who", "Led Zeppelin"],
    answer: "Queen",
  },
  {
    question: "Which singer is known for the song 'Like a Rolling Stone'?",
    options: ["Bob Dylan", "Bruce Springsteen", "Neil Young", "Tom Petty"],
    answer: "Bob Dylan",
  },
  {
    question: "Which band performed the song 'Stairway to Heaven'?",
    options: ["Pink Floyd", "Led Zeppelin", "Deep Purple", "Black Sabbath"],
    answer: "Led Zeppelin",
  },
  {
    question: "Which singer is known for the song 'Crazy in Love'?",
    options: ["Rihanna", "Beyoncé", "Lady Gaga", "Adele"],
    answer: "Beyoncé",
  },
  {
    question: "Which singer is known for the song 'Rolling in the Deep'?",
    options: ["Amy Winehouse", "Adele", "Duffy", "Lana Del Rey"],
    answer: "Adele",
  },
  {
      question: "Which band performed the song 'Hotel California'?",
      options: ["Fleetwood Mac", "The Doobie Brothers", "Eagles", "Lynyrd Skynyrd"],
      answer: "Eagles",
    },
    {
      question: "Which band performed the song '(I Can't Get No) Satisfaction'?",
      options: ["The Kinks", "The Rolling Stones", "The Yardbirds", "The Who"],
      answer: "The Rolling Stones",
    },
    {
      question: "Which singer is known for the song 'Material Girl'?",
      options: ["Janet Jackson", "Cyndi Lauper", "Madonna", "Whitney Houston"],
      answer: "Madonna",
    },
    {
      question: "Which band performed the song 'With or Without You'?",
      options: ["Oasis", "U2", "Radiohead", "Coldplay"],
      answer: "U2",
    },
    {
      question: "Which artist is known for the song 'Let's Dance'?",
      options: ["Rod Stewart", "David Bowie", "Bryan Ferry", "Elton John"],
      answer: "David Bowie",
    },
    {
      question: "Which band is known for the songs 'Don't Stop Believin'' and 'Any Way You Want It'?",
      options: ["Styx", "Journey", "Boston", "Foreigner"],
      answer: "Journey",
    },
    {
      question: "Who is the lead guitarist of 'The Rolling Stones'?",
      options: ["Keith Richards", "Jimmy Page", "Eric Clapton", "Jimi Hendrix"],
      answer: "Keith Richards",
    },
    {
      question: "Which band performed the song 'Sweet Child o' Mine'?",
      options: ["Metallica", "AC/DC", "Bon Jovi", "Guns N' Roses"],
      answer: "Guns N' Roses",
    },
    {
      question: "Which band is known for the song 'Enter Sandman'?",
      options: ["Slayer", "Anthrax", "Megadeth", "Metallica"],
      answer: "Metallica",
    },
  {
      question: "Which artist released the concept album 'The Wall'?",
      options: ["The Beatles", "Pink Floyd", "David Bowie", "Radiohead"],
      answer: "Pink Floyd",
    },
    {
      question: "Which jazz saxophonist is known for the album 'A Love Supreme'?",
      options: ["Miles Davis", "John Coltrane", "Charlie Parker", "Sonny Rollins"],
      answer: "John Coltrane",
    },
    {
      question: "Which singer performed the hit 'Nothing Compares 2 U' written by Prince?",
      options: ["Sinéad O'Connor", "Madonna", "Annie Lennox", "Tori Amos"],
      answer: "Sinéad O'Connor",
    },
    {
      question: "Which band released the album 'OK Computer'?",
      options: ["Coldplay", "Radiohead", "Muse", "The Verve"],
      answer: "Radiohead",
    },
    {
      question: "Who was the original drummer for The Beatles?",
      options: ["Ringo Starr", "Pete Best", "George Martin", "Stuart Sutcliffe"],
      answer: "Pete Best",
    },
    {
      question: "Which famous composer went deaf later in life?",
      options: ["Mozart", "Beethoven", "Chopin", "Tchaikovsky"],
      answer: "Beethoven",
    },
    {
      question: "Which rapper released the album 'To Pimp a Butterfly'?",
      options: ["Kanye West", "Kendrick Lamar", "J. Cole", "Drake"],
      answer: "Kendrick Lamar",
    },
    {
      question: "Which female artist broke records with her album '1989'?",
      options: ["Adele", "Taylor Swift", "Katy Perry", "Lady Gaga"],
      answer: "Taylor Swift",
    },
    {
      question: "Which classical composer is known for 'The Four Seasons'?",
      options: ["Mozart", "Vivaldi", "Bach", "Handel"],
      answer: "Vivaldi",
    },
    {
      question: "Which British artist released 'Shape of You'?",
      options: ["Sam Smith", "Ed Sheeran", "George Ezra", "James Arthur"],
      answer: "Ed Sheeran",
    },
    {
      question: "Which experimental album by The Beatles is often linked to the psychedelic era?",
      options: ["Rubber Soul", "Revolver", "Sgt. Pepper's Lonely Hearts Club Band", "Help!"],
      answer: "Sgt. Pepper's Lonely Hearts Club Band",
    },
    {
      question: "Which avant-garde composer is known for 4'33\", a piece performed without playing a note?",
      options: ["John Cage", "Philip Glass", "Steve Reich", "Igor Stravinsky"],
      answer: "John Cage",
    },
    {
      question: "Which obscure band is credited with helping invent punk rock with the song 'Blank Generation'?",
      options: ["The Ramones", "Television", "Richard Hell and the Voidoids", "Patti Smith Group"],
      answer: "Richard Hell and the Voidoids",
    },
    {
      question: "Which jazz musician pioneered 'cool jazz' with the album 'Birth of the Cool'?",
      options: ["John Coltrane", "Chet Baker", "Miles Davis", "Herbie Hancock"],
      answer: "Miles Davis",
    },
    {
      question: "Which Icelandic artist released the avant-pop album 'Homogenic'?",
      options: ["Björk", "Aurora", "Lana Del Rey", "Tove Lo"],
      answer: "Björk",
    },
    {
      question: "Which early 20th-century composer is known for the ballet 'The Rite of Spring'?",
      options: ["Claude Debussy", "Igor Stravinsky", "Maurice Ravel", "Arnold Schoenberg"],
      answer: "Igor Stravinsky",
    },
    {
      question: "Which American composer blended minimalism with African and Asian influences in 'Music for 18 Musicians'?",
      options: ["Philip Glass", "Terry Riley", "John Adams", "Steve Reich"],
      answer: "Steve Reich",
    },
    {
      question: "Which obscure 70s rock band gained cult status for their album 'Forever Changes'?",
      options: ["Love", "Big Star", "The Zombies", "The Byrds"],
      answer: "Love",
    },
    {
      question: "Which band had a hit with 'Vienna' and is associated with the New Romantic movement?",
      options: ["Spandau Ballet", "Ultravox", "Visage", "ABC"],
      answer: "Ultravox",
    },
    {
      question: "Which Japanese composer is known for the score of 'Merry Christmas, Mr. Lawrence'?",
      options: ["Joe Hisaishi", "Ryuichi Sakamoto", "Yoko Kanno", "Toru Takemitsu"],
      answer: "Ryuichi Sakamoto",
    },
  {
    question: "Which band is considered the pioneer of 'heavy metal'?",
    options: ["Led Zeppelin", "Black Sabbath", "Deep Purple", "AC/DC"],
    answer: "Black Sabbath",
  },
  {
    question: "Which band became famous with the song 'Californication'?",
    options: ["Red Hot Chili Peppers", "Radiohead", "Nirvana", "Pearl Jam"],
    answer: "Red Hot Chili Peppers",
  },
];

//pataisyti nuo cia
const science = [
  {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Saturn", "Venus"],
      answer: "Mars",
    },
    {
      question: "What gas do humans need to breathe in to survive?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: "Oxygen",
    },
    {
      question: "What is H2O more commonly known as?",
      options: ["Water", "Salt", "Sugar", "Oxygen"],
      answer: "Water",
    },
    {
      question: "How many legs does an insect have?",
      options: ["6", "4", "8", "10"],
      answer: "6",
    },
    {
      question: "What force pulls objects toward Earth?",
      options: ["Gravity", "Friction", "Magnetism", "Electricity"],
      answer: "Gravity",
    },
    {
      question: "What part of the plant conducts photosynthesis?",
      options: ["Leaf", "Root", "Stem", "Flower"],
      answer: "Leaf",
    },
    {
      question: "What is the center of an atom called?",
      options: ["Nucleus", "Electron", "Proton", "Neutron"],
      answer: "Nucleus",
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      answer: "Mercury",
    },
    {
      question: "What is the boiling point of water (in Celsius)?",
      options: ["100°C", "0°C", "50°C", "200°C"],
      answer: "100°C",
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Heart", "Lungs", "Liver", "Kidney"],
      answer: "Heart",
    },
    {
      question: "Which gas do plants absorb from the air?",
      options: ["Carbon Dioxide", "Oxygen", "Hydrogen", "Nitrogen"],
      answer: "Carbon Dioxide",
    },
    {
      question: "Which planet has rings?",
      options: ["Saturn", "Mars", "Venus", "Earth"],
      answer: "Saturn",
    },
    {
      question: "Which vitamin is produced when skin is exposed to sunlight?",
      options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"],
      answer: "Vitamin D",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Gd", "Go"],
      answer: "Au",
    },
    {
      question: "What do bees collect from flowers?",
      options: ["Nectar", "Water", "Pollen", "Dew"],
      answer: "Nectar",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Diamond", "Gold", "Steel", "Granite"],
      answer: "Diamond",
    },
    {
      question: "How many bones are in the human body?",
      options: ["206", "201", "305", "198"],
      answer: "206",
    },
    {
      question: "What part of the human body controls everything?",
      options: ["Brain", "Heart", "Lungs", "Spinal Cord"],
      answer: "Brain",
    },
    {
      question: "Which metal is liquid at room temperature?",
      options: ["Mercury", "Iron", "Zinc", "Silver"],
      answer: "Mercury",
    },
    {
      question: "Which blood type is the universal donor?",
      options: ["O-", "A+", "B-", "AB+"],
      answer: "O-",
    },
    {
      question: "What is the closest star to Earth?",
      options: ["The Sun", "Alpha Centauri", "Polaris", "Sirius"],
      answer: "The Sun",
    },
    {
      question: "What does DNA stand for?",
      options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Dioxynucleic Atom", "Digital Nucleotide Array"],
      answer: "Deoxyribonucleic Acid",
    },
    {
      question: "Which animal is known to have the strongest bite?",
      options: ["Crocodile", "Lion", "Shark", "Tiger"],
      answer: "Crocodile",
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
      answer: "Nitrogen",
    },
    {
      question: "What do you call animals that eat only plants?",
      options: ["Herbivores", "Carnivores", "Omnivores", "Insectivores"],
      answer: "Herbivores",
    },
    {
      question: "What particle is exchanged in the strong nuclear force?",
      options: ["Gluon", "Photon", "Graviton", "Neutrino"],
      answer: "Gluon",
    },
    {
      question: "Which principle explains that you cannot know both position and momentum of a particle exactly?",
      options: ["Heisenberg Uncertainty Principle", "Pauli Exclusion Principle", "Relativity", "Quantum Entanglement"],
      answer: "Heisenberg Uncertainty Principle",
    },
    {
      question: "Which element is a liquid at room temperature besides mercury?",
      options: ["Bromine", "Chlorine", "Gallium", "Francium"],
      answer: "Bromine",
    },
    {
      question: "What is the theoretical temperature at which particles stop moving?",
      options: ["Absolute zero", "Zero Celsius", "Freezing point", "0 Kelvin"],
      answer: "Absolute zero",
    },
    {
      question: "Who discovered the neutron?",
      options: ["James Chadwick", "Ernest Rutherford", "Niels Bohr", "Marie Curie"],
      answer: "James Chadwick",
    },
    {
      question: "What is the rarest blood type in humans?",
      options: ["AB-", "O-", "B-", "A-"],
      answer: "AB-",
    },
    {
      question: "What’s the name of the process that powers the Sun?",
      options: ["Nuclear fusion", "Nuclear fission", "Combustion", "Radioactive decay"],
      answer: "Nuclear fusion",
    },
    {
      question: "Which subatomic particle has no charge?",
      options: ["Neutron", "Proton", "Electron", "Positron"],
      answer: "Neutron",
    },
    {
      question: "Which scientist proposed the heliocentric model?",
      options: ["Copernicus", "Ptolemy", "Kepler", "Galileo"],
      answer: "Copernicus",
    },
    {
      question: "What branch of physics deals with very small particles?",
      options: ["Quantum Mechanics", "Thermodynamics", "Classical Physics", "Electromagnetism"],
      answer: "Quantum Mechanics",
    },
    {
      question: "Which part of the plant absorbs water?",
      options: ["Roots", "Leaves", "Stem", "Flower"],
      answer: "Roots",
    },
    {
      question: "Which gas do humans exhale?",
      options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
      answer: "Carbon Dioxide",
    },
    {
      question: "Which human sense is responsible for smell?",
      options: ["Nose", "Eyes", "Skin", "Tongue"],
      answer: "Nose",
    },
    {
      question: "Which scientist developed the theory of relativity?",
      options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
      answer: "Albert Einstein",
    },
    {
      question: "What is the main gas found in the Sun?",
      options: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"],
      answer: "Hydrogen",
    },
    {
      question: "Which planet is known for its red spot?",
      options: ["Jupiter", "Saturn", "Mars", "Neptune"],
      answer: "Jupiter",
    },
    {
      question: "What is the smallest unit of life?",
      options: ["Cell", "Atom", "Organ", "Tissue"],
      answer: "Cell",
    },
    {
      question: "Which liquid carries nutrients and oxygen in the human body?",
      options: ["Blood", "Saliva", "Sweat", "Water"],
      answer: "Blood",
    },
    {
      question: "How many planets are in the Solar System?",
      options: ["8", "7", "9", "10"],
      answer: "8",
    },
    {
      question: "Which simple machine is used to split things apart?",
      options: ["Wedge", "Lever", "Pulley", "Screw"],
      answer: "Wedge",
    },
    {
      question: "What tool is used to look at stars?",
      options: ["Telescope", "Microscope", "Binoculars", "Periscope"],
      answer: "Telescope",
    },
    {
      question: "What part of the cell contains DNA?",
      options: ["Nucleus", "Cytoplasm", "Membrane", "Ribosome"],
      answer: "Nucleus",
    },
    {
      question: "What is the main function of red blood cells?",
      options: ["Carry oxygen", "Fight disease", "Clot blood", "Filter waste"],
      answer: "Carry oxygen",
    },
    {
      question: "What type of energy does the Sun produce?",
      options: ["Thermal and Light", "Kinetic and Nuclear", "Sound and Electrical", "Chemical and Mechanical"],
      answer: "Thermal and Light",
    },
    {
      question: "What organ helps humans breathe?",
      options: ["Lungs", "Liver", "Kidneys", "Heart"],
      answer: "Lungs",
    },
    {
      question: "Which planet is famous for having life?",
      options: ["Earth", "Mars", "Venus", "Mercury"],
      answer: "Earth",
    },
    {
      question: "What do you call the change from liquid to gas?",
      options: ["Evaporation", "Melting", "Condensation", "Freezing"],
      answer: "Evaporation",
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Skin", "Liver", "Brain", "Lung"],
      answer: "Skin",
    },
    {
      question: "What causes day and night?",
      options: ["Earth's rotation", "Moon phases", "Seasons", "Sun moving"],
      answer: "Earth's rotation",
    },
    {
      question: "Which device is used to measure temperature?",
      options: ["Thermometer", "Barometer", "Speedometer", "Altimeter"],
      answer: "Thermometer",
    },
    {
      question: "What type of energy is stored in food?",
      options: ["Chemical", "Thermal", "Mechanical", "Electrical"],
      answer: "Chemical",
    },
    {
      question: "What is the outermost layer of Earth called?",
      options: ["Crust", "Mantle", "Core", "Lithosphere"],
      answer: "Crust",
    },
    {
      question: "What is the term for animals that sleep during the day and are active at night?",
      options: ["Nocturnal", "Diurnal", "Crepuscular", "Hibernating"],
      answer: "Nocturnal",
    },
    {
      question: "Which part of an atom has a positive charge?",
      options: ["Proton", "Neutron", "Electron", "Photon"],
      answer: "Proton",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus"],
      answer: "Mitochondria",
    },
    {
      question: "Which scientist is known for the laws of motion?",
      options: ["Isaac Newton", "Galileo Galilei", "Nikola Tesla", "Einstein"],
      answer: "Isaac Newton",
    },
    {
      question: "Which planet has the most moons?",
      options: ["Saturn", "Jupiter", "Mars", "Neptune"],
      answer: "Saturn",
    },
    {
      question: "What element has the atomic number 1?",
      options: ["Hydrogen", "Helium", "Oxygen", "Lithium"],
      answer: "Hydrogen",
    },
    {
      question: "What kind of bond involves sharing electrons?",
      options: ["Covalent", "Ionic", "Hydrogen", "Metallic"],
      answer: "Covalent",
    },
    {
      question: "Which disease is caused by a lack of insulin?",
      options: ["Diabetes", "Cancer", "Asthma", "Arthritis"],
      answer: "Diabetes",
    },
    {
      question: "What is the speed of light in vacuum (approx)?",
      options: ["299,792 km/s", "150,000 km/s", "3,000 km/s", "1,080 km/h"],
      answer: "299,792 km/s",
    },
    {
      question: "What is the main function of white blood cells?",
      options: ["Fight infection", "Transport oxygen", "Clot blood", "Break down sugar"],
      answer: "Fight infection",
    },
    {
      question: "What’s the pH of pure water?",
      options: ["7", "0", "14", "5"],
      answer: "7",
    },
    {
      question: "Which part of the brain controls balance?",
      options: ["Cerebellum", "Cerebrum", "Brainstem", "Hypothalamus"],
      answer: "Cerebellum",
    },
];

const history = [
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
    answer: "George Washington",
  },
  {
    question: "In which country did the Olympic Games originate?",
    options: ["Greece", "Italy", "France", "Egypt"],
    answer: "Greece",
  },
  {
    question: "What ancient civilization built the pyramids?",
    options: ["Egyptians", "Romans", "Greeks", "Aztecs"],
    answer: "Egyptians",
  },
  {
    question: "Who discovered America in 1492?",
    options: ["Christopher Columbus", "Leif Erikson", "Amerigo Vespucci", "Marco Polo"],
    answer: "Christopher Columbus",
  },
  {
    question: "Which war ended in 1945?",
    options: ["World War II", "World War I", "Vietnam War", "Cold War"],
    answer: "World War II",
  },
  {
    question: "Who was known as the 'Maid of Orléans'?",
    options: ["Joan of Arc", "Marie Antoinette", "Queen Elizabeth I", "Catherine the Great"],
    answer: "Joan of Arc",
  },
  {
    question: "What was the name of the ship that sank in 1912?",
    options: ["Titanic", "Lusitania", "Olympic", "Endeavour"],
    answer: "Titanic",
  },
  {
    question: "Who was the British Prime Minister during most of WWII?",
    options: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"],
    answer: "Winston Churchill",
  },
  {
    question: "Which U.S. president abolished slavery?",
    options: ["Abraham Lincoln", "George Washington", "Andrew Jackson", "Theodore Roosevelt"],
    answer: "Abraham Lincoln",
  },
  {
    question: "Where did the Renaissance begin?",
    options: ["Italy", "France", "Germany", "England"],
    answer: "Italy",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What wall fell in 1989?",
    options: ["Berlin Wall", "Great Wall of China", "Hadrian’s Wall", "Western Wall"],
    answer: "Berlin Wall",
  },
  {
    question: "What year did man first walk on the Moon?",
    options: ["1969", "1959", "1979", "1989"],
    answer: "1969",
  },
  {
    question: "Who was the first man on the Moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    answer: "Neil Armstrong",
  },
  {
    question: "Who was the dictator of Nazi Germany?",
    options: ["Adolf Hitler", "Joseph Stalin", "Benito Mussolini", "Winston Churchill"],
    answer: "Adolf Hitler",
  },
  {
    question: "What country gifted the Statue of Liberty to the USA?",
    options: ["France", "England", "Spain", "Italy"],
    answer: "France",
  },
  {
    question: "Where was Napoleon Bonaparte born?",
    options: ["Corsica", "Paris", "Rome", "Vienna"],
    answer: "Corsica",
  },
  {
    question: "What empire was ruled by Julius Caesar?",
    options: ["Roman Empire", "Greek Empire", "Ottoman Empire", "Mongol Empire"],
    answer: "Roman Empire",
  },
  {
    question: "What was the name of the trade route between China and Europe?",
    options: ["Silk Road", "Spice Route", "Amber Road", "Tea Route"],
    answer: "Silk Road",
  },
  {
    question: "Which ancient city was buried by a volcanic eruption in 79 AD?",
    options: ["Pompeii", "Athens", "Babylon", "Carthage"],
    answer: "Pompeii",
  },
  {
    question: "Who was the queen of ancient Egypt famous for her beauty?",
    options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Isis"],
    answer: "Cleopatra",
  },
  {
    question: "Which country built the Great Wall?",
    options: ["China", "Japan", "Korea", "India"],
    answer: "China",
  },
  {
    question: "Who invented the printing press?",
    options: ["Johannes Gutenberg", "Leonardo da Vinci", "Galileo", "Isaac Newton"],
    answer: "Johannes Gutenberg",
  },
  {
    question: "What was the name of the Cold War space rivalry?",
    options: ["Space Race", "Moon Race", "Galaxy Competition", "Orbital Challenge"],
    answer: "Space Race",
  },
  {
    question: "Who was assassinated in Dallas in 1963?",
    options: ["John F. Kennedy", "Abraham Lincoln", "Martin Luther King Jr.", "Ronald Reagan"],
    answer: "John F. Kennedy",
  },
  {
    question: "Which U.S. document begins with 'We the People'?",
    options: ["The Constitution", "Declaration of Independence", "Bill of Rights", "Emancipation Proclamation"],
    answer: "The Constitution",
  },
  {
    question: "In which war was trench warfare commonly used?",
    options: ["World War I", "World War II", "Civil War", "Korean War"],
    answer: "World War I",
  },
  {
    question: "Who led India's non-violent independence movement?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Indira Gandhi", "Subhas Chandra Bose"],
    answer: "Mahatma Gandhi",
  },
  {
    question: "Which civilization created cuneiform writing?",
    options: ["Sumerians", "Egyptians", "Greeks", "Phoenicians"],
    answer: "Sumerians",
  },
  {
    question: "Who wrote the '95 Theses' that started the Reformation?",
    options: ["Martin Luther", "John Calvin", "Henry VIII", "Jan Hus"],
    answer: "Martin Luther",
  },
  {
    question: "What empire was ruled by Genghis Khan?",
    options: ["Mongol Empire", "Ottoman Empire", "Roman Empire", "Chinese Empire"],
    answer: "Mongol Empire",
  },
  {
    question: "What was the name of the Soviet satellite launched in 1957?",
    options: ["Sputnik", "Mir", "Vostok", "Luna"],
    answer: "Sputnik",
  },
  {
    question: "Who was the first Emperor of Rome?",
    options: ["Augustus", "Julius Caesar", "Nero", "Tiberius"],
    answer: "Augustus",
  },
  {
    question: "Who was king during the English Civil War?",
    options: ["Charles I", "Henry VIII", "James I", "Edward VI"],
    answer: "Charles I",
  },
  {
    question: "What treaty ended World War I?",
    options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Ghent"],
    answer: "Treaty of Versailles",
  },
  {
    question: "Which country colonized Brazil?",
    options: ["Portugal", "Spain", "France", "England"],
    answer: "Portugal",
  },
  {
    question: "What event started the French Revolution?",
    options: ["Storming of the Bastille", "Execution of Louis XVI", "Women's March on Versailles", "Reign of Terror"],
    answer: "Storming of the Bastille",
  },
  {
    question: "Who was the final pharaoh of ancient Egypt?",
    options: ["Cleopatra VII", "Tutankhamun", "Ramses II", "Akhenaten"],
    answer: "Cleopatra VII",
  },
  {
    question: "In which war was the Battle of Gettysburg fought?",
    options: ["American Civil War", "Revolutionary War", "War of 1812", "Spanish-American War"],
    answer: "American Civil War",
  },
  {
    question: "Who was the longest-reigning British monarch (until 2022)?",
    options: ["Queen Elizabeth II", "Queen Victoria", "King George III", "Henry VIII"],
    answer: "Queen Elizabeth II",
  },
  {
    question: "What year did the Berlin Wall fall?",
    options: ["1989", "1991", "1979", "1995"],
    answer: "1989",
  },
  {
    question: "Who was the U.S. president during the Great Depression?",
    options: ["Franklin D. Roosevelt", "Herbert Hoover", "Woodrow Wilson", "Harry Truman"],
    answer: "Franklin D. Roosevelt",
  },
  {
    question: "What ship did the Pilgrims sail to America on?",
    options: ["Mayflower", "Santa Maria", "Endeavour", "Beagle"],
    answer: "Mayflower",
  },
  {
    question: "Which U.S. state was the last to join the Union?",
    options: ["Hawaii", "Alaska", "New Mexico", "Arizona"],
    answer: "Hawaii",
  },
  {
    question: "Where did the Industrial Revolution begin?",
    options: ["Great Britain", "France", "Germany", "USA"],
    answer: "Great Britain",
  },
  {
    question: "Who was the famous nurse during the Crimean War?",
    options: ["Florence Nightingale", "Clara Barton", "Marie Curie", "Louisa May Alcott"],
    answer: "Florence Nightingale",
  },
  {
    question: "Which country was invaded to start WWII?",
    options: ["Poland", "France", "Austria", "Belgium"],
    answer: "Poland",
  },
  {
    question: "What was the Manhattan Project?",
    options: ["A nuclear bomb project", "A space mission", "A spy agency", "A city plan"],
    answer: "A nuclear bomb project",
  },
  {
    question: "Which country was ruled by the Tsars?",
    options: ["Russia", "Germany", "Italy", "Turkey"],
    answer: "Russia",
  },
  {
    question: "Who gave the Gettysburg Address?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "Franklin D. Roosevelt"],
    answer: "Abraham Lincoln",
  },
  {
    question: "Which famous wall was built to protect China?",
    options: ["Great Wall", "Berlin Wall", "Hadrian’s Wall", "Wailing Wall"],
    answer: "Great Wall",
  },
  {
    question: "Who was the U.S. president during most of WWII?",
    options: ["Franklin D. Roosevelt", "Harry Truman", "Dwight Eisenhower", "Woodrow Wilson"],
    answer: "Franklin D. Roosevelt",
  },
  {
    question: "Which country dropped the first atomic bomb?",
    options: ["USA", "Germany", "Japan", "Russia"],
    answer: "USA",
  },
  {
    question: "Which battle marked the end of Napoleon's rule?",
    options: ["Battle of Waterloo", "Battle of Trafalgar", "Battle of Leipzig", "Battle of Austerlitz"],
    answer: "Battle of Waterloo",
  },
  {
    question: "What year did the American Civil War begin?",
    options: ["1861", "1776", "1812", "1870"],
    answer: "1861",
  },
  {
    question: "Who was the leader of the Soviet Union during WWII?",
    options: ["Joseph Stalin", "Vladimir Lenin", "Leon Trotsky", "Nikita Khrushchev"],
    answer: "Joseph Stalin",
  },
  {
    question: "Which war was fought between the North and South in the U.S.?",
    options: ["Civil War", "Revolutionary War", "Vietnam War", "World War I"],
    answer: "Civil War",
  },
  {
    question: "What was the capital of the Byzantine Empire?",
    options: ["Constantinople", "Rome", "Athens", "Alexandria"],
    answer: "Constantinople",
  },
  {
    question: "Which ancient civilization used quipu for record-keeping?",
    options: ["Inca", "Maya", "Aztec", "Olmec"],
    answer: "Inca",
  },
  {
    question: "Who was the first Norman king of England?",
    options: ["William the Conqueror", "Harold Godwinson", "Henry II", "Edward the Confessor"],
    answer: "William the Conqueror",
  },
  {
    question: "What battle stopped the Muslim advance into Western Europe in 732?",
    options: ["Battle of Tours", "Battle of Hastings", "Battle of Agincourt", "Battle of Vienna"],
    answer: "Battle of Tours",
  },
  {
    question: "Which Chinese dynasty built the majority of the Great Wall?",
    options: ["Ming", "Qin", "Tang", "Han"],
    answer: "Ming",
  },
  {
    question: "Which treaty split the New World between Spain and Portugal?",
    options: ["Treaty of Tordesillas", "Treaty of Westphalia", "Treaty of Versailles", "Treaty of Utrecht"],
    answer: "Treaty of Tordesillas",
  },
  {
    question: "Who led the Haitian Revolution?",
    options: ["Toussaint Louverture", "Simón Bolívar", "Jean-Jacques Dessalines", "Henri Christophe"],
    answer: "Toussaint Louverture",
  },
  {
    question: "What empire did the Rosetta Stone help decipher?",
    options: ["Egyptian", "Babylonian", "Greek", "Roman"],
    answer: "Egyptian",
  },
  {
    question: "Which pope initiated the First Crusade?",
    options: ["Pope Urban II", "Pope Innocent III", "Pope Gregory VII", "Pope Leo IX"],
    answer: "Pope Urban II",
  },
  {
    question: "What year did Constantinople fall to the Ottomans?",
    options: ["1453", "1492", "1517", "1066"],
    answer: "1453",
  },
];

const sports = [
  {
    question: "How many players are on a soccer team on the field?",
    options: ["11", "10", "9", "12"],
    answer: "11",
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Brazil", "Germany", "Italy", "Argentina"],
    answer: "Brazil",
  },
  {
    question: "Which country has won the most Rugby World Cups?",
    options: ["New Zealand", "South Africa", "Australia", "England"],
    answer: "South Africa",
  },
  {
    question: "Who was the first gymnast to score a perfect 10 at the Olympics?",
    options: ["Nadia Comaneci", "Simone Biles", "Larisa Latynina", "Olga Korbut"],
    answer: "Nadia Comaneci",
  },
  {
    question: "In which city were the 1900 Olympic Games held?",
    options: ["Paris", "Athens", "London", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which boxer was known as 'The Greatest'?",
    options: ["Muhammad Ali", "Mike Tyson", "Joe Frazier", "Sugar Ray Leonard"],
    answer: "Muhammad Ali",
  },
  {
    question: "Which chess grandmaster was world champion from 1985 to 2000?",
    options: ["Garry Kasparov", "Bobby Fischer", "Magnus Carlsen", "Anatoly Karpov"],
    answer: "Garry Kasparov",
  },
  {
    question: "What is the name of the technique used in judo to throw an opponent?",
    options: ["Ippon", "O-goshi", "Tachi-waza", "Kata-guruma"],
    answer: "O-goshi",
  },
  {
    question: "Which country invented table tennis?",
    options: ["England", "China", "Japan", "Germany"],
    answer: "England",
  },
  {
    question: "What’s the heaviest weight class in Olympic boxing?",
    options: ["Super Heavyweight", "Heavyweight", "Cruiserweight", "Middleweight"],
    answer: "Super Heavyweight",
  },
  {
    question: "Which country has hosted the most Summer Olympics?",
    options: ["USA", "UK", "France", "Germany"],
    answer: "USA",
  },
  {
    question: "Who won the Ballon d'Or in 2007?",
    options: ["Kaká", "Cristiano Ronaldo", "Lionel Messi", "Ronaldinho"],
    answer: "Kaká",
  },
  {
    question: "How long is an NBA basketball game (regulation time)?",
    options: ["48 minutes", "40 minutes", "60 minutes", "50 minutes"],
    answer: "48 minutes",
  },
  {
    question: "What sport does Lionel Messi play?",
    options: ["Soccer", "Basketball", "Tennis", "Cricket"],
    answer: "Soccer",
  },
  {
    question: "In which sport can you get a hole-in-one?",
    options: ["Golf", "Tennis", "Cricket", "Baseball"],
    answer: "Golf",
  },
  {
    question: "What color are the goalposts in American football?",
    options: ["Yellow", "White", "Red", "Blue"],
    answer: "Yellow",
  },
  {
    question: "Which country hosts the Tour de France?",
    options: ["France", "Italy", "Spain", "Germany"],
    answer: "France",
  },
  {
    question: "Which sport uses a bat and ball and has wickets?",
    options: ["Cricket", "Baseball", "Softball", "Tennis"],
    answer: "Cricket",
  },
  {
    question: "In what sport would you find a 'slam dunk'?",
    options: ["Basketball", "Volleyball", "Tennis", "Soccer"],
    answer: "Basketball",
  },
  {
    question: "What sport does Serena Williams play?",
    options: ["Tennis", "Basketball", "Golf", "Soccer"],
    answer: "Tennis",
  },
  {
    question: "Which Olympic Games were held in Tokyo?",
    options: ["2020", "2016", "2012", "2008"],
    answer: "2020",
  },
  {
    question: "How many rings are on the Olympic flag?",
    options: ["5", "6", "4", "7"],
    answer: "5",
  },
  {
    question: "Which sport is known as 'America's pastime'?",
    options: ["Baseball", "Football", "Basketball", "Hockey"],
    answer: "Baseball",
  },
  {
    question: "What sport is played at Wimbledon?",
    options: ["Tennis", "Golf", "Soccer", "Rugby"],
    answer: "Tennis",
  },
  {
    question: "How many holes are in a standard round of golf?",
    options: ["18", "9", "12", "15"],
    answer: "18",
  },
  {
    question: "Which sport uses the term 'love' for zero score?",
    options: ["Tennis", "Badminton", "Volleyball", "Table Tennis"],
    answer: "Tennis",
  },
  {
    question: "Which athlete is known as 'The Fastest Man Alive'?",
    options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Tyson Gay"],
    answer: "Usain Bolt",
  },
  {
    question: "What shape is a soccer ball?",
    options: ["Sphere", "Oval", "Circle", "Cube"],
    answer: "Sphere",
  },
  {
    question: "Which team wins the Super Bowl?",
    options: ["NFL Champions", "NBA Champions", "MLB Champions", "NHL Champions"],
    answer: "NFL Champions",
  },
  {
    question: "What is the name of the NBA trophy?",
    options: ["Larry O'Brien Trophy", "Stanley Cup", "Vince Lombardi Trophy", "World Cup"],
    answer: "Larry O'Brien Trophy",
  },
  {
    question: "Which sport has a 'hat-trick'?",
    options: ["Soccer", "Hockey", "Cricket", "All of them"],
    answer: "All of them",
  },
  {
    question: "What country is famous for sumo wrestling?",
    options: ["Japan", "China", "Korea", "Thailand"],
    answer: "Japan",
  },
  {
    question: "Which sport uses a puck?",
    options: ["Ice Hockey", "Field Hockey", "Lacrosse", "Basketball"],
    answer: "Ice Hockey",
  },
  {
    question: "What is the maximum score in a 10-pin bowling game?",
    options: ["300", "200", "100", "400"],
    answer: "300",
  },
  {
    question: "Which sport has a quarterback?",
    options: ["American Football", "Baseball", "Basketball", "Rugby"],
    answer: "American Football",
  },
  {
    question: "Where were the first modern Olympic Games held?",
    options: ["Athens", "London", "Paris", "Rome"],
    answer: "Athens",
  },
  {
    question: "Which sport does Novak Djokovic play?",
    options: ["Tennis", "Soccer", "Basketball", "Swimming"],
    answer: "Tennis",
  },
  {
    question: "Which sport involves pom-poms?",
    options: ["Cheerleading", "Gymnastics", "Dancing", "Figure Skating"],
    answer: "Cheerleading",
  },
  {
    question: "What is Michael Jordan famous for?",
    options: ["Basketball", "Baseball", "Soccer", "Tennis"],
    answer: "Basketball",
  },
  {
    question: "Which sport is played in the MLB?",
    options: ["Baseball", "Basketball", "Soccer", "Tennis"],
    answer: "Baseball",
  },
  {
    question: "What sport does Tom Brady play?",
    options: ["American Football", "Baseball", "Basketball", "Tennis"],
    answer: "American Football",
  },
  {
    question: "In what year was the first FIFA World Cup held?",
    options: ["1930", "1924", "1940", "1950"],
    answer: "1930",
  },
  {
    question: "Which tennis tournament is played on clay courts?",
    options: ["French Open", "Wimbledon", "US Open", "Australian Open"],
    answer: "French Open",
  },
  {
    question: "Which African country has qualified most times for the FIFA World Cup?",
    options: ["Cameroon", "Nigeria", "Ghana", "Senegal"],
    answer: "Cameroon",
  },
  {
    question: "What is the distance of a marathon?",
    options: ["42.195 km", "40 km", "26.0 km", "50 km"],
    answer: "42.195 km",
  },
  {
    question: "What does VAR stand for in soccer?",
    options: ["Video Assistant Referee", "Verified Active Replay", "Virtual Angle Replay", "Video Action Review"],
    answer: "Video Assistant Referee",
  },
  {
    question: "What country won the most gold medals in the 2008 Olympics?",
    options: ["China", "USA", "Russia", "UK"],
    answer: "China",
  },
  {
    question: "Which NFL team has won the most Super Bowls?",
    options: ["New England Patriots", "Pittsburgh Steelers", "Dallas Cowboys", "San Francisco 49ers"],
    answer: "New England Patriots",
  },
  {
    question: "What is the maximum break in snooker?",
    options: ["147", "155", "133", "140"],
    answer: "147",
  },
  {
    question: "Which cricketer is known as 'The Little Master'?",
    options: ["Sachin Tendulkar", "Virat Kohli", "Brian Lara", "Ricky Ponting"],
    answer: "Sachin Tendulkar",
  },
  {
    question: "In which sport would you perform a 'Triple Axel'?",
    options: ["Figure Skating", "Gymnastics", "Diving", "Skiing"],
    answer: "Figure Skating",
  },
  {
    question: "Which sport uses the term 'birdie'?",
    options: ["Golf", "Tennis", "Badminton", "Volleyball"],
    answer: "Golf",
  },
  {
    question: "In what sport is the Stanley Cup awarded?",
    options: ["Ice Hockey", "Basketball", "Baseball", "Soccer"],
    answer: "Ice Hockey",
  },
  {
    question: "Which sport is played on a diamond-shaped field?",
    options: ["Baseball", "Football", "Rugby", "Golf"],
    answer: "Baseball",
  },
  {
    question: "What country invented baseball?",
    options: ["USA", "England", "Japan", "Canada"],
    answer: "USA",
  },
  {
    question: "Which sport uses the term 'strike'?",
    options: ["Bowling", "Baseball", "Soccer", "Tennis"],
    answer: "Bowling",
  },
  {
    question: "What do you hit in badminton?",
    options: ["Shuttlecock", "Ball", "Puck", "Disc"],
    answer: "Shuttlecock",
  },
  {
    question: "Which sport includes a pommel horse?",
    options: ["Gymnastics", "Equestrian", "Wrestling", "Fencing"],
    answer: "Gymnastics",
  },
  {
    question: "Which sport uses the term 'ace'?",
    options: ["Tennis", "Golf", "Baseball", "Volleyball"],
    answer: "Tennis",
  },
  {
    question: "Which country has won the most Olympic medals overall?",
    options: ["USA", "Russia", "China", "Germany"],
    answer: "USA",
  },
  {
    question: "Which sport involves vaulting?",
    options: ["Gymnastics", "Wrestling", "Swimming", "Rowing"],
    answer: "Gymnastics",
  },
  {
    question: "What sport is played at the FIFA World Cup?",
    options: ["Soccer", "Rugby", "Cricket", "Basketball"],
    answer: "Soccer",
  },
  {
    question: "What sport does Simone Biles compete in?",
    options: ["Gymnastics", "Diving", "Figure Skating", "Track and Field"],
    answer: "Gymnastics",
  },
  {
    question: "Which sport is played on a court with a net and rackets?",
    options: ["Tennis", "Volleyball", "Soccer", "Cricket"],
    answer: "Tennis",
  },
  {
    question: "How many bases are on a baseball field?",
    options: ["4", "3", "5", "2"],
    answer: "4",
  },
  {
    question: "Which sport uses a balance beam?",
    options: ["Gymnastics", "Track and Field", "Wrestling", "Diving"],
    answer: "Gymnastics",
  },
  {
    question: "What is a knockout in boxing?",
    options: ["When a fighter is unable to continue", "A draw", "A punch to the stomach", "When a round ends"],
    answer: "When a fighter is unable to continue",
  },
  {
    question: "Which athlete has the most Olympic medals?",
    options: ["Michael Phelps", "Usain Bolt", "Larisa Latynina", "Simone Biles"],
    answer: "Michael Phelps",
  },
];

const nature = [
  {
    question: "What is the tallest type of tree?",
    options: ["Redwood", "Oak", "Pine", "Maple"],
    answer: "Redwood",
  },
  {
    question: "Which planet is known as the 'Blue Planet'?",
    options: ["Earth", "Neptune", "Mars", "Venus"],
    answer: "Earth",
  },
  {
    question: "What do bees collect from flowers?",
    options: ["Nectar", "Water", "Pollen", "Leaves"],
    answer: "Nectar",
  },
  {
    question: "Which natural resource covers most of the Earth's surface?",
    options: ["Water", "Land", "Ice", "Forests"],
    answer: "Water",
  },
  {
    question: "Which is the deepest known part of the ocean?",
    options: ["Mariana Trench", "Tonga Trench", "Puerto Rico Trench", "Java Trench"],
    answer: "Mariana Trench",
  },
  {
    question: "Which tree species lives the longest?",
    options: ["Bristlecone Pine", "Oak", "Sequoia", "Baobab"],
    answer: "Bristlecone Pine",
  },
  {
    question: "What is the name of the layer between Earth’s crust and core?",
    options: ["Mantle", "Lithosphere", "Asthenosphere", "Outer Core"],
    answer: "Mantle",
  },
  {
    question: "Which gas is most responsible for the greenhouse effect?",
    options: ["Carbon Dioxide", "Methane", "Nitrogen", "Ozone"],
    answer: "Carbon Dioxide",
  },
  {
    question: "Which bird has the largest wingspan?",
    options: ["Wandering Albatross", "Bald Eagle", "Condor", "Swan"],
    answer: "Wandering Albatross",
  },
  {
    question: "What is the term for animals that eat both plants and meat?",
    options: ["Omnivores", "Carnivores", "Herbivores", "Insectivores"],
    answer: "Omnivores",
  },
  {
    question: "Which desert is the coldest in the world?",
    options: ["Antarctic Desert", "Gobi", "Atacama", "Karakum"],
    answer: "Antarctic Desert",
  },
  {
    question: "Which is the rarest type of blood in humans?",
    options: ["AB negative", "O positive", "A positive", "B negative"],
    answer: "AB negative",
  },
  {
    question: "What is the name for wind that changes direction with seasons?",
    options: ["Monsoon", "Trade wind", "Jet stream", "Gale"],
    answer: "Monsoon",
  },
  {
    question: "Which animal can survive being frozen?",
    options: ["Wood Frog", "Penguin", "Polar Bear", "Snow Leopard"],
    answer: "Wood Frog",
  },
  {
    question: "Which bird is known for mimicking sounds?",
    options: ["Parrot", "Owl", "Eagle", "Crow"],
    answer: "Parrot",
  },
  {
    question: "What gas do trees absorb from the atmosphere?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Carbon dioxide",
  },
  {
    question: "What is the main source of energy for Earth?",
    options: ["The Sun", "The Moon", "Fire", "Lightning"],
    answer: "The Sun",
  },
  {
    question: "What type of animal is a frog?",
    options: ["Amphibian", "Reptile", "Bird", "Mammal"],
    answer: "Amphibian",
  },
  {
    question: "Which ocean is the largest?",
    options: ["Pacific", "Atlantic", "Indian", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Which part of a plant makes food?",
    options: ["Leaves", "Roots", "Stem", "Flowers"],
    answer: "Leaves",
  },
  {
    question: "What do herbivores eat?",
    options: ["Plants", "Meat", "Insects", "Fish"],
    answer: "Plants",
  },
  {
    question: "What animal is the largest mammal?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Hippo"],
    answer: "Blue Whale",
  },
  {
    question: "Which season comes after winter?",
    options: ["Spring", "Summer", "Autumn", "Rainy"],
    answer: "Spring",
  },
  {
    question: "What do you call frozen water?",
    options: ["Ice", "Snow", "Steam", "Hail"],
    answer: "Ice",
  },
  {
    question: "Which continent has the most rainforests?",
    options: ["South America", "Africa", "Asia", "Australia"],
    answer: "South America",
  },
  {
    question: "Which flower is known as the symbol of love?",
    options: ["Rose", "Lily", "Tulip", "Sunflower"],
    answer: "Rose",
  },
  {
    question: "What do caterpillars become?",
    options: ["Butterflies", "Bees", "Spiders", "Worms"],
    answer: "Butterflies",
  },
  {
    question: "Which organ helps humans breathe?",
    options: ["Lungs", "Heart", "Kidneys", "Liver"],
    answer: "Lungs",
  },
  {
    question: "What causes tides in the oceans?",
    options: ["The Moon", "The Sun", "Wind", "Earthquakes"],
    answer: "The Moon",
  },
  {
    question: "What do you call a group of wolves?",
    options: ["Pack", "Herd", "Swarm", "School"],
    answer: "Pack",
  },
  {
    question: "Which bird is a symbol of peace?",
    options: ["Dove", "Crow", "Eagle", "Swan"],
    answer: "Dove",
  },
  {
    question: "Where do penguins live?",
    options: ["Antarctica", "Arctic", "Australia", "Alaska"],
    answer: "Antarctica",
  },
  {
    question: "What type of animal is a dolphin?",
    options: ["Mammal", "Fish", "Reptile", "Bird"],
    answer: "Mammal",
  },
  {
    question: "What is the center of a flower called?",
    options: ["Pistil", "Petal", "Leaf", "Stem"],
    answer: "Pistil",
  },
  {
    question: "What do cows produce?",
    options: ["Milk", "Eggs", "Wool", "Honey"],
    answer: "Milk",
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Photosynthesis", "Digestion", "Evaporation", "Fermentation"],
    answer: "Photosynthesis",
  },
  {
    question: "Which insect has colorful wings?",
    options: ["Butterfly", "Bee", "Ant", "Grasshopper"],
    answer: "Butterfly",
  },
  {
    question: "What kind of animal is a Komodo dragon?",
    options: ["Lizard", "Snake", "Bird", "Frog"],
    answer: "Lizard",
  },
  {
    question: "Which animal is known for its black and white stripes?",
    options: ["Zebra", "Tiger", "Skunk", "Panda"],
    answer: "Zebra",
  },
  {
    question: "Which tree produces acorns?",
    options: ["Oak", "Maple", "Pine", "Birch"],
    answer: "Oak",
  },
  {
    question: "Which part of the Earth do we live on?",
    options: ["Crust", "Mantle", "Core", "Clouds"],
    answer: "Crust",
  },
  {
    question: "What do you call water that falls from clouds?",
    options: ["Rain", "Fog", "Snow", "Dew"],
    answer: "Rain",
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    answer: "Nile",
  },
  {
    question: "Which layer of the atmosphere protects us from UV rays?",
    options: ["Ozone Layer", "Troposphere", "Stratosphere", "Mesosphere"],
    answer: "Ozone Layer",
  },
  {
    question: "What is the scientific name for the Northern Lights?",
    options: ["Aurora Borealis", "Aurora Australis", "Solar Flare", "Ion Storm"],
    answer: "Aurora Borealis",
  },
  {
    question: "What kind of tree do pinecones grow on?",
    options: ["Coniferous", "Deciduous", "Tropical", "Mangrove"],
    answer: "Coniferous",
  },
  {
    question: "Which element is most abundant in the Earth’s crust?",
    options: ["Oxygen", "Silicon", "Iron", "Aluminum"],
    answer: "Oxygen",
  },
  {
    question: "Which plant is used to make rubber?",
    options: ["Rubber Tree", "Cactus", "Bamboo", "Fern"],
    answer: "Rubber Tree",
  },
  {
    question: "How many legs does a crab have?",
    options: ["10", "8", "6", "12"],
    answer: "10",
  },
  {
    question: "What kind of rock is formed from cooled magma?",
    options: ["Igneous", "Sedimentary", "Metamorphic", "Fossil"],
    answer: "Igneous",
  },
  {
    question: "Which continent has the most volcanoes?",
    options: ["Asia", "North America", "South America", "Oceania"],
    answer: "Asia",
  },
  {
    question: "What is the process of water vapor turning into liquid?",
    options: ["Condensation", "Evaporation", "Precipitation", "Sublimation"],
    answer: "Condensation",
  },
  {
    question: "Which gas do humans need to breathe?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Helium"],
    answer: "Oxygen",
  },
  {
    question: "What do you call the young of a frog?",
    options: ["Tadpole", "Larva", "Chick", "Cub"],
    answer: "Tadpole",
  },
  {
    question: "What type of animal is a shark?",
    options: ["Fish", "Mammal", "Reptile", "Bird"],
    answer: "Fish",
  },
  {
    question: "Which planet is known for its rings?",
    options: ["Saturn", "Jupiter", "Uranus", "Mars"],
    answer: "Saturn",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: "Lion",
  },
  {
    question: "What kind of animal is a salmon?",
    options: ["Fish", "Bird", "Amphibian", "Reptile"],
    answer: "Fish",
  },
  {
    question: "What kind of weather involves thunder and lightning?",
    options: ["Storm", "Rain", "Snow", "Fog"],
    answer: "Storm",
  },
  {
    question: "Which is the coldest place on Earth?",
    options: ["Antarctica", "Arctic", "Greenland", "Iceland"],
    answer: "Antarctica",
  },
  {
    question: "Which insect produces honey?",
    options: ["Bee", "Butterfly", "Ant", "Wasp"],
    answer: "Bee",
  },
  {
    question: "What natural event causes shaking of the Earth?",
    options: ["Earthquake", "Tornado", "Flood", "Volcano"],
    answer: "Earthquake",
  },
  {
    question: "Which bird can fly backwards?",
    options: ["Hummingbird", "Eagle", "Parrot", "Swan"],
    answer: "Hummingbird",
  },
  {
    question: "Which desert is the largest in the world?",
    options: ["Sahara", "Gobi", "Kalahari", "Atacama"],
    answer: "Sahara",
  },
  {
    question: "What is a baby deer called?",
    options: ["Fawn", "Calf", "Cub", "Chick"],
    answer: "Fawn",
  },
  {
    question: "What is the largest land animal?",
    options: ["Elephant", "Hippo", "Giraffe", "Rhino"],
    answer: "Elephant",
  },
  {
    question: "Which sea creature has eight legs?",
    options: ["Octopus", "Crab", "Squid", "Lobster"],
    answer: "Octopus",
  },
  {
    question: "What do plants need to grow?",
    options: ["Sunlight", "Moonlight", "Salt", "Wind"],
    answer: "Sunlight",
  },
];

//pataisyti option virsuje
const it = [
  {
    question: "What does 'CPU' stand for?",
    options: ["Core Processing Unit", "Central Processing Unit", "Control Processing Unit", "Computer Power Unit"],
    answer: "Central Processing Unit",
  },
  {
    question: "What is the main function of a keyboard?",
    options: ["Processing", "Storage", "Input", "Output"],
    answer: "Input",
  },
  {
    question: "Which company created the Windows operating system?",
    options: ["Google", "IBM", "Microsoft", "Apple"],
    answer: "Microsoft",
  },
  {
    question: "What device is used to point and click on a computer?",
    options: ["Scanner", "Mouse", "Speaker", "Keyboard"],
    answer: "Mouse",
  },
  {
    question: "What does 'URL' stand for?",
    options: ["Unified Resource List", "Uniform Resource Locator", "Unique Remote Locator", "Universal Router Link"],
    answer: "Uniform Resource Locator",
  },
  {
    question: "Which programming language is known for its use in web development along with HTML and CSS?",
    options: ["C++", "JavaScript", "Java", "Python"],
    answer: "JavaScript",
  },
  {
    question: "What is the binary number system based on?",
    options: ["10", "16", "8", "2"],
    answer: "2",
  },
  {
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "SSH", "FTP", "SMTP"],
    answer: "SMTP",
  },
  {
    question: "What does 'IP' in IP address stand for?",
    options: ["Internal Port", "Input Process", "Internet Protocol", "Internet Path"],
    answer: "Internet Protocol",
  },
  {
    question: "What does 'CSS' stand for in web development?",
    options: ["Creative Style Script", "Central Style System", "Cascading Style Sheets", "Computer Styling Structure"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which database language is used to interact with data?",
    options: ["Python", "SQL", "PHP", "HTML"],
    answer: "SQL",
  },
  {
    question: "What does 'Git' help developers do?",
    options: ["Encrypt data", "Track code changes", "Design interfaces", "Run tests"],
    answer: "Track code changes",
  },
  {
    question: "Which port is typically used for HTTPS?",
    options: ["22", "443", "21", "80"],
    answer: "443",
  },
  {
    question: "Which type of memory is non-volatile?",
    options: ["RAM", "Register", "ROM", "Cache"],
    answer: "ROM",
  },
  {
    question: "What does 'DNS' stand for?",
    options: ["Device Number Setting", "Domain Name System", "Data Name Server", "Digital Network Service"],
    answer: "Domain Name System",
  },
  {
    question: "Which of the following is an operating system?",
    options: ["Chrome", "Intel", "Windows", "Google"],
    answer: "Windows",
  },
  {
    question: "Which one is used to browse websites?",
    options: ["Spreadsheet", "Email Client", "Web Browser", "Word Processor"],
    answer: "Web Browser",
  },
  {
    question: "What does 'Wi-Fi' allow devices to do?",
    options: ["Cool the computer", "Connect wirelessly to the internet", "Charge wirelessly", "Scan documents"],
    answer: "Connect wirelessly to the internet",
  },
  {
    question: "Which company makes the iPhone?",
    options: ["Samsung", "Microsoft", "Apple", "Google"],
    answer: "Apple",
  },
  {
    question: "What is the symbol for 'email'?",
    options: ["%", "@", "#", "$"],
    answer: "@",
  },
  {
    question: "What does 'RAM' stand for?",
    options: ["Remote Access Module", "Rapid Action Module", "Random Access Memory", "Read Access Memory"],
    answer: "Random Access Memory",
  },
  {
    question: "Which of the following is a search engine?",
    options: ["YouTube", "Google", "Instagram", "Facebook"],
    answer: "Google",
  },
  {
    question: "What is a 'smartphone'?",
    options: ["A phone with a cable", "A home phone", "A phone with internet and apps", "A phone with only SMS"],
    answer: "A phone with internet and apps",
  },
  {
    question: "What is the main storage device inside a computer?",
    options: ["Modem", "Hard Drive", "Mouse", "RAM"],
    answer: "Hard Drive",
  },
  {
    question: "Which key is used to delete text to the left?",
    options: ["Delete", "Tab", "Backspace", "Shift"],
    answer: "Backspace",
  },
  {
    question: "Which key is used to create a new line in text?",
    options: ["Esc", "Enter", "Ctrl", "Shift"],
    answer: "Enter",
  },
  {
    question: "What is used to protect a computer from viruses?",
    options: ["Firewall", "Bluetooth", "Antivirus", "USB"],
    answer: "Antivirus",
  },
  {
    question: "Which of these is an input device?",
    options: ["Monitor", "Printer", "Keyboard", "Speaker"],
    answer: "Keyboard",
  },
  {
    question: "What is a website's home page?",
    options: ["Last visited page", "Main starting page", "Settings page", "Error page"],
    answer: "Main starting page",
  },
  {
    question: "What does 'USB' stand for?",
    options: ["United System Block", "Universal Serial Bus", "User Secure Block", "Universal System Bridge"],
    answer: "Universal Serial Bus",
  },
  {
    question: "What is an app?",
    options: ["A virus", "A software application", "A cable", "A keyboard shortcut"],
    answer: "A software application",
  },
  {
    question: "What does 'HTTP' stand for?",
    options: ["Hyper Tool Tracking Protocol", "High Text Transfer Program", "HyperText Terminal Protocol", "HyperText Transfer Protocol"],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "What does 'www' stand for in a website address?",
    options: ["Web World Wide", "World Wide Web", "Wide Web World", "Wireless Web World"],
    answer: "World Wide Web",
  },
  {
    question: "Which app is used for video calls?",
    options: ["Excel", "Zoom", "Photoshop", "Spotify"],
    answer: "Zoom",
  },
  {
    question: "Which file extension is used for Microsoft Word documents?",
    options: [".pptx", ".pdf", ".docx", ".xlsx"],
    answer: ".docx",
  },
  {
    question: "Which of these is a cloud storage service?",
    options: ["Gmail", "Google Drive", "Safari", "Windows"],
    answer: "Google Drive",
  },
  {
    question: "Which of these is an email provider?",
    options: ["Netflix", "Gmail", "YouTube", "Amazon"],
    answer: "Gmail",
  },
  {
    question: "Who developed the Linux kernel?",
    options: ["Bill Gates", "Linus Torvalds", "Ken Thompson", "Dennis Ritchie"],
    answer: "Linus Torvalds",
  },
  {
    question: "Which algorithm is commonly used for encryption?",
    options: ["Dijkstra", "FIFO", "Bubble Sort", "RSA"],
    answer: "RSA",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n²)", "O(1)", "O(log n)", "O(n)"],
    answer: "O(log n)",
  },
  {
      question: "What is the purpose of a 'DNS resolver'?",
      options: ["Creates domain names", "Stores passwords", "Translates domain names to IP addresses", "Secures the network"],
      answer: "Translates domain names to IP addresses",
    },
    {
      question: "Which design pattern provides a way to access the elements of an aggregate object without exposing its structure?",
      options: ["Decorator", "Iterator", "Singleton", "Factory"],
      answer: "Iterator",
    },
    {
      question: "Which command is used in Git to combine branches?",
      options: ["commit", "clone", "merge", "pull"],
      answer: "merge",
    },
    {
      question: "What is the function of a load balancer?",
      options: ["Handles email delivery", "Distributes traffic across multiple servers", "Caches DNS requests", "Protects against malware"],
      answer: "Distributes traffic across multiple servers",
    },
    {
      question: "What does ACID stand for in databases?",
      options: ["Access, Control, Integrity, Data", "Association, Condition, Index, Duration", "Atomicity, Consistency, Isolation, Durability", "Authentication, Configuration, Identity, Data"],
      answer: "Atomicity, Consistency, Isolation, Durability",
    },
    {
      question: "Which networking model has 7 layers?",
      options: ["TCP/IP Model", "Client-Server Model", "OSI Model", "LAN Model"],
      answer: "OSI Model",
    },
    {
      question: "What is a zero-day vulnerability?",
      options: ["A memory leak", "A flaw unknown to the vendor", "An expired license", "A server outage"],
      answer: "A flaw unknown to the vendor",
    },
    {
      question: "Which one is a social media platform?",
      options: ["Outlook", "Facebook", "Firefox", "Excel"],
      answer: "Facebook",
    },
    {
      question: "What does 'PDF' stand for?",
      options: ["Public Data Format", "Portable Document Format", "Page Display File", "Printed Digital File"],
      answer: "Portable Document Format",
    },
    {
      question: "Which one is a programming language?",
      options: ["Photoshop", "Excel", "Python", "Chrome"],
      answer: "Python",
    },
    {
      question: "What does 'AI' stand for?",
      options: ["Access Interface", "Artificial Intelligence", "Advanced Internet", "Auto Input"],
      answer: "Artificial Intelligence",
    },
    {
      question: "What is used to build websites?",
      options: ["AVI", "HTML", "JPEG", "MP3"],
      answer: "HTML",
    },
    {
      question: "What device connects your computer to the internet?",
      options: ["Printer", "Hard drive", "Router", "Scanner"],
      answer: "Router",
    },
    {
      question: "Which key combination is often used to copy?",
      options: ["Ctrl + X", "Ctrl + P", "Ctrl + C", "Ctrl + V"],
      answer: "Ctrl + C",
    },
    {
      question: "What is a virus in computer terms?",
      options: ["A password", "A file type", "A harmful program", "An email"],
      answer: "A harmful program",
    },
    {
      question: "What is a blog?",
      options: ["A type of app", "A virus", "A type of website with posts", "A password"],
      answer: "A type of website with posts",
    },
    {
      question: "What is a screenshot?",
      options: ["A file name", "An app", "An image of your screen", "A video"],
      answer: "An image of your screen",
    },
    {
      question: "Which of these is a spreadsheet program?",
      options: ["Word", "PowerPoint", "Excel", "Photoshop"],
      answer: "Excel",
    },
    {
      question: "What does 'login' mean?",
      options: ["Update software", "Sign into an account", "Shut down a computer", "Delete an account"],
      answer: "Sign into an account",
    },
    {
      question: "Which device stores data permanently?",
      options: ["Cache", "CD-ROM", "Hard Drive", "RAM"],
      answer: "Hard Drive",
    },
    {
      question: "What is a pixel?",
      options: ["A computer model", "Smallest unit of an image", "A virus", "A program"],
      answer: "Smallest unit of an image",
    },
    {
      question: "What is cloud computing?",
      options: ["A weather forecast app", "Printing from the cloud", "Storing and accessing data over the internet", "Using clouds for power"],
      answer: "Storing and accessing data over the internet",
    },
    {
      question: "Which of these is used for presentations?",
      options: ["OneNote", "PowerPoint", "Excel", "Word"],
      answer: "PowerPoint",
    },
    {
      question: "What does a firewall do?",
      options: ["Manages electricity", "Heats up your CPU", "Protects a computer from attacks", "Stores data"],
      answer: "Protects a computer from attacks",
    },
    {
      question: "What is Bluetooth used for?",
      options: ["Data encryption", "Wireless connection between devices", "Screen sharing", "Cooling systems"],
      answer: "Wireless connection between devices",
    },
    {
      question: "What does 'bit' mean?",
      options: ["A virus type", "Basic unit of digital data", "A computer model", "Software name"],
      answer: "Basic unit of digital data",
    },
    {
      question: "What is a domain name?",
      options: ["Email", "Website address", "File type", "App icon"],
      answer: "Website address",
    },
    {
      question: "What does 'HTML' stand for?",
      options: ["High Text Machine Language", "HyperText Managing Language", "HyperText Markup Language", "High-Tech Machine Logic"],
      answer: "HyperText Markup Language",
    },
    {
      question: "What is a 'link' in a website?",
      options: ["A file", "Clickable connection to another page", "A virus", "A password"],
      answer: "Clickable connection to another page",
    },
];

//papildyti sarasa 10 sunkiu ir labai siunkiu
const mythology = [
  {
    question: "Who is the Greek god of the sky?",
    options: ["Zeus", "Apollo", "Poseidon", "Hades"],
    answer: "Zeus",
  },
  {
    question: "Which animal is sacred to the Egyptian god Anubis?",
    options: ["Hawk", "Jackal", "Crocodile", "Cat"],
    answer: "Jackal",
  },
  {
    question: "What is the Roman name of the Greek goddess Hera?",
    options: ["Juno", "Venus", "Diana", "Athena"],
    answer: "Juno",
  },
  {
    question: "Who was the Greek hero who performed 12 labors?",
    options: ["Perseus", "Hercules", "Achilles", "Theseus"],
    answer: "Hercules",
  },
  {
    question: "Which Norse god is known as the god of thunder?",
    options: ["Loki", "Thor", "Baldur", "Odin"],
    answer: "Thor",
  },
  {
    question: "Who was the queen of the Greek gods?",
    options: ["Hera", "Athena", "Artemis", "Demeter"],
    answer: "Hera",
  },
  {
    question: "Who was turned into a spider in Greek mythology?",
    options: ["Medusa", "Arachne", "Persephone", "Athena"],
    answer: "Arachne",
  },
  {
    question: "What is the name of the Norse tree that connects all worlds?",
    options: ["Midgard", "Yggdrasil", "Valhalla", "Asgard"],
    answer: "Yggdrasil",
  },
  {
    question: "What was the name of the Greek hero who sailed on the Argo?",
    options: ["Perseus", "Theseus", "Jason", "Achilles"],
    answer: "Jason",
  },
  {
    question: "Which god was considered the ruler of the underworld in Greek mythology?",
    options: ["Apollo", "Poseidon", "Hades", "Zeus"],
    answer: "Hades",
  },
  {
    question: "Which Egyptian goddess is known as the mother of Horus?",
    options: ["Isis", "Hathor", "Bastet", "Sekhmet"],
    answer: "Isis",
  },
  {
    question: "Which Roman god is equivalent to the Greek god Ares?",
    options: ["Neptune", "Vulcan", "Jupiter", "Mars"],
    answer: "Mars",
  },
  {
    question: "Which bird is associated with the Greek goddess Athena?",
    options: ["Sparrow", "Dove", "Owl", "Eagle"],
    answer: "Owl",
  },
  {
    question: "Which Norse god is associated with mischief?",
    options: ["Odin", "Thor", "Loki", "Baldur"],
    answer: "Loki",
  },
  {
    question: "Who was the Greek goddess of love and beauty?",
    options: ["Athena", "Aphrodite", "Artemis", "Hera"],
    answer: "Aphrodite",
  },
  {
    question: "Which Norse god is associated with wisdom and knowledge?",
    options: ["Freyr", "Baldur", "Odin", "Thor"],
    answer: "Odin",
  },
  {
    question: "What was the name of the hero who defeated the Minotaur?",
    options: ["Perseus", "Hercules", "Theseus", "Achilles"],
    answer: "Theseus",
  },
  {
    question: "Who was the Greek god of the sea?",
    options: ["Hades", "Zeus", "Apollo", "Poseidon"],
    answer: "Poseidon",
  },
  {
    question: "What creature was a hybrid of a lion, goat, and snake in Greek mythology?",
    options: ["Hydra", "Cerberus", "Chimera", "Minotaur"],
    answer: "Chimera",
  },
  {
    question: "What was the name of the winged horse in Greek mythology?",
    options: ["Cerberus", "Phoenix", "Pegasus", "Unicorn"],
    answer: "Pegasus",
  },
  {
    question: "Who was the Greek hero known for his strength and ability to fight with lions?",
    options: ["Perseus", "Hercules", "Achilles", "Odysseus"],
    answer: "Hercules",
  },
  {
    question: "What was the name of the goddess of wisdom in Greek mythology?",
    options: ["Artemis", "Athena", "Demeter", "Hera"],
    answer: "Athena",
  },
  {
    question: "Who was the Norse god of beauty and light?",
    options: ["Loki", "Baldur", "Thor", "Freyr"],
    answer: "Baldur",
  },
  {
    question: "Who was the Greek god of war?",
    options: ["Hermes", "Apollo", "Zeus", "Ares"],
    answer: "Ares",
  },
  {
    question: "Which Greek hero defeated the Gorgon Medusa?",
    options: ["Perseus", "Hercules", "Achilles", "Theseus"],
    answer: "Perseus",
  },
  {
    question: "Which god was known as the messenger of the gods in Greek mythology?",
    options: ["Zeus", "Hermes", "Ares", "Apollo"],
    answer: "Hermes",
  },
  {
    question: "Which mythical creature is part horse and part fish?",
    options: ["Cyclops", "Centaur", "Hippocamp", "Pegasus"],
    answer: "Hippocamp",
  },
  {
    question: "Who was the Greek goddess of the harvest?",
    options: ["Hera", "Athena", "Demeter", "Aphrodite"],
    answer: "Demeter",
  },
  {
    question: "What was the name of the Greek god of the sun?",
    options: ["Apollo", "Hades", "Zeus", "Hermes"],
    answer: "Apollo",
  },
  {
    question: "Which Greek hero sailed to retrieve the Golden Fleece?",
    options: ["Jason", "Achilles", "Theseus", "Perseus"],
    answer: "Jason",
  },
  {
    question: "Which Norse god is associated with the sun and summer?",
    options: ["Odin", "Baldur", "Sol", "Freyr"],
    answer: "Sol",
  },
  {
    question: "Which Greek god of the forge was the husband of Aphrodite?",
    options: ["Hades", "Apollo", "Ares", "Hephaestus"],
    answer: "Hephaestus",
  },
  {
    question: "Who was the Greek god of music?",
    options: ["Hermes", "Zeus", "Apollo", "Hades"],
    answer: "Apollo",
  },
  {
    question: "Which Greek hero had a weak spot on his heel?",
    options: ["Odysseus", "Hercules", "Perseus", "Achilles"],
    answer: "Achilles",
  },
  {
    question: "What creature in Greek mythology has the body of a lion and the wings of an eagle?",
    options: ["Phoenix", "Cyclops", "Griffin", "Chimera"],
    answer: "Griffin",
  },
  {
    question: "Who was the Norse god associated with fertility and harvest?",
    options: ["Thor", "Freyr", "Odin", "Baldur"],
    answer: "Freyr",
  },
  {
    question: "Which Roman goddess was associated with the moon and hunting?",
    options: ["Ceres", "Juno", "Venus", "Diana"],
    answer: "Diana",
  },
  {
    question: "Which Greek titan was punished by being forced to hold up the sky?",
    options: ["Prometheus", "Atlas", "Cronus", "Oceanus"],
    answer: "Atlas",
  },
  {
    question: "Who was the Greek goddess of the hunt?",
    options: ["Artemis", "Athena", "Aphrodite", "Demeter"],
    answer: "Artemis",
  },
  {
    question: "Which Norse god is associated with the dead and the afterlife?",
    options: ["Odin", "Loki", "Thor", "Hel"],
    answer: "Hel",
  },
  {
    question: "What is the name of the three-headed dog that guards the gates of the underworld?",
    options: ["Hydra", "Cerberus", "Medusa", "Cyclops"],
    answer: "Cerberus",
  },
  {
    question: "Who is the Greek god of wine?",
    options: ["Dionysus", "Apollo", "Hermes", "Hades"],
    answer: "Dionysus",
  },
  {
    question: "Who was the wife of Odin in Norse mythology?",
    options: ["Freya", "Frigg", "Idunn", "Hel"],
    answer: "Frigg",
  },
  {
    question: "Which Roman god is associated with the sea?",
    options: ["Mars", "Apollo", "Neptune", "Jupiter"],
    answer: "Neptune",
  },
  {
    question: "Which Greek hero fought in the Trojan War and killed Hector?",
    options: ["Perseus", "Achilles", "Hercules", "Odysseus"],
    answer: "Achilles",
  },
  {
    question: "Who was the Greek goddess of the moon?",
    options: ["Artemis", "Demeter", "Selene", "Hera"],
    answer: "Selene",
  },
  {
    question: "Which creature has the body of a woman and the wings of a bird in Greek mythology?",
    options: ["Siren", "Harpy", "Gorgon", "Nymph"],
    answer: "Siren",
  },
];

const popCulture = [
  {
    question: "Kuriame filme buvo garsusis 'The Force' šūkis?",
    options: ["Star Wars", "The Matrix", "Lord of the Rings", "Avengers"],
    answer: "Star Wars",
  },
  {
    question: "Kas išgarsino dainą 'Shape of You'?",
    options: ["Ed Sheeran", "Ariana Grande", "Drake", "Justin Bieber"],
    answer: "Ed Sheeran",
  },
  {
    question: "Kuris aktorius vaidino 'Iron Man' filmuose?",
    options: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans"],
    answer: "Robert Downey Jr.",
  },
  {
    question: "Kas sukūrė dainą 'Poker Face'?",
    options: ["Lady Gaga", "Beyoncé", "Katy Perry", "Rihanna"],
    answer: "Lady Gaga",
  },
  {
    question: "Kas buvo pirmasis žmogus, kuris žengė ant Mėnulio?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Valentina Tereškova"],
    answer: "Neil Armstrong",
  },
  {
    question: "Kurie įžymūs filmai buvo paremti J.R.R. Tolkieno kūriniais?",
    options: ["The Hobbit", "Harry Potter", "The Matrix", "Star Wars"],
    answer: "The Hobbit",
  },
  {
    question: "Kurioje šalyje gimė populiarus grupė 'BTS'?",
    options: ["Japonija", "Jungtinės Amerikos Valstijos", "Jungtinė Karalystė", "Pietų Korėja"],
    answer: "Pietų Korėja",
  },
  {
    question: "Kas yra laikomas pirmuoju interneto 'meme'?",
    options: ["Nyan Cat", "Doge", "Success Kid", "Grumpy Cat"],
    answer: "Doge",
  },
  {
    question: "Kurie buvo pirmieji 'Superherojų filmai' Marvel Cinematic Universe?",
    options: ["Iron Man", "The Avengers", "Thor", "Captain America"],
    answer: "Iron Man",
  },
  {
    question: "Kas suvaidino 'Jack Sparrow' personažą?",
    options: ["Johnny Depp", "Chris Hemsworth", "Tom Hanks", "Matthew McConaughey"],
    answer: "Johnny Depp",
  },
  // (Pridėkite dar 10 klausimų, panašių į aukščiau pateiktus)
];

const literature = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const art = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const capitals = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const astronomy = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const languages = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const food = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const fashion = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const landmarks = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const travel = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const health = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const politics = [
    {
      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?Kokia yra didžiausia pasaulio šalis pagal plotą?Kokia yra didžiausia pasaulio šalis pagal plotą?Kokia yra didžiausia pasaulio šalis pagal plotą?",
      options: ["JAV", "Kanada", "Rusija", "Kinija"],
      answer: "Rusija",
    },
];
const finance = [
//    {
//      question: "Kokia yra didžiausia pasaulio šalis pagal plotą?",
//      options: ["JAV", "Kanada", "Rusija", "Kinija"],
//      answer: "Rusija",
//    },
];

const questionsByTheme = {
    "Geography": geography,
    "Movies and TV Shows": movies,
    "Music": music,
    "Science and Technology": science,
    "History": history,
    "Sports": sports,
    "Nature and Animals": nature,
    "IT and Programming": it,
    "Mythology and Legends": mythology,
    "Pop Culture and Celebrities": popCulture,
    "Literature": literature,
    "Art": art,
    "World Capitals":capitals,
    "Space and Astronomy": astronomy,
"Languages":languages,
"Food and Cuisine":food,
"Fashion":fashion,
"Famous Landmarks":landmarks,
"Travel and Tourism":travel,
"Health and Fitness":health,
"Politics and World Leaders":politics,
"Finance and Economics":finance
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
         "Superb! You answered correctly! Your winning points:",
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