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
clickedDivCheck.style.backgroundColor = "#fcc6e2";

function changeColorsClickDescriptionShipping(div) {
  if (clickedDivCheck) {
    clickedDivCheck.style.backgroundColor = "whitesmoke";
    clickedDivCheck.style.border = "0.1vw solid black";
  }

  div.style.backgroundColor = "#fcc6e2";
  clickedDivCheck = div;
}
function changeColorsDescriptionShipping(element) {
  if (element !== clickedDivCheck) {
    element.style.backgroundColor = "#fcc6e2";
    element.style.border = "0.1vw solid black";
  }
}
function restoreOriginalColorsDescriptionShipping(element) {
  if (element !== clickedDivCheck) {
    element.style.backgroundColor = "whitesmoke";
    element.style.border = "0.1vw solid black";
  }
}
