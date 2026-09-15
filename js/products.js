// Product Database
const products = [
    {
        id: 1,
        name: 'Smart Refrigerator',
        category: 'kitchen',
        price: 1299.99,
        description: 'Energy-efficient smart fridge with WiFi connectivity',
        icon: '🧊',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Digital Microwave',
        category: 'kitchen',
        price: 299.99,
        description: 'Advanced microwave with sensor cooking',
        icon: '📻',
        rating: 4.2
    },
    {
        id: 3,
        name: 'Coffee Maker',
        category: 'kitchen',
        price: 149.99,
        description: 'Programmable coffee maker with thermal carafe',
        icon: '☕',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Dishwasher',
        category: 'kitchen',
        price: 599.99,
        description: 'Quiet and efficient dishwasher with multiple cycles',
        icon: '🍽️',
        rating: 4.4
    },
    {
        id: 5,
        name: 'Air Conditioner',
        category: 'cooling',
        price: 899.99,
        description: 'Smart AC unit with temperature control',
        icon: '❄️',
        rating: 4.6
    },
    {
        id: 6,
        name: 'Electric Heater',
        category: 'cooling',
        price: 199.99,
        description: 'Portable space heater with thermostat',
        icon: '🔥',
        rating: 4.3
    },
    {
        id: 7,
        name: 'Washing Machine',
        category: 'laundry',
        price: 799.99,
        description: 'Front-load washer with steam cleaning',
        icon: '🧺',
        rating: 4.5
    },
    {
        id: 8,
        name: 'Electric Dryer',
        category: 'laundry',
        price: 699.99,
        description: 'Energy-efficient dryer with sensor dry',
        icon: '👕',
        rating: 4.4
    },
    {
        id: 9,
        name: 'Hair Dryer',
        category: 'personal',
        price: 89.99,
        description: 'Ionic hair dryer with heat protection',
        icon: '💇',
        rating: 4.6
    },
    {
        id: 10,
        name: 'Electric Toothbrush',
        category: 'personal',
        price: 79.99,
        description: 'Rechargeable toothbrush with whitening mode',
        icon: '🪥',
        rating: 4.5
    },
    {
        id: 11,
        name: 'Vacuum Cleaner',
        category: 'personal',
        price: 499.99,
        description: 'Cordless vacuum with HEPA filter',
        icon: '🧹',
        rating: 4.7
    },
    {
        id: 12,
        name: 'Blender',
        category: 'kitchen',
        price: 199.99,
        description: 'High-powered blender with multiple speeds',
        icon: '🥤',
        rating: 4.4
    }
];

function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

// Initialize products on page load
window.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});