const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
});



document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('lo');

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
