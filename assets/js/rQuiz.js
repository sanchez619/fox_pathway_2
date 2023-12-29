/*Global Constants - mainly question text*/
const choice = document.getElementsByClassName("choiceContent")

/*Global Variables - general quiz features*/
let currentQuestion = {};
let acceptedAnswers = true;
let score = 0;
let questionCount = 0;
let questionsLeft = [];

let radicals = [
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
]

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