var isCartOpen = false;
function toggleCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = sideCart.style.right === "0px" ? "-20rem" : "0px";
  if (isCartOpen === false) {
    isCartOpen = true;
  } else isCartOpen = false;
  console.log(isCartOpen);
}
