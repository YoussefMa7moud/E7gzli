function validate() {
  console.log("validate function called");
  var email = document.getElementById("user").value;
  var password = document.getElementById("pass").value;

  if (email === "" && password === "") {
    alert("Please Enter your Email and Password");
  } else if (email === "") {
    alert("Please Enter your Email");
  } else if (password === "") {
    alert("Please Enter your Password");
  } else {
    authenticateUser(email, password);
  }
}

function authenticateUser(email, password) {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response not ok.');
    }
  })
  .then(data => {
    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      if (data.type === 1) {
        window.location.href = "./index";
      } else if (data.type === 2) {
        window.location.href = "./Admin"; 
      } else if (data.type === 3) {
        window.location.href = "./Master"; 
      }
    } else {
      alert("Incorrect Email or Password");
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
    alert("Error during login. Please try again later.");
  });
}

if(localStorage.getItem('isLoggedIn') === 'true'){
  window.onload = function() {
    function changeButton() {
      if(localStorage.getItem('isLoggedIn') === 'true') {
        var createAccBtn = document.getElementById('CREATACC');
        createAccBtn.textContent = 'Vote For POTM';
        createAccBtn.setAttribute('href', 'potm');
  
  
  
  
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
  
  
  const passwordInput = document.querySelector('#pass');
  passwordInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const button = document.querySelector('input[type="button"]');
      button.click();
    }
  });



function togglePasswordVisibility() {
  const passwordField = document.getElementById("pass");
  const togglePassword = document.querySelector(".password-toggle-icon i");
  if (passwordField.type === "password") {
      passwordField.type = "text";
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
  } else {
      passwordField.type = "password";
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
  }
}



