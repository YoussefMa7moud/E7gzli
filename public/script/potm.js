if (sessionStorage.getItem('isLoggedIn') === 'true') {
  window.onload = function() {
    function changeButton() {
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
        var logbutton = document.getElementById('loginbutton');
        logbutton.textContent = 'My Account';
        logbutton.onclick = function() {
          logbutton.setAttribute('href', 'MyAccount');
        };
      }
    }
    changeButton();
  }
}

  

