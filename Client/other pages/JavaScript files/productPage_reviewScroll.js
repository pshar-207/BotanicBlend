function scrollToReview() {
  // Get the reference to the section you want to scroll to
  var review_section = document.querySelector(".customer_reviews_container"); // Change this to the ID of your target section

  // Use the scrollIntoView method to scroll to the section
  if (review_section.scrollIntoView) {
    review_section.scrollIntoView({
      behavior: "smooth", // You can use 'auto' or 'smooth' for scrolling behavior
      block: "start", // You can use 'start', 'center', or 'end' for vertical alignment
    });
  } else {
    // Fallback for browsers that do not support smooth scrolling
    window.scrollTo(0, review_section.offsetTop);
    // review_section.scrollIntoView({
    //   block: "start", // You can use 'start', 'center', or 'end' for vertical alignment
    // });
  }
}
