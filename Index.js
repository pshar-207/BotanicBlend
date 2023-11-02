// Function to load HTML content and insert it into a placeholder
function loadAndInsertContent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      // Insert the fetched content into the placeholder
      placeholder.innerHTML = content;
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}

// Function to load HTML content and insert it into a placeholder
function loadAndInsertContent(url, placeholderId) {
  const placeholder = document.getElementById(placeholderId);

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      // Insert the fetched content into the placeholder
      placeholder.innerHTML = content;

      // After content is loaded, change the background color
      changeNavbarBackgroundColorOnScroll();
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}
// Function to change Navbar background color on scroll
function changeNavbarBackgroundColorOnScroll() {
  const navbarContainer = document.getElementById("navbar-container");
  const shopbg = document.getElementById("shop_bg");
  const categorybg = document.getElementById("category_bg");

  window.addEventListener("scroll", () => {
    console.log("Scroll position:", window.scrollY);
    if (window.scrollY > 0) {
      // console.log("Scrolling down.");
      navbarContainer.style.backgroundColor = "white";
      shopbg.style.backgroundColor = "white";
      categorybg.style.backgroundColor = "white";
    } else {
      // console.log("At the top.");
      navbarContainer.style.backgroundColor = "transparent";
      shopbg.style.backgroundColor = "transparent";
      categorybg.style.backgroundColor = "transparent";
    }
  });
}

// Call the function to change the background color on scroll
changeNavbarBackgroundColorOnScroll();

// Load header and footer using the function
loadAndInsertContent("Header.html", "header-placeholder");
loadAndInsertContent("Footer.html", "footer-placeholder");
