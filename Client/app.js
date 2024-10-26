//NEW ARRIVALS PRODUCTS
fetch("/New_Arrivals")
  .then((response) => response.json())
  .then((data) => {
    renderNewArrivals(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to render new arrivals
function renderNewArrivals(data) {
  const newArrivalsList = document.getElementById("newArrivalsList");
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
    listItem.innerHTML = `
                <div class="new_arrival_product_section">
                    <div class="new_arrival_product_image">
                        <a href="other pages/Product_Page.html?productName=${
                          product.name
                        }&price=${parseInt(product.price, 10)}&img=${
      product.image_url
    }&rating=${product.rating}"><img src="${product.image_url}" alt="" /></a>
                    </div>
                    <div class="new_arrival_product_name">${
                      product.name
                    }</div>                    
                    <div class="new_arrival_product_rating">${generateStarsForIndexPage(
                      product.rating
                    )}</div>
                    <div class="new_arrival_product_price">
                        <div class="price">Price : ${parseInt(
                          product.price,
                          10
                        )}</div>
                        <!-- Add to Cart section -->
                        <div class="add_to_cart product-container"
                            onmouseover="showAddToCart(this) ; changeColors(this)"
                            onmouseout="hideAddToCart(this)">
                            <div class="icon" >
                                 <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div class="add-to-cart" onclick='addToCart("${
                              product.name
                            }")'>Add to Cart</div>
                        </div>
                    </div>
                    <!-- Buy button -->
                    <a href="other pages/paymentPage.html?product=${encodeURIComponent(
                      JSON.stringify(buyProduct)
                    )}"><div class="new_arrival_product_buttons btn_color"
                        onmouseover="changeColors(this)">
                        Buy
                    </div></a>
                </div>
            `;
    newArrivalsList.appendChild(listItem);
  });
}

//BEST SELLERS PRODUCTS
fetch("/Best_Sellers")
  .then((response) => response.json())
  .then((data) => {
    renderBestSellers(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

function renderBestSellers(data) {
  const bestSellerList = document.getElementById("bestSellerList");
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
    listItem.innerHTML = `
                <div class="best_sell_product_section">
                  <div class="best_sell_product_image">
                    <a href="other pages/Product_Page.html?productName=${
                      product.name
                    }&price=${parseInt(product.price, 10)}&img=${
      product.image_url
    }&rating=${product.rating}">
                      <img src="${product.image_url}"  alt="" />
                    </a>
                    </div>
                    <div class="best_sell_product_name">${
                      product.name
                    }</div>                    
                    <div class="best_sell_product_rating">${generateStarsForIndexPage(
                      product.rating
                    )}</div>
                    <div class="best_sell_product_price">
                        <div class="price">Price : ${parseInt(
                          product.price,
                          10
                        )}</div>
                        <!-- Add to Cart section -->
                        <div class="add_to_cart product-container"
                            onmouseover="showAddToCart(this) ; changeColors(this)"
                            onmouseout="hideAddToCart(this)">
                            <div class="icon">
                                 <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div class="add-to-cart" onclick='addToCart("${
                              product.name
                            }")'>Add to Cart</div>
                        </div>
                    </div>
                    <!-- Buy button -->
                    <a href="other pages/paymentPage.html?product=${encodeURIComponent(
                      JSON.stringify(buyProduct)
                    )}"><div class="new_arrival_product_buttons btn_color"
                        onmouseover="changeColors(this)">
                        Buy
                    </div></a>
                </div>
            `;
    bestSellerList.appendChild(listItem);
  });
}

function generateStarsForIndexPage(rating) {
  const starHtml = Array.from({ length: rating }, () => {
    return `<img class="IndexPageStars" src="other pages/Photos/Stars/active-star.png" alt="" />`;
  });
  return starHtml.join("");
}
