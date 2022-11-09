export { photographerFactory };

function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  // ajout dans le html les elements
  function getUserCardDOM() {
    const a = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h4 = document.createElement("h4");
    h4.textContent = city + "," + country;
    const h5 = document.createElement("h5");
    h5.textContent = tagline;
    const p = document.createElement("p");
    p.textContent = price + "€/jour";
    a.href = "photographer.html?id=" + id;
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(h5);
    article.appendChild(p);

    return a;
  }

  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
