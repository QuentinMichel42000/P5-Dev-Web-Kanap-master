function afficher_produit_panier () {

    let listDesProduitsJSON = localStorage.getItem("products");
    let listDesProduitsTableau = JSON.parse(listDesProduitsJSON);

    if (localStorage.length > 0){
    listDesProduitsTableau.forEach(element => {

        let baliseImg = document.createElement("img");
        let baliseArticle = document.createElement("article");
        let baliseH2 = document.createElement("h2");
        let baliseP = document.createElement("p");
        let baliseP2 = document.createElement("p");
        let baliseSupr = document.createElement("deleteItem")
        let baliseDiv1 = document.createElement("div");
        let baliseDiv12 = document.createElement("div");
        let baliseDiv2 = document.createElement("div");
        let baliseDiv3 = document.createElement("div");
        let baliseDiv4 = document.createElement("div");
        let baliseP3 = document.createElement("p");
        let baliseInput = document.createElement("input");
        let baliseDiv5 = document.createElement("div");
        let baliseP4 = document.createElement("p");

        baliseInput.type = "number";
        baliseInput.name = "itemQuantity"
        baliseInput.min = "1";
        baliseInput.max = "100";
        baliseInput.value = element.quantite;
        baliseInput.classList.add("itemQuantity");

        baliseDiv1.classList.add("cart__item__img");
        baliseDiv12.classList.add("cart__item__content");
        baliseDiv2.classList.add("cart__item__content__description")
        baliseDiv3.classList.add("cart__item__content__settings");
        baliseDiv4.classList.add("cart__item__content__settings__quantity");
        baliseDiv5.classList.add("cart__item__content__settings__delete");
        baliseP4.classList.add("deleteItem")
        
        baliseArticle.dataset.id = element.id;
        baliseArticle.dataset.color = element.color;
        baliseArticle.classList.add("cart__item");

        baliseImg.src = element.imageUrl;
        baliseImg.alt = element.altTxt;
        baliseH2.innerText = element.name;
        baliseP.innerText = element.color;
        baliseP2.innerText = element.price;
        baliseP3.innerText = "Qté :";
        baliseSupr.innerText = element.id;
        baliseP4.innerText = "Supprimer";
        
        baliseArticle.appendChild(baliseDiv12);
        baliseArticle.appendChild(baliseDiv1);
        baliseDiv1.appendChild(baliseImg)
        baliseDiv12.appendChild(baliseDiv2);
        baliseDiv12.appendChild(baliseDiv3);
        baliseDiv2.appendChild(baliseP);
        baliseDiv2.appendChild(baliseP2);
        baliseDiv2.appendChild(baliseH2);
        baliseDiv3.appendChild(baliseDiv5);
        baliseDiv3.appendChild(baliseDiv4);
        baliseDiv4.appendChild(baliseP3);
        baliseDiv4.appendChild(baliseInput);
        baliseDiv5.appendChild(baliseP4);

        let section_article = document.getElementById("cart__items");
        section_article.appendChild(baliseArticle);
  
        qte = qte + parseFloat(element.quantite);
        prix = prix + parseFloat(element.price);

        document.getElementById("totalQuantity").innerText = qte;
        document.getElementById("totalPrice").innerText = prix;  
          
        document.getElementById("deleteItem").addEventListener("click", (e) => {
            e.preventDefault();
            supprimer_produit (id);
        })
        
    })}
    else {
        alert ("Votre panier est vide");
    }


    
function supprimer_produit (id) {
        listDesProduitsTableau.removeItem(id);
    }

        // if (localStorage.length > 0){
        //     listDesProduitsTableau.forEach(element => {
        //         document.getElementById("totalQuantity").innerText = element.quantite;
        //         document.getElementById("totalPrice").innerText = element.color;
        //     })
        // }
        // else {
        //     alert ("Votre panier est vide");
        // }



    // for (var i=0; i <= localStorage.length; i++){
    //     if (localStorage.length > 0){
    //         document.getElementById("totalQuantity").innerText = element.quantite;
    //     }
    //     else {
    //         alert ("Votre panier est vide");
    //     }
    // }

    // Object.keys(localStorage).forEach(element => {
    //         document.getElementById("totalQuantity").innerText = element.quantite;
    //         document.getElementById("totalPrice").innerText = element.color;
    //     });    



}

afficher_produit_panier();

