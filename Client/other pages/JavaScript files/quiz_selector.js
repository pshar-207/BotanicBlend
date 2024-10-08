// Store references to each question section
var questions = document.querySelectorAll(".q1, .q2, .q3, .q4, .q5");

// Add a reference to the span element
var questionNumberSpan = document.getElementById("question-number");

// Set initial question number
var currentQuestionNumber = 1;

// Store references to the navigation buttons
var backButton = document.querySelector(".back_btn");
var nextButton = document.querySelector(".next_btn");

// Store user selections
var userData = {
  gender: null,
  skinType: null,
  age: null,
  anythingElse: null,
  hasActiveAcne: null,
};

// Set initial question index
var currentQuestionIndex = 0;

// Add event listeners to the navigation buttons
nextButton.addEventListener("click", showNextQuestion);
backButton.addEventListener("click", showPreviousQuestion);

function showNextQuestion() {
  console.log(`index before : ${currentQuestionIndex}`);
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
  // Apply hover effect only if the div is not clicked
  if (element !== clickedDiv) {
    // Save the original colors

    // Change colors on hover
    element.style.backgroundColor = "#fcc6e2"; // Change this to the desired background color
    element.style.border = "0.1vw solid white";
  }
}

function changeColorsClick(div) {
  // Reset styles for the previously clicked div
  if (clickedDiv) {
    clickedDiv.style.backgroundColor = "white";
    clickedDiv.style.border = "0.1vw solid black";
  }

  // Set styles for the clicked div
  div.style.backgroundColor = "#fcc6e2"; // Change this to the desired color
  div.style.color = "black"; // Change this to the desired color

  // Update the clickedDiv variable
  clickedDiv = div;
}
function restoreOriginalColors(element) {
  // Restore original colors only if the div is not clicked
  if (element !== clickedDiv) {
    element.style.backgroundColor = "white";
    element.style.border = "0.1vw solid black";
  }
}

function saveUserSelection() {
  // Save user selection for each question
  switch (currentQuestionIndex) {
    case 0:
      userData.gender = clickedDiv.innerText.trim();
      console.log(userData.gender);
      clickedDiv = null;
      break;
    case 1:
      userData.skinType = clickedDiv.innerText.trim();
      console.log(userData.skinType);
      clickedDiv = null;
      break;
    case 2:
      userData.age = clickedDiv.innerText.trim();
      console.log(userData.age);
      clickedDiv = null;
      break;
    case 3:
      userData.anythingElse = document.getElementById("comment").value.trim();
      console.log(userData.anythingElse);
      clickedDiv = null;
      break;
    case 4:
      userData.hasActiveAcne = clickedDiv.innerText.trim();
      console.log(`Has active acne : ${userData.hasActiveAcne}`);
      clickedDiv = null;
      break;
  }
}
