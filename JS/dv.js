// ========== DOCUMENTOS OBRIGATÓRIOS ==========
document.getElementById('formDocumentos').addEventListener('submit', function (e) {
  e.preventDefault()

  const maxTamanho = 5 * 1024 * 1024// 5MB
  const mensagem = document.getElementById('mensagem')
  mensagem.innerHTML = ''
  mensagem.className = 'mensagem'

  const arquivos = [
    {
      nome: 'CPF',
      input: document.getElementById('cpfArquivo'),
      tipos: ['pdf', 'jpg', 'jpeg']
    },
    {
      nome: 'RG',
      input: document.getElementById('rgArquivo'),
      tipos: ['pdf', 'jpg', 'jpeg']
    },
    {
      nome: 'Comprovante de Endereço',
      input: document.getElementById('comprovanteArquivo'),
      tipos: ['pdf']
    }
  ]

  let valido = true

  arquivos.forEach(({ nome, input, tipos }) => {
    const arquivo = input.files[0]

    if (!arquivo) {
      mensagem.innerHTML += `<p class="erro">❌ ${nome} não selecionado.</p>`
      valido = false
      return
    }

    const extensao = arquivo.name.split('.').pop().toLowerCase()
    if (!tipos.includes(extensao)) {
      mensagem.innerHTML += `<p class="erro">❌ ${nome}: formato inválido (${extensao}). Permitido: ${tipos.join(', ')}.</p>`
      valido = false
    }

    if (arquivo.size > maxTamanho) {
      const tamanhoMB = (arquivo.size / (1024 * 1024)).toFixed(2)
      mensagem.innerHTML += `<p class="erro">❌ ${nome}: ${tamanhoMB}MB excede o limite de 5MB.</p>`
      valido = false
    }
  })

  if (!valido) {
    mensagem.classList.add('erro')
    return
  }

  mensagem.innerHTML = `<p class="sucesso">✅ Documentos enviados com sucesso! (simulação)</p>`
  mensagem.classList.add('sucesso')
})


// ========== CERTIFICAÇÃO PROFISSIONAL (OPCIONAL) ==========
function enviarDocumentoCertificado() {
  const input = document.getElementById('docCertificado')
  const status = document.getElementById('statusCertificado')
  const mensagem = document.getElementById('mensagemCertificado')

  mensagem.innerHTML = ''
  mensagem.className = 'mensagem'

  const arquivo = input.files[0]

  if (!arquivo) {
    mensagem.innerHTML = '❌ Nenhum arquivo selecionado.'
    mensagem.classList.add('erro')
    return
  }

  const tamanhoMax = 5 * 1024 * 1024; // 5MB
  const extensoesAceitas = ['pdf', 'jpg', 'jpeg', 'png']
  const extensao = arquivo.name.split('.').pop().toLowerCase()

  if (!extensoesAceitas.includes(extensao)) {
    mensagem.innerHTML = '❌ Tipo de arquivo inválido. Envie PDF ou imagem.'
    mensagem.classList.add('erro')
    return
  }

  if (arquivo.size > tamanhoMax) {
    const tamanhoMB = (arquivo.size / (1024 * 1024)).toFixed(2)
    mensagem.innerHTML = `❌ Arquivo tem ${tamanhoMB}MB e excede o limite de 5MB.`
    mensagem.classList.add('erro')
    return
  }

  // Sucesso (simulação)
  mensagem.innerHTML = '✅ Certificado enviado com sucesso!'
  mensagem.classList.add('sucesso')
  status.textContent = 'Status: Documento enviado'
  status.classList.remove('aguardando')
  status.classList.add('sucesso')
}
