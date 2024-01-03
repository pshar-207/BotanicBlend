var reviewContainer = document.querySelector(".review_write_container");
const reviewButton = document.querySelector(".writeReview");
var reviewClicked = null;
reviewButton.addEventListener("click", () => {
  if (reviewClicked) {
    reviewContainer.style.display = "none";
    reviewClicked = false;
    reviewButton.textContent = "Write a review";
  } else {
    reviewContainer.style.display = "block";
    reviewClicked = true;
    reviewButton.textContent = "Hide";
  }
});
