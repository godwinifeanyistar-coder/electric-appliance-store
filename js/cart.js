// Shopping Cart Management
let cart = [];

function addToCart(productId) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
    }
    updateCartUI();
}

function updateCartUI() {
    // Update cart count badge
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    // Update cart items display
    const cartItemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div>$${item.price.toFixed(2)} each</div>
                </div>
                <div>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function openCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    closeCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function completeOrder(event) {
    event.preventDefault();

    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        cardnumber: document.getElementById('cardnumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        items: cart,
        total: document.getElementById('total').textContent,
        orderDate: new Date().toLocaleString()
    };

    // Save to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart and form
    cart = [];
    updateCartUI();
    document.getElementById('checkout-form').reset();
    closeCheckout();

    alert(`Order placed successfully!\n\nOrder Number: #${Math.floor(Math.random() * 100000)}\nTotal: ${formData.total}\n\nThank you for shopping with ElectroHub!`);
}

// Add event listener to cart icon
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
});