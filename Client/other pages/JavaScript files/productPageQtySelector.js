var qtyIncrese = document.querySelector(".qty_increse");
var qtyDescrese = document.querySelector(".qty_descrese");
var quantity = 1;
var Qty = document.querySelector(".qty_number");

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
}
