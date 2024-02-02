// products.js
// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Access individual parameters using their names
const PageName = urlParams.get("pageName"); // Outputs "John"

// Use the retrieved data in your JavaScript code
// console.log(PageName);

function AllProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "All Products";
  subHeading.innerHTML = "Products";

  // Fetch the list of products from the server
  fetch("/getAllProducts")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllBestSellerProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "Best Sellers";
  subHeading.innerHTML = "Best Seller Products";

  // Fetch the list of products from the server
  fetch("/All_Best_Sellers")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllNewArrivalProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "New Arrivals";
  subHeading.innerHTML = "New Arrival Products";

  // Fetch the list of products from the server
  fetch("/All_New_Arrivals")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllCreams() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "CREAMS";
  subHeading.innerHTML = "All Creams";

  // Fetch the list of products from the server
  fetch("/All_Creams_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllGels() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "GELS";
  subHeading.innerHTML = "All Gels";

  // Fetch the list of products from the server
  fetch("/All_Gels_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllBathing() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "BATHING";
  subHeading.innerHTML = "All Bathing";

  // Fetch the list of products from the server
  fetch("/All_Bathing_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllBodyCare() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "BODYCARE";
  subHeading.innerHTML = "All BodyCare";

  // Fetch the list of products from the server
  fetch("/All_BodyCare_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function AllDrySkinProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "DRY SKIN";
  subHeading.innerHTML = "DrySkin Products";

  // Fetch the list of products from the server
  fetch("/DrySkin_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllOilySkinProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "OILY SKIN";
  subHeading.innerHTML = "OilySkin Products";

  // Fetch the list of products from the server
  fetch("/OilySkin_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}
function AllNormalSkinProducts() {
  const heading = document.querySelector(".heading");
  const subHeading = document.querySelector(".subHeading");
  heading.innerHTML = "NORMAL SKIN";
  subHeading.innerHTML = "NormalSkin Products";

  // Fetch the list of products from the server
  fetch("/NormalSkin_Products")
    .then((response) => response.json())
    .then((data) => {
      console.log("get data");
      // Call a function to render the products on the multipleProducts.html page
      renderProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

if (PageName == "AllProducts") {
  AllProducts();
}
if (PageName == "AllBestSellerProducts") {
  AllBestSellerProducts();
}
if (PageName == "AllNewArrivalProducts") {
  AllNewArrivalProducts();
}
if (PageName == "Creams") {
  AllCreams();
}
if (PageName == "Gels") {
  AllGels();
}
if (PageName == "Bathing") {
  AllBathing();
}
if (PageName == "BodyCare") {
  AllBodyCare();
}
if (PageName == "DrySkin") {
  AllDrySkinProducts();
}
if (PageName == "OilySkin") {
  AllOilySkinProducts();
}
if (PageName == "NormalSkin") {
  AllNormalSkinProducts();
}

function renderProducts(data) {
  console.log("fetching");
  const productsCount = document.querySelector(".ProductsCount");
  // Get the UL element
  const productsListContainer = document.querySelector(".ProductsListCotainer");

  // Clear existing products
  productsListContainer.innerHTML = "";

  // Loop through the data and create list items
  data.forEach((product) => {
    var buyProduct = [];
    var buy_product = {
      img: product.image_url.replace("other pages/", ""),
      name: product.name,
      price: parseInt(product.price, 10),
      quantity: 1,
      rating: product.rating,
      weight: product.size,
    };
    buyProduct.push(buy_product);
    const listItem = document.createElement("li");
    let newImgUrl = product.image_url.replace("other pages/", "");

    listItem.innerHTML = `
      <div class="product_container">
        <div class="product_image">
          <a href="Product_Page.html?productName=${product.name}&price=${
      product.price
    }&img=${newImgUrl}&rating=${product.rating}">
            <img src="${newImgUrl}" alt="" loading="lazy" />
          </a>
        </div>
        <div class="product_name">${product.name}</div>
        
        <div class="product_rating">${generateStarsForMultiplePage(
          product.rating
        )}</div>
        <div class="product_price">Price : 
          ${parseInt(product.price)}
          <div
            class="add_to_cart product-container"
            onmouseover="showAddToCart(this) ; changeColors(this)"
            onmouseout="hideAddToCart(this)"
          >
            <div class="icon">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div class="add-to-cart" onclick='addToCart("${
              product.name
            }")'>Add to Cart</div>
          </div>
        </div>
        <a href="paymentPage.html?product=${encodeURIComponent(
          JSON.stringify(buyProduct)
        )}">
          <div
            class="product_buttons btn_color"
            onmouseover="changeColors(this)"
          >
            Buy
          </div>
        </a>
      </div>
    `;

    // Append the list item to the UL
    productsListContainer.appendChild(listItem);
  });
}

function generateStarsForMultiplePage(rating) {
  const starHtml = Array.from({ length: rating }, () => {
    return `<img class="MultiplePageReviesStars" src="Photos/Stars/active-star.png" alt="" />`;
  });
  return starHtml.join("");
}
