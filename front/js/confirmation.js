const commandeId = window.location.search;
const urlSearchParams = new URLSearchParams(commandeId);
const _id = urlSearchParams.get("commandeId")


const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${_id}`)
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise;
        console.log(produitData);
    });  
};


const afficherNumeroCommande = async () => {
    await fetchProduit(); {
    console.log(commandeId);
}}


afficherNumeroCommande ();