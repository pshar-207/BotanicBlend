var isCartOpen = false;

function toggleCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "0px";
  isCartOpen = true;
}

console.log("Cart Working");

function closeCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "-20rem";
  isCartOpen = false;
}
