function changeColors(element) {
  // Save the original colors
  var originalBackgroundColor = element.style.backgroundColor;
  // Change colors on hover
  element.style.backgroundColor = "#fcc6e2";
  element.style.border = "0.1rem solid #fcc6e2";
  element.style.color = "black";

  // Add an event listener for mouseout to restore the original colors
  element.addEventListener("mouseout", function () {
    element.style.backgroundColor = originalBackgroundColor;
    element.style.border = "1px solid black";
    element.style.color = "black";
  });
}
