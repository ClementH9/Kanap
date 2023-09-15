// Récupération des produits dans le Local Storage
function getCart() {
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (productsInLocalStorage == null) {
        return [];
    } else { 
        return productsInLocalStorage;
    }
}
console.log(getCart());

// Afficher les produits du Local Storage sur la page Cart
fetch(`http://localhost:3000/api/products`)
// Attendre la réponse du serveur
.then(function (res) {
    return res.json();
})
// Traitement des données reçues du serveur
.then(function (data) {
    // Récupération des données de l'API
    for (let elData in data) {
        let contentCart = getCart(); /* Stocke ce qu'il y a dans le panier */
        for (let elCart in contentCart) {
            let cartProductId = contentCart [elCart].productId ; /* variable cartProductId récupère l'ID du produit dans le panier */
            let dataProductId = data[elData]._id ;
            // Comparaison des infos entre panier et API
            if (cartProductId == dataProductId) {

                let productColor = contentCart[elCart].productColor;

                const sectionCart = document.getElementById("cart__items") ; // pointe vers l'id cart__items

                const productArticle = document.createElement('article');
                productArticle.setAttribute("class", "cart__item");
                productArticle.setAttribute("data-id", dataProductId);
                productArticle.setAttribute("data-color", productColor);
                sectionCart.appendChild(productArticle);

                let newProductImg = document.createElement('div');
                newProductImg.setAttribute("class", "cart__item__img");
                productArticle.appendChild(newProductImg);

                let productImg = data[elData].imageUrl ;
                const newProductImgTag = document.createElement('img');
                newProductImgTag.setAttribute("src", productImg);
                newProductImgTag.setAttribute("alt", data[elData].altTxt);
                newProductImg.appendChild(newProductImgTag);
                
                let productContent = document.createElement('div');
                productContent.setAttribute("class", "cart__item__content");
                productArticle.appendChild(productContent);
                let productDescription = document.createElement('div');
                productDescription.setAttribute("class", "cart__item__content__description");
                productContent.appendChild(productDescription);

                let productName = data[elData].name ;
                const titleProduct = document.createElement("h2") ;
                titleProduct.innerText = productName ;
                productDescription.appendChild(titleProduct);

                const colorProduct = document.createElement("p") ;
                colorProduct.innerText = "Couleur : " + productColor ;
                productDescription.appendChild(colorProduct) ;

                let productPrice = data[elData].price ;
                const priceProduct = document.createElement("p") ;
                priceProduct.innerHTML = 'Prix unitaire : <span class="prix_unitaire">' + productPrice + "</span> €"; 

                productDescription.appendChild(priceProduct) ;
                let productSettings = document.createElement('div');
                productSettings.setAttribute("class", "cart__item__content__settings");
                productContent.appendChild(productSettings);
                let productSettingsQuantity = document.createElement('div');
                productSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
                productSettings.appendChild(productSettingsQuantity);
                let productQuantity = contentCart[elCart].productQuantity ;
                const quantityProduct = document.createElement("p") ;
                quantityProduct.innerText = "Qté : "; 
                productSettingsQuantity.appendChild(quantityProduct) ;
                let productSettingsQuantityInput = document.createElement('input');
                productSettingsQuantityInput.setAttribute("type", "number");
                productSettingsQuantityInput.setAttribute("class", "itemQuantity");
                productSettingsQuantityInput.setAttribute("name", "itemQuantity");
                productSettingsQuantityInput.setAttribute("min", "1");
                productSettingsQuantityInput.setAttribute("max", "100");
                productSettingsQuantityInput.setAttribute("value", productQuantity);
                productSettingsQuantity.appendChild(productSettingsQuantityInput);

                let deleteProduct = document.createElement('div');
                deleteProduct.setAttribute("class", "cart__item__content__settings__delete");
                productSettings.appendChild(deleteProduct);
                let deleteProductParagraphe = document.createElement('p');
                deleteProductParagraphe.setAttribute ("class", "deleteItem");
                deleteProductParagraphe.innerText = "Supprimer";
                deleteProduct.appendChild(deleteProductParagraphe);
            }
            console.log(cartProductId)
        }
    }
})
// Mettre à jour la quantité totale et le prix total après chaque modification du panier
.then (function () {
    totalProductsQuantity();
    totalProductsPrice();
})
// Ajouter des gestionnaires d'événements pour les modifications de quantité et les suppressions
.then (function(){
    const recupQuantity = document.querySelectorAll(".itemQuantity");
    recupQuantity.forEach((recupQuantity) => recupQuantity.addEventListener('change', function() {
        totalProductsQuantity();
        totalProductsPrice();
    }))
})
.then(function () {
    const deleteOneProduct = document.querySelectorAll(".deleteItem");
    deleteOneProduct.forEach((deleteOneProduct) => deleteOneProduct.addEventListener('click', deleteProduct));
});

// Fonction pour calculer la quantité totale des produits dans le panier
function totalProductsQuantity(){
    let totalQuantity = 0;
    let productSettingsQuantityInput = document.querySelectorAll(".itemQuantity");
    for(i = 0; i < productSettingsQuantityInput.length; i++){
        totalQuantity += parseInt(productSettingsQuantityInput[i].value);
        console.log("Total quantité panier",totalQuantity);
    }
    document.getElementById("totalQuantity").innerText=totalQuantity;
}

// Fonction pour calculer le prix total des produits dans le panier
function totalProductsPrice (){
    console.log("calcul total price")
    let totalPrice = 0;
    const productPrice = document.querySelectorAll(".cart__item");
    let recupPrixUnitaire = document.querySelectorAll(".prix_unitaire");
    const recupQuantitePanier = document.querySelectorAll(".itemQuantity");
    for(i = 0; i < productPrice.length; i++){
        console.log("affichage infos produit", productPrice)
        totalPrice += parseInt(recupPrixUnitaire[i].textContent * recupQuantitePanier[i].value);
        console.log("prix total", totalPrice)
        console.log(recupPrixUnitaire[i].textContent)
    }
    document.getElementById("totalPrice").innerText=totalPrice;
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
form.firstName.addEventListener("change", function(){
    validFirstName(this);
})

// Fonction pour valider le prénom
const validFirstName = function(inputFirstName) {
    // Création RegExp pour valider le prénom
    let firstNameRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    // On récupère la balise p
    let p = inputFirstName.nextElementSibling;

    if (testFirstName){
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
form.lastName.addEventListener("change", function(){
    validLastName(this);
})

// Fonction pour valider le nom
const validLastName = function(inputLastName) {
    // Création RegExp pour valider le nom
    let lastNameRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testLastName = lastNameRegExp.test(inputLastName.value);
    // On récupère la balise p
    let p = inputLastName.nextElementSibling;

    if (testLastName){
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
form.address.addEventListener("change", function(){
    validAddress(this);
})

// Fonction pour valider l'adresse
const validAddress = function(inputAddress) {
    // Création RegExp pour valider l'adresse
    let addressRegExp = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testAddress = addressRegExp.test(inputAddress.value);
    // On récupère la balise p
    let p = inputAddress.nextElementSibling;

    if (testAddress){
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
form.city.addEventListener("change", function(){
    validCity(this);
})

// Fonction pour valider la ville
const validCity = function(inputCity) {
    // Création RegExp pour valider la ville
    let cityRegExp = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    // Test de l'expression régulière
    let testCity = cityRegExp.test(inputCity.value);
    // On récupère la balise p
    let p = inputCity.nextElementSibling;

    if (testCity){
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
form.email.addEventListener("change", function(){
    validEmail(this);
})

// Fonction pour valider l'email
const validEmail = function(inputEmail) {
    // Création RegExp pour valider l'email
    let emailRegExp = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");
    // Test de l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value);
    // On récupère la balise p
    let p = inputEmail.nextElementSibling;

    if (testEmail){
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

// Écouter la soumission du formulaire
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("form");
    if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)){
        form.submit();
        const idCommand = 1;
        fetch('http://localhost:3000/api/products', {
            method : "POST",
            headers : idCommand,
            body : strRandom()
         });
        console.log(idCommand);
        window.location.href = "./confirmation.html?id=1" ;
    }
})

// Fonction pour générer un numéro de commande aléatoire
function generateRandomOrderNumber() {
    return Math.floor(Math.random() * 1000000) + 1; // Vous pouvez ajuster la plage de numéros de commande selon vos besoins
}

// Écouter la soumission du formulaire
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {
        const orderNumber = generateRandomOrderNumber();
        
        // Maintenant, vous avez un numéro de commande aléatoire. Vous pouvez l'envoyer au serveur ou l'utiliser selon vos besoins.

        // Pour l'exemple, nous allons l'afficher dans la console.
        console.log("Numéro de commande : " + orderNumber);

        // Vous pouvez également rediriger vers la page de confirmation avec le numéro de commande dans l'URL.
        window.location.href = "./confirmation.html?orderNumber=" + orderNumber;
    }
});