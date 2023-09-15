// Attendre que le DOM soit entièrement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le numéro de commande depuis l'URL
    const numCommande = new URLSearchParams(window.location.search).get("orderId");

    // Sélectionner l'élément HTML dans lequel vous souhaitez afficher le numéro de commande
    const idCommandElement = document.getElementById("orderId");

    // Vérifier si numCommande est défini et non nul
    if (numCommande !== null) {
        // Insérer le numéro de commande dans le contenu de l'élément HTML
        idCommandElement.innerText = numCommande;

        // Afficher le numéro de commande dans la console
        console.log("URL complète:", window.location.href);
        const searchParams = new URLSearchParams(window.location.search);
        console.log("URLSearchParams:", searchParams);
    } else {
        // Si le numéro de commande est indéfini ou nul, afficher un message d'erreur
        idCommandElement.innerText = "Numéro de commande non trouvé";
    }
});