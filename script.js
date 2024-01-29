let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let tax = document.querySelector('.tax');
let subtotal = document.querySelector('.subtotal');

let items = [
    {
        id: 1,
        name: 'Pollo Guisado',
        image: './img/pollo-guisado.jpg',
        price: 15200
    },
    {
        id: 2,
        name: 'Pollo Apanado',
        image: './img/pollo-apanado.jpg',
        price: 18000
    },
    {
        id: 3,
        name: 'Carne Bistec',
        image: './img/carne-bistec.jpg',
        price: 30
    },
    {
        id: 4,
        name: 'Carne Desmechada',
        image: './img/carne-desmechada.jpg',
        price: 225
    },
    {
        id: 5,
        name: 'Carna Asada',
        image: './img/carne-asada.jpg',
        price: 247
    },
    {
        id: 6,
        name: 'Chuleta de Cerdo',
        image: './img/chuleta-cerdo.jpg',
        price: 18
    }
]

function initItem() {
    items.forEach((value, key) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('style', 'width: 15rem;');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${value.name}</h4>
                <p class="card-text text-center">Precio: ${value.price}</p>
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Agregar al Carro</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(items[key]));
        cartLists[key].quantity = 1;
    } else {
        cartLists[key].quantity += 1;
    }
    reloadCart();
    updateCartCount();
}


function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartLists.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;

            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.dataset.price = value.price; // Almacenar el precio
            listItem.dataset.quantity = value.quantity; // Almacenar la cantidad
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${value.name}</h5></div>
                <div><h6 class="mt-2">${value.price.toLocaleString()}</h6></div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count m-2">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            cartList.appendChild(listItem);
        }
    });

    total.innerText = totalPrice.toLocaleString();
}


function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete cartLists[key];
    } else {
        cartLists[key].quantity = quantity;
    }
    reloadCart();
}

function clearCart() {
    cartLists = [];
    reloadCart();
    updateCartCount();
}

document.getElementById('floating-cart').addEventListener('click', toggleCart);

function toggleCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.toggle('active');
    const floatingCart = document.getElementById('floating-cart');

    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none';
        floatingCart.innerHTML = '🛒 <span id="cart-count">' + cartLists.length + '</span>';
    } else {
        cartContainer.style.display = 'block';
        floatingCart.innerHTML = '✖';
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cartLists.filter(item => item).length;
}

function clearCart() {
    cartLists = [];
    reloadCart();
    updateCartCount();
}

function getCartText() {
    let cartItems = cartList.querySelectorAll("li");
    let cartText = "";
    let totalAmount = 0;

    cartItems.forEach(item => {
        let name = item.querySelector("div:nth-child(2) > h5").innerText;
        let price = parseFloat(item.dataset.price); 
        let quantity = parseInt(item.dataset.quantity);

        let productTotal = price * quantity;
        totalAmount += productTotal;

        cartText += `*${name}* que tiene un valor de _${price.toLocaleString()} COP_ - _Cantidad ${quantity}_\n`;
    });

    cartText += `El costo del pedido sería ${totalAmount.toLocaleString()} COP`;
    return cartText;
}

function sendWhatsApp() {
    if (cartLists.length === 0 || cartLists.every(item => !item)) {
        alert("Tu carrito está vacío. Por favor, agrega algunos productos antes de ordenar.");
        return;
    }

    let phoneNumber = "+573042702375";
    let cartText = getCartText();
    let whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(`Hola, Mauricio, deseo ordenar estos platos:\n ${cartText}`);
    window.open(whatsappLink, "_blank");
}