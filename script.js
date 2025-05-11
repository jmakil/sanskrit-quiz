const quizData = [
  {
    question: "What is the English meaning of 'गम् (gam)'?",
    options: ["To eat", "To go", "To speak", "To see"],
    answer: "To go"
  },
  {
    question: "What does 'पठ् (paṭh)' mean?",
    options: ["To read", "To run", "To write", "To sleep"],
    answer: "To read"
  },
  {
    question: "Meaning of 'स्मृ (smṛ)'?",
    options: ["To hear", "To remember", "To teach", "To laugh"],
    answer: "To remember"
  },
  {
    question: "What does 'दृश् (dṛś)' mean?",
    options: ["To smell", "To see", "To write", "To build"],
    answer: "To see"
  },
  {
    question: "Meaning of 'श्रु (śru)'?",
    options: ["To hear", "To speak", "To fight", "To swim"],
    answer: "To hear"
  },
  {
    question: "What is the English meaning of 'वद् (vad)'?",
    options: ["To sleep", "To run", "To speak", "To jump"],
    answer: "To speak"
  },
  {
    question: "What does 'नय् (nay)' mean?",
    options: ["To lose", "To win", "To lead", "To love"],
    answer: "To lead"
  },
  {
    question: "Meaning of 'स्था (sthā)'?",
    options: ["To stop", "To stand", "To give", "To take"],
    answer: "To stand"
  },
  {
    question: "What is the English meaning of 'कृ (kṛ)'?",
    options: ["To do", "To laugh", "To eat", "To hide"],
    answer: "To do"
  },
  {
    question: "What does 'जय् (jay)' mean?",
    options: ["To win", "To play", "To dance", "To write"],
    answer: "To win"
  },
  {
    question: "Meaning of 'लिख् (likh)'?",
    options: ["To read", "To write", "To run", "To teach"],
    answer: "To write"
  },
  {
    question: "What is the meaning of 'भू (bhū)'?",
    options: ["To become", "To eat", "To throw", "To lead"],
    answer: "To become"
  },
  {
    question: "What does 'दा (dā)' mean?",
    options: ["To run", "To speak", "To give", "To walk"],
    answer: "To give"
  },
  {
    question: "Meaning of 'गृ (gṛ)'?",
    options: ["To take", "To grab", "To hold", "To drink"],
    answer: "To hold"
  },
  {
    question: "What is the English meaning of 'निद्रा (nidrā)'?",
    options: ["To swim", "To sleep", "To jump", "To rest"],
    answer: "To sleep"
  },
  {
    question: "What does 'भक्ष् (bhakṣ)' mean?",
    options: ["To see", "To teach", "To eat", "To listen"],
    answer: "To eat"
  },
  {
    question: "Meaning of 'धाव् (dhāv)'?",
    options: ["To run", "To lead", "To walk", "To build"],
    answer: "To run"
  },
  {
    question: "What is the meaning of 'अस् (as)'?",
    options: ["To speak", "To exist", "To lie", "To hear"],
    answer: "To exist"
  }
  
];

// DOM elements
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;


// Load the current question
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionButtons.forEach((button, index) => {
    button.textContent = q.options[index];
    button.disabled = false;
    button.style.backgroundColor = ""; // reset color
  });
  feedbackEl.textContent = "";
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuizDueToTime();
      }
    }, 1000);
  }
}

// Check if the clicked answer is correct
optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedAnswer = button.textContent;
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.style.color = "green";
      button.style.backgroundColor = "#c8e6c9"; // light green
      score++;
    } else {
      feedbackEl.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
      feedbackEl.style.color = "red";
      button.style.backgroundColor = "#ffcdd2"; // light red
    }

    // Update score
    scoreEl.textContent = `Score: ${score}`;

    // Disable all buttons after answering
    optionButtons.forEach(btn => btn.disabled = true);
  });
});

function endQuizDueToTime() {
  questionEl.textContent = "⏰ Time's up!";
  document.getElementById("options").style.display = "none";
  feedbackEl.innerHTML = `<strong style="color: green;">Final Score: ${score}/${quizData.length}</strong>`;
  nextBtn.textContent = "Reset";
}

nextBtn.addEventListener("click", () => {
  // If quiz is finished, reset everything
  if (nextBtn.textContent === "Reset") {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = null;

    document.getElementById("options").style.display = "block";
    nextBtn.textContent = "Next";
    loadQuestion();
    return;
  }

  // Move to next question
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    questionEl.textContent = "🎉 Quiz completed!";
    document.getElementById("options").style.display = "none";
    feedbackEl.innerHTML = `<strong style="color: green;">Final Score: ${score}/${quizData.length}</strong>`;
    nextBtn.textContent = "Reset";
  }
});


// Initial question load
loadQuestion();

