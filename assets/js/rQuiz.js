/*Global Constants - mainly question text*/
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choiceContent"));
const quizLength = 3;
const questionCountValue = document.getElementById("questionNumber");
const scoreValue = document.getElementById("score");

/*Global Variables - general quiz features*/
let currentQuestion = {};
let acceptedAnswers = false;
let score = 0;
let questionCount = 0;
let questionsLeft = [];

/*Array of Radicals and their properties */
/*Array of possible questions */
let questions = [{
    choice1: "user input",
    choice2: "random",
    choice3: "random",
    choice4: "random",
    answer: 1,
},
{

    choice1: "random",
    choice2: "random",
    choice3: "user input",
    choice4: "random",
    answer: 3,
},
{
    choice1: "random",
    choice2: "random",
    choice3: "random",
    choice4: "user input",
    answer: 4,
},
];

/*function for starting game*/
 function launchGame() {
    questionCount = 0;
    score = 0;
    questionsLeft = [...questions];
    exchangeQuestion();
 }

/*function for replacing questions*/
function exchangeQuestion() {
    if (questionsLeft.length === 0 || questionCount > quizLength)  {
        /*automatically connect to result page*/
        return window.location.assign("/result.html");
    }
    questionCount++;
    let questionIndex = Math.floor(Math.random() * questionsLeft.length);
    currentQuestion = questionsLeft[questionIndex];
    currentQuestion.innerText= currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    questionsLeft.splice(questionIndex, 1);
    acceptedAnswers = true;
}


/* */
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
};

function updateQuestionCount() {
    let currentQuestionNumber = parseInt(document.getElementById("questionNumber").innerText);
    document.getElementById("questionNumber").innerText = ++currentQuestionNumber;
}

/*Starts Game*/
launchGame();