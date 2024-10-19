const startBtn = document.querySelector('.start-btn');
const infoBox = document.querySelector('.info-box');
const quizBox = document.querySelector('.quiz-box');
const questionText = document.getElementById('question');
const submitBtn = document.getElementById('submit');
const options = document.querySelectorAll('.answer');

// Questions
const quizData = [
    {
        question: "What is the capital of India?",
        a: "Delhi",
        b: "London",
        c: "Rome",
        d: "Berlin",
        correct: "a"
    },
    {
        question: "What is 2 + 2?",
        a: "3",
        b: "4",
        c: "5",
        d: "6",
        correct: "b"
    },
    {
        question: "Who wrote 'Hamlet'?",
        a: "Charles Dickens",
        b: "Mark Twain",
        c: "William Shakespeare",
        d: "Jane Austen",
        correct: "c"
    },
    {
        question: "What is the largest planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "What is the chemical symbol for water?",
        a: "O2",
        b: "H2O",
        c: "CO2",
        d: "NaCl",
        correct: "b"
    }
];

let currentQuestion = 0;
let score = 0;

// load Q 
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;
    document.getElementById('a_text').innerText = currentQuizData.a;
    document.getElementById('b_text').innerText = currentQuizData.b;
    document.getElementById('c_text').innerText = currentQuizData.c;
    document.getElementById('d_text').innerText = currentQuizData.d;
}

// start Quiz button clicked 
startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');  
    infoBox.classList.add('show');   
});

// continue button clicked 
document.getElementById('restart').addEventListener('click', () => {
    infoBox.classList.remove('show');  
    quizBox.classList.add('show');     
    loadQuestion();
});

function getSelected() {
    let answer;
    options.forEach(option => {
        if (option.checked) {
            answer = option.id;
        }
    });
    return answer;
}

// submit the answer and move to the next question
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }
});


function showScore() {
    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-box'); 

    scoreContainer.innerHTML = `<h2>Your score: ${score} / ${quizData.length}</h2>`;
    
    quizBox.innerHTML = ''; 
    quizBox.appendChild(scoreContainer); 
}
