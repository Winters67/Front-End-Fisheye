import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { Category } from "../factories/Category.js";
import { LightBox } from "../factories/Lightbox.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

document
  .getElementById("contactButton")
  .addEventListener("click", displayModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

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
    // console.log(data);
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
  // console.log(selectedPhotographer);
  displayData(selectedPhotographer);
}

getData().then((result) => {
  // media
  let listMedia = result.media;
  let listCategory = listMedia.map((category) => new Category(category));

  let listCategoryFilter = listCategory.filter(function (media) {
    return media.photographerId == idCheck();

  });
  
  // photographe
  let listPhotograph = result.photographers;
  console.log(listPhotograph);
  
  let listphotographFilter = listPhotograph.filter(function (photographer) { 
    return photographer.id == idCheck();
  });
  console.log(listphotographFilter)
  
// affichage nom dans la modal
  function modalName() {
    for (let index = 0; index < listphotographFilter.length; index++) {
      const element = listphotographFilter[index];
      document.getElementById('nameModal').innerHTML = `<h2>Contactez-moi</h2><h2>${element.name}</h2>`
      return element.name;
    }}
modalName()


  function firstName() {
    for (let index = 0; index < listphotographFilter.length; index++) {
      const element = listphotographFilter[index];
      return element.name.split(" ")[0];
    }
    console.log(firstName());
  }
  const finishList = listphotographFilter.concat(listCategoryFilter);

  for (let index = 0; index < finishList.length; index++) {
    const element = finishList[index];
    Object.assign(element, { name: firstName() });
    // console.log(element);
  }
  let listCategoryDom = listCategoryFilter
    .map((category) => category.createCard())
    .join("");

  document
    .querySelector("#photograph-gallery")
    .insertAdjacentHTML("afterbegin", listCategoryDom);

  // lightBox
  let lightBox = new LightBox(listCategoryFilter);

  document
    .querySelectorAll("#photograph-gallery .card")
    .forEach((listCategoryDom) => {
      listCategoryDom.addEventListener("click", (e) => {
        lightBox.show(e.currentTarget.dataset.id);
      });
    });

  // console.log(idCheck());
  // console.log(category.media);
  // console.log(listCategoryFilter);
  return listCategoryDom;
});

initInfo();
