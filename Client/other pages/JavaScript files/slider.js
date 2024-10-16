const testimonials = document.querySelectorAll(".slide_items");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    if (i === index) {
      testimonial.style.display = "block";
    } else {
      testimonial.style.display = "none";
    }
  });
}

function slideToNext() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

function slideToPrev() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
}

prevButton.addEventListener("click", slideToPrev);
nextButton.addEventListener("click", slideToNext);

// Automatically slide to the next testimonial every 5 seconds
setInterval(slideToNext, 5000);

showTestimonial(currentIndex);
