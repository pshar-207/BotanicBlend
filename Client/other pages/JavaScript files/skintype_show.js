function showText(element) {
  var imgage = element.querySelector(".skinType_img");
  var text = element.querySelector(".skin_type_text");

  imgage.style.display = "none";
  text.style.display = "block";
}

function hideText(element) {
  var imgage = element.querySelector(".skinType_img");
  var text = element.querySelector(".skin_type_text");

  imgage.style.display = "block";
  text.style.display = "none";
}
