export class Category {
  constructor(json) {
    json && Object.assign(this, json);
    // console.log(this);
  }

  createCard() {
    if (this.image === undefined)
      return `
    <figure class="figure-card">
    <div class="card" id="card-id" data-id="${this.id}">
    <video>
    <source src="/assets/images/${this.name}/${this.video}"  alt="${this.title}"  type="video/mp4"> 
    </video>
    </div>
    <figcaption>
    <h4>${this.title}</h4>
    <button  onClick ="getLikes()" class="btn-like">
    <span class"likes-container">${this.likes}
    </span>
    <img src="/assets/icons/heart-solid.svg" alt="coeur rouge">
    </button>
    </figcaption>
    </figure>
    `;

    if (this.video === undefined)
      return `
      <figure class="figure-card">
      <div class="card" id="card-id" data-id="${this.id}">
    <img  src="/assets/images/${this.name}/${this.image}" alt="${this.title}">
    </div>
     <figcaption>
     <h4>${this.title}</h4>
     <button  onClick ="getLikes()" class="btn-like">
     <span class"likes-container">${this.likes}
     </span>
     <img src="/assets/icons/heart-solid.svg" alt="coeur rouge">
     </button>
     </figcaption>
     </figure>
     `;
  }
}
