import { photographerFactory } from "../factories/photographer.js";

// recupere les data
async function getPhotographers() {
  try {
    const res = await fetch("../data/photographers.json");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erreur: " + error);
  }
}
// affiche les photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCard = photographerModel.getUserCard();
    photographersSection.appendChild(userCard);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
