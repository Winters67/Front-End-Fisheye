export class Category {
  constructor(json) {
    Object.assign(this, json);
    

    console.log(this.name)
    

    
  }

  createCard() {
    return `<div class="card">
      <div class="title">${this.title}</div>
      <div class="picture">
      <img src="/assets/images/${this.name}/${this.image}">
      </div>
            `;
  }
}
