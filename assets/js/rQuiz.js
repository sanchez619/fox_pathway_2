/*Global Constants - mainly question text*/
const question = document.getElementsByClassName('question');
const choices = Array.from(document.getElementsByClassName('choiceContent'));
const quizLength = 10;
const questionCountValue = document.getElementById('questionNumber');
const associationHeader = document.getElementById('association');
const associationForm = document.getElementById('associationForm');
const radicalPicture = document.getElementById('radicalImage');
const questionArea = document.getElementById('questionArea');
const scoreValue = document.getElementById('score');
const quizArea = document.getElementById('quizArea');

/*Global Variables - general quiz features*/
let currentQuestion = {};
let acceptedAnswers = false;
let score = 0;
let questionCount = 0;
let questionsLeft = [];
let questions = [];

/*fetch function to grab questions from json file */

fetch('assets/js/questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        shuffleArray(questions);
        questions = questions.slice(0, 10);
        launchGame();
    })
    .catch((err) => {
        console.error(err);
});

/*Listener grabs user input and changes it to first answer in question */
associationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userInput = event.target[0].value.toLowerCase();
    questions[questionCount].choice1 = userInput;
    questions[questionCount].answer = userInput;

    event.target.reset();
    questionCount++;

    /*changes visible items from form to quiz*/
    if (questionCount == quizLength) {
        questionArea.classList.add('hide');
        quizArea.classList.remove('hide');
        questionCount = 0;
        questionsLeft = [...questions];
        radicalPicture.style.backgroundImage = `url("${questions[questionCount].picture}")`;
        exchangeQuestion();
        return;
    }

    radicalPicture.style.backgroundImage = `url("${questions[questionCount].picture}")`;
    startAssociations();
});

/*function for starting game - at associations*/
function launchGame() {
    questionCount = 0;
    score = 0;
    startAssociations();
}

function startAssociations() {
    associationHeader.innerText = questions[questionCount].question;
    radicalPicture.style.backgroundImage = questions[questionCount].picture;
}

/*function for replacing questions*/
function exchangeQuestion() {
    if (questionsLeft.length === 0 || questionCount > quizLength) {
        localStorage.setItem('endScore', score);
        /*automatically connect to result page*/
        return window.location.assign('/result.html');
    }
    questionCount++;
    let questionIndex = Math.floor(Math.random() * questionsLeft.length);
    currentQuestion = questionsLeft[questionIndex];
    let choicesArray = [
        currentQuestion.choice1,
        currentQuestion.choice2,
        currentQuestion.choice3,
        currentQuestion.choice4,
    ];
    shuffleArray(choicesArray);

// Assign the shuffled choices back to the currentQuestion object
    for (let i = 0; i < choicesArray.length; i++) {
        currentQuestion['choice' + (i + 1)] = choicesArray[i];
    }

    /* Display the question and shuffled choices */
    question.innerText = currentQuestion.question;
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    questionsLeft.splice(questionIndex, 1);
    acceptedAnswers = true;
    }

/*Add correct and incorrect classes to user choice */
choices.forEach(choice => {
    /*Event Listener for selected choice*/
    choice.addEventListener("click", e => {
        if (!acceptedAnswers) return;
        acceptedAnswers = false;
        let selectedContent = e.target;
        let selectedAnswer = selectedContent.dataset["number"];

        let applyClass = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            applyClass = "correct";
        }
        if (applyClass === "correct") {
            updateScore();
        }
        selectedContent.parentElement.classList.add(applyClass);

        setTimeout(() => {
            selectedContent.parentElement.classList.remove(applyClass);
            exchangeQuestion();
        }, 1000);
        updateQuestionCount();
    });
});

function updateScore() {
    let currentScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++currentScore;
}

function updateQuestionCount() {
    let currentQuestionNumber = parseInt(document.getElementById("questionNumber").innerText);
    document.getElementById("questionNumber").innerText = ++currentQuestionNumber;
}

function shuffleArray(array) {
    for (let remainingQuestions = array.length - 1; remainingQuestions > 0; remainingQuestions--) {
        const grabbedQuestions = Math.floor(Math.random() * (remainingQuestions + 1));
        [array[remainingQuestions], array[grabbedQuestions]] = [array[grabbedQuestions], array[remainingQuestions]]; 
        /* Swap elements */
    }
}