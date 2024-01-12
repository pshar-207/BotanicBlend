//Add these lines to check if the user is logged in or not
document.addEventListener("DOMContentLoaded", () => {
  const login_button = document.getElementById("login-button");

  // Check if the user is authenticated
  fetch("/isUserLogedIn")
    .then((response) => response.json())
    .then((data) => {
      login_button.style.backgroundColor = "cyan";
      if (data.isAuthenticated) {
        // User is authenticated, show logout button
        login_button.onclick = "";
        login_button.onclick = () => {
          var currentPath = window.location.pathname;
          if (currentPath.includes("other%20pages")) {
            window.location.href = "account.html";
          } else {
            window.location.href = "other pages/account.html";
          }
        };
        console.log("User Logged in");
      } else {
        login_button.onclick = toggleLoginForm;
        console.log("User isn't logged in");
      }
    })
    .catch((error) => console.error("Error checking authentication:", error));
});
