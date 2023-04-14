const params = new URL(document.location).searchParams;
const id = params.get("id");

// Appel du produit concerné dans l'API
fetch(`http://localhost:3000/api/products/${id}`)
  // Construction du JSON pour obtenir le produit concerné
  .then(function (res) {
    return res.json();
  })
  // Construction de la fonction avec les différentes propriétés du produit
  .then(function (data) {
    console.log(data);
    // MAJ du DOM avec chaque propriété du produit
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
    // Boucle color permettant d'alimenter le menu déroulant pour choisir
    for (let color in data.colors) {
      addOption.innerHTML += '<option value=' + data.colors[color] + '>' + data.colors[color] + '</option>'
    }

  })

function addToCart() {
  // Au clic, l'évènement s'effectue si les champs sont renseignés
  const addBtn = document.getElementById("addToCart")
  const color = document.getElementById("colors");
  const quantity = document.getElementById("quantity");

  addBtn.addEventListener("click", () => {

    // vérifier si les données quantité et couleur sont valides avec la fonction if
    if (color.value !== "" && quantity.value != 0 && quantity.value <= 100) {

      //stocker les données dans des variables  
      //On ne déclare que ces 2 là car on ne cherche que celles-là dans le panier (et l'ID est déjà déclaré)      
      const productId = id;
      const productColor = color.value;
      const productQuantity = quantity.value;
      // Créer un objet produit

      let product = {
        productId: productId,
        productColor: productColor,
        productQuantity: productQuantity,
      };
      // Mise à disposition du localStorage si existant
      //Json parse pour permettre l'accès au local storage
      let cartLocalStorage = JSON.parse(
        localStorage.getItem("cart")
      );

      // Comportement si il n'y a pas de localStorage (il n'a ni valeur ni type défini : donc null)
      //Stringify pour "reconstruire" produit dans le panier
      if (cartLocalStorage == null) {
        cartLocalStorage = [];
        cartLocalStorage.push(product);
        localStorage.setItem(
          "cart",
          JSON.stringify(cartLocalStorage)
        );
        alert("Produit ajouté au panier !");
        console.log(cartLocalStorage);
      } else {
        // Comportement si il existe des données dans le localStorage

        // Recherche de produits dans le local storage
        let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
        let mappingProduct = cartLocalStorage.find(
          (productfind) =>
            productfind.productId === productId &&
            productfind.productColor === productColor
        );

        // Si la condition est vraie on additionne la quantité de l'objet du localStorage qui répond à la condition avec celle de la page en cours et on renvoie le tout au localStorage

        if (mappingProduct) {
          // On incrémente la quantité

          newProductQty =
            parseInt(mappingProduct.productQuantity) + parseInt(productQuantity);
          mappingProduct.productQuantity = newProductQty;

          // On l'enregistre dans le localStorage

          localStorage.setItem(
            "cart",
            JSON.stringify(cartLocalStorage)
          );
          alert("Quantité du panier augmentée !");
          console.log(cartLocalStorage);
        } else {
          // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage
          // Stocke le produit dans sa globalité (aucune correspondance dans la cart)
          cartLocalStorage.push(product);
          localStorage.setItem(
            "cart2",
            JSON.stringify(product)
          );
          alert("Nouveau produit ajouté !");
          console.log(cartLocalStorage);
        }
      }

      //Fin des conditions pour le localStorage
    } else {
      alert(
        "Choisissez la couleur et la quantité"
      );
    }
  }); 
}
addToCart();