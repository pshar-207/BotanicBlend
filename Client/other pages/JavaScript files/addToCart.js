function addToCart(name) {
  // Check if the user is authenticated
  fetch("/checkAuth")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        AddingProductToCart(name);
      } else {
        alert("You must log in.");
      }
    })
    .catch((error) => {
      console.error("Error checking authentication:", error);
    });
}

function AddingProductToCart(product_name) {
  fetch("/AddToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: product_name }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        getAddToCartProduct();
        toggleCart();
      }
      if (data.message == "Product already in the cart") {
        toggleCart();
      }
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
    });
}

function getAddToCartProduct() {
  fetch("/GetAddToCartProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const CartList = document.getElementById("CartProductsList");
      if (data.success) {
        var currentPath = window.location.pathname;
        var link;
        // console.log(currentPath);
        CartList.innerHTML = "";
        const cart = data.row;
        cart.forEach((cart_product) => {
          if (currentPath === "/") {
            link = `other pages/Product_Page.html?productName=${cart_product.product_name}&price=${cart_product.price}&img=${cart_product.img_url}&rating=${cart_product.rating}`;
          } else {
            link = `Product_Page.html?productName=${cart_product.product_name}&price=${cart_product.price}&img=${cart_product.img_url}&rating=${cart_product.rating}`;
          }
          // console.log(link);
          const listItem = document.createElement("li");
          listItem.innerHTML = `
          <div class="cartProductImg">
                <a href="${link}">
                  <img
                    class="CartProductImage"
                    src="${cart_product.img_url}"
                    alt=""
                /></a>
              </div>
              <div class="cartProductDetails">
                <div class="cartProductName">${cart_product.product_name}</div>
                <div class="cartProductRating">${generateStars(
                  cart_product.rating
                )}</div>
                <div class="cartProductPrice">${cart_product.price}</div>
              </div>
              <div class="buy_remove_btn">
                <div class="remove_button" onclick='removeFromCart("${
                  cart_product.product_name
                }")'><i class="fa-solid fa-xmark"></i></div>
              
              </div>
        `;
          CartList.appendChild(listItem);
        });

        if (currentPath.includes("other%20pages")) {
          const CartImages = document.querySelectorAll(".CartProductImage");
          CartImages.forEach((image) => {
            image.src = image.src.replace("other%20pages", "");
          });
          const reviewStars = document.querySelectorAll(".reviesStars");
          reviewStars.forEach((star) => {
            star.src = star.src.replace("other%20pages", "");
          });
          console.log("Path changed");
        }
      }
    })
    .catch((error) => {
      console.error("Error updating review list:", error);
    });
}
getAddToCartProduct();

function removeFromCart(name) {
  console.log(name);
  fetch("/RemoveFromCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productName: name }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        getAddToCartProduct();
        getAddToCartForMyCartAccount();
      } else {
        alert(data.message || "Failed to remove product from the cart");
      }
    })
    .catch((error) => {
      console.error("Error removing product from cart:", error);
    });
}
function generateStars(rating) {
  const maxStars = 5;
  const starHtml = Array.from({ length: rating }, () => {
    return `<img class="reviesStars" src="other%20pages/Photos/Stars/active-star.png" alt="" />`;
  });
  return starHtml.join("");
}
