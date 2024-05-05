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
// document.getElementById('popupBtn').addEventListener('click', function() {
//   document.getElementById('popupContainer').style.display = 'block';
// });

// document.getElementById('closeBtn').addEventListener('click', function() {
//   document.getElementById('popupContainer').style.display = 'none';
// });

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
// document.addEventListener("DOMContentLoaded", function() {
//   let showButton = document.getElementById("User");
//   let container = document.getElementById("container2");

//   showButton.addEventListener("click", function() {
//     container.style.display = "block";
  
//   });
// });
// document.addEventListener("DOMContentLoaded", function() {
//   let showButton = document.getElementById("Store");
//   let container = document.getElementById("container3");

//   showButton.addEventListener("click", function() {
//     container.style.display = "block";
  
//   });
// });