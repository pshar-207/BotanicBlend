document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementsByClassName("btn");
  var slide = document.getElementById("slide");
  btn[0].onclick = function () {
    slide.style.transform = "translateX(0px)";
    for (i = 0; i < 4; i++) {
      btn[i].classList.remove("active");
    }
    this.classList.add("active");
  };
  btn[1].onclick = function () {
    slide.style.transform = "translateX(-40rem)";
    for (i = 0; i < 4; i++) {
      btn[i].classList.remove("active");
    }
    this.classList.add("active");
  };
  btn[2].onclick = function () {
    slide.style.transform = "translateX(-80rem)";
    for (i = 0; i < 4; i++) {
      btn[i].classList.remove("active");
    }
    this.classList.add("active");
  };
  btn[3].onclick = function () {
    slide.style.transform = "translateX(-120rem)";
    for (i = 0; i < 4; i++) {
      btn[i].classList.remove("active");
    }
    this.classList.add("active");
  };
});
