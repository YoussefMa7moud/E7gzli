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
  Admin.addEventListener("click", function() {
    container1.style.display = "flex";
    container2.style.display = "none";
    container3.style.display = "none";
  });
  User.addEventListener("click", function() {
         container2.style.display = "block";
         container1.style.display = "none";
         container3.style.display = "none";
  });
  Store.addEventListener("click", function() {
    container3.style.display = "block";
    container2.style.display = "none";
    container1.style.display = "none";

});


});
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
    var formContainer1 = document.getElementById("userHistory");
    if (formContainer1.style.display === "block") {
      formContainer1.style.display = "none";
    } else {
      formContainer1.style.display = "block";
    }
  }
  function enlarge10(b){
    let card = b.getElementsByClassName('history-container');
    card.classList.add('enlarge_profile1');
    document.body.style.overflow='hidden';
    /* this for the data to be shown in the card when enlarged */
  
  }
  document.addEventListener('click', function(event) {
    const enlargedCard = document.querySelector('.history-container.enlarge_profile1');
    if (enlargedCard && !enlargedCard.contains(event.target)) {
        enlargedCard.classList.remove('enlarge_profile1');
        document.body.style.overflow = 'auto';
      }
  
    });





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
  if (formContainer.style.display === "none") {
    formContainer.style.display = "block";
  } else {
    formContainer.style.display = "none";
  }
}



