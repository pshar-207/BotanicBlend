var currentPath = window.location.pathname;
console.log(currentPath);
if (currentPath.includes("other%20pages")) {
  document.getElementById("contact_page_link").href = "contact.html";
  document.getElementById("about_page_link").href = "About_page.html";

  document.getElementById("allSkinCareLink").href =
    "MultipleProductsPage.html?pageName=AllProducts";
  document.getElementById("allNewArrivalsLink").href =
    "MultipleProductsPage.html?pageName=AllNewArrivalProducts";
  document.getElementById("allBestSellersLink").href =
    "MultipleProductsPage.html?pageName=AllBestSellerProducts";
  document.getElementById("allHamersLink").href =
    "MultipleProductsPage.html?pageName=AllHampers";

  document.getElementById("CreamsLink").href =
    "MultipleProductsPage.html?pageName=Creams";
  document.getElementById("GelsLink").href =
    "MultipleProductsPage.html?pageName=Gels";
  document.getElementById("BathingLink").href =
    "MultipleProductsPage.html?pageName=Bathing";
  document.getElementById("BodyCareLink").href =
    "MultipleProductsPage.html?pageName=BodyCare";

  document.getElementById("drySkinLink").href =
    "MultipleProductsPage.html?pageName=DrySkin";
  document.getElementById("oilySkinLink").href =
    "MultipleProductsPage.html?pageName=OilySkin";
  document.getElementById("normalSkinLink").href =
    "MultipleProductsPage.html?pageName=NormalSkin";

  document.getElementById("termConditionLink").href = "term&condition.html";
}
