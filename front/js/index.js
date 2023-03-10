// Récupération des canapés depuis localhost
const reponse = await fetch('http://localhost:3000/api/products');
const canape = await reponse.json();

const article = canape[0];
const imageElement = document.createElement("img");
imageElement.src = article.imageUrl;

const sectionItems = document.querySelector(".items");
sectionItems.appendChild(imageElement);