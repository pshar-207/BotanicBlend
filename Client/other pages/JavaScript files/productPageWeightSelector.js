// let selectedWeight = null;
// let clickedDiv = null;

// function changeColorsWeight(element) {
//   // Apply hover effect only if the div is not clicked
//   if (element !== clickedDiv) {
//     // Change colors on hover
//     clickedDiv.style.backgroundColor = "whitesmoke";
//     element.style.backgroundColor = "#fcc6e2";
//     element.style.border = "1px solid black";
//   }
// }

// function changeColorsClickWeight(element) {
//   // Reset styles for the previously clicked div
//   if (clickedDiv) {
//     clickedDiv.style.backgroundColor = "whitesmoke";
//     clickedDiv.style.border = "1px solid black";
//   }

//   // Set styles for the clicked div
//   element.style.backgroundColor = "#fcc6e2";
//   element.style.color = "black";

//   // Update the clickedDiv variable
//   clickedDiv = element;

//   //select div by skin type
//   selectedWeight = element.innerText;
// }
// function restoreOriginalColorsWeight(element) {
//   // Restore original colors only if the div is not clicked
//   if (element !== clickedDiv) {
//     element.style.backgroundColor = "whitesmoke";
//     element.style.border = "1px solid black";
//     clickedDiv.style.backgroundColor = "#fcc6e2";
//   }
// }
