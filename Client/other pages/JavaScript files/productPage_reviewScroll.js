function scrollToReview() {
  var review_section = document.querySelector(".customer_reviews_container");
  var navbarHeight = document.querySelector(".header_containor").offsetHeight;
  var scrollOffset = 50;

  if (review_section) {
    var targetScrollPos =
      review_section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      scrollOffset;
    window.scrollTo({ top: targetScrollPos, behavior: "smooth" });
  }
}
