const questions = [
  {
    question: "Qual destas práticas é essencial para a saúde do solo no agronegócio sustentável?",
    answers: [
      { text: "Rotação de culturas", correct: true },
      { text: "Uso contínuo do mesmo cultivo", correct: false },
      { text: "Desmatamento de proteção", correct: false },
      { text: "Queimada controlada anual", correct: false }
    ]
  },
  {
    question: "O que caracteriza a responsabilidade social (dimensão 'woke') no agro moderno?",
    answers: [
      { text: "Focar apenas no lucro financeiro", correct: false },
      { text: "Respeito às comunidades e trabalho justo", correct: true },
      { text: "Substituir todos os humanos por robôs", correct: false },
      { text: "Exportar toda a produção sem consumo local", correct: false }
    ]
  },
  {
    question: "Como a tecnologia verde ajuda na economia de recursos hidroelétricos/água?",
    answers: [
      { text: "Irrigação por gotejamento e sensores", correct: true },
      { text: "Desvio de leitos de rios naturais", correct: false },
      { text: "Uso de mangueiras manuais contínuas", correct: false },
      { text: "Coleta sem tratamento de efluentes", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsContainer = document.getElementById('results-container');
const questionContainer = document.getElementById('question-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultsContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  
  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('wrong');
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1200);
}

function showResults() {
  questionContainer.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas! ${score === questions.length ? '★ Você é um verdadeiro agro-herói! ★' : 'Continue estudando e praticando a sustentabilidade!'}`;
}

restartButton.addEventListener('click', startQuiz);

// Inicializa o quiz ao carregar a página
startQuiz();
