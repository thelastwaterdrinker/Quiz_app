const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'How many rings are on the Olympic flag?',
        choice1: 'None',
        choice2: '4',
        choice3: '5',
        choice4: '7',
        answer: 3
    },
    {
        question: 'How did Spider-Man get his power?',
        choice1: 'Bitten by a radioactive spider',
        choice2: 'Born with item',
        choice3: 'Military experiment gone awry',
        choice4: 'Woke up with them after a strange dream',
        answer: 1
    },
    {
        question: 'What are the main colors on the flag of Spain?',
        choice1: 'Black and yellow',
        choice2: 'Blue and white',
        choice3: 'Green and white',
        choice4: 'Red and yellow',
        answer: 4
    },
    {
        question: 'Who killed Greedo?',
        choice1: 'Hannibal Lecter',
        choice2: 'Han Solo',
        choice3: 'Hermione Granger',
        choice4: 'Hercules',
        answer: 2
    },
    {
        question: 'Which of these is virus?',
        choice1: 'Chicken pox',
        choice2: 'Leukemia',
        choice3: 'Scoliosis',
        choice4: 'Staphylococcus',
        answer: 1
    },
    {
        question: 'What is the pH of pure water?',
        choice1: '0',
        choice2: '1',
        choice3: '7',
        choice4: '273',
        answer: 3
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();