window.onload = function() {
  var bookNowBtn = document.getElementById('booknowbtn');
  bookNowBtn.onclick = function(event) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      event.preventDefault(); 
      alert('Please login to be able to buy tickets');
      window.location.href = '/login'; 
    }
  };
};