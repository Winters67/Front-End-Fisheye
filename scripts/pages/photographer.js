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

// menu trie
document.querySelectorAll(".custom-select").forEach(setupSelector);

function setupSelector(selector) {
  selector.addEventListener("change", (e) => {
    console.log("changed", e.target.value);
  });

  selector.addEventListener("mousedown", (e) => {
    if (window.innerWidth >= 420) {
      e.preventDefault();

      const select = selector.children[0];
      const dropDown = document.createElement("ul");
      dropDown.className = "selector-options";

      [...select.children].forEach((option) => {
        const dropDownOption = document.createElement("li");
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event("change"));
          selector.dispatchEvent(new Event("change"));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);
      });

      selector.appendChild(dropDown);

      // handle click out
      document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
          dropDown.remove();
        }
      });
    }
  });
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
  console.log(listphotographFilter);

  // affichage nom dans la modal
  function modalName() {
    for (let index = 0; index < listphotographFilter.length; index++) {
      const element = listphotographFilter[index];
      document.getElementById(
        "nameModal"
      ).innerHTML = `<h2>Contactez-moi</h2><h2>${element.name}</h2>`;
      return element.name;
    }
  }
  modalName();

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

  let lightBox = new LightBox(listCategoryFilter);
  const triLikes = document.getElementById("nav-option-select");

  triLikes.addEventListener("change", function (e) {
    const element = document.getElementById("photograph-gallery");
    console.log(typeof element);
    if (e.target.value === "Popularite") {
      listCategoryFilter.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }
    if (e.target.value === "Date") {
      listCategoryFilter.sort(function (a, b) {
        return a.date - b.date;
      });
    }
    if (e.target.value === "Title") {
      listCategoryFilter.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
    listCategoryFilter.forEach((element) => {
      mediaDisplay(element);
      element.innerHTML = "";
    });
  });
  function mediaDisplay() {
    document.getElementById("photograph-gallery").innerHTML = "";
    let listCategoryDom = listCategoryFilter
      .map((category) => category.createCard())
      .join("");
    document
      .querySelector("#photograph-gallery")
      .insertAdjacentHTML("afterbegin", listCategoryDom);
    document
      .querySelectorAll("#photograph-gallery .card ")
      .forEach((listCategoryDom) => {
        listCategoryDom.addEventListener("click", (e) => {
          lightBox.show(e.currentTarget.dataset.id);
        });
      });

    function priceLikes() {
      for (let index = 0; index < listphotographFilter.length; index++) {
        const element = listphotographFilter[index];
        // console.log(element);
        const result = listCategoryFilter
          .map((i) => i.likes)
          .reduce((a, b) => a + b);
        // console.log(result);

        const para = `<div class="likesInfoPhotographer" aria-label="affiche total likes + prix">
        <div class="likesTotal">
        <span aria-label="total likes" class="likesContainer">${result}</span>
        <img class="logoLikes" src="/assets/icons/heart-black.svg" alt="logo like" />
        </div>
        <span>${element.price} € / jour</span> 
      </div>`;
        document.querySelector(".infoPhotographerDisplay").innerHTML = para;
      }
    }
    priceLikes();
  }
  initInfo();
  mediaDisplay();
});
