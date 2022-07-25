const fetchProduit = async () => {
    await fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((promise) => {
        produitData = promise;
    });  
};

const afficher_produit_panier = async () => {
    await fetchProduit();

    let listDesProduitsJSON = localStorage.getItem("products");
    let listDesProduitsTableau = JSON.parse(listDesProduitsJSON);
    let qte = 0;
    let prix = 0;
    let prix2 = 0;
    let section_article = document.getElementById("cart__items");
    section_article.innerText = "";
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;

    if (localStorage.length > 0){
    listDesProduitsTableau.forEach(element => {

        let baliseImg = document.createElement("img");
        let baliseArticle = document.createElement("article");
        let baliseH2 = document.createElement("h2");
        let baliseP = document.createElement("p");
        let baliseP2 = document.createElement("p");
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
        baliseP4.classList.add("deleteItem");

        baliseArticle.dataset.id = element.id;
        baliseArticle.dataset.color = element.color;
        baliseArticle.classList.add("cart__item");
 
        baliseP.innerText = element.color;
        baliseP3.innerText = "Qté :";
        baliseP4.innerText = "Supprimer";
        
        // baliseDiv5.appendChild(baliseP4);
        // baliseDiv4.appendChild(baliseInput);
        // baliseDiv4.appendChild(baliseP3);  
        // baliseDiv3.appendChild(baliseDiv4);
        // baliseDiv3.appendChild(baliseDiv5);
        // baliseDiv2.appendChild(baliseH2);
        // baliseDiv2.appendChild(baliseP2);
        // baliseDiv2.appendChild(baliseP);
        // baliseDiv12.appendChild(baliseDiv3);
        // baliseDiv12.appendChild(baliseDiv2);
        // baliseDiv1.appendChild(baliseImg)
        // baliseArticle.appendChild(baliseDiv1);
        // baliseArticle.appendChild(baliseDiv12);


        baliseDiv2.appendChild(baliseH2)
        baliseDiv2.appendChild(baliseP)
        baliseDiv2.appendChild(baliseP2)
        baliseDiv4.appendChild(baliseP3);
        baliseDiv4.appendChild(baliseInput);
        baliseDiv5.appendChild(baliseP4);
        baliseDiv3.appendChild(baliseDiv4);
        baliseDiv3.appendChild(baliseDiv5);
        baliseDiv1.appendChild(baliseImg);
        baliseDiv12.appendChild(baliseDiv2)
        baliseDiv12.appendChild(baliseDiv3);
        baliseArticle.appendChild(baliseDiv1);
        baliseArticle.appendChild(baliseDiv12);


        section_article.appendChild(baliseArticle);

        qte = qte + parseFloat(element.quantite);
        document.getElementById("totalQuantity").innerText = qte;
       
        let unId = element.id;       
        baliseP4.value = unId;
        let quantite2 = element.quantite
   
        produitData.forEach(element => {     
            if(element._id === unId){
                prix2 = parseFloat(element.price) * quantite2;
                prix = prix + prix2;
                document.getElementById("totalPrice").innerText = prix;

                baliseP2.innerText = element.price;    
                baliseImg.src = element.imageUrl;      
                baliseImg.alt = element.altTxt;
                baliseH2.innerText = element.name;                 
            }
        })


        const deleteBtns = document.querySelectorAll('.deleteItem');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let confirmation = confirm ("Voulez vous supprimer l'article du panier ?");
                        if (confirmation === true){
                        var products = localStorage.getItem('products');
                        products = JSON.parse(products);
                        const articleToRemove = btn.closest('article');
                        const idProductToChange = articleToRemove.getAttribute('data-id');
                        const colorProductToChange = articleToRemove.getAttribute('data-color');
                        let produitFinal = [];
                        products.forEach(element =>{
                            if(element.id == idProductToChange && element.color == colorProductToChange){
                                articleToRemove.remove();
                            }
                            else {
                                produitFinal.push(element);
                            }
                        })                 
                        localStorage.setItem('products', JSON.stringify(produitFinal));
                        afficher_produit_panier();
                    }             
            })
        });

        const quantityInputs = document.querySelectorAll('.itemQuantity');
        quantityInputs.forEach(btn => {
            btn.addEventListener('change', () => {
                var products = localStorage.getItem('products');
                products = JSON.parse(products);
                const articleToRemove = btn.closest('article');
                const idProductToChange = articleToRemove.getAttribute('data-id');
                const colorProductToChange = articleToRemove.getAttribute('data-color');
                let produitFinal = [];
                products.forEach(element =>{
                    if(element.id == idProductToChange && element.color == colorProductToChange){
                       if(btn.value < 0){
                        produitFinal.push(element);
                        alert("Vous ne pouvez pas avoir une quantité inférieur à 0")                        
                       }
                       else {
                        if(btn.value > 0){
                            element.quantite = btn.value;
                            produitFinal.push(element);
                        }}                   
                    }  
                    else {
                        produitFinal.push(element);
                    }            
                })                 
                localStorage.setItem('products', JSON.stringify(produitFinal));
                afficher_produit_panier();
            })
        })









    })}
    else {
        alert ("Votre panier est vide");
    }
}

function modifier_text() {

  }


afficher_produit_panier();

