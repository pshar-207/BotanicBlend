function scrollToReview() {
  var review_section = document.querySelector(".customer_reviews_container");
  var navbarHeight = document.querySelector(".header_containor").offsetHeight; // Adjust selector to target your navbar
  var scrollOffset = 50; // Adjust this value to control how much to scroll before the review section

  if (review_section) {
    var targetScrollPos =
      review_section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      scrollOffset;
    window.scrollTo({ top: targetScrollPos, behavior: "smooth" });
  }
}
