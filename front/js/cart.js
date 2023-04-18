// Récupération des produits dans le Local Storage
function getCart() {
    let productsInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (productsInLocalStorage == null) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
    } else { 
        return productsInLocalStorage;
    }
}
console.log(productsInLocalStorage);

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
            const sectionCart = document.getElementById("cart__items");
            const cartArticle = document.createElement("article");
            document.querySelector("cart__items").appendChild(sectionCart);
            const cartImg = document.createElement("div");
            document.querySelector("cart__item").append(cartArticle);
            const cartImg = document.createElement("div");
            document.querySelector("cart__item__img").append(cartImg);
        }
    }
})





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
