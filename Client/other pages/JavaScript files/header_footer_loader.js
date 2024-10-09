let login_button;

// Function to load Header and Footer content and insert it into a placeholder
function loadAndInsertContent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      // Insert the fetched content into the placeholder
      placeholder.innerHTML = content;

      login_button = document.getElementById("login-button");
      // After content is loaded, change the background color
      // Call the function to change the background color on scroll
      changeNavbarBackgroundColorOnScroll();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}
// Load header and footer using the function
loadAndInsertContent("/other pages/Header.html", "header-placeholder");
loadAndInsertContent("/other pages/Footer.html", "footer-placeholder");

//Add these lines to check if the user is logged in or not
document.addEventListener("DOMContentLoaded", () => {
  // const login_button = document.getElementById("login-button");

  // Check if the user is authenticated
  fetch("/isUserLogedIn")
    .then((response) => response.json())
    .then((data) => {
      // login_button.style.backgroundColor = "cyan";
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
