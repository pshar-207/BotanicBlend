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
