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
