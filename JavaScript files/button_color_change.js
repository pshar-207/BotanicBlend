function changeColors(element) {
  // Save the original colors
  var originalColor = element.style.color;
  var originalBackgroundColor = element.style.backgroundColor;

  // Change colors on hover
  element.style.color = "white";
  element.style.backgroundColor = "#0b1354"; // Change this to the desired background color

  // Add an event listener for mouseout to restore the original colors
  element.addEventListener("mouseout", function () {
    element.style.color = originalColor;
    element.style.backgroundColor = originalBackgroundColor;
  });
}
