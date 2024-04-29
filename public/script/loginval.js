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
  window.location.href ="Browse.html"
}
else{
}
}
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



