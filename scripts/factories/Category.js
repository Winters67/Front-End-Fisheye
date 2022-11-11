export class Category {
  constructor(json) {
    Object.assign(this, json);
  }

  createCard() {
    return `<div class="card">
      <div class="title">${this.title}</div>
      <div class="picture">
     < img src="${this.image}>
     </div>
            `;
  }
}
