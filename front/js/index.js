// Récupération des canapés depuis le fichier JSON
async function products()
{
    const reponse = await fetch('http://localhost:3000/api/products');
    return await reponse.json();
}

async function display()
{
    const canape = await products();

    for (let i = 0; i < canape.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les fiches (items)
        const sectionItems = document.querySelector("#items");
        // Création de balise dédiée au canapé
        const canapeElement = document.createElement("article");
        //Création des balises
        const linkElement = document.createElement("a");
        linkElement.href="./product.html?id="+canape[i]._id;
        const imageElement = document.createElement("img");
        imageElement.src = canape[i].imageUrl;
        imageElement.alt = canape[i].altTxt;
        const nomElement = document.createElement("h3");
        nomElement.classList.add("productName");
        nomElement.innerText = canape[i].name;
        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("productDescription");
        descriptionElement.innerText = canape[i].description;
       
        // Rattacher la balise "a" à la section items
        sectionItems.appendChild(linkElement);
        // Rattacher la balise article à la section items
        linkElement.appendChild(canapeElement);
        // Rattacher l'image à pieceElement
        canapeElement.appendChild(imageElement);
        canapeElement.appendChild(nomElement);
        canapeElement.appendChild(descriptionElement);
    }
}
display();