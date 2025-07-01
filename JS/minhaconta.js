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

document.getElementById('logout-btn').addEventListener('click', function () {
  // Exemplo: apagar dados da sessão (opcional)
  sessionStorage.clear();
  localStorage.clear();

  // Redirecionar para login.html (ou qualquer página que desejar)
  window.location.href = "login.html";
});