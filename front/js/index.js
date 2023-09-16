// Fonction asynchrone pour récupérer les données des canapés depuis un fichier JSON distant
async function products() {
    // Effectue une requête HTTP GET pour obtenir les données JSON
    const response = await fetch('http://localhost:3000/api/products');
    // Convertit la réponse en format JSON et la retourne
    return await response.json();
}

// Fonction asynchrone pour afficher les canapés sur la page web
async function display() {
    // Appelle la fonction products() pour obtenir les données des canapés
    const canape = await products();

    // Boucle à travers la liste des canapés
    for (let i = 0; i < canape.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les fiches (items)
        const sectionItems = document.querySelector("#items");
        
        // Crée un élément <article> dédié au canapé
        const canapeElement = document.createElement("article");
        
        // Crée un lien (<a>) pour afficher les détails du canapé sur une page distincte
        const linkElement = document.createElement("a");
        linkElement.href = "./product.html?id=" + canape[i]._id;
        
        // Crée un élément <img> pour afficher l'image du canapé
        const imageElement = document.createElement("img");
        imageElement.src = canape[i].imageUrl;
        imageElement.alt = canape[i].altTxt;
        
        // Crée un élément <h3> pour afficher le nom du canapé
        const nomElement = document.createElement("h3");
        nomElement.classList.add("productName");
        nomElement.innerText = canape[i].name;
        
        // Crée un élément <p> pour afficher la description du canapé
        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("productDescription");
        descriptionElement.innerText = canape[i].description;

        // Attache le lien (<a>) à la section items
        sectionItems.appendChild(linkElement);
        
        // Attache l'élément <article> au lien (<a>)
        linkElement.appendChild(canapeElement);
        
        // Attache l'image, le nom et la description à l'élément <article>
        canapeElement.appendChild(imageElement);
        canapeElement.appendChild(nomElement);
        canapeElement.appendChild(descriptionElement);
    }
}

// Appelle la fonction display() pour afficher les canapés sur la page
display();