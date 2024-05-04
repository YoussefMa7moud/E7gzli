function logout() {
    if(localStorage.getItem('isLoggedIn') === 'true') {
        var logoutbtn = document.getElementById('logout');
        logoutbtn.textContent = 'Log out';
        logoutbtn.onclick = function() {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'index.html';
        };
    }
}
window.onload = logout;