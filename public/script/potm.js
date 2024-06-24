if (sessionStorage.getItem('isLoggedIn') === 'true') {
  window.onload = function() {
    function changeButton() {
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
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

  function validate() {
    var selectedPlayer = document.getElementById("option").value;
  
    // Check if the user has already voted
    if (localStorage.getItem('hasVoted')) {
      alert("You have already voted.");
      return;
    }
  
    // Perform the voting action
    if (selectedPlayer) {
      fetch('/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player: selectedPlayer })
      })
      .then(response => {
        if (response.status === 200) {
          return response.json(); // Get the total votes from server
        } else {
          throw new Error(`Failed to vote. Status: ${response.status}`);
        }
      })
      .then(totalVotes => {
        alert(`Total votes for ${selectedPlayer} is: ${totalVotes}`);
        localStorage.setItem('hasVoted', true); // Set a flag that user has voted
        window.location.href = '/index'; // Redirect to index page
      })
      .catch(error => {
        console.error('Error during voting:', error);
        alert('Failed to vote. Please try again later.');
      });
    } else {
      alert("Please choose a player");
    }
  }
