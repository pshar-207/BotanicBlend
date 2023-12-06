window.addEventListener("scroll", function () {
  let slideInText = document.querySelector(".slide_in_text");
  let container = document.querySelector(".why_BB_text");
  let containerLeft = container.getBoundingClientRect().left;
  let slideInAt = window.scrollX + containerLeft - container.clientWidth / 2;

  if (slideInAt > containerLeft) {
    slideInText.style.left = "0";
  } else {
    slideInText.style.left = "-100%";
  }
});
