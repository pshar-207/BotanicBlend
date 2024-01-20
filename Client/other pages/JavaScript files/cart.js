// var isCartOpen = false;
// function toggleCart() {
//   var sideCart = document.getElementById("sideCart");
//   sideCart.style.right = sideCart.style.right === "0px" ? "-20rem" : "0px";
//   if (isCartOpen === false) {
//     isCartOpen = true;
//   } else isCartOpen = false;
// }
// console.log("Cart Working");
// function cloesCart() {
//   var sideCart = document.getElementById("sideCart");
//   sideCart.style.right = sideCart.style.right === "-20rem" ? "0px" : "-20rem";
// }
var isCartOpen = false;

function toggleCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "0px"; // Set directly to "0px"
  isCartOpen = true;
}

console.log("Cart Working");

function closeCart() {
  var sideCart = document.getElementById("sideCart");
  sideCart.style.right = "-20rem"; // Set directly to "-20rem"
  isCartOpen = false;
}
