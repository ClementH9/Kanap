// Appel de l'API pour récupérer produits
const params = new URL (document.location).searchParams;
const id = params.get("id");
// Affichage des produits de la page panier
function displayCardProducts();
// Pour changer la quantité donnée d'un produit
function changeQuantity(    
    if(quantity = 0){
        deleteProduct();
    }else{
        updateQuantity();
    });
// Suppression d'un produit du panier
function deleteProduct();
// Changer la quantité de produit dans le panier
function updateQuantity();
// Gestion du formulaire (REGEX)
