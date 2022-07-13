const idURL = window.location.search;
const urlSearchParams = new URLSearchParams(idURL);
const _id = urlSearchParams.get("id")


const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products/${_id}`)
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise;
        console.log(produitData);
    });  
};

const afficherInfoProduit = async () => {
    await fetchProduit();

    document.getElementById("description").innerText = produitData.description;
    document.getElementById("price").innerText = produitData.price;
    document.getElementById("title").innerText = produitData.name;

    let img = document.createElement('img');
    img.src = produitData.imageUrl;
    img.alt = produitData.altTxt;
    document.getElementsByClassName("item__img")[0].appendChild(img);
    
    let color = document.getElementById("colors");
    produitData.colors.forEach(element => {
        let optionColor = document.createElement("option");
        optionColor.value = element;
        optionColor.text = element;
        color.appendChild(optionColor);
    });
    document.getElementById("addToCart").addEventListener("click", (e) => {
        e.preventDefault();
        ajouterPanier();
    })
}


function ajouterPanier () {
    let couleurChoisi = document.getElementById("colors").value;
    let quantiteChoisi = document.getElementById("quantity").value;
    let idProduitChoisi = _id;

    if (couleurChoisi == ""){
        alert ("Veuillez choisir une couleur");
    }
    else {
        if (quantiteChoisi <= 0){
            alert ("Veuillez choisir une quantité supérieur à 0");
        }
        else {
            let listDesProduitsJSON = localStorage.getItem("products");
            let listDesProduitsTableau = JSON.parse(listDesProduitsJSON);
            if (!listDesProduitsTableau || listDesProduitsTableau === 0){
                listDesProduitsTableau = [];
            }
            let listFinalDesProduits = [];
            let safeNewProduit = true;
            listDesProduitsTableau.forEach(element => {
                if (element.id == idProduitChoisi && element.color == couleurChoisi) {
                    let nouveauProduit = {id: idProduitChoisi, color: couleurChoisi, quantite: quantiteChoisi};
                    listFinalDesProduits.push(nouveauProduit);
                    safeNewProduit = false;
                }
                else {
                    listFinalDesProduits.push(element);
               }
            });
            if (safeNewProduit) {
                let nouveauProduit = {id: idProduitChoisi, color: couleurChoisi, quantite: quantiteChoisi};
                listFinalDesProduits.push(nouveauProduit);
            }
            localStorage.setItem("products", JSON.stringify(listFinalDesProduits));
            if (confirm("Votre produit à été ajouté au panier voulez vous continuer dans le panier ?")){
                Location.href = "./cart.html";
            }
            else {
                Location.href = "./index.html";
            }
        }
    }
}

afficherInfoProduit();