function recuperer_tout_les_produits() {
    fetch("http://localhost:3000/api/products").then(function(response){
        return response.json();
    }).then(function(data){
        afficher_produit(data);
    })
}

function afficher_produit(lesProduits) {
    lesProduits.forEach(element => {
        let baliseA = document.createElement("a");
        let baliseArticle = document.createElement("article");
        let baliseImg = document.createElement("img");
        let baliseH3 = document.createElement("h3");
        let baliseP = document.createElement("p");

        baliseA.href = "product.html?id=" + element._id;
        baliseImg.src = element.imageUrl;
        baliseImg.alt = element.altTxt;
        baliseH3.classList.add("productName");
        baliseH3.innerText = element.name;
        baliseP.classList.add("productDescription");
        baliseP.innerText = element.description;

        baliseArticle.appendChild(baliseImg);
        baliseArticle.appendChild(baliseH3);
        baliseArticle.appendChild(baliseP);
        baliseA.appendChild(baliseArticle);

        let section_article = document.getElementById("items");
        section_article.appendChild(baliseA);
    });
}

recuperer_tout_les_produits();

