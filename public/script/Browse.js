window.onload = function() {
  var bookNowBtn = document.getElementById('booknowbtn');
  bookNowBtn.onclick = function(event) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      event.preventDefault(); 
      alert('Please login to be able to buy tickets');
      window.location.href = '/login'; 
    }
  };
};
if(sessionStorage.getItem('isLoggedIn') === 'true'){
  window.onload = function() {
    function changeButton() {
      if(sessionStorage.getItem('isLoggedIn') === 'true') {
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

