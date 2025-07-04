import { quizData } from './data.js';

let index = 0;
let score = 0;

const qnoEl = document.getElementById("qno");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.querySelector(".submit-button");
const answers = document.getElementsByName("ans");

const loadQuiz = () => {
  deselectAnswers();
  const currentQuiz = quizData[index];
  qnoEl.innerText = `Q-No: ${index + 1}`;
  questionEl.innerText = currentQuiz.question;
  a_text.innerText = currentQuiz.a;
  b_text.innerText = currentQuiz.b;
  c_text.innerText = currentQuiz.c;
  d_text.innerText = currentQuiz.d;
};

function deselectAnswers() {
  answers.forEach((ans) => (ans.checked = false));
}

function getSelected() {
  let selected;
  answers.forEach((ans) => {
    if (ans.checked) selected = ans.value;
  });
  return selected;
}

submitBtn.addEventListener("click", () => {
  const selected = getSelected();
  if (!selected) return alert("Please select an answer");

  if (selected === quizData[index].correct) {
    score++;
  }

  index++;
  if (index < quizData.length) {
    loadQuiz();
  } else {
    document.querySelector(".container").innerHTML = `
      <div class="heading">Quiz Completed!</div>
      <div class="question-container">
        <div id="question">Your Score: ${score} / ${quizData.length}</div>
      </div>
    `;
  }
});

loadQuiz();
