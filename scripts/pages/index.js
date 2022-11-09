import { photographerFactory } from "../factories/photographer.js";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  try {
    const res = await fetch("../data/photographers.json");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erreur: " + error);
  }
}

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
