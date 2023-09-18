document.addEventListener("DOMContentLoaded", function () {
    // Obtenir l'URL complète
    const url = window.location.href;

    // Utiliser une expression régulière pour rechercher le paramètre "orderId"
    const match = url.match(/orderNumber=([^&]*)/);

    // Vérifier si le paramètre "orderId" a été trouvé
    if (match) {
        // Extraire le numéro de commande
        const numCommande = match[1];

        // Sélectionner l'élément HTML dans lequel vous souhaitez afficher le numéro de commande
        const idCommandElement = document.getElementById("orderId");

        // Insérer le numéro de commande dans le contenu de l'élément HTML
        idCommandElement.innerText = numCommande;
    } else {
        alert("Votre commande n'a pas abouti, veuillez nous en excuser")
    }
});