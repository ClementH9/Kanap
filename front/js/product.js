// Obtient les paramètres de l'URL actuelle
const params = new URL(document.location).searchParams;
const id = params.get("id");

// Effectue une requête pour obtenir les données du produit correspondant depuis une API locale
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    return res.json(); // Convertit la réponse en JSON
  })
  .then(function (data) {
    console.log(data); // Affiche les données du produit dans la console

    // Met à jour le DOM avec les propriétés du produit
    const addTitle = document.getElementById("title");
    addTitle.innerHTML = data.name;
    const addPrice = document.getElementById("price");
    addPrice.innerHTML = data.price;
    const addImg = document.createElement("img");
    document.querySelector(".item__img").append(addImg);
    addImg.src = data.imageUrl;
    addImg.alt = data.altTxt;
    const addDescription = document.getElementById("description");
    addDescription.innerHTML = data.description;
    const addOption = document.getElementById("colors");

    // Boucle pour alimenter le menu déroulant avec les couleurs disponibles
    for (let color in data.colors) {
      addOption.innerHTML +=
        '<option value=' + data.colors[color] + '>' + data.colors[color] + '</option>';
    }
  });

// Fonction qui gère l'ajout de produits au panier
function addToCart() {
  const addBtn = document.getElementById("addToCart");
  const color = document.getElementById("colors");
  const quantity = document.getElementById("quantity");

  addBtn.addEventListener("click", () => {
    // Vérifie si les données de couleur et de quantité sont valides
    if (color.value !== "" && quantity.value != 0 && quantity.value <= 100) {
      // Stocke les données dans des variables
      const productId = id;
      const productColor = color.value;
      const productQuantity = quantity.value;

      // Crée un objet produit
      let product = {
        productId: productId,
        productColor: productColor,
        productQuantity: productQuantity,
      };

      // Accède au localStorage s'il existe et le parse en JSON
      let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

      // Comportement si le localStorage est vide
      if (cartLocalStorage == null) {
        cartLocalStorage = [];
        cartLocalStorage.push(product);
        localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
        alert("Produit ajouté au panier !");
        console.log(cartLocalStorage);
      } else {
        // Comportement si le localStorage contient déjà des données

        // Recherche le produit dans le localStorage
        let mappingProduct = cartLocalStorage.find(
          (productfind) =>
            productfind.productId === productId &&
            productfind.productColor === productColor
        );

        // Si le produit existe déjà, incrémente la quantité
        if (mappingProduct) {
          newProductQty =
            parseInt(mappingProduct.productQuantity) +
            parseInt(productQuantity);
          mappingProduct.productQuantity = newProductQty;

          // Enregistre les modifications dans le localStorage
          localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
          alert("Quantité du panier augmentée !");
          console.log(cartLocalStorage);
        } else {
          // Si le produit n'existe pas, l'ajoute au localStorage
          cartLocalStorage.push(product);
          localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
          alert("Nouveau produit ajouté !");
          console.log(cartLocalStorage);
        }
      }
    } else {
      alert("Choisissez la couleur et une quantité entre 1 et 100");
    }
  });
}

addToCart(); // Appelle la fonction addToCart pour activer le gestionnaire d'ajout au panier