import { photographerFactory } from "../factories/photographer.js";
// import { displayModal, closeModal } from "../utils/contactForm";

// document
//   .getElementById("contactButton")
//   .addEventListener("click", displayModal);
// document.getElementById("closeModal").addEventListener("click", closeModal);

// Recupère les information des photographes

async function getPhotographerInfo(userId) {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const filterPhotographer = data.photographers.filter(function (
      photographer
    ) {
      return photographer.id === userId;
    });
    return filterPhotographer[0];
  } catch {
    console.log("error");
  }
}

// affiche les données des photographes

function displayData(photographer) {
  const photographersInfo = document.querySelector(".photograph-info");
  const photographersImg = document.querySelector(".photograph-img");
  const photographerModel = photographerFactory(photographer);
  const userInfo = photographerModel.getUserInfo();
  const userImg = photographerModel.getUserImg();
  photographersInfo.appendChild(userInfo);
  photographersImg.appendChild(userImg);
}

// affiche les infos avec id qui correspond 

async function initInfo() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const photographerId = Number(params.get("id"));
  const selectedPhotographer = await getPhotographerInfo(photographerId);
  if (selectedPhotographer === undefined) {
    document.body.innerHTML = "Erreur ";
    return;
  }
  displayData(selectedPhotographer);
}

initInfo();
