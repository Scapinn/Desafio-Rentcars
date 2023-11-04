function mostrarCarros() {
  // Faz uma requisição GET para obter a lista de veículos
  fetch('http://localhost:3000/veiculos')
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
          // Manipula os dados recebidos
          const carrosContainer = document.getElementById('carrosContainer');
          carrosContainer.innerHTML = '';

          data.forEach(carro => {
              const carroDiv = document.createElement('div');
              carroDiv.classList.add('carro-container');

              carroDiv.innerHTML = `
                  <p>Locadora: ${carro.locadora}</p>
                  <p>Modelo: ${carro.modelo}</p>
                  <p>Marca: ${carro.marca}</p>
                  <p>Ano: ${carro.ano}</p>
                  <p>Motor: ${carro.motor}</p>
                  <p>Portas: ${carro.portas}</p>
                  <p>Câmbio: ${carro.cambio}</p>
                  <p>Ar Condicionado: ${carro.ar_condicionado ? 'Sim' : 'Não'}</p>
                  <button onclick="editarCarro('${carro.id}')">Editar</button>
                  <button onclick="excluirCarro('${carro.id}')">Excluir</button>
              `;

              carrosContainer.appendChild(carroDiv);
          });
      })
      .catch(error => console.error('Erro ao buscar carros:', error));
}

function editarCarro(id) {
  // Faz uma requisição GET para obter os detalhes de um veículo específico por ID
  fetch(`http://localhost:3000/veiculos/${id}`)
      .then(response => response.json()) // Converte a resposta para JSON
      .then(carro => {
          // Preenche o formulário de edição com os detalhes do veículo
          document.getElementById('carroId').value = carro.id;
          document.getElementById('locadoraEditar').value = carro.locadora;
          document.getElementById('modeloEditar').value = carro.modelo;
          document.getElementById('marcaEditar').value = carro.marca;
          document.getElementById('anoEditar').value = carro.ano;
          document.getElementById('motorEditar').value = carro.motor;
          document.getElementById('portasEditar').value = carro.portas;
          document.getElementById('cambioEditar').value = carro.cambio;
          document.getElementById('ar_condicionadoEditar').value = carro.ar_condicionado ? 'true' : 'false';

          document.getElementById('edicaoForm').style.display = 'block';
      })
      .catch(error => console.error('Erro ao buscar carro:', error));
}

function excluirCarro(id) {
  // Faz uma requisição DELETE para excluir um veículo por ID
  fetch(`http://localhost:3000/excluir-carro/${id}`, {
      method: 'DELETE',
  })
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
          console.log('Veículo excluído:', data);
          alert('Carro deletado com sucesso');
          mostrarCarros(); // Atualiza a lista de veículos após a exclusão
      })
      .catch(error => console.error('Erro ao excluir veículo:', error));
}

// Adiciona um evento de escuta para o formulário de edição
document.getElementById('edicaoFormulario').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtém os dados atualizados do formulário de edição
  const id = document.getElementById('carroId').value;
  const locadora = document.getElementById('locadoraEditar').value;
  const modelo = document.getElementById('modeloEditar').value;
  const marca = document.getElementById('marcaEditar').value;
  const ano = parseInt(document.getElementById('anoEditar').value);
  const motor = document.getElementById('motorEditar').value;
  const portas = parseInt(document.getElementById('portasEditar').value);
  const cambio = document.getElementById('cambioEditar').value;
  const ar_condicionado = document.getElementById('ar_condicionadoEditar').value === 'true';

  const dadosAtualizados = {
      locadora,
      modelo,
      marca,
      ano,
      motor,
      portas,
      cambio,
      ar_condicionado,
  };

  atualizarCarro(id, dadosAtualizados); // Chama a função para atualizar o veículo
});

function atualizarCarro(id, dadosAtualizados) {
  // Faz uma requisição PUT para atualizar um veículo por ID
  fetch(`http://localhost:3000/atualizar-carro/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizados), // Converte os dados para JSON
  })
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
          console.log('Veículo atualizado:', data);
          alert('Carro atualizado com sucesso');
          mostrarCarros(); // Atualiza a lista de veículos após a atualização
      })
      .catch(error => console.error('Erro ao atualizar veículo:', error));
}


