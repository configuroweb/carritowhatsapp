let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');

let items = [
    {
        id: 1,
        name: 'Lengua a la Criolla',
        image: './img/lengua-criolla.jpg',
        price: 14000
    },
    {
        id: 2,
        name: 'Gallina Guisada',
        image: './img/gallina-guisada.jpg',
        price: 16000
    },
    {
        id: 3,
        name: 'Cordon Blue en Salsa',
        image: './img/cordon-blue.jpg',
        price: 14000
    },
    {
        id: 4,
        name: 'Bagre',
        image: './img/bagre.jpg',
        price: 14000
    },
    {
        id: 5,
        name: 'Bocachico Sudado',
        image: './img/bocachico-sudado.jpg',
        price: 14000
    },
    {
        id: 6,
        name: 'Chuleta de Cerdo',
        image: './img/chuleta-cerdo.jpg',
        price: 14000
    },
    {
        id: 7,
        name: 'Chuleta de Pescado',
        image: './img/chuleta-pescado.jpg',
        price: 14000
    },
    {
        id: 8,
        name: 'Sobrebarriga a la Criolla',
        image: './img/sobrebarriga.jpg',
        price: 14000
    },
    {
        id: 9,
        name: 'Bandeja Paisa',
        image: './img/bandeja-paisa.jpg',
        price: 16000
    },
    {
        id: 10,
        name: 'Costilla en Salsa BBQ',
        image: './img/costilla-bbq.jpg',
        price: 16000
    },
    {
        id: 11,
        name: 'Carne Asada',
        image: './img/carne-asada.jpg',
        price: 14000
    },
    {
        id: 12,
        name: 'Carne Molida',
        image: './img/carne-molida.jpg',
        price: 14000
    },
    {
        id: 13,
        name: 'Principio - Frijol',
        image: './img/frijol.jpg',
        price: 0
    },
    {
        id: 14,
        name: 'Principio - Yuca Guisada',
        image: './img/yuca-guisada.jpg',
        price: 0
    },
    {
        id: 15,
        name: 'Principio - Zamba',
        image: './img/zamba.jpg',
        price: 0
    },
    {
        id: 16,
        name: 'Sopa - Sancocho',
        image: './img/sancocho.jpg',
        price: 0
    },
    {
        id: 17,
        name: 'Sopa - Pescado',
        image: './img/sopa-pescado.jpg',
        price: 0
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
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Ordenar</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    let selectedItem = items[key];

    if (selectedItem.name.startsWith('Sopa')) {
        if (cartLists.some(item => item && item.name.startsWith('Sopa'))) {
            alert('Solo puedes seleccionar una sopa');
            return;
        }
    }

    if (selectedItem.name.startsWith('Principio') && cartLists.length === 0) {
        alert('No puedes seleccionar solo un principio');
        return;
    }

    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(selectedItem));
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
    let soloSopa = cartLists.filter(item => item && item.name.startsWith('Sopa')).length === 1 && cartLists.length === 1;

    cartLists.forEach((value, key) => {
        if (value != null) {
            let itemPrice = value.price;

            if (soloSopa && value.name.startsWith('Sopa')) {
                itemPrice = 8000;
            }

            totalPrice += itemPrice * value.quantity;

            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.dataset.price = itemPrice; // Aquí se refleja el cambio de precio
            listItem.dataset.quantity = value.quantity;
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${value.name}</h5></div>
                <div><h6 class="mt-2">${itemPrice.toLocaleString()}</h6></div>
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

    if (cartContainer.classList.contains('active')) {
        floatingCart.innerHTML = '✖';
    } else {
        floatingCart.innerHTML = '<i class="fab fa-whatsapp"></i> <span id="cart-count">' + cartLists.length + '</span>';
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
    let soloSopa = cartLists.filter(item => item && item.name.startsWith('Sopa')).length === 1 && cartLists.length === 1;

    cartItems.forEach(item => {
        let name = item.querySelector("div:nth-child(2) > h5").innerText;
        let price = parseFloat(item.dataset.price);
        let quantity = parseInt(item.dataset.quantity);

        if (soloSopa && name.startsWith('Sopa')) {
            price = 8000;
        }

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