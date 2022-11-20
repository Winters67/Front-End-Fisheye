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

getData().then((category) => {
  // media
  let listMedia = category.media;
  let listCategory = listMedia.map((category) => new Category(category));
  let listCategoryFilter = listCategory.filter(function (media) {
    return media.photographerId == idCheck();
  });

  // photographe
  let listPhotograph = category.photographers;
  console.log(listPhotograph);

  let listphotographFilter = listPhotograph.filter(function (photographer) {
    return photographer.id == idCheck();
  });

  function firstName() {
    for (let index = 0; index < listphotographFilter.length; index++) {
      const element = listphotographFilter[index];
      return element.name.split(" ")[0];
    }
    console.log(firstName());
  }
  listphotographFilter[0].name = firstName();

  const finishList = listphotographFilter.concat(listCategoryFilter);

  for (let index = 0; index < finishList.length; index++) {
    const element = finishList[index];
     Object.assign(element, { name : firstName()});
  


    console.log(element);
  }

  let arrayPhotographers = finishList.map((category) => new Category(category));

  let listCategoryDom = arrayPhotographers
    .map((category) => category.createCard())
    .join("");

  console.log(finishList);

  document
    .querySelector("#photograph-gallery")
    .insertAdjacentHTML("afterbegin", listCategoryDom);

  // console.log(idCheck());
  // console.log(category.media);
  //  console.log(listCategoryFilter);
  return listCategoryDom;
});

initInfo();
