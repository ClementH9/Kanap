// Récupération des produits dans le Local Storage
function getCart() {
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (productsInLocalStorage == null) {
        return [];
    } else {
        return productsInLocalStorage;
    }
}

// Affichage des produits du Local Storage sur la page Cart
fetch(`http://localhost:3000/api/products`)
    // Attendre la réponse du serveur
    .then(function (res) {
        return res.json();
    })
    // Traitement des données reçues du serveur
    // Attendre la réponse du serveur et traiter les données reçues
.then(function (data) {
    // Récupération des données de l'API
    for (let elData in data) {
        // Récupération du contenu du panier depuis le Local Storage
        let contentCart = getCart();
        for (let elCart in contentCart) {
            // Récupération de l'ID du produit dans le panier
            let cartProductId = contentCart[elCart].productId;
            // Récupération de l'ID du produit depuis les données de l'API
            let dataProductId = data[elData]._id;
            // Comparaison des IDs entre le panier et l'API pour trouver le produit correspondant
            if (cartProductId == dataProductId) {
                // Récupération de la couleur du produit dans le panier
                let productColor = contentCart[elCart].productColor;

                // Récupération de l'élément du DOM qui accueillera les produits du panier
                const sectionCart = document.getElementById("cart__items");

                // Crée un élément <article> pour afficher le produit du panier
                const productArticle = document.createElement('article'); // Crée un nouvel élément <article> dans le DOM
                productArticle.setAttribute("class", "cart__item"); // Ajoute la classe "cart__item" à l'élément <article>
                productArticle.setAttribute("data-id", dataProductId); // Ajoute un attribut "data-id" avec la valeur de dataProductId
                productArticle.setAttribute("data-color", productColor); // Ajoute un attribut "data-color" avec la valeur de productColor
                sectionCart.appendChild(productArticle); // Ajoute l'élément <article> en tant qu'enfant de l'élément avec l'ID "cart__items" dans le DOM                

                // Crée un élément <div> pour afficher l'image du produit
                let newProductImg = document.createElement('div');
                newProductImg.setAttribute("class", "cart__item__img");
                productArticle.appendChild(newProductImg);

                // Récupère l'URL de l'image du produit depuis les données de l'API
                let productImg = data[elData].imageUrl;
                const newProductImgTag = document.createElement('img');
                newProductImgTag.setAttribute("src", productImg);
                newProductImgTag.setAttribute("alt", data[elData].altTxt);
                newProductImg.appendChild(newProductImgTag);

                // Crée un élément <div> pour afficher les détails du produit
                let productContent = document.createElement('div');
                productContent.setAttribute("class", "cart__item__content");
                productArticle.appendChild(productContent);

                // Crée un élément <div> pour afficher la description du produit
                let productDescription = document.createElement('div');
                productDescription.setAttribute("class", "cart__item__content__description");
                productContent.appendChild(productDescription);

                // Récupère le nom du produit depuis les données de l'API
                let productName = data[elData].name;
                const titleProduct = document.createElement("h2");
                titleProduct.innerText = productName;
                productDescription.appendChild(titleProduct);

                // Crée un paragraphe pour afficher la couleur du produit
                const colorProduct = document.createElement("p");
                colorProduct.innerText = "Couleur : " + productColor;
                productDescription.appendChild(colorProduct);

                // Récupère le prix unitaire du produit depuis les données de l'API
                let productPrice = data[elData].price;
                const priceProduct = document.createElement("p");
                priceProduct.innerHTML = 'Prix unitaire : <span class="prix_unitaire">' + productPrice + "</span> €";
                productDescription.appendChild(priceProduct);

                // Crée un élément <div> pour afficher les paramètres du produit
                let productSettings = document.createElement('div');
                productSettings.setAttribute("class", "cart__item__content__settings");
                productContent.appendChild(productSettings);

                // Crée un élément <div> pour afficher la quantité du produit
                let productSettingsQuantity = document.createElement('div');
                productSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
                productSettings.appendChild(productSettingsQuantity);

                // Récupère la quantité du produit depuis le panier
                let productQuantity = contentCart[elCart].productQuantity;
                const quantityProduct = document.createElement("p");
                quantityProduct.innerText = "Qté : ";
                productSettingsQuantity.appendChild(quantityProduct);

                // Crée un input de type nombre pour permettre la modification de la quantité
                let productSettingsQuantityInput = document.createElement('input');
                productSettingsQuantityInput.setAttribute("type", "number");
                productSettingsQuantityInput.setAttribute("class", "itemQuantity");
                productSettingsQuantityInput.setAttribute("name", "itemQuantity");
                productSettingsQuantityInput.setAttribute("min", "1");
                productSettingsQuantityInput.setAttribute("max", "100");
                productSettingsQuantityInput.setAttribute("value", productQuantity);
                productSettingsQuantity.appendChild(productSettingsQuantityInput);

                // Crée un élément <div> pour afficher l'option de suppression du produit
                let deleteProduct = document.createElement('div');
                deleteProduct.setAttribute("class", "cart__item__content__settings__delete");
                productSettings.appendChild(deleteProduct);

                // Crée un paragraphe pour le bouton de suppression
                let deleteProductParagraphe = document.createElement('p');
                deleteProductParagraphe.setAttribute("class", "deleteItem");
                deleteProductParagraphe.innerText = "Supprimer";
                deleteProduct.appendChild(deleteProductParagraphe);
            }
        }
    }
})
    // Mettre à jour la quantité totale et le prix total après chaque modification du panier
    .then(function () {
        totalProductsQuantity();
        totalProductsPrice();
    })
    // Ajouter des gestionnaires d'événements pour les modifications de quantité et les suppressions
    .then(function () {
        // Sélectionner tous les éléments avec la classe "itemQuantity" (input de quantité)
        const recupQuantity = document.querySelectorAll(".itemQuantity");
        // Ajouter un gestionnaire d'événement "change" à chaque élément
        recupQuantity.forEach((recupQuantity) => recupQuantity.addEventListener('change', function () {
            // Appeler la fonction pour mettre à jour la quantité totale et le prix total
            totalProductsQuantity();
            totalProductsPrice();
        }))
    })
// Ensuite, ajouter des gestionnaires d'événements pour les suppressions de produit
.then(function () {
    // Sélectionner tous les éléments avec la classe "deleteItem" (bouton de suppression)
    const deleteOneProduct = document.querySelectorAll(".deleteItem");
    // Ajouter un gestionnaire d'événement "click" à chaque élément
    deleteOneProduct.forEach((deleteOneProduct) => deleteOneProduct.addEventListener('click', deleteProduct));
});

// Fonction pour calculer la quantité totale des produits dans le panier
function totalProductsQuantity() {
    let totalQuantity = 0;
    let productSettingsQuantityInput = document.querySelectorAll(".itemQuantity");
    for (i = 0; i < productSettingsQuantityInput.length; i++) {
        totalQuantity += parseInt(productSettingsQuantityInput[i].value);
    }
    document.getElementById("totalQuantity").innerText = totalQuantity;
}

// Fonction pour calculer le prix total des produits dans le panier
function totalProductsPrice() {
    let totalPrice = 0; // Initialise une variable pour stocker le prix total des produits dans le panier
    const productPrice = document.querySelectorAll(".cart__item"); // Sélectionne tous les éléments avec la classe "cart__item"
    let recupPrixUnitaire = document.querySelectorAll(".prix_unitaire"); // Sélectionne tous les éléments avec la classe "prix_unitaire"
    const recupQuantitePanier = document.querySelectorAll(".itemQuantity"); // Sélectionne tous les éléments avec la classe "itemQuantity"

    // Boucle à travers tous les éléments avec la classe "cart__item"
    for (i = 0; i < productPrice.length; i++) {
        // Calcul du prix total pour chaque produit en multipliant le prix unitaire par la quantité
        totalPrice += parseInt(recupPrixUnitaire[i].textContent) * parseInt(recupQuantitePanier[i].value);
    }

    // Met à jour l'élément ayant l'ID "totalPrice" avec le prix total calculé
    document.getElementById("totalPrice").innerText = totalPrice;
}

// Fonction pour supprimer un produit du panier
function deleteProduct(event) {
    const productArticle = event.target.closest('.cart__item'); // Trouvez l'article parent du bouton supprimer cliqué
    if (productArticle) {
        const productId = productArticle.getAttribute("data-id"); // Récupérez l'ID du produit à supprimer
        const productColor = productArticle.getAttribute("data-color"); // Récupérez la couleur du produit à supprimer

        // Maintenant, vous pouvez supprimer le produit du panier en fonction de son ID et de sa couleur
        removeFromCart(productId, productColor);

        // Supprimez l'élément du DOM pour refléter la mise à jour du panier
        productArticle.remove();

        // Mettez à jour les totaux
        totalProductsQuantity();
        totalProductsPrice();
    }
    alert("Produit supprimé avec succès");
}

// Fonction pour supprimer un produit du panier dans le Local Storage
function removeFromCart(productId, productColor) {
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (productsInLocalStorage) {
        // Filtrez le panier pour supprimer le produit spécifique en fonction de l'ID et de la couleur
        productsInLocalStorage = productsInLocalStorage.filter((product) => {
            return product.productId !== productId || product.productColor !== productColor;
        });

        // Mettez à jour le panier dans le Local Storage
        localStorage.setItem("cart", JSON.stringify(productsInLocalStorage));
    }
}

// Validation du formulaire de commande
let form = document.querySelector(".cart__order__form");

// Écouter la modification du prénom
form.firstName.addEventListener("change", function () {
    validFirstName(this);
})

// Fonction pour valider le prénom
const validFirstName = function (inputFirstName) {
    // Création RegExp pour valider le prénom
    let firstNameRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    // On récupère la balise p
    let p = inputFirstName.nextElementSibling;

    if (testFirstName) {
        p.innerHTML = "Prénom valide";
        p.classList.remove("text-danger");
        p.classList.add("text-success");
        return true;
    } else {
        p.innerHTML = "Prénom invalide";
        p.classList.remove("text-success");
        p.classList.add("text-danger");
        return false;
    }
}

// Écouter la modification du nom
form.lastName.addEventListener("change", function () {
    validLastName(this);
})

// Fonction pour valider le nom
const validLastName = function (inputLastName) {
    // Création RegExp pour valider le nom
    let lastNameRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testLastName = lastNameRegExp.test(inputLastName.value);
    // On récupère la balise p
    let p = inputLastName.nextElementSibling;

    if (testLastName) {
        p.innerHTML = "Nom valide";
        p.classList.remove("text-danger");
        p.classList.add("text-success");
        return true;
    } else {
        p.innerHTML = "Nom invalide";
        p.classList.remove("text-success");
        p.classList.add("text-danger");
        return false;
    }
}

// Écouter la modification de l'adresse
form.address.addEventListener("change", function () {
    validAddress(this);
})

// Fonction pour valider l'adresse
const validAddress = function (inputAddress) {
    // Création RegExp pour valider l'adresse
    let addressRegExp = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testAddress = addressRegExp.test(inputAddress.value);
    // On récupère la balise p
    let p = inputAddress.nextElementSibling;

    if (testAddress) {
        p.innerHTML = "Adresse valide";
        p.classList.remove("text-danger");
        p.classList.add("text-success");
        return true;
    } else {
        p.innerHTML = "Adresse invalide";
        p.classList.remove("text-success");
        p.classList.add("text-danger");
        return false;
    }
}

// Écouter la modification de la ville
form.city.addEventListener("change", function () {
    validCity(this);
})

// Fonction pour valider la ville
const validCity = function (inputCity) {
    // Création RegExp pour valider la ville
    let cityRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testCity = cityRegExp.test(inputCity.value);
    // On récupère la balise p
    let p = inputCity.nextElementSibling;

    if (testCity) {
        p.innerHTML = "Ville valide";
        p.classList.remove("text-danger");
        p.classList.add("text-success");
        return true;
    } else {
        p.innerHTML = "Ville invalide";
        p.classList.remove("text-success");
        p.classList.add("text-danger");
        return false;
    }
}

// Écouter la modification de l'email
form.email.addEventListener("change", function () {
    validEmail(this);
})

// Fonction pour valider l'email
const validEmail = function (inputEmail) {
    // Création RegExp pour valider l'email
    let emailRegExp = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-zA-Z0-9\\-\\._]+[.][a-z][a-z]+$");
    // Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value);
    // On récupère la balise p
    let p = inputEmail.nextElementSibling;

    if (testEmail) {
        p.innerHTML = "Email valide";
        p.classList.remove("text-danger");
        p.classList.add("text-success");
        return true;
    } else {
        p.innerHTML = "Email invalide";
        p.classList.remove("text-success");
        p.classList.add("text-danger");
        return false;
    }
}

