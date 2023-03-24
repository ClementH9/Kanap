    const params = new URL (document.location).searchParams;
    const id = params.get("id");

    // Appel du produit concerné dans l'API
        fetch(`http://localhost:3000/api/products/${id}`)
    // Construction du JSON pour obtenir le produit concerné
        .then(function(res) {
            return res.json();
        })
    // Construction de la fonction avec les différentes propriétés du produit
        .then(function(data){
            console.log(data);
    // MAJ du DOM avec chaque propriété du produit
            const addTitle = document.getElementById("title");
            addTitle.innerHTML=data.name;
            const addPrice = document.getElementById("price");
            addPrice.innerHTML=data.price;
            const addImg = document.createElement("img");
            document.querySelector(".item__img").append(addImg);
            addImg.src = data.imageUrl;
            addImg.alt = data.altTxt;
            const addDescription = document.getElementById("description");
            addDescription.innerHTML=data.description;
            const addOption = document.getElementById("colors");
    // Boucle color permettant d'alimenter le menu déroulant pour choisir
            for (let color in data.colors) {
                addOption.innerHTML += '<option value='+data.colors[color]+'>'+data.colors[color]+'</option>'
            }

        })

    // Permet l'ajout au panier comprenant toutes les propriétés
function addProduct() {
    const addToCart = document .getElementById("addToCart");
    addToCart.addEventListener("click", () =>{
        if ((document.querySelector("select").value == "")) {
            alert("Merci de choisir la couleur");
            } else if (document.querySelector("input").value == "0") {
                alert("Merci de choisir la quantité");
            } else if (document.querySelector("input").value > 100) {
                alert("Impossible de commander plus de 100 pièces");
            } else { addProduct({
                quantity : document.querySelector("input").value,
                color : document.querySelector("select").value,
                id : id 
            })
            };
        // Si le panier n'est pas nul : ça met les produits dans le panier
        addProductLocalStorage = [];
        console.log("Détection produit");
        if (localStorage.getItem("addToCart") !==null){
        addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
        addProductLocalStorage.push(addToCart);
        localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage));
        }
                
        })
}
    addProduct();