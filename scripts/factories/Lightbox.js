export class LightBox {
  constructor(listElement) {
    this.currentElement = null;
    this.listElement = listElement;
    this.manageEvent();
    console.log(this);
  }

  show(id) {
    this.currentElement = this.getElementById(id);
    this.display();
  }

  next() {
    let index = this.listElement.findIndex(
      (element) => element.id == this.currentElement.id
    );
    if (index == this.listElement.length - 1) {
      this.currentElement = this.listElement[0];
    } else {
      this.currentElement = this.listElement[index + 1];
    }
    this.display();
  }

  previous() {
    let index = this.listElement.findIndex(
      (element) => element.id == this.currentElement.id
    );
    if (index == 0) {
      this.currentElement = this.listElement[this.listElement.length - 1];
    } else {
      this.currentElement = this.listElement[index - 1];
    }
    this.display();
  }

  manageEvent() {
    document.querySelector("#lightbox .next").addEventListener("click", () => {
      this.next();
    });
    document
      .querySelector("#lightbox .previous")
      .addEventListener("click", () => {
        this.previous();
      });
    document.querySelector("#lightbox .close").addEventListener("click", () => {
      this.close();
    });

    document
      .querySelector("#lightbox .content")
      .addEventListener("keyup", (e) => {
        switch (e.key) {
          case "ArrowRight":
            this.next();
            break;
          case "ArrowLeft":
            this.previous();
            break;
          case "Escape":
            this.close();
            break;
        }
        console.log(e.key);
      });
  }

  getElementById(id) {
    return this.listElement.find((element) => element.id == id);
  }

  display() {
    if (this.currentElement.video == undefined) {
      const box = `<img src= "/assets/images/${this.currentElement.name}/${this.currentElement.image}">
      <div>${this.currentElement.title}</div>`;
      Object.assign(document.createElement("img"));

      document.querySelector("#lightbox .content .picture").innerHTML = box;
      document.querySelector("#lightbox").classList.add("show");
    }
    if (this.currentElement.image == undefined) {
      const box = `<video controls src= "/assets/images/${this.currentElement.name}/${this.currentElement.video}">
      <div>${this.currentElement.title}</div>`;
      Object.assign(document.createElement("video"));
      document.querySelector("#lightbox .content .picture").innerHTML = box;
      document.querySelector("#lightbox").classList.add("show");
    }
  }

  close() {
    document.querySelector("#lightbox").classList.remove("show");
  }
}
