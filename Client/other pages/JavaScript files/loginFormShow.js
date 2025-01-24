var isLoginFromOpen = false;

function toggleLoginForm() {
  var loginForm = document.getElementById("login_form_container");

  if (loginForm.style.top === "0px") {
    loginForm.style.top = "-100rem";
    isLoginFromOpen = false;
  } else {
    loginForm.style.top = "0px";
    isLoginFromOpen = true;
  }
}
console.log("Login Form Working");
