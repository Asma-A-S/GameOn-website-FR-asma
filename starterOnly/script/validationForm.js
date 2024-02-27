//récupérer les champs du formulaire
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let date = document.getElementById("birthdate");
let quantity = document.getElementById("quantity");
let locations = document.querySelectorAll('input[type="radio"]');
let checkbox1 = document.getElementById("checkbox1");

function errorMessage(champ, message) {
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
    errorMessage(
      firstName,
      "Le prénom doit avoir au moins deux caractères"
    );
    return false
  } else {
    errorMessage(firstName, "");
    return true
  }
}
firstName.addEventListener("input", () => {
  firstNameValid(firstName);
});
//valider champ nom, avec évènement input
function lastNameValid(lastName) {
  let value = lastName.value.trim();
  if (value.length < 2) {
    errorMessage(lastName, "Le nom doit avoir au moins deux caractères");
    return false;
  } else {
    errorMessage(lastName, "");
    return true;
  }
}
lastName.addEventListener("input", () => {
  lastNameValid(lastName);
});
//valider champ email
function emailValid(email) {
  if (!email.checkValidity() || email.value === "") {
    //utiliser checkValidity fonction intégrée pour valider l'email
    errorMessage(email, "EMAIL NON VALID");
    return false;
  } else {
    errorMessage(email, "");
    return true;
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
    if (!date.value || age < 0) {
        errorMessage(date, "Ce champ doit être saisi, Vous devez avoir au moins 12 ans pour participer");
      return false;
      }else{
        errorMessage(date, "");
        return true
    }
}
date.addEventListener("change", () => {
    validateBirthday(date);
  });
// vérifier si la valeur du nombre de concours doit être numérique
function quantityValid(quantity) {
  if (quantity.value.trim() === "") {
    errorMessage(quantity, "Veuiller entrer un chiffre");
    return false
  } else {
    errorMessage(quantity, "");
    return true;
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
        errorMessage(locations[0], "Veuillez choisir une option");
        return false;
    } else {
        errorMessage(locations[0], ""); // Effacer le message d'erreur s'il y en a un
    return true
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
        errorMessage(checkbox1, "Veuiller accepter les conditions générales")
        return false
    } else {
        errorMessage(checkbox1, "")
        return true
    }
}
checkbox1.addEventListener("change", function(){
    validateGenralCondition(checkbox1)
})
let form = document.querySelector("form");
// ajout page de confirmation
let modalBody = document.querySelector(".modal-body")
let success = document.querySelector(".modal-confirmation")
function closeModalForm() {
 form.style.opacity = "0"
 success.style.display = "flex"
}
function validationForm(){
  let isValid = true
  isValid &= firstNameValid(firstName);
  isValid &= lastNameValid(lastName);
  isValid &= emailValid(email);
  isValid &= validateBirthday(date);
  isValid &= quantityValid(quantity);
  isValid &= validateRadio(locations);
  isValid &= validateGenralCondition(checkbox1);
  return isValid;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  try{
    if(validationForm()){
        closeModalForm()
    }
} catch (erreur) {
 // Afficher l'erreur dans la console
    errorMessage(erreur.champ, erreur.message); // Afficher le message d'erreur sous le champ concerné
  }; 
  
});
