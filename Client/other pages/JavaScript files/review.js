// //BEST SELLERS PRODUCTS
// fetch("/Best_Sellers")
//   .then((response) => response.json())
//   .then((data) => {
//     renderBestSellers(data);
//   })
//   .catch((error) => console.error("Error fetching data:", error));

// function renderBestSellers(data) {
//   const bestSellerList = document.querySelector(".bestSellerList");
//   bestSellerList.style.height = "2rem";
//   bestSellerList.style.backgroundColor = "red";

//   data.forEach((product) => {
//     const listItem = document.createElement("li");
//     var modifiedImagePath = product.image_url.replace("other pages/", "");
//     listItem.innerHTML = `
//                 <div class="best_sell_product_section">
//                   <div class="best_sell_product_image">
//                       <a href="#"><img src="${modifiedImagePath}" alt="" /></a>
//                     </div>
//                     <div class="best_sell_product_name">${product.name}</div>
//                     <div class="best_sell_product_desc">${
//                       product.description
//                     }</div>
//                     <div class="best_sell_product_rating">${generateStars(
//                       product.rating
//                     )}</div>
//                     <div class="best_sell_product_price">
//                         <div class="price">${product.price}</div>
//                         <!-- Add to Cart section -->
//                         <div class="add_to_cart product-container"
//                             onmouseover="showAddToCart(this) ; changeColors(this)"
//                             onmouseout="hideAddToCart(this)">
//                             <div class="icon">
//                                  <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     height="16"
//                                     width="15"
//                                     viewBox="0 0 576 512"
//                                     >
//                                     <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
//                                     <path
//                                         d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
//                                     />
//                                 </svg>
//                             </div>
//                             <div class="add-to-cart" onclick='addToCart("${
//                               product.name
//                             }")'>Add to Cart</div>
//                         </div>
//                     </div>
//                     <!-- Buy button -->
//                     <a href=""><div class="new_arrival_product_buttons btn_color"
//                         onmouseover="changeColors(this)">
//                         Buy
//                     </div></a>
//                 </div>
//             `;
//     bestSellerList.appendChild(listItem);
//   });
// }

// Function to submit a review
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_Name = urlParams.get("productName");
function submitReview(event) {
  event.preventDefault();
  const rating = getSelectedRating();
  const title = document.getElementById("reviewTitle").value;
  const body = document.getElementById("reviewBody").value;

  fetch("/checkAuth")
    .then((response) => response.json())
    .then((data) => {
      if (data.isAuthenticated) {
        const reviewData = { rating, title, body, product_Name };
        submitReviewToServer(reviewData);
      } else {
        alert("You must log in before submitting a review.");
      }
    })
    .catch((error) => {
      console.error("Error checking authentication:", error);
    });
}

// Function to submit the review data to the server
function submitReviewToServer(reviewData) {
  fetch("/submitReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        updateReviewList(product_Name);
      } else {
        alert("Failed to submit the review. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
    });
}

// Function to update the review list from the server
function updateReviewList(product_Name) {
  fetch(`/getReviews?productName=${product_Name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const reviews = data.reviews;
      const reviewList = document.getElementById("reviewList");
      reviewList.innerHTML = "";
      reviews.forEach((review) => {
        const formattedDate = new Date(review.created_at).toLocaleString();
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <div class="customerName_date_container">
            <div class="customer_name">${review.user_name}</div>
            <span>on</span>
            <div class="date">${formattedDate}</div>
          </div>
          <div class="rating">${generateStarsForReviewSection(
            review.user_rating
          )}</div>
          <div class="review_title">${review.title}</div>
          <div class="review_body">${review.body}</div>
        `;
        reviewList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error updating review list:", error);
    });
}

function generateStarsForReviewSection(rating) {
  const starHtml = Array.from({ length: rating }, () => {
    return `<img class="CustomerReviesStars" src="Photos/Stars/active-star.png" alt="" />`;
  });
  return starHtml.join(""); // Join the array of active star images into a string
}

// Function to get the selected rating
function getSelectedRating() {
  return selectedRating;
}

// Attach the submitReview function to the form submission
document.getElementById("reviewForm").addEventListener("submit", submitReview);

updateReviewList(product_Name);
