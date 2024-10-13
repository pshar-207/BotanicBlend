var isCartOpen = false;

function toggleCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "0px";
  sideCart.style.boxShadow = "-12px 10px 17px 4px rgba(0, 0, 0, 0.3)";
  isCartOpen = true;
}

console.log("Cart Working");

function closeCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "-80vw";
  sideCart.style.boxSl̥hadow = "none";
  isCartOpen = false;
}
