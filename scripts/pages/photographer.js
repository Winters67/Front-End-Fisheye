import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { Category } from "../factories/Category.js";

// import { displayModal, closeModal } from "../utils/contactForm";

// document
//   .getElementById("contactButton")
//   .addEventListener("click", displayModal);
// document.getElementById("closeModal").addEventListener("click", closeModal);

// Recupère les information des photographes

function idCheck() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  return id;
}

async function getPhotographerInfo(userId) {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    console.log(data);
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

// Recupère les information des medias

// async function getData(userId) {
//   try {
//     const response = await fetch("../data/photographers.json");
//     const data = await response.json();
//     console.log(data);
//

//     });
//     console.log(filterMedia);
//     return filterMedia[""];
//   } catch {
//     console.log("error");
//   }
// }

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
  console.log(selectedPhotographer);
  displayData(selectedPhotographer);
}

getData().then((category) => {
  let listMedia = category.media;
  let listCategory = listMedia.map((category) => new Category(category));
  let listCategoryFilter = listCategory.filter(function (media) {
    return media.photographerId == idCheck();
  });
  let listCategoryDom = listCategoryFilter
    .map((category) => category.createCard())
    .join("");
  console.log(listCategoryFilter);
  document
    .querySelector("#photograph-gallery")
    .insertAdjacentHTML("afterbegin", listCategoryDom);
  console.log(idCheck());
  console.log(category.media);
  console.log(listCategoryFilter);
  return listCategoryFilter;
});

initInfo();
