function scrollToReview() {
  var review_section = document.querySelector(".customer_reviews_container");
  if (review_section.scrollIntoView) {
    review_section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    window.scrollTo(0, review_section.offsetTop);
  }
}
