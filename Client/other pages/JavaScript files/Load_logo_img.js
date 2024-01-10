function loadBackupLogoImage() {
  console.log("functio called");
  var imgs = document.querySelectorAll(".BB_logo_img");
  imgs.forEach(function (img) {
    img.src = "Photos/Header Image/BB_Logo.png";
  });
  console.log("executed");
}
