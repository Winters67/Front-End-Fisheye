export { displayModal };
export { closeModal };

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const email = document.getElementById("email");

const regexName = /^[a-z A-Z]{2,25}$/;
const regexEmail = /^\w+([ .-]?\w+)*@\w+([ .-]?\w+)*(\.\w{2,3})+$/;

// variable qui stocke les valeurs des conditions
let valuePrenom, valueNom, valueEmail ;
let erreur = "";

// Prénom ------------ ------------------------------------------------------
prenom.addEventListener("input", (e) => {
  document.getElementById("errorFirstName").innerHTML = erreur;
  if (e.target.value.length < 2 || e.target.value.length > 25) {
    erreur = "veuillez entrer 2 caractères ou plus dans le champ prénom ";
    prenom.style.border = "2px solid red";
    valuePrenom = null;
  }
  // verifie si les caractères conrespondent au regex
  if (
    !e.target.value.match(regexName) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    erreur = "les caractères spéciaux ne sont pas autorisés";
    prenom.style.border = "2px solid red";
    valuePrenom = null;
  }
  // si ok retourne la valeur dans valuePrenom
  if (e.target.value.match(regexName)) {
    valuePrenom = e.target.value;
    prenom.style.border = "2px solid #42f67e";
    console.log("succes regex prénom");
  }
});

// nom --------------------------------------------------------
nom.addEventListener("input", (e) => {
  valueNom;
  document.getElementById("errorLastName").innerHTML = erreur;
  if (e.target.value.length < 2 || e.target.value.length > 25) {
    erreur = "veuillez entrer 2 caractères ou plus dans le champ nom ";
    nom.style.border = "2px solid red";
    valueNom = null;
  }
  if (
    !e.target.value.match(regexName) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    erreur = "les caractères spéciaux ne sont pas autorisés";
    nom.style.border = "2px solid red";
    valueNom = null;
  }
  if (e.target.value.match(regexName)) {
    valueNom = e.target.value;
    nom.style.border = "2px solid #42f67e";
    console.log("succes regex nom");
  }
});

// Email ---------------------------------------------------------------

email.addEventListener("input", (e) => {
  document.getElementById("errorMail").innerHTML = erreur;
  valueEmail;
  // si le champs est vide retourne une erreur
  if (e.target.value.length == 0) {
    erreur = " Email manquant";
    email.style.border = "2px solid red";
    console.log("rien");
    // retourne l'erreur
    valueEmail = null;
    console.log(valueEmail);
    // test la regex avec le champs
  } else if (e.target.value.match(regexEmail)) {
    valueEmail = e.target.value;
    email.style.border = "2px solid #42f67e";
    console.log("succes regex Email");
  }
  // si diffferent de target.value affiche erreur
  if (!e.target.value.match(regexEmail) && !e.target.value.length == 0) {
    erreur = "Veuillez saisir une adresse e-mail valide :  example@email.com ";
    email.style.border = "2px solid red";

    valueEmail = null;
  }
});

// envoi du formulaire


addEventListener("submit", function (e) {
  if (valuePrenom && valueNom && valueEmail) {
    alert(
      "Nom : " +
        valueNom +
        "\n" +
        "Prénom : " +
        valuePrenom +
        "\n" +
        "Email : " +
        valueEmail
    );
  } else {
    e.preventDefault();
    alert(
      "Champs du formulaire incomplet, merci de bien remplir le formulaire"
    );
  }
});
