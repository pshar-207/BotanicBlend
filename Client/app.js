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
          window.location.href = "other pages/account.html";
        };
        console.log("Setting onclick to logoutUser");
      } else {
        login_button.onclick = toggleLoginForm;
        console.log("Setting onclick to toggleLoginForm");
      }
    })
    .catch((error) => console.error("Error checking authentication:", error));
});

//SingUp
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Follow redirect
        } else {
          return response.json(); // Handle other responses
        }
      })
      .then((data) => {
        if (data.message === "User created successfully") {
          alert("Your account has been created!");
          console.log("created");
        } // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  });
});

// Add these lines to handle logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    fetch("/logout")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Logged out successfully") {
          alert("You have been logged out!");
          window.location.reload(); // Refresh the page
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  });
});

//NEW ARRIVALS PRODUCTS
fetch("/New_Arrivals")
  .then((response) => response.json())
  .then((data) => {
    // Call a function to render the data
    renderNewArrivals(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to render new arrivals
function renderNewArrivals(data) {
  // Get the UL element
  const newArrivalsList = document.getElementById("newArrivalsList");

  // Loop through the data and create list items
  data.forEach((product) => {
    const listItem = document.createElement("li");
    // listItem.className = "first_product";

    listItem.innerHTML = `
                <div class="new_arrival_product_section">
                    <div class="new_arrival_product_image">
                        <a href="#"><img src="${product.image_url}" alt="" /></a>

                    </div>
                    <div class="new_arrival_product_name">${product.name}</div>
                    <div class="new_arrival_product_desc">${product.description}</div>
                    <div class="new_arrival_product_rating">${product.rating}</div>
                    <div class="new_arrival_product_price">
                        <div class="price">${product.price}</div>
                        <!-- Add to Cart section -->
                        <div class="add_to_cart product-container"
                            onmouseover="showAddToCart(this) ; changeColors(this)"
                            onmouseout="hideAddToCart(this)">
                            <div class="icon">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="15"
                                    viewBox="0 0 576 512"
                                    >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                    <path
                                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                    />
                                </svg>
                            </div>
                            <div class="add-to-cart">Add to Cart</div>
                        </div>
                    </div>
                    <!-- Buy button -->
                    <a href=""><div class="new_arrival_product_buttons btn_color"
                        onmouseover="changeColors(this)">
                        Buy
                    </div></a>
                </div>
            `;

    // Append the list item to the UL
    newArrivalsList.appendChild(listItem);
    console.log(product.image_url);
  });
}

//BEST SELLERS PRODUCTS
fetch("/Best_Sellers")
  .then((response) => response.json())
  .then((data) => {
    // Call a function to render the data
    renderBestSellers(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to render new arrivals
function renderBestSellers(data) {
  // Get the UL element
  const bestSellerList = document.getElementById("bestSellerList");

  // Loop through the data and create list items
  data.forEach((product) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
                <div class="best_sell_product_section">
                  <div class="best_sell_product_image">
                      <a href="#"><img src="${product.image_url}" alt="" /></a>

                    </div>
                    <div class="best_sell_product_name">${product.name}</div>
                    <div class="best_sell_product_desc">${product.description}</div>
                    <div class="best_sell_product_rating">${product.rating}</div>
                    <div class="best_sell_product_price">
                        <div class="price">${product.price}</div>
                        <!-- Add to Cart section -->
                        <div class="add_to_cart product-container"
                            onmouseover="showAddToCart(this) ; changeColors(this)"
                            onmouseout="hideAddToCart(this)">
                            <div class="icon">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="15"
                                    viewBox="0 0 576 512"
                                    >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                                    <path
                                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                    />
                                </svg>
                            </div>
                            <div class="add-to-cart">Add to Cart</div>
                        </div>
                    </div>
                    <!-- Buy button -->
                    <a href=""><div class="new_arrival_product_buttons btn_color"
                        onmouseover="changeColors(this)">
                        Buy
                    </div></a>
                </div>
            `;

    // Append the list item to the UL
    bestSellerList.appendChild(listItem);
    console.log(product.image_url);
  });
}