function validate(){
  console.log("validate function called");
  var a = document.getElementById("user").value;
  var b = document.getElementById("pass").value;
  if (a == "" && b =="") {
    alert("Please Enter your UserName and Password");
}
else if(a == "") {
  alert("Please Enter your UserName");
}
else if(b ==""){
  alert("Please Enter your Password");
}
else if (a == "admin" && b == "admin") {
  window.location.href ="./Admin";
}

else if (a == "user" && b == "user") {
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href ="./index";
  changeButton();
}

else if (a == "master" && b == "master") {
  window.location.href ="./Master";
}

else{
  alert("Incorrect Email or Password")
}
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



