const cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product');
        const name = product.getAttribute('data-name');
        const price = parseInt(product.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} kr`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Ta bort';
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart();
        });
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    cartTotal.textContent = `Totalt: ${total} kr`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('clear-cart').addEventListener('click', () => {
    cart.length = 0;
    updateCart();
});

updateCart();
