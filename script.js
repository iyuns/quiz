const questions = [
    {
        question: "도연이의 별명을 고르세요!", 
        answer: [
            {text: "똥강아지", correct: false}, 
            {text: "곰돌이", correct: false}, 
            {text: "무민", correct: true}, 
            {text: "토끼", correct: false}
        ]
    }, 
    {
        question: "도연이의 태어난 연도를 고르세요!", 
        answer: [
            {text: "1999", correct: false}, 
            {text: "2000", correct: true}, 
            {text: "2001", correct: false}, 
            {text: "2002", correct: false}
        ]  
    }, 
    {
        question: "도연이가 살지 않았던 지역을 고르세요!", 
        answer: [
            {text: "순천", correct: false}, 
            {text: "세종", correct: false}, 
            {text: "부산", correct: false}, 
            {text: "수원", correct: true}
        ]
    }, 
    {
        question: "도연이의 영어 이름을 고르세요!", 
        answer: [
            {text: "Blaire", correct: true}, 
            {text: "Emma", correct: false}, 
            {text: "Olivia", correct: false}, 
            {text: "Sophia", correct: false}
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
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
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
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
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

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();