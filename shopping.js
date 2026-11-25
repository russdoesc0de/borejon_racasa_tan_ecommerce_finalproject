document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Cart Icon Click Interaction
    const cartIconBtn = document.getElementById('cart-icon-btn');
    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Opening Shopping Cart Overaly');
            // Add your cart toggle logic here
        });
    }
});
