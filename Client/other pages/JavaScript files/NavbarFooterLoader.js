let login_button;

// Function to load Header and Footer content and insert it into a placeholder
function loadAndInsertContent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      placeholder.innerHTML = content;
      login_button = document.getElementById("login-button");
      changeNavbarBackgroundColorOnScroll();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}
// Loading header and footer using the function
loadAndInsertContent("/other pages/Navbar.html", "header-placeholder");
loadAndInsertContent(
  "/other pages/FooterForOtherPages.html",
  "footer-placeholder"
);

//checking if the user is logged in or not
document.addEventListener("DOMContentLoaded", () => {
  fetch("/isUserLogedIn")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        login_button.onclick = "";
        login_button.onclick = () => {
          window.location.href = "account.html";
        };
        console.log("User Logged in");
      } else {
        login_button.onclick = toggleLoginForm;
        console.log("User isn't logged in");
      }
    })
    .catch((error) => console.error("Error checking authentication:", error));
});

//Function to change Navbar color
function changeNavbarBackgroundColorOnScroll() {
  const navbarContainer = document.getElementById("navbar-container");

  // Function to handle hover effect
  function handleNavbarHover() {
    navbarContainer.style.backgroundColor = "white";
  }

  // Function to handle mouseout event
  function handleNavbarMouseOut() {
    if (window.scrollY == 0 && isCartOpen != true) {
      navbarContainer.style.backgroundColor = "transparent";
    }
  }

  // Add event listeners for hover effect
  navbarContainer.addEventListener("mouseover", handleNavbarHover);
  navbarContainer.addEventListener("mouseout", handleNavbarMouseOut);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      navbarContainer.style.backgroundColor = "white";
    } else if (isCartOpen != true) {
      navbarContainer.style.backgroundColor = "transparent";
    }
  });
}
