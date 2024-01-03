let selectedFlavour = null;
var clickedDivFlavour = null;

function changeColorsFlavour(element) {
  // Apply hover effect only if the div is not clicked
  if (element !== clickedDivFlavour) {
    // Change colors on hover
    element.style.backgroundColor = "#fcc6e2";
    element.style.border = "1px solid black";
  }
}

function changeColorsClickFlavour(div) {
  // Reset styles for the previously clicked div
  if (clickedDivFlavour) {
    clickedDivFlavour.style.backgroundColor = "whitesmoke";
    clickedDivFlavour.style.border = "1px solid black";
  }

  // Set styles for the clicked div
  div.style.backgroundColor = "#fcc6e2";
  div.style.color = "black";

  // Update the clickedDiv variable
  clickedDivFlavour = div;

  //select div by skin type
  selectedFlavour = div.innerText;
}
function restoreOriginalColorsFlavour(element) {
  // Restore original colors only if the div is not clicked
  if (element !== clickedDivFlavour) {
    element.style.backgroundColor = "whitesmoke";
    element.style.border = "1px solid black";
  }
}
