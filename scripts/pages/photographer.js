import { photographerFactory } from "../factories/photographer.js";
import { displayModal, closeModal } from "../utils/contactForm";

// document
//   .getElementById("contactButton")
//   .addEventListener("click", displayModal);
// document.getElementById("closeModal").addEventListener("click", closeModal);

async function getPhotographers() {
  try {
    const photographers = await fetch("../data/photographers.json");
    const data = await photographers.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erreur: " + error);
  }
}
