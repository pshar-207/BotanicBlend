function changeColors(element) {
  // Save the original colors

  var originalBackgroundColor = element.style.backgroundColor;

  // Change colors on hover
  element.style.backgroundColor = "#FCC6E2";
  element.style.border = "0.1rem solid #FCC6E2";

  // Add an event listener for mouseout to restore the original colors
  element.addEventListener("mouseout", function () {
    element.style.backgroundColor = originalBackgroundColor;
    element.style.border = "0.1rem solid black";
  });
}
