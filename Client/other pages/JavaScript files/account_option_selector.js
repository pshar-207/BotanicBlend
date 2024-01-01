var userDetail = document.querySelector(".account_details_container");
var userOrders = document.querySelector(".my_orders_container");
var userCart = document.querySelector(".my_cart_container");

// Store references to the navigation buttons
var myOrders = document.querySelector(".my_orders");
var myCart = document.querySelector(".cart");
var myProfile = document.querySelector(".profile");

// Add event listeners to the navigation buttons
myOrders.addEventListener("click", showMyOrders);
myCart.addEventListener("click", showMyCart);
myProfile.addEventListener("click", showMyProfile);

function showMyOrders() {
  userDetail.style.display = "none";
  userOrders.style.display = "block";
  userCart.style.display = "none";
  hidePopup("pop1");
  hidePopup("pop2");
  hidePopup("pop3");
  hidePopup("pop4");
  hidePopup("pop5");
}
function showMyCart() {
  userDetail.style.display = "none";
  userOrders.style.display = "none";
  userCart.style.display = "block";
  hidePopup("pop1");
  hidePopup("pop2");
  hidePopup("pop3");
  hidePopup("pop4");
  hidePopup("pop5");
}
function showMyProfile() {
  userDetail.style.display = "block";
  userOrders.style.display = "none";
  userCart.style.display = "none";
}
