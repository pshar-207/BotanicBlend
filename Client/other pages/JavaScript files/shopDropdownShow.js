document.addEventListener("DOMContentLoaded", function () {
  const shop = document.querySelector(".shop");
  const shopDropDown = document.querySelector(".shopDropDownOuterContainer");
  const navbarContainer = document.getElementById("navbar-container");

  shop.addEventListener("mouseover", () => {
    shopDropDown.style.display = "block";
    shop.style.textDecoration = "underline";
  });
  shopDropDown.addEventListener("mouseover", () => {
    shopDropDown.style.display = "block";
    shop.style.textDecoration = "underline";
    navbarContainer.style.backgroundColor = "white";
  });
  shopDropDown.addEventListener("mouseout", () => {
    shopDropDown.style.display = "none";
    shop.style.textDecoration = "none";
    if (window.scrollY == 0 && isSearchOpen != true && isCartOpen != true) {
      navbarContainer.style.backgroundColor = "transparent";
    }
  });
  shop.addEventListener("mouseout", () => {
    shopDropDown.style.display = "none";
    shop.style.textDecoration = "none";
  });
});
