const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.querySelector(".hero_indicators");
var counter = 0;
var intervalId;

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

const goPrev = () => {
  counter = (counter - 1 + slides.length) % slides.length;
  slideImage();
  updateIndicators();
};

const goNext = () => {
  counter = (counter + 1) % slides.length;
  slideImage();
  updateIndicators();
};

const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
  updateIndicators();
};

// dots
const updateIndicators = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === counter);
  });
};

slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    counter = index;
    slideImage();
    clearInterval(intervalId);
    startInterval();
  });
  indicatorsContainer.appendChild(dot);
});
updateIndicators();

const startInterval = () => {
  intervalId = setInterval(goNext, 5000);
};
// startInterval();
