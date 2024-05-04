window.onload = function() {
  function changeButton() {
      if (localStorage.getItem('isLoggedIn') === 'true') {
          var logbutton = document.getElementById('loginbutton');
          logbutton.textContent = 'My Account';
          logbutton.onclick = function() {
              logbutton.setAttribute('href', 'MyAccount.html');
          };
      }
  }
  changeButton();
  var booknowbtn = document.getElementById('booknowbtn');
  booknowbtn.onclick = function() {
      if (localStorage.getItem('isLoggedIn') === 'false') {
          alert('Login so you can book');
          window.location.href = 'login.html';
      } else {
          booknowbtn.setAttribute('href', 'BookNow.html');
      }
  };
};
