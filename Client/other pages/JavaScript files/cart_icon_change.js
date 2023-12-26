function showAddToCart(element) {
  var icon = element.querySelector(".icon");
  var addToCart = element.querySelector(".add-to-cart");

  icon.style.display = "none";
  addToCart.style.display = "block";
}

function hideAddToCart(element) {
  var icon = element.querySelector(".icon");
  var addToCart = element.querySelector(".add-to-cart");

  icon.style.display = "block";
  addToCart.style.display = "none";
}
