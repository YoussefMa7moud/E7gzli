function expand(card) {
    card.classList.toggle('profile--expanded');
    if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
    else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
}





 window.onload = function() {
//   function changeButton() {
//     if (localStorage.getItem('isLoggedIn') === 'true') {
//         var logbutton = document.getElementById('loginbutton');
//         logbutton.textContent = 'My Account';
//         logbutton.onclick = function() {
//             logbutton.setAttribute('href', 'MyAccount');
//         };
//     }
// }
// changeButton();

   
    var Cart = document.getElementById('cart');
  Cart.onclick = function() {
      if (localStorage.getItem('isLoggedIn') === 'false') {
          alert('Login so you can add to cart');
          window.location.href = 'login';
      }
  };
    };


    let openShopping = document.querySelector('.shopping');
    let closeShopping = document.querySelector('.closeShopping');
    let cart = document.querySelector('.cart');
    let listcart = document.querySelector('.listcart');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

    openShopping.addEventListener('click', () => {
        cart.classList.add('active');
    });

    closeShopping.addEventListener('click', () => {
        cart.classList.remove('active');
    });

    let listcarts = [];

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', (event) => {
            let product = JSON.parse(event.target.closest('.profile').getAttribute('data-product'));
            addTocart(product);
        });
    });

    function addTocart(product){
        let existingProduct = listcarts.find(item => item.id === product.id);
        if(existingProduct){
            existingProduct.quantity++;
            existingProduct.price = existingProduct.quantity * (product.price / product.quantity);
        } else {
            product.quantity = 1;
            listcarts.push(product);
        }
        reloadcart();
    }

    function reloadcart(){
        listcart.innerHTML = '';
        let count = 0;
        let totalPrice = 0;
        listcarts.forEach((value) => {
            if(value){
                totalPrice += value.price;
                count += value.quantity;
                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${value.price.toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
                    </div>`;
                listcart.appendChild(newDiv);
            }
        });
        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    }

    function changeQuantity(id, newQuantity){
        let product = listcarts.find(item => item.id === id);
        if(newQuantity <= 0){
            listcarts = listcarts.filter(item => item.id !== id);
        } else {
            product.quantity = newQuantity;
            product.price = newQuantity * (product.price / product.quantity);
        }
        reloadcart();
    }