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

let avaliacoes = [];
let notaSelecionada = 0;

// Seletores
const estrelas = document.querySelectorAll('#selecao-estrelas span');
const notaMediaEl = document.getElementById('nota-media');
const comentarioInput = document.getElementById('comentario');
const enviarBtn = document.getElementById('enviarComentario');
const listaComentarios = document.getElementById('lista-comentarios');

// Clique nas estrelas
estrelas.forEach(estrela => {
  estrela.addEventListener('click', () => {
    notaSelecionada = parseInt(estrela.getAttribute('data-value'));

    // Atualiza visual das estrelas
    estrelas.forEach(e => {
      const valor = parseInt(e.getAttribute('data-value'));
      e.classList.toggle('ativa', valor <= notaSelecionada);
    });
  });
});

// Enviar avaliação
enviarBtn.addEventListener('click', () => {
  const comentario = comentarioInput.value.trim();

  if (notaSelecionada === 0 || comentario === '') {
    alert('Por favor, selecione uma nota e escreva um comentário.');
    return;
  }

  // Salva avaliação
  avaliacoes.push({ nota: notaSelecionada, comentario });

  // Atualiza nota média
  atualizarNotaMedia();

  // Adiciona comentário à lista
  mostrarComentarios();

  // Limpa inputs
  comentarioInput.value = '';
  notaSelecionada = 0;
  estrelas.forEach(e => e.classList.remove('ativa'));
});

function atualizarNotaMedia() {
  const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
  const media = (soma / avaliacoes.length).toFixed(1);
  notaMediaEl.textContent = media;
}

function mostrarComentarios() {
  listaComentarios.innerHTML = ''; // limpa a lista

  avaliacoes.forEach(avaliacao => {
    const div = document.createElement('div');
    div.className = 'comentario';
    div.innerHTML = `<strong>${avaliacao.nota} ⭐</strong><p>${avaliacao.comentario}</p>`;
    listaComentarios.appendChild(div);
  });
}






