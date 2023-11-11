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
    navbarContainer.style.backgroundColor = "transparent";
    shopbg.style.backgroundColor = "transparent";
      categorybg.style.backgroundColor = "transparent";
  }

  // Add event listeners for hover effect
  navbarContainer.addEventListener("mouseover", handleNavbarHover);
  navbarContainer.addEventListener("mouseout", handleNavbarMouseOut);

  window.addEventListener("scroll", () => {
    console.log("Scroll position:", window.scrollY);
    if (window.scrollY > 0) {
      navbarContainer.style.backgroundColor = "white";
      shopbg.style.backgroundColor = "white";
      categorybg.style.backgroundColor = "white";
    } else {
      navbarContainer.style.backgroundColor = "transparent";
      shopbg.style.backgroundColor = "transparent";
      categorybg.style.backgroundColor = "transparent";
    }
  });
}

// Load header and footer using the function
loadAndInsertContent("Header.html", "header-placeholder");
loadAndInsertContent("Footer.html", "footer-placeholder");
