function toggleLoginForm() {
  var loginForm = document.getElementById("login_form_container");
  loginForm.style.top = loginForm.style.top === "0px" ? "-50rem" : "0px";
  if (isCartOpen === false) {
    isCartOpen = true;
  } else isCartOpen = false;
  console.log(isCartOpen);
}
