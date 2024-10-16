var questions = document.querySelectorAll(".q1, .q2, .q3, .q4, .q5");
var questionNumberSpan = document.getElementById("question-number");

// Set initial question number
var currentQuestionNumber = 1;

var backButton = document.querySelector(".back_btn");
var nextButton = document.querySelector(".next_btn");

var userData = {
  gender: null,
  skinType: null,
  age: null,
  anythingElse: null,
  hasActiveAcne: null,
};

// Set initial question index
var currentQuestionIndex = 0;

nextButton.addEventListener("click", showNextQuestion);
backButton.addEventListener("click", showPreviousQuestion);

function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    saveUserSelection();
    questions[currentQuestionIndex].style.display = "none";
    currentQuestionIndex++;
    currentQuestionNumber++;
    if (currentQuestionIndex != 5) {
      questions[currentQuestionIndex].style.display = "flex";
    }
    questionNumberSpan.textContent = `${currentQuestionNumber} `;
    updateBackButtonVisibility();
  }
  if (currentQuestionIndex === questions.length) {
    window.location.href = `/other%20pages/quizResults.html?skinType=${encodeURIComponent(
      userData.skinType
    )}&hasActiveAcne=${encodeURIComponent(userData.hasActiveAcne)}`;
  }
  console.log(`index after : ${currentQuestionIndex}`);
}

function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    questions[currentQuestionIndex].style.display = "none";
    currentQuestionIndex--;
    currentQuestionNumber--;
    questions[currentQuestionIndex].style.display = "flex";
    questionNumberSpan.textContent = `${currentQuestionNumber} `;
    updateBackButtonVisibility();
  }
}

function updateBackButtonVisibility() {
  backButton.style.display = currentQuestionIndex === 0 ? "none" : "block";
}

var clickedDiv = null;
var originalBackgroundColor = element.style.backgroundColor;
var originalBorder = element.style.border;
function changeColors(element) {
  if (element !== clickedDiv) {
    element.style.backgroundColor = "#fcc6e2";
    element.style.border = "0.1vw solid #fcc6e2";
  }
}

function changeColorsClick(div) {
  if (clickedDiv) {
    clickedDiv.style.backgroundColor = "whitesmoke";
    clickedDiv.style.border = "0.1vw solid black";
  }

  // Set styles for the clicked div
  div.style.backgroundColor = "#fcc6e2";

  clickedDiv = div;
}
function restoreOriginalColors(element) {
  if (element !== clickedDiv) {
    element.style.backgroundColor = "whitesmoke";
    element.style.border = "0.1vw solid black";
  }
}

function saveUserSelection() {
  // Save user selection for each question
  switch (currentQuestionIndex) {
    case 0:
      userData.gender = clickedDiv.innerText.trim();
      clickedDiv = null;
      break;
    case 1:
      userData.skinType = clickedDiv.innerText.trim();
      clickedDiv = null;
      break;
    case 2:
      userData.age = clickedDiv.innerText.trim();
      clickedDiv = null;
      break;
    case 3:
      userData.anythingElse = document.getElementById("comment").value.trim();
      clickedDiv = null;
      break;
    case 4:
      userData.hasActiveAcne = clickedDiv.innerText.trim();
      clickedDiv = null;
      break;
  }
}
