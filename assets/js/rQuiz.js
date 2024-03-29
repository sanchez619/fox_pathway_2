/*Global Constants - mainly question text*/
const question = document.getElementsByClassName('question');
const choices = Array.from(document.getElementsByClassName('choiceBox'));
const quizLength = 10;
const associationForm = document.getElementById('associationForm');
const radicalPicture = document.getElementById('radicalImage');
const questionArea = document.getElementById('questionArea');
const quizArea = document.getElementById('quizArea');

/*Global letiables - general quiz features*/
let currentQuestion = {};
let acceptedAnswers = false;
let score = 0;
let questionCount = 0;
let questionsLeft = [];
let questions = [];

/*fetch function to grab questions from json file */

fetch('assets/js/questions.json')
  .then(function (res) {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(function (loadedQuestions) {
    questions = loadedQuestions;
    shuffleArray(questions);
    questions = questions.slice(0, 10);
    launchGame();
  })
  .catch(function (err) {
    console.error('Error fetching questions:', err);
  });

/*Listener grabs user input and changes it to first answer in question */
associationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const userInput = event.target[0].value.toLowerCase();
  if (userInput !== '') {
    questions[questionCount].choice1 = userInput;
    questions[questionCount].answer = userInput;

    console.log(questions[questionCount]);
    console.log(questions[questionCount].choice1);
    console.log(questions[questionCount].answer);

    event.target.reset();
    questionCount++;
  } else {
    alert('Input empty. Please add a sufficient association.');
  }

  /*changes visible items from form to quiz*/
  if (questionCount == quizLength) {
    questionArea.classList.add('hide');
    quizArea.classList.remove('hide');
    questionCount = 0;
    questionsLeft = questions.slice();
    radicalPicture.style.backgroundImage =
      "url('" + questions[questionCount].picture + "')";
    exchangeQuestion();
    return;
  }

  radicalPicture.style.backgroundImage =
    "url('" + questions[questionCount].picture + "')";
  startAssociations();
});

/*function for starting game - at associations*/
function launchGame() {
  questionCount = 0;
  score = 0;
  startAssociations();
}

function startAssociations() {
  for (let i = 0; i < question.length; i++) {
    question[i].innerHTML = questions[questionCount].question;
  }
  radicalPicture.style.backgroundImage =
    "url('" + questions[questionCount].picture + "')";
}

/*function for replacing questions*/
function exchangeQuestion() {
  questionCount++;

  if (questionsLeft.length === 0 || questionCount > quizLength) {
    localStorage.setItem('endScore', score);
    /*automatically connect to result page*/
    return window.location.assign('result.html');
  }
  radicalPicture.style.backgroundImage =
    "url('" + questions[questionCount - 1].picture + "')";
  let questionIndex = Math.floor(Math.random() * questionsLeft.length);
  currentQuestion = questionsLeft[questionIndex];
  question[1].innerText = currentQuestion.question;
  let choicesArray = [
    currentQuestion.choice1,
    currentQuestion.choice2,
    currentQuestion.choice3,
    currentQuestion.choice4,
  ];
  shuffleArray(choicesArray);

  for (let i = 0; i < choicesArray.length; i++) {
    currentQuestion['choice' + (i + 1)] = choicesArray[i];
  }

  /* Display the question and shuffled choices */
  question.innerText = currentQuestion.question;
  choices.forEach(function (choice) {
    const choiceContent = choice.querySelector('.choiceContent');
    const number = choiceContent.dataset.number;
    choiceContent.innerText = currentQuestion['choice' + number];
  });

  questionsLeft.splice(questionIndex, 1);
  acceptedAnswers = true;
}

// Assign the shuffled choices back to the currentQuestion object

/*Add correct and incorrect classes to user choice */
choices.forEach(function (choiceBox) {
  choiceBox.addEventListener('click', function (e) {
    if (!acceptedAnswers) return;
    acceptedAnswers = false;
    let choiceContent = choiceBox.querySelector('.choiceContent');
    let selectedAnswer = choiceContent.innerText;
    let applyClass =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (applyClass === 'correct') {
      updateScore();
    }
    choiceBox.classList.add(applyClass);
    choiceContent.classList.add(applyClass);
    setTimeout(function () {
      choiceBox.classList.remove(applyClass);
      choiceContent.classList.remove(applyClass);
      exchangeQuestion();
    }, 1000);
    updateQuestionCount();
  });
});

function updateScore() {
  let currentScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++currentScore;
  score = currentScore;
}

function updateQuestionCount() {
  let currentQuestionNumber = parseInt(
    document.getElementById('questionNumber').innerText
  );
  document.getElementById('questionNumber').innerText = ++currentQuestionNumber;
}

function shuffleArray(array) {
  for (
    let remainingQuestions = array.length - 1;
    remainingQuestions > 0;
    remainingQuestions--
  ) {
    const grabbedQuestions = Math.floor(
      Math.random() * (remainingQuestions + 1)
    );
    const temp = array[remainingQuestions];
    array[remainingQuestions] = array[grabbedQuestions];
    array[grabbedQuestions] = temp;
  }
  // Swap elements
}