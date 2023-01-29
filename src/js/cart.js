export let cart = //Get Item
JSON.parse(localStorage.getItem("cartContent")) || [];

//Create & Show Cart
export const printCart = () =>{

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>

    `;
    modalContainer.append(modalHeader)
    const modalButton = document.createElement("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalButton);

    cart.forEach((product)=>{
        let cartContent = document.createElement("div");
        cartContent.className = "modal-content";
        cartContent.innerHTML= `
        <img src="${product.url}    ">
        <h3>${product.name}</h3>
        <p> $${product.price}</p>
        <span class="less"> - </span>
        <p>Cantidad: ${product.quantity}</p>
        <span class="more"> + </span>
        <p>Total: $${product.quantity * product.price}</p>

        `;
        modalContainer.append(cartContent);

        let less = cartContent.querySelector(".less");
        less.addEventListener("click", () => {
            if(product.quantity!==1){
                product.quantity--;
                saveLocal();
                printCart();
                
            }
        });
        let more = cartContent.querySelector(".more");
        more.addEventListener("click", () => {
            
            product.quantity++;
            saveLocal();
            printCart();
        });

        let delItem = document.createElement("span");
        delItem.innerText = "X";
        delItem.className = "delete-product";
        cartContent.append(delItem);

        delItem.addEventListener("click", delProduct)
    });


    //Total sum with reduce
    const total = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: $${total}`;
    modalContainer.append(totalBuying);
};

//Delete product Function

const delProduct = ()=> {
    const foundId = cart.find((element) => element.id);
    cart = cart.filter((cartId)=> {
        return cartId !=foundId;
    });
    showCartNumber();
    saveLocal();
    printCart();
};

//Pintar numero del carrito
export const showCartNumber = () => {
    cartNumber.style.display = "block";
    const cartLength = cart.length;
    localStorage.setItem("cartLength", JSON.stringify(cartLength));
    cartNumber.innerText = JSON.parse(localStorage.getItem("cartLength"));
};
export const saveLocal = () =>{
    localStorage.setItem("cartContent",JSON.stringify(cart));
}
//Get Item
const getLocal = () => {
    JSON.parse(localStorage.getItem("cartContent"));
}

