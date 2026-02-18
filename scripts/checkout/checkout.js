import { cart as initialCart } from "../cart.js";
import { products } from "../products.js";
import { paymentTotal } from "../checkout/payment-summary.js"

// 1. Get cart from localStorage (safe fallback)
let cart = JSON.parse(localStorage.getItem('cart')) || initialCart;




// 2. Render products in cart
function renderProducts() {
  let cartHtml = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;



    // Find matching product from products array
    const matchingProduct = products.find(
      (product) => product.id === productId
    );




    // Safety check
    if (!matchingProduct) return;

    cartHtml += `
       <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date js-delivery-date">
        
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents / 100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });


  // Insert HTML
  document.querySelector('.js-order-summary').innerHTML = cartHtml;



  // Attach delete event listeners (IMPORTANT)
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      cart = cart.filter(item => item.productId !== productId);

      localStorage.setItem('cart', JSON.stringify(cart));


      
      updateCartQuantity();
      paymentTotal(cart);
      renderProducts();
      deliverydate()
    });
  });
}



// 3. Update cart quantity
function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity;

  document.querySelector('.js-totalItems').innerHTML = `Items (${cartQuantity}):` /*addding total items in payment summary */
}



// 4. Initial render
renderProducts();
updateCartQuantity();
paymentTotal(cart);

function deliverydate() {
  document.querySelectorAll('.js-delivery-date').forEach((delivery) => {
    delivery.innerHTML = `Delivery Date : ${dayjs().format('dddd , MMMMDD')}`
  })
  document.querySelectorAll('.delivery-option-date').forEach((deliveryDate) => {
    deliveryDate.innerHTML = `Delivery Date : ${dayjs().format('dddd,DD')}`
  })

}
deliverydate()

