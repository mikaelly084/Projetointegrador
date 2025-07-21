function abrirModalLiberar() {
  document.getElementById('modalLiberar').style.display = 'flex'
}

function abrirModalExcluir() {
  document.getElementById('modalExcluir').style.display = 'flex'
}

function fecharModal(id) {
  const modal = document.getElementById(id)
  if (modal) modal.style.display = 'none'
}

function liberarContato() {
  const ids = [
    'dadosCliente',
    'dadosCliente2',
    'dadosCliente3',
    'dadosCliente6',
    'dadosCliente8'
  ]

  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.classList.add('mostrar')
  })

  fecharModal('modalLiberar')
  alert("✔️ Contatos liberados com sucesso!")
}

function excluirPedido() {
  const checkboxes = document.querySelectorAll('.checkbox-excluir:checked')

  if (checkboxes.length === 0) {
    alert("⚠️ Nenhum cliente selecionado para exclusão.")
    return
  }

  checkboxes.forEach(checkbox => {
    const clienteDiv = checkbox.closest('.dados-cliente')
    if (!clienteDiv) return
    const clienteId = clienteDiv.id
    clienteDiv.remove()

    
    const pedidoRelacionado = document.querySelector(`.detalhes-pedido[onclick*="${clienteId}"]`)
    if (pedidoRelacionado) {
      pedidoRelacionado.remove()
    }
    const contratoId = `dados${clienteId.charAt(0).toUpperCase()}${clienteId.slice(1)}`
    const contrato = document.getElementById(contratoId)
    if (contrato) {
      contrato.remove()
    }
  })

  fecharModal('modalExcluir')
  alert(`❌ ${checkboxes.length} cliente(s) removido(s).`)
}


function abrirModalContratado() {
  document.getElementById('modalContratado').style.display = 'flex'
}

function confirmarContratacao() {
  fecharModal('modalContratado')
  alert("✅ Cliente contratado com sucesso!")
}

function mostrarCliente(id) {
  document.querySelectorAll('.dados-cliente').forEach(el => {
    el.classList.remove('mostrar', 'selecionado')
  })

  const cliente = document.getElementById(id)
  if (cliente) {
    cliente.classList.add('mostrar', 'selecionado')
  }
}

function filtrarServicos() {
  const termo = document.getElementById('inputPesquisa').value.toLowerCase()
  const filtroDisponivel = document.getElementById('checkboxDisponivel').checked
  const servicos = document.querySelectorAll('.detalhes-pedido')

  servicos.forEach(servico => {
    const titulo = servico.querySelector('h3').textContent.toLowerCase()
    const categoriaEl = servico.querySelector('.categoria')
    const categoria = categoriaEl ? categoriaEl.textContent.toLowerCase() : ''
    const isDisponivel = servico.dataset.disponivel === 'true'
    const corresponde = titulo.includes(termo) || categoria.includes(termo)
    const mostrar = corresponde && (!filtroDisponivel || isDisponivel)

    servico.style.display = mostrar ? 'block' : 'none'
  })
}
