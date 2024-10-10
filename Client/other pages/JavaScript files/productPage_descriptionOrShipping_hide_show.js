var description = document.querySelector(".product_description_container");
var shipping_returns = document.querySelector(".shipping_Returns_container");

// Store references to the navigation buttons
var description_button = document.querySelector(".description");
var shipp_return_button = document.querySelector(".shipping_Returns");

// Add event listeners to the navigation buttons
description_button.addEventListener("click", showDescription);
shipp_return_button.addEventListener("click", showShiipingReturns);

function showDescription() {
  shipping_returns.style.display = "none";
  description.style.display = "block";
}
function showShiipingReturns() {
  shipping_returns.style.display = "block";
  description.style.display = "none";
}

var clickedDivCheck = description_button;
clickedDivCheck.style.backgroundColor = "#fcc6e2";

function changeColorsClickDescriptionShipping(div) {
  // Reset styles for the previously clicked div
  console.log("clicked");
  if (clickedDivCheck) {
    clickedDivCheck.style.backgroundColor = "whitesmoke";
    clickedDivCheck.style.border = "0.1vw solid black";
    console.log("clicked");
  }

  // Set styles for the clicked div
  div.style.backgroundColor = "#fcc6e2";
  div.style.color = "black";

  // Update the clickedDiv variable
  clickedDivCheck = div;
}
function changeColorsDescriptionShipping(element) {
  // Apply hover effect only if the div is not clicked
  if (element !== clickedDivCheck) {
    // Change colors on hover
    element.style.backgroundColor = "#fcc6e2";
    element.style.border = "0.1vw solid black";
  }
}
function restoreOriginalColorsDescriptionShipping(element) {
  // Restore original colors only if the div is not clicked
  if (element !== clickedDivCheck) {
    element.style.backgroundColor = "whitesmoke";
    element.style.border = "0.1vw solid black";
  }
}
