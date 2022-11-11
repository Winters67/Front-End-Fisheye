export { photographerFactory };

function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  // ajout dans le html les elements
  function getUserCard() {
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

  function getUserInfo() {
    const main = document.createElement("article");
    const nom = document.createElement("h2");
    const ville = document.createElement("h3");
    const description = document.createElement("p");
    nom.textContent = name;
    ville.textContent = city + ", " + country;
    description.textContent = tagline;
    main.appendChild(nom);
    main.appendChild(ville);
    main.appendChild(description);
    return main;
  }

  function getUserImg() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    return img;
  }

  
  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    getUserCard,
    getUserInfo,
    getUserImg,
    
  };
}
