// window.addEventListener('load', () => {
//   const loadingScreen = document.getElementById('loading-screen');
//   if (loadingScreen) {
//     loadingScreen.style.display = 'none';
//   }
// });


const input = document.getElementById('upload-photo');
const image = document.getElementById('profile-image');

input.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

const logoutBtn = document.getElementById('logout-btn');
const modal = document.getElementById('confirm-modal');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

logoutBtn.addEventListener('click', function () {
  modal.style.display = 'flex'; // Mostrar o modal
});

confirmYes.addEventListener('click', function () {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "login.html";
});

confirmNo.addEventListener('click', function () {
  modal.style.display = 'none'; // Esconde o modal
});
