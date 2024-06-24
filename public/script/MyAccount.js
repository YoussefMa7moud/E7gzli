document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logout-link');

  if (logoutLink) {
    logoutLink.addEventListener('click', function(event) {
      event.preventDefault();

      fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 200) {
          sessionStorage.removeItem('isLoggedIn'); 
          window.location.href = '/login'; 
        } else {
          throw new Error(`Logout failed with status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
        alert('Error during logout. Please try again later.');
      });
    });
  }
});




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









