//récupérer les champs du formulaire
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let date = document.getElementById("birthdate");
let quantity = document.getElementById("quantity");
let locations = document.querySelectorAll('input[type="radio"]');
console.log(locations)
let checkbox1 = document.getElementById("checkbox1");

function afficherMessageErreur(champ, message) {
  let formData = champ.closest(".formData");
  if (formData) {
    formData.setAttribute("data-error", message);
    if (message) {
      formData.setAttribute("data-error-visible", "true");
    } else {
      formData.removeAttribute("data-error-visible");
    }
  }
}

//valider champ prénom en ajoutant, la validation se fait en temps réel
function firstNameValid(firstName) {
  let value = firstName.value.trim();
  if (value.length < 2) {
    afficherMessageErreur(
      firstName,
      "Le prénom doit avoir au moins deux caractères"
    );
  } else {
    afficherMessageErreur(firstName, "");
  }
}
firstName.addEventListener("input", () => {
  firstNameValid(firstName);
});
//valider champ nom, avec évènement input
function lastNameValid(lastName) {
  let value = lastName.value.trim();
  if (value.length < 2) {
    afficherMessageErreur(
      lastName,
      "Le nom doit avoir au moins deux caractères"
    );
  } else {
    afficherMessageErreur(lastName, "");
  }
}
lastName.addEventListener("input", () => {
  lastNameValid(lastName);
});
//valider champ email
function emailValid(email) {
  if (!email.checkValidity() || email.value === "") {
    //utiliser checkValidity fonction intégrée pour valider l'email
    afficherMessageErreur(email, "EMAIL NON VALID");
  } else {
    afficherMessageErreur(email, "");
  }
}
email.addEventListener("input", () => {
  emailValid(email);
});
// vérifier la date de naissance, 
function validateBirthday(date) { //si on ne veut pas vérifier l'âge ( on mets juste une condition if(!date.value))
    let dateValue = new Date(date.value) 
    let dateNow = new Date() //obtenir la date actuelle
    let difference = dateNow - dateValue
    let age = Math.floor(difference / (1000 * 60 *60 *24 *365)) //calculer la différence d'age en arrondissant le résultat à l'entier inférieur
    if (!date.value || age < 12) {
        afficherMessageErreur(date, "Ce champ doit être saisi, Vous devez avoir au moins 12 ans pour participer");
    }else{
        afficherMessageErreur(date, "");
    }
}
date.addEventListener("change", () => {
    validateBirthday(date);
  });
// vérifier si la valeur du nombre de concours doit être numérique
function quantityValid(quantity) {
  if (quantity.value.trim() === "") {
    afficherMessageErreur(quantity, "Veuiller entrer un chiffre");
  } else {
    afficherMessageErreur(quantity, "");
  }
}
quantity.addEventListener("input", () => {
    quantityValid(quantity);
  });
// vérifier qu'il y ait un bouton radio sélectionné
//let locations = document.querySelectorAll('input[name="location"]')
function validateRadio(locations){
    let radioChecked = false;
    let i = 0;
    // Utilisation d'une boucle while pour parcourir les boutons radio
    while (!radioChecked && i < locations.length) {
        if (locations[i].checked) {
            radioChecked = true;
        }
        i++;
    }
    // Afficher un message d'erreur si aucun bouton radio n'est sélectionné
    if (!radioChecked) {
        afficherMessageErreur(locations[0], "Veuillez choisir une option");
    } else {
        afficherMessageErreur(locations[0], ""); // Effacer le message d'erreur s'il y en a un
    }
}
locations.forEach(function(location) {
    location.addEventListener("change", function() {
        validateRadio(locations);
    });
});
   
// Validation des conditions générales
function validateGenralCondition(checkbox1){
    if (!checkbox1.checked){
        afficherMessageErreur(checkbox1, "Veuiller accepter les conditions générales")
    } else {
        afficherMessageErreur(checkbox1, "")
    }
}
checkbox1.addEventListener("change", function(){
    validateGenralCondition(checkbox1)
})

// ajout page de confirmation
function confirmationSubmit() {
    
}

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    firstNameValid(firstName);
    lastNameValid(lastName);
    emailValid(email);
    quantityValid(quantity);
    validateBirthday(date);
    validateRadio(locations);
    validateGenralCondition(checkbox1)
  } catch (erreur) {
    console.log(erreur.message); // Afficher l'erreur dans la console
    afficherMessageErreur(erreur.champ, erreur.message); // Afficher le message d'erreur sous le champ concerné
  }
});
