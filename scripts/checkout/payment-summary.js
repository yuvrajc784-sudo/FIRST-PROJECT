import { products } from "../products.js";

export function paymentTotal (cart) {
let matchingProduct;
let totalCost = 0;

cart.forEach((item) => {

  products.forEach((product) => {
    if (item.productId == product.id){
      matchingProduct = product;
    }
  })
  totalCost += matchingProduct.priceCents * item.quantity;
})

document.querySelector('.js-payment-summary-money').innerHTML = `$${(totalCost/100).toFixed(2)}`;

}
