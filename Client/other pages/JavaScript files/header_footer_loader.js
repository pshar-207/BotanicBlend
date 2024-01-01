// Function to load HTML content and insert it into a placeholder
function loadAndInsertContent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      // Insert the fetched content into the placeholder
      placeholder.innerHTML = content;

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

//Function to change Navbar color
function changeNavbarBackgroundColorOnScroll() {
  const navbarContainer = document.getElementById("navbar-container");
  const shopbg = document.getElementById("shop_bg");
  const categorybg = document.getElementById("category_bg");

  // Function to handle hover effect
  function handleNavbarHover() {
    navbarContainer.style.backgroundColor = "white";
    shopbg.style.backgroundColor = "white";
    categorybg.style.backgroundColor = "white";
  }

  // Function to handle mouseout event
  function handleNavbarMouseOut() {
    if (window.scrollY == 0 && isSearchOpen != true && isCartOpen != true) {
      navbarContainer.style.backgroundColor = "transparent";
      shopbg.style.backgroundColor = "transparent";
      categorybg.style.backgroundColor = "transparent";
    }
  }

  // Add event listeners for hover effect
  navbarContainer.addEventListener("mouseover", handleNavbarHover);
  navbarContainer.addEventListener("mouseout", handleNavbarMouseOut);

  window.addEventListener("scroll", () => {
    // console.log("Scroll position:", window.scrollY);
    if (window.scrollY > 0) {
      navbarContainer.style.backgroundColor = "white";
      shopbg.style.backgroundColor = "white";
      categorybg.style.backgroundColor = "white";
    } else if (isSearchOpen != true && isCartOpen != true) {
      navbarContainer.style.backgroundColor = "transparent";
      shopbg.style.backgroundColor = "transparent";
      categorybg.style.backgroundColor = "transparent";
    }
  });
}
