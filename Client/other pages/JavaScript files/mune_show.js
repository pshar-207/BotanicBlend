var isMenuOpen = false;
console.log(document.querySelector(".Menu_container"));

function toggleMenu() {
  var Menu = document.querySelector(".Menu_container");
  console.log(Menu);

  Menu.style.right = "0px";
  Menu.style.boxShadow = "-12px 10px 17px 4px rgba(0, 0, 0, 0.3)";
  isMenuOpen = true;
}

console.log("Cart Working");

function closeMenu() {
  var Menu = document.querySelector(".Menu_container");
  Menu.style.right = "-80vw";
  Menu.style.boxSl̥hadow = "none";
  isMenuOpen = false;
}
