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
        name: 'Especial de Bandeja Paisa',
        image: './img/bandeja-paisa.jpg',
        price: 16000
    },
    {
        id: 10,
        name: 'Especial de Costilla en Salsa BBQ',
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
        name: 'Solo Sopa - Sancocho',
        image: './img/sancocho.jpg',
        price: 8000
    },
    {
        id: 14,
        name: 'Solo Sopa - Pescado',
        image: './img/sopa-pescado.jpg',
        price: 8000
    }
    ,
    {
        id: 15,
        name: 'Entrada - Frijol',
        image: './img/sopa-pescado.jpg',
        price: 0
    },
    {
        id: 16,
        name: 'Entrada - Uyuco',
        image: './img/sopa-pescado.jpg',
        price: 0
    },
    {
        id: 17,
        name: 'Ensalada - Verde',
        image: './img/sopa-pescado.jpg',
        price: 0
    },
    {
        id: 18,
        name: 'Ensalada - Roja',
        image: './img/sopa-pescado.jpg',
        price: 0
    }
]

function initItem() {
    items.forEach((value, key) => {
        if (!value.name.startsWith('Entrada ') && !value.name.startsWith('Ensalada ')){
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
        }
    });
}


initItem();

let cartLists = [];

function addToCart(key) {
    let selectedItem = items[key];

     // Verificar si el ítem comienza con "Especial"
     if (selectedItem.name.startsWith('Especial ')) {
        // Agregar directamente al carrito
        addToCartList(key);

    // Verificar si el ítem comienza con "Solo Sopa"
     } else if (selectedItem.name.startsWith('Solo Sopa')) {
        addToCartList(key);
    } else {
        // Guardar el ítem seleccionado y mostrar la modal para otros ítems
        window.currentlySelectedKey = key;
        document.getElementById('confirmationModal').style.display = 'block';
    }
}

function showEnsaladaOptions() {
    let ensaladaOptions = items.filter(item => item.name.startsWith('Ensalada '));
    let ensaladaOptionsHtml = ensaladaOptions.map((item, index) => 
        `<button onclick="addEnsaladaToCart(${index})">${item.name.replace('Ensalada - ', '')}</button>`
    ).join('');

    document.getElementById('ensaladaOptionsContainer').innerHTML = ensaladaOptionsHtml;
    document.getElementById('ensaladaOptionsModal').style.display = 'block';
}

function closeEnsaladaOptionsModal() {
    document.getElementById('ensaladaOptionsModal').style.display = 'none';
}


function addEnsaladaToCart(ensaladaIndex) {
    let ensaladaItem = items.filter(item => item.name.startsWith('Ensalada '))[ensaladaIndex];
    let mainItemKey = window.currentlySelectedKey;

    if (cartLists[mainItemKey]) {
        cartLists[mainItemKey].ensaladaOption = ensaladaItem.name;
    }

    closeEnsaladaOptionsModal();
    reloadCart();
    updateCartCount();


}




function showEntradaOptions() {
    let entradaOptions = items.filter(item => item.name.startsWith('Entrada '));

    let entradaOptionsHtml = entradaOptions.map((item, index) => 
        `<button onclick="addEntradaToCart(${index})">${item.name.replace('Entrada - ', '')}</button>`
    ).join('');

    document.getElementById('entradaOptionsContainer').innerHTML = entradaOptionsHtml;
    document.getElementById('entradaOptionsModal').style.display = 'block';
}

function closeEntradaOptionsModal() {
    document.getElementById('entradaOptionsModal').style.display = 'none';
}

function addEntradaToCart(entradaIndex) {
    let entradaItem = items.filter(item => item.name.startsWith('Entrada '))[entradaIndex];
    let mainItemKey = window.currentlySelectedKey;

    if (cartLists[mainItemKey]) {
        cartLists[mainItemKey].entradaOption = entradaItem.name;
    }

    closeEntradaOptionsModal();
    showEnsaladaOptions();
    reloadCart();
    updateCartCount();
    showEnsaladaOptions();
}



function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;

    cartLists.forEach((value, key) => {
        if (value != null) {
            let itemPrice = value.price;
            let itemName = value.name;
            let sopaOption = value.sopaOption ? ` con ${value.sopaOption.replace('Solo Sopa - ', 'Sopa de ')}` : ''; // Quitar "Solo Sopa - " del nombre de la opción de sopa

            totalPrice += itemPrice * value.quantity;

            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.dataset.price = itemPrice;
            listItem.dataset.quantity = value.quantity;
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${itemName}${sopaOption}</h5></div>
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

     // Remover el efecto de pulsación cuando se interactúa con el carrito
     document.getElementById('floating-cart').classList.remove('floating-cart-pulse');
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
    let cartText = "";
    let totalAmount = 0;

    cartLists.forEach(item => {
        if (item) {
            let name = item.name;
            let price = item.price;
            let quantity = item.quantity;


            if (name.startsWith('Solo Sopa')) {
                name = name.replace('Solo Sopa - ', 'Sopa Adicional de ');
            }
            
            // Agregar opciones de sopa, entrada y ensalada si existen
            let sopaOption = item.sopaOption ? ` con ${item.sopaOption.replace('Solo Sopa - ', 'Sopa de ')}` : '';
            let entradaOption = item.entradaOption ? `, ${item.entradaOption.replace('Entrada - ', 'Entrada ')}` : '';
            let ensaladaOption = item.ensaladaOption ? ` ${item.ensaladaOption.replace('Ensalada - ', 'y Ensalada ')}` : '';

            name += sopaOption + entradaOption + ensaladaOption;

            let itemTotal = price * quantity;
            totalAmount += itemTotal;

            cartText += `*${name}* que tiene un valor de _${price.toLocaleString()} Pesos_ - _Cantidad ${quantity}_\n`;
        }
    });

    cartText += `El costo total del pedido sería ${totalAmount.toLocaleString()} Pesos`;
    return cartText;
}






function sendWhatsApp() {
    if (cartLists.length === 0 || cartLists.every(item => !item)) {
        alert("Tu carrito está vacío. Por favor, agrega algunos productos antes de ordenar.");
        return;
    }

    let phoneNumber = "+573042702375";
    let cartText = getCartText();
    let whatsappLink = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(`Hola, Restaurante Delicias de Elida, deseo ordenar estos platos:\n ${cartText}`);
    window.open(whatsappLink, "_blank");

        // Cerrar el carrito y vaciarlo después de enviar a WhatsApp
        toggleCart();
        clearCart();
}

document.getElementById('yesButton').addEventListener('click', function() {
    applySoloBandejaDiscount(window.currentlySelectedKey);
    closeConfirmationModal();
});

document.getElementById('noButton').addEventListener('click', function() {
    addToCartList(window.currentlySelectedKey);
    closeConfirmationModal();
});

function applySoloBandejaDiscount(key) {
    let item = items[key];
    item.price = Math.max(item.price - 2000, 0); // Asegurarse de que el precio no sea negativo
    item.customOption = "Solo bandeja";
    addToCartList(key);

        // Mostrar las opciones de entrada después de elegir "Solo bandeja"
        showEntradaOptions();
}

function addToCartList(key) {
    let selectedItem = items[key];
    // ... lógica para agregar el ítem al carrito ...
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(selectedItem));
        cartLists[key].quantity = 1;
    } else {
        cartLists[key].quantity += 1;
    }

    if (cartLists.filter(item => item).length === 1) {
        document.getElementById('floating-cart').classList.add('floating-cart-pulse');
    }

    reloadCart();
    updateCartCount();
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function showSoloSopaOptions() {
    // Obtener ítems que empiezan con "Solo Sopa"
    let sopaOptions = items.filter(item => item.name.startsWith('Solo Sopa'));

    // Construir botones para cada opción de sopa
    let sopaOptionsHtml = sopaOptions.map((item, index) => 
        `<button onclick="addSoloSopaToCart(${index})">${item.name.replace('Solo Sopa - ', '')}</button>`
    ).join('');

    document.getElementById('sopaOptionsContainer').innerHTML = sopaOptionsHtml;
    document.getElementById('sopaOptionsModal').style.display = 'block';
}

// Llamar a esta función cuando el usuario elija "No" en la consulta de bandeja
document.getElementById('noButton').addEventListener('click', showSoloSopaOptions);

// Función para cerrar el modal de opciones de sopa
function closeSopaOptionsModal() {
    document.getElementById('sopaOptionsModal').style.display = 'none';
}


document.getElementById('noButton').addEventListener('click', function() {
    showSoloSopaOptions();
    closeConfirmationModal();
});

function addSoloSopaToCart(sopaIndex) {
    let sopaItem = items.filter(item => item.name.startsWith('Solo Sopa'))[sopaIndex];
    let mainItemKey = window.currentlySelectedKey;

    // Asegurar que el ítem principal ya esté en el carrito
    if (cartLists[mainItemKey]) {
        cartLists[mainItemKey].sopaOption = sopaItem.name;
    } else {
        // Si el ítem principal no está en el carrito, añádelo
        let mainItem = items[mainItemKey];
        cartLists[mainItemKey] = JSON.parse(JSON.stringify(mainItem));
        cartLists[mainItemKey].quantity = 1;
        cartLists[mainItemKey].sopaOption = sopaItem.name;
    }

    document.getElementById('sopaOptionsModal').style.display = 'none';
    reloadCart();
    updateCartCount();
    closeSopaOptionsModal(); // Cerrar el modal después de añadir la sopa

    showEntradaOptions(); // Mostrar opciones de entrada después de elegir una sopa
}



