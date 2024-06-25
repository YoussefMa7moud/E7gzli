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
  let container1 = document.getElementById("ongoing-tickets");
  let container2 = document.getElementById("my-info");
  container2.style.display = "none";
  document.getElementById("ongoing").addEventListener("click", function(event) {
    event.preventDefault();
    showContainer(container1);
    hideContainer(container2);
  });
  document.getElementById("info").addEventListener("click", function(event) {
    event.preventDefault(); 
    showContainer(container2);
    hideContainer(container1);
  });
  function showContainer(container) {
    container.style.display = "block";
  }
  function hideContainer(container) {
    container.style.display = "none";
  }
});











