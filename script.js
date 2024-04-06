const questions = [
    {
        question: "В каком месяце молодожены начали  встречаться?",
        answers: [
            {text: "Май", correct: false},
            {text: "Февраль", correct: true},
            {text: "Март", correct: false},
            {text: "Июль", correct: false},
        ]
    },
    {
        question: "Сколько лет молодожены вместе?",
        answers: [
            {text: "7", correct: false},
            {text: "2", correct: false},
            {text: "10", correct: false},
            {text: "8", correct: true},
        ]
    },
    {
        question: "В каком городе начались отношения у молодоженов?",
        answers: [
            {text: "Любучаны", correct: false},
            {text: "Москва", correct: false},
            {text: "Чехов", correct: true},
            {text: "Подольск", correct: false},
        ]
    },
    {
        question: "Где молодожены первый раз поцеловались?",
        answers: [
            {text: "Не ебу", correct: true},
            {text: "Не ебу", correct: false},
            {text: "Не ебу", correct: false},
            {text: "Не ебу", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Следующий";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML ='Ваши баллы ' + score + ' из ' + questions.length;
        nextButton.style.display = "block";
    }

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
