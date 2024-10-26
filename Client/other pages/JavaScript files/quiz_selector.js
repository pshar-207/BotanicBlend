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

var clickedDivGender = null;
var clickedDivSkinType = null;
var clickedDivAge = null;
var clickedDivHasActiveAcne = null;

function changeColors(element) {
  if (currentQuestionNumber === 1 && element !== clickedDivGender) {
    element.style.backgroundColor = "var(--button_bg)";
    element.style.border = "0.1vw solid var(--button_border)";
  }
  if (currentQuestionNumber === 2 && element !== clickedDivSkinType) {
    element.style.backgroundColor = "var(--button_bg)";
    element.style.border = "0.1vw solid var(--button_border)";
  }
  if (currentQuestionNumber === 3 && element !== clickedDivAge) {
    element.style.backgroundColor = "var(--button_bg)";
    element.style.border = "0.1vw solid var(--button_border)";
  }
  if (currentQuestionNumber === 5 && element !== clickedDivHasActiveAcne) {
    element.style.backgroundColor = "var(--button_bg)";
    element.style.border = "0.1vw solid var(--button_border)";
  }
}

function changeColorsClick(div) {
  if (currentQuestionNumber === 1) {
    if (clickedDivGender) {
      clickedDivGender.style.backgroundColor = "var(--backgroung_color)";
      clickedDivGender.style.border = "0.1vw solid var(--black_text)";
    }

    // Set styles for the clicked div
    div.style.backgroundColor = "var(--button_bg)";
    div.style.border = "0.1vw solid var(--button_border)";

    clickedDivGender = div;
  }
  if (currentQuestionNumber === 2) {
    if (clickedDivSkinType) {
      clickedDivSkinType.style.backgroundColor = "var(--backgroung_color)";
      clickedDivSkinType.style.border = "0.1vw solid var(--black_text)";
    }
    // Set styles for the clicked div
    div.style.backgroundColor = "var(--button_bg)";
    div.style.border = "0.1vw solid var(--button_border)";
    clickedDivSkinType = div;
  }
  if (currentQuestionNumber === 3) {
    if (clickedDivAge) {
      clickedDivAge.style.backgroundColor = "var(--backgroung_color)";
      clickedDivAge.style.border = "0.1vw solid var(--black_text)";
    }
    // Set styles for the clicked div
    div.style.backgroundColor = "var(--button_bg)";
    div.style.border = "0.1vw solid var(--button_border)";
    clickedDivAge = div;
  }
  if (currentQuestionNumber === 5) {
    if (clickedDivHasActiveAcne) {
      clickedDivHasActiveAcne.style.backgroundColor = "var(--backgroung_color)";
      clickedDivHasActiveAcne.style.border = "0.1vw solid var(--black_text)";
    }
    // Set styles for the clicked div
    div.style.backgroundColor = "var(--button_bg)";
    div.style.border = "0.1vw solid var(--button_border)";
    clickedDivHasActiveAcne = div;
  }
}
function restoreOriginalColors(element) {
  if (currentQuestionNumber === 1 && element !== clickedDivGender) {
    element.style.backgroundColor = "var(--backgroung_color)";
    element.style.border = "0.1vw solid var(--black_text)";
  }
  if (currentQuestionNumber === 2 && element !== clickedDivSkinType) {
    element.style.backgroundColor = "var(--backgroung_color)";
    element.style.border = "0.1vw solid var(--black_text)";
  }
  if (currentQuestionNumber === 3 && element !== clickedDivAge) {
    element.style.backgroundColor = "var(--backgroung_color)";
    element.style.border = "0.1vw solid var(--black_text)";
  }
  if (currentQuestionNumber === 5 && element !== clickedDivHasActiveAcne) {
    element.style.backgroundColor = "var(--backgroung_color)";
    element.style.border = "0.1vw solid var(--black_text)";
  }
}

function saveUserSelection() {
  // Save user selection for each question
  switch (currentQuestionIndex) {
    case 0:
      userData.gender = clickedDivGender.innerText.trim();
      break;
    case 1:
      userData.skinType = clickedDivSkinType.innerText.trim();
      break;
    case 2:
      userData.age = clickedDivAge.innerText.trim();
      break;
    case 3:
      userData.anythingElse = document.getElementById("comment").value.trim();
      break;
    case 4:
      userData.hasActiveAcne = clickedDivHasActiveAcne.innerText.trim();
      break;
  }
}
