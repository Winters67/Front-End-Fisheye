export class Category {
  constructor(json) {
    json && Object.assign(this, json);
    // console.log(this);
  }

  createCard() {
    if (this.image === undefined)
      return `<div class="card" data-id="${this.id}">
    <figure>
    <video>
    <source src="/assets/images/${this.name}/${this.video}" type="video/mp4"> 
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
      return `<div class="card" data-id="${this.id}">
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
