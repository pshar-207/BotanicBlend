// Store references to each question section
var questions = document.querySelectorAll(".q1, .q2, .q3, .q4, .q5, .q6");

// Store references to the navigation buttons
var backButton = document.querySelector(".back_btn");
var nextButton = document.querySelector(".next_btn");

// Set initial question index
var currentQuestionIndex = 0;

// Add event listeners to the navigation buttons
nextButton.addEventListener("click", showNextQuestion);
backButton.addEventListener("click", showPreviousQuestion);

function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    questions[currentQuestionIndex].style.display = "none";
    currentQuestionIndex++;
    questions[currentQuestionIndex].style.display = "flex";
    updateBackButtonVisibility();
  }
}

function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    questions[currentQuestionIndex].style.display = "none";
    currentQuestionIndex--;
    questions[currentQuestionIndex].style.display = "flex";
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
    element.style.border = "1px solid white";
  }
}

function changeColorsClick(div) {
  // Reset styles for the previously clicked div
  if (clickedDiv) {
    clickedDiv.style.backgroundColor = "white";
    clickedDiv.style.border = "1px solid black";
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
    element.style.border = "1px solid black";
  }
}
