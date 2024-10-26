var isCartOpen = false;

function toggleCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "0px";
  sideCart.style.boxShadow = "-5vw 0vw 10vw 0vw rgba(0, 0, 0, 0.3)";
  isCartOpen = true;
}

console.log("Cart Working");

function closeCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "-35vw";
  sideCart.style.boxShadow = "none";
  isCartOpen = false;
}
