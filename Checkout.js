const SHIPPING_FEE = 500; // flat shipping fee, applied when the cart has items

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

function calculateTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    return sum + (parseFloat(item.price) || 0) * (item.quantity || 1);
  }, 0);
  const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

document.addEventListener('DOMContentLoaded', () => {
  displayCart();

  const checkoutForm = document.querySelector('.checkout-form');
  const purchaseBtn = document.getElementById('purchase-btn');

  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (processPurchase()) checkoutForm.reset();
    });
  }

  // The Complete Purchase button
  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', () => {
      if (processPurchase() && checkoutForm) checkoutForm.reset();
    });
  }
});

// Returns true if the purchase went through, false if the cart was empty
function processPurchase() {
  const cart = getCart();

  if (cart.length === 0) {
    alert('Your cart is empty! Please add products before checking out.');
    return false;
  }

  const { total } = calculateTotals(cart);

  const itemDetails = cart
    .map(item => `• ${item.name} (x${item.quantity || 1}) - $${((item.quantity || 1) * item.price).toFixed(2)}`)
    .join('\n');

  alert(
    `Thank you for your purchase!\n\nSummary of Purchased Items:\n${itemDetails}\n\nTotal Paid (incl. shipping): $${total.toFixed(2)}\n\nYour order has been placed successfully!`
  );

  // Clear the cart and refresh the summary
  localStorage.removeItem('cart');
  displayCart();

  const messageElem = document.getElementById('message');
  if (messageElem) {
    messageElem.textContent = 'Your order has been placed successfully!';
  }
  return true;
}

function displayCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cartitems');
  const subtotalElem = document.getElementById('subtotal');
  const shippingElem = document.getElementById('shipping');
  const totalElem = document.getElementById('totalamount');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>No products in the cart.</p>';
  } else {
    cart.forEach(item => {
      const quantity = item.quantity || 1;
      const itemTotal = quantity * (parseFloat(item.price) || 0);

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 8px;';

      const label = document.createElement('span');
      label.textContent = `${item.name} (x${quantity})`;

      const amount = document.createElement('span');
      amount.textContent = `$${itemTotal.toFixed(2)}`;

      row.append(label, amount);
      cartItemsContainer.appendChild(row);
    });
  }

  const { subtotal, shipping, total } = calculateTotals(cart);
  if (subtotalElem) subtotalElem.textContent = subtotal.toFixed(2);
  if (shippingElem) shippingElem.textContent = shipping.toFixed(2);
  if (totalElem) totalElem.textContent = total.toFixed(2);
}
