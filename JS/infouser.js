const form = document.getElementById('perfilForm');
const btnExcluir = document.getElementById('btnExcluir');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value,
    cep: form.cep.value,
    endereco: form.endereco.value,
    cpf: form.cpf.value
  };

  localStorage.setItem('perfilUsuario', JSON.stringify(dados));
  alert('Dados salvos com sucesso!');
});

window.addEventListener('DOMContentLoaded', () => {
  const dadosSalvos = localStorage.getItem('perfilUsuario');
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    form.nome.value = dados.nome || '';
    form.email.value = dados.email || '';
    form.telefone.value = dados.telefone || '';
    form.cep.value = dados.cep || '';
    form.endereco.value = dados.endereco || '';
    form.cpf.value = dados.cpf || '';
  }
});

btnExcluir.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja excluir sua conta?')) {
    localStorage.removeItem('perfilUsuario');
    form.reset();
    alert('Dados excluídos.');
  }
});
