document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
      return [];
    }
  }

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      if (!name || isNaN(price)) return;

      const cart = getCart();

      // If the product is already in the cart, increase its quantity
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({ name: name, price: price, quantity: 1 });
      }

    
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} has been added to your cart.`);
    });
  });
});
