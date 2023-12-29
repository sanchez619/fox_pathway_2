/*Global Constants - mainly question text*/
const choices = Array.from(document.getElementsByClassName("choiceContent"));
const quizLength = 3;

/*Global Variables - general quiz features*/
let currentQuestion = {};
let acceptedAnswers = true;
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
launchGame = () => {
    questionCount = 0;
    score = 0;
    questionsLeft = [... questions];
    console.log(questionsLeft);
    exchangeQuestion();
};

/*function for replacing questions*/
exchangeQuestion = () => {
    questionCount++;
    let questionIndex = Math.floor(Math.random() * questionsLeft.length);
    currentQuestion = questionsLeft[questionIndex];
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    questionsLeft.splice(questionIndex, 1);
    acceptedAnswers = true;
};

/*Event Listener for selected choice*/
choices.forEach((choice) => {
    choice.addEventListener("click", e => {
        if (!acceptedAnswers) return;
        acceptedAnswers = false;
        let selectedContent = e.target;
        let selectedNumber = selectedContent.dataset['number'];
        exchangeQuestion();
    });
});

/*Starts Game*/
launchGame()