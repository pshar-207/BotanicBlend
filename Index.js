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

// Load header and footer using the function
loadAndInsertContent("Header.html", "header-placeholder");
loadAndInsertContent("Footer.html", "footer-placeholder");
