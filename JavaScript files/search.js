var isSearchOpen = false;
function togglesearch() {
  var search = document.getElementById("searchContainer");
  search.style.width = search.style.width === "auto" ? "0" : "auto";
  if (isSearchOpen === false) {
    isSearchOpen = true;
  } else isSearchOpen = false;
  console.log(isSearchOpen);
}
