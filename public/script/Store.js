function expand(card) {
    card.classList.toggle('profile--expanded');
    if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
    else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
}







if(localStorage.getItem('isLoggedIn') === 'true'){
    window.onload = function() {
      function changeButton() {
        if(localStorage.getItem('isLoggedIn') === 'true') {
    
    
          var logbutton = document.getElementById('loginbutton');
          logbutton.textContent = 'My Account';
          logbutton.onclick = function() {
          logbutton.setAttribute('href', 'MyAccount.html');
            
          };
        }
      }
      changeButton();
    }
    }