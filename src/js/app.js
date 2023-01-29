import { products } from "../utils/products.js";
import { printCart, cart, showCartNumber, saveLocal } from "./cart.js";
import { goServices, navbarLogo, shopContent, showCart } from "./node.js";


//Show Products by CreateElement
products.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.url}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}$</p>
        `;

    shopContent.append(content);

    const shop = document.createElement("button");
    shop.innerText = "Añadir";
    shop.className = "shop";

    content.append(shop);

    shop.addEventListener("click", ()=>{

        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.quantity++;
                }
            });
        }else{

            cart.push({
                id : product.id,
                url: product.url,
                name: product.name,
                price: product.price,
                quantity: product.quantity 
                });
        }
        showCartNumber();
        saveLocal();
       
    });
});

showCart.addEventListener("click", printCart);
showCartNumber();

navbarLogo.addEventListener("click", () => {
    location.href = "#";
})
goServices.addEventListener("click", ()=>{
    location.href = "#products";
})








