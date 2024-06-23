document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('log_out');

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
          localStorage.removeItem('isLoggedIn'); 
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
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  searchBtn.addEventListener("click", () => { 
    sidebar.classList.toggle("open");
    menuBtnChange(); 
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
});


document.addEventListener("DOMContentLoaded", function() {
  let Admin = document.getElementById("Admin");
  let container1 = document.getElementById("container1");
  let User = document.getElementById("User");
  let container2 = document.getElementById("container2");
  let Store = document.getElementById("Store");
  let container3 = document.getElementById("container3");
  let  POTM= document.getElementById("POTM");
  let container4 = document.getElementById("container4");
  let container87 = document.getElementById("container87");
  let container88 = document.getElementById("container88");
  let container89 = document.getElementById("container89");
  Admin.addEventListener("click", function() {
    container1.style.display = "flex";
    container2.style.display = "none";
    container3.style.display = "none";
    container87.style.display = "none";
    container88.style.display = "none";
    container89.style.display = "none";
  });
  User.addEventListener("click", function() {
         container2.style.display = "block";
         container1.style.display = "none";
         container3.style.display = "none";
         container87.style.display = "none";
    container88.style.display = "none";
    container89.style.display = "none";
  });
  Store.addEventListener("click", function() {
    container3.style.display = "block";
    container2.style.display = "none";
    container1.style.display = "none";
    container87.style.display = "none";
    container88.style.display = "none";
    container89.style.display = "none";
});

POTM.addEventListener("click", function() {
  container3.style.display = "none";
  container2.style.display = "none";
  container1.style.display = "none";
  container4.style.display = "flex";
  container87.style.display = "flex";
  container88.style.display = "block";
  container89.style.display = "block";
});

});
/* admin section*/ 
function toggleadminForm1() {
  var formContainer1 = document.getElementById("adminHistory1");
  if (formContainer1.style.display === "block") {
    formContainer1.style.display = "none";
  } else {
    formContainer1.style.display = "block";
  }
}

function toggleadminForm2() {
  var formContainer1 = document.getElementById("adminHistory2");
  if (formContainer1.style.display === "block") {
    formContainer1.style.display = "none";
  } else {
    formContainer1.style.display = "block";
  }
}
function toggleadminForm3() {
  var formContainer1 = document.getElementById("adminHistory3");
  if (formContainer1.style.display === "block") {
    formContainer1.style.display = "none";
  } else {
    formContainer1.style.display = "block";
  }
}
function toggleadminForm4() {
  var formContainer1 = document.getElementById("adminHistory4");
  if (formContainer1.style.display === "block") {
    formContainer1.style.display = "none";
  } else {
    formContainer1.style.display = "block";
  }
}




/* user section */


function enlarge1(b){
  let card = b.closest('.card');
  card.classList.add('enlarge_profile');
  document.body.style.overflow='hidden';
  /* this for the data to be shown in the card when enlarged */
    let d = card.querySelector('.test1');
    d.style.display = "block";

    
    let profile =document.getElementById('Profile1');
    profile.style.display='none';

    let profile2 =document.getElementById('Profile2');
    profile2.style.display='none';
    
    let profile3 =document.getElementById('Profile3');
    profile3.style.display='none';

    let profile4 =document.getElementById('Profile4');
    profile4.style.display='none';
}


document.addEventListener('click', function(event) {
  const enlargedCard = document.querySelector('.card.enlarge_profile');
  if (enlargedCard && !enlargedCard.contains(event.target)) {
      enlargedCard.classList.remove('enlarge_profile');
      document.body.style.overflow = 'auto';
  
      let d =  enlargedCard.querySelector('.test1');
      d.style.display = "none";

    let profile =document.getElementById('Profile1');
      profile.style.display='block';
      
      let profile2 =document.getElementById('Profile2');
      profile2.style.display='block';
      
      let profile3 =document.getElementById('Profile3');
      profile3.style.display='block';
  
      let profile4 =document.getElementById('Profile4');
      profile4.style.display='block';
      
    }

  });
  function toggleForm1() {
    var formContainer1 = document.getElementById("userHistory1");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }

  function toggleForm2() {
    var formContainer1 = document.getElementById("userHistory2");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function toggleForm3() {
    var formContainer1 = document.getElementById("userHistory3");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function toggleForm4() {
    var formContainer1 = document.getElementById("userHistory4");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }

  function toggleBan1() {
    var formContainer1 = document.getElementById("banForm1");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function toggleBan2() {
    var formContainer1 = document.getElementById("banForm2");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function toggleBan3() {
    var formContainer1 = document.getElementById("banForm3");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function toggleBan4() {
    var formContainer1 = document.getElementById("banForm4");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }





/* Store  Section */
document.addEventListener("DOMContentLoaded", function() {
  var profileCards = document.querySelectorAll('.profile');
  profileCards.forEach(function(card) {
    card.classList.add('profile--expanded');
  });
});
function toggleEdit(button) {
  var profile = button.closest('.profile');
  var editForm = profile.querySelector('.edit-form');
  editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
}

function saveChanges(button) {
  var profile = button.closest('.profile');
  var inputs = profile.querySelectorAll('.edit-input');
  inputs.forEach(function(input) {
    console.log(input.value);
  });
  profile.classList.toggle('editing');
};
function enlarge(A){
let F=document.getElementsByClassName('form-container')[0];
F.classList.add('enlarge_form');
document.body.style.overflow='hidden';
}
function closeForm() {
  var formContainer = document.getElementById("addProfileForm");
  formContainer.style.display = "none";
}

function toggleForm() {
  var formContainer = document.getElementById("addProfileForm");
  if (formContainer.style.display === "block") {
    formContainer.style.display = "none";
  } else {
    formContainer.style.display = "block";
  }
}



