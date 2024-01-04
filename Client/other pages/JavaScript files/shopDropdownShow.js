document.addEventListener("DOMContentLoaded", function () {
  const shop = document.querySelector(".shop");
  const shopDropDown = document.querySelector(".shopDropDownOuterContainer");

  shop.addEventListener("mouseover", () => {
    shopDropDown.style.display = "block";
    shop.style.textDecoration = "underline";
  });
  shopDropDown.addEventListener("mouseover", () => {
    shopDropDown.style.display = "block";
    shop.style.textDecoration = "underline";
  });
  shopDropDown.addEventListener("mouseout", () => {
    shopDropDown.style.display = "none";
    shop.style.textDecoration = "none";
  });
  shop.addEventListener("mouseout", () => {
    shopDropDown.style.display = "none";
  });
});
