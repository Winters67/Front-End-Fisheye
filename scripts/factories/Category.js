export class Category {
  constructor(json) {
    json && Object.assign(this, json);
console.log (this)

  }

  createCard() {
if (this.image === undefined)
    return `<div class="card">
    <figure>
    <video>
    <source src="/assets/images/${this.name}/${this.video}"> 
    </video>
    <figcaption>
    <h5>${this.title}</h5>
    <p>${this.likes}
     <img src="/assets/icons/heart-solid.svg">
     </p>
    </figcaption>
    </figure>
       </div>`;

if (this.video === undefined)
      return `<div class="card">
      <figure>
     <img src="/assets/images/${this.name}/${this.image}">
     <figcaption>
     <h5>${this.title}</h5>
     <p>${this.likes}
     <img src="/assets/icons/heart-solid.svg">
     </p>
     </figcaption>
     </figure>
     </div>`;
  }
}
