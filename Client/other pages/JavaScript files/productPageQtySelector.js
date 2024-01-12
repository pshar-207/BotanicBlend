var qtyIncrese = document.querySelector(".qty_increse");
var qtyDescrese = document.querySelector(".qty_descrese");
var quantity = 1;
var Qty = document.querySelector(".qty_number");
var currentPrice = document.querySelector(".productPrice").innerText;

qtyIncrese.addEventListener("click", () => {
  if (quantity < 10) quantity++;
  updateQty();
});
qtyDescrese.addEventListener("click", () => {
  if (quantity > 1) quantity--;
  updateQty();
});
function updateQty() {
  Qty.textContent = quantity;
  console.log(currentPrice);
}

// JavaScript
var qtyIncrese = document.querySelector(".qty_increse");
var qtyDescrese = document.querySelector(".qty_descrese");
var quantity = 1;
var Qty = document.querySelector(".qty_number");
var currentPrice = parseFloat(
  document.querySelector(".productPrice").innerText
);

qtyIncrese.addEventListener("click", () => {
  if (quantity < 10) {
    quantity++;
    updateQtyAndPrice();
  }
});

qtyDescrese.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateQtyAndPrice();
  }
});

function updateQtyAndPrice() {
  updateQty();
  updateTotalPrice();
}

function updateQty() {
  Qty.textContent = quantity;
}

function updateTotalPrice() {
  // Assuming your price is stored in currentPrice
  var totalPrice = currentPrice * quantity;
  // Display or use totalPrice as needed
  console.log("Total Price:", totalPrice);
}
