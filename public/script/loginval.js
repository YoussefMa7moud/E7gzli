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

