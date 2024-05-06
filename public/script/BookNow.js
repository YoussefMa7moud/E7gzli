function calculatePayment() {
    var totalPayment = 0;

    var cat3price = 100;
    var cat3numberOfTickets = parseInt(document.getElementById("NO3").value);
    totalPayment += cat3price * cat3numberOfTickets;

    var cat2price = 200;
    var cat2numberOfTickets = parseInt(document.getElementById("NO2").value);
    totalPayment += cat2price * cat2numberOfTickets;

    var cat1price = 400;
    var cat1numberOfTickets = parseInt(document.getElementById("NO1").value);
    totalPayment += cat1price * cat1numberOfTickets;

    document.getElementById("Paymenth1").textContent = "Total = " + totalPayment + " EGP";
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




    function ps(value){
      var output = document.getElementById('output');
      output.innerHTML = '';
      if (value === 'c') {
          var result = generateRandomCode(10);
          output.innerHTML = '<p id="Titleps">Please Pay Using this code before time end : ' + result + '</p><p id="timer"></p>'; 
          startTimer(30); 
      } else if (value === 'v') {
          output.innerHTML = `
          <form>
          <label for="cardHolderName">Card Holder Name:</label><br>
          <input type="text" id="cardHolderName" name="cardHolderName"><br>
          
          <label for="cardNumber">Card Number:</label><br>
          <input type="number" id="cardNumber" name="cardNumber"><br>
  
          <label for="cvv">CVV:</label><br>
          <input type="number" id="cvv" name="cvv"><br>
          </form>
          `;
      }
  }
  
  function generateRandomCode(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
  
  function startTimer(duration) {
      var timer = duration*60, minutes, seconds;
      var display = document.getElementById('timer');
      setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          display.textContent = minutes + ":" + seconds;
  
          if (--timer < 0) {
              timer = duration;
          }
      }, 1000);
  }
  