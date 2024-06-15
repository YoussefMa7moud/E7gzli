function logout() {
    if(localStorage.getItem('isLoggedIn') === 'true') {
        var logoutbtn = document.getElementById('logout');
        logoutbtn.onclick = function() {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'index';
        };
    }
}
window.onload = logout;



document.addEventListener("DOMContentLoaded", function() {
    let past = document.getElementById("past");
    let container1 = document.getElementById("past-tickets");
    let ongoing = document.getElementById("ongoing");
    let container2 = document.getElementById("ongoing-tickets");
    let info = document.getElementById("info");
    let container3 = document.getElementById("my-info");

    
    // Initially hide all containers
    container1.style.display = "none";
    container2.style.display = "none";
    

    past.addEventListener("click", function() {
      container1.style.display = "block";
      container2.style.display = "none";
      container3.style.display = "none";
    });

    ongoing.addEventListener("click", function() {
      container2.style.display = "block";
      container1.style.display = "none";
      container3.style.display = "none";
    });

    info.addEventListener("click", function() {
      container3.style.display = "block";
      container2.style.display = "none";
      container1.style.display = "none";
    });
});









