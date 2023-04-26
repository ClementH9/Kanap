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

// Construction du JSON pour obtenir le produit concerné
.then(function (res) {
    return res.json();
})
 // Construction de la fonction avec les différentes propriétés du produit
.then(function (data) {
    for (let elData in data) {
        let contentCart = getCart(); /* Stocke ce qu'il y a dans le panier */
        for (let elCart in contentCart) {
            let cartProductId = contentCart [elCart].productId ; /* variable cartProductId récupère l'ID du produit dans le panier */
            let dataProductId = data[elData]._id ;
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
                priceProduct.innerText = "Prix unitaire : " + productPrice + " €";
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

/* Supprimer : event listener, fonction à créer pour MAJ*/

document.getElementById("totalQuantity").innerText=totalProductsQuantity(); //parseInt et créer fonction qui calcule la quantité
document.getElementById("totalPrice").innerText=totalProductsPrice(); //parseInt et créer fonction qui calcule le prix - eventListener pour vérifier click ou événement qui change l'input MAJ le prix et Qté

function totalProductsQuantity(){
    totalQuantity += parseInt(productSettingsQuantity);
    console.log("Total quantité panier",totalQuantity);
    document.getElementById("totalQuantity").innerText = totalQuantity;
}

function totalProductsPrice (){
    totalProductPricePanier = productQuantity * productPrice;
    console.log(totalProductPricePanier);
    // Calcul du prix total du panier
    totalPrice += totalProductPricePanier;
    console.log("Total prix panier",totalPrice);
    document.getElementById("totalPrice").innerText = totalPrice; 
    }

/*
// Affichage des produits de la page panier
function displayCardProducts();
// Pour changer la quantité donnée d'un produit
function changeQuantity(    
    if (quantity = 0) {
        
    deleteProduct();
} else {

    updateQuantity();
});
// Suppression d'un produit du panier
function deleteProduct(){

};
// Changer la quantité de produit dans le panier
function updateQuantity(){
    
};
// Gestion du formulaire (REGEX)
let textRegex = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
let emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");
*/