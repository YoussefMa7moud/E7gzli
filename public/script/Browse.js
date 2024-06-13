window.onload = function() {
  function changeButton() {
      if (localStorage.getItem('isLoggedIn') === 'true') {
          var logbutton = document.getElementById('loginbutton');
          logbutton.textContent = 'My Account';
          logbutton.onclick = function() {
              logbutton.setAttribute('href', 'MyAccount.html');
          };
      }
  }
  changeButton();
  var booknowbtn = document.getElementById('booknowbtn');
  booknowbtn.onclick = function() {
      if (localStorage.getItem('isLoggedIn') === 'false') {
          alert('Login so you can book');
          window.location.href = 'login.html';
      } else {
          booknowbtn.setAttribute('href', 'BookNow.html');
      }
  };
};


let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 2;
loadMoreBtn.addEventListener("click",function(){
    let boxes = [...document.querySelectorAll('.content-wrapper .content .card')];
    for (let i = currentItem; i < currentItem + 2; i++) { // Load one card at a time
        boxes[i].style.display = 'grid';
    }
    currentItem += 2;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
});

// loadMoreBtn.onclick = () => {
//     let boxes = [...document.querySelectorAll('.content-wrapper .content .card')];
//     for (let i = currentItem; i < currentItem + 2; i++) { // Load one card at a time
//         boxes[i].style.display = 'grid';
//     }
//     currentItem += 2;

//     if (currentItem >= boxes.length) {
//         loadMoreBtn.style.display = 'none';
//     }
// };
