export class Category {
  constructor(json) {
    json && Object.assign(this, json);  
  }


  createCard() {
    return `<div class="card">
    <div class="title">${this.title}</div>
    <div class="picture">
    <img src="/assets/images/${this.name}/${this.image || this.video}">
    </div>
    </div>`;
  }
}
