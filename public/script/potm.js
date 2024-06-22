



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
function validate(){
  var a = document.getElementById("option").value;
  if (a == "Emam Ashour" ) {
    alert("Total votes for "+a+" is:");
}
else if (a == "Zizo" ) {
  alert("Total votes for "+a+" is:");
}
else if (a == "Ali Maloul" ) {
  alert("Total votes for "+a+" is:");
}
else{
  alert("Please choose a player");
}
}