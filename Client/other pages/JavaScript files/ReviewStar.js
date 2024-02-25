let selectedRating = 0;

function updateStars(rating) {
  if (selectedRating === 0) {
    const stars = document.querySelectorAll(".star");
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].src = "Photos/Stars/active-star.png";
      } else {
        stars[i].src = "Photos/Stars/unactive-star.png";
      }
    }
  }
}
function resetStars() {
  if (selectedRating === 0) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.src = "Photos/Stars/unactive-star.png";
    });
  }
}
function setRating(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.src = "Photos/Stars/active-star.png";
    } else {
      star.src = "Photos/Stars/unactive-star.png";
    }
  });
}
