function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const footer = document.querySelector("footer")
const nav = document.querySelector(".topnav")
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modal = document.querySelector(".close");
const confirmModalClose = document.querySelector(".modal-confirmation-close")
const background = document.querySelector(".hero-section")
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  background.style.display = "none";
  footer.style.display = "none"
  if (window.innerWidth < 768) {
    nav.style.display = "block"; // Afficher la barre de navigation en version mobile
  } else {
    nav.style.display = "none"; // Cacher la barre de navigation en version bureau
  }
}
// fermer la modale
function closeModal() {
  modalbg.style.display = "none";
  window.location.reload()
}

modal.addEventListener("click", closeModal)
confirmModalClose.addEventListener("click", closeModal);

