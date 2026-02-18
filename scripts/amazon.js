import { products } from "../scripts/products.js";
import { cart } from "../scripts/cart.js";

let html = '';

products.forEach((product) => {

  html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="../images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity" data-product-id="${product.id}">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>


          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="../images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}" id = "${product.id}">
            Add to Cart
          </button>
        </div>`;

})

document.querySelector('.js-products-grid').innerHTML = html;
// code ends





document.querySelectorAll('.js-add-to-cart').forEach((button) => {


  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    // ✅ Find the quantity select for THIS product
    const quantitySelect = document.querySelector(
      `.js-product-quantity[data-product-id="${productId}"]`
    );

    const quantity = Number(quantitySelect.value);



    // if user clicks add to cart on already added product in cart the cart quantity will increase

    let matchingItem;

    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity
      });
    }
    console.log(cart);

    localStorage.setItem('cart', JSON.stringify(cart))

    // code ends





    // the code below is for the added mark that appears after clicking 'add to cart' button  

    let added = document.querySelector(`.js-added-to-cart-${productId}`)
    added.classList.add('ok-added-to-cart')
    setTimeout(() => { added.classList.remove('ok-added-to-cart') }, 2000);


    const added_to_cart = document.getElementById(`${productId}`);
    added_to_cart.innerHTML = "ADDED TO CART"
    setTimeout(() => { added_to_cart.innerHTML = "ADD TO CART" }, 2000)


    const addedbackground = document.getElementById(`${productId}`)
    addedbackground.classList.add('added');
    setTimeout(() => { addedbackground.classList.remove('added') }, 2000)

    // code ends






    // this code is for showing total cart quantity on the navbar
    function updateCart() {
      let cartQuantity = 0;
      cart.forEach((product) => {
        cartQuantity += product.quantity;
      })

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    

    updateCart();
    // code ends


  });



});
