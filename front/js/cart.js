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


        
    const prenom = document.getElementById("firstName");
    const nom = document.getElementById("lastName");
    const ville = document.getElementById("city");
    const adresse = document.getElementById("address");
    const email = document.getElementById("email");

    let valuePrenom, valueNom, valueEmail, valueAdesse, valueVille;

    prenom.addEventListener("input", function(e) {
        if (e.target.value.length == 0){
            console.log("rien");
            firstNameErrorMsg.innerHTML = "";
            valuePrenom = null;
        }
        if(e.target.value.match(/^[a-z A-Z]{1,25}$/)){
            firstNameErrorMsg.innerHTML ="";
            valuePrenom = e.target.value;
            console.log("success");
            console.log(valuePrenom);
        }
        if(!e.target.value.match(/^[a-z A-Z]{0,25}$/)){
            firstNameErrorMsg.innerHTML ="Pas de caratère spéciaux merci";
        }
    })

    nom.addEventListener("input", function(e) {
        if (e.target.value.length == 0){
            console.log("rien");
            lastNameErrorMsg.innerHTML = "";
            valueNom = null;
        }
        if(e.target.value.match(/^[a-z A-Z]{1,25}$/)){
            lastNameErrorMsg.innerHTML ="";
            valueNom = e.target.value;
            console.log("success");
            console.log(valueNom);
        }
        if(!e.target.value.match(/^[a-z A-Z]{0,25}$/)){
            lastNameErrorMsg.innerHTML ="Pas de caratère spéciaux merci";
            valueNom = null;
        }
    })

    adresse.addEventListener("input", function(e) {
        if (e.target.value.length == 0){
            console.log("rien");
            addressErrorMsg.innerHTML = "";
            valueAdesse = null;
        }
        if(e.target.value.match("^[a-z A-Z 0-9\s,'-]*$")){
            addressErrorMsg.innerHTML ="";
            valueAdesse = e.target.value;
            console.log("success");
            console.log(valueAdesse);
        }
        if(!e.target.value.match("^[a-z A-Z 0-9\s,'-]*$")){
            addressErrorMsg.innerHTML ="Pas de caratère spéciaux merci";
            valueAdesse = null;
        }
    })

    ville.addEventListener("input", function(e) {
        if (e.target.value.length == 0){
            console.log("rien");
            cityErrorMsg.innerHTML = "";
            valueVille = null;
        }
        if(e.target.value.match(/^[a-z A-Z]{1,25}$/)){
            cityErrorMsg.innerHTML ="";
            valueVille = e.target.value;
            console.log("success");
            console.log(valueVille);
        }
        if(!e.target.value.match(/^[a-z A-Z]{0,25}$/)){
            cityErrorMsg.innerHTML ="Pas de caratère spéciaux merci";
            valueVille = null;
        }
    })

    email.addEventListener("input", function(e) {
        if (e.target.value.length == 0){
            console.log("rien");
            emailErrorMsg.innerHTML = "";
            valueEmail = null;
        }
        if(e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            emailErrorMsg.innerHTML ="";
            valueEmail = e.target.value;
            console.log("success");
            console.log(valueEmail);
        }
        if(!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !e.target.value.length == 0){
            emailErrorMsg.innerHTML ="Email incorrect ex : quentin@outlook.fr";
            valueEmail = null;
        }
    })

    const order = document.getElementById("order");

    order.addEventListener('click', (e) => {
        e.preventDefault();
    
        let commandeId = [];

        let listDesProduitsJSON = localStorage.getItem("products");
        let listDesProduitsTableau = JSON.parse(listDesProduitsJSON);
        listDesProduitsTableau.forEach((commande) =>{
            commandeId.push(commande.id);
        })
        
        const data = {
            contact:{
                firstName : valuePrenom,
                lastName : valueNom,
                address : valueAdesse,
                city : valueVille,
                email : valueEmail,
            },
        products: commandeId,
        };

        const submitCommande = async () => {
            await fetch(`http://localhost:3000/api/products/order`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),           
            })
            .then((res) => res.json())
            .then((promise) => {
                window.location.href = "./confirmation.html?orderId="+promise.orderId;
            });  
        };
        submitCommande();

    })
    

            
      











            
    
            //     console.log(contact);
            //     let items = produitData;
            //     let products = [];
              
            //     for (i = 0; i < items.length; i++) {
            //       if (products.find((e) => e == items[i][0])) {
            //         console.log("not found");
            //       } else {
            //         products.push(items[i][0]);
            //       }
            //     }
            //     let jsonData = JSON.stringify({ contact, products });
            //     console.log("test");
            //     return jsonData;
            // }
        


        // let user = {
        //     name: 'John',
        //     surname: 'Smith'
        //   };
          
        //   let response = await fetch('/article/fetch/post/user', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify(user)
        //   });
          
        //   let result = await response.json();
        //   alert(result.message);






}


afficher_produit_panier();

