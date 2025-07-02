const btn = document.getElementById('btnCompartilhar');
const msg = document.getElementById('copiado-msg');

btn.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    msg.classList.add('mostrar');
    setTimeout(() => msg.classList.remove('mostrar'), 2500);
  }).catch(() => {
    alert('❌ Não foi possível copiar o link.');
  });
});

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


// Seletores
const btnCompartilhar = document.getElementById('btnCompartilhar');
const menu = document.getElementById('menuCompartilhar');


// Abrir/fechar o menu de compartilhamento
btnCompartilhar.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que o clique feche imediatamente
  menu.classList.toggle('show');
  atualizarLinksCompartilhamento();
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !btnCompartilhar.contains(e.target)) {
    menu.classList.remove('show');
  }
});

// Copiar link (botão dentro do menu)
function copiarLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    msg.classList.add('mostrar');
    setTimeout(() => msg.classList.remove('mostrar'), 2500);
    menu.classList.remove('show'); // fecha o menu após copiar
  }).catch(() => {
    alert('❌ Não foi possível copiar o link.');
  });
}

// Atualizar links dinâmicos
function atualizarLinksCompartilhamento() {
  const url = encodeURIComponent(window.location.href);
  const whatsapp = document.getElementById('btnWhatsApp');
  const facebook = document.getElementById('btnFacebook');
  // const instagram = document.getElementById('btnInstagram'); // Corrigido: nome minúsculo

  if (whatsapp) {
    whatsapp.href = `https://wa.me/?text=${url}`;
  }

  if (facebook) {
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }

  // Instagram não permite compartilhamento direto via URL pública
  // if (instagram) {
  //   alert("O Instagram não suporta compartilhamento direto via link.");
  //   instagram.style.display = "none"; // Opcional: esconde botão se quiser
  // }
}






