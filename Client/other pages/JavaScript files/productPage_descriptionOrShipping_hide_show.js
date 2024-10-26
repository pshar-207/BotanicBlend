var description = document.querySelector(".product_description_container");
var shipping_returns = document.querySelector(".shipping_Returns_container");
var description_button = document.querySelector(".description");
var shipp_return_button = document.querySelector(".shipping_Returns");

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
clickedDivCheck.style.backgroundColor = "var(--button_bg)";

function changeColorsClickDescriptionShipping(div) {
  if (clickedDivCheck) {
    clickedDivCheck.style.backgroundColor = "transparent";
    clickedDivCheck.style.border = "0.1vw solid var(--black_text)";
  }

  div.style.backgroundColor = "var(--button_bg)";
  clickedDivCheck = div;
}
function changeColorsDescriptionShipping(element) {
  if (element !== clickedDivCheck) {
    element.style.backgroundColor = "var(--button_bg)";
    element.style.border = "0.1vw solid var(--black_text)";
  }
}
function restoreOriginalColorsDescriptionShipping(element) {
  if (element !== clickedDivCheck) {
    element.style.backgroundColor = "transparent";
    element.style.border = "0.1vw solid var(--black_text)";
  }
}
