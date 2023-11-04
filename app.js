const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Veiculo = require('./veiculo'); // Importando o modelo Veiculo
const sequelize = require('./database'); // Importando sequelize do módulo database
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Adicionando headers para evitar cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

// Servindo arquivos estáticos (como o index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Autenticando a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para salvar um novo veículo
app.post('/salvar-carro', async (req, res) => {
  const novoVeiculo = req.body;

  try {
    const veiculo = Veiculo.build(novoVeiculo);
    await veiculo.save(); 
    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao salvar veículo:', error);
    res.status(500).json({ error: 'Erro ao salvar veículo' });
  }
});

// Rota para obter todos os veículos
app.get('/veiculos', async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

// Rota para excluir um veículo
app.delete('/excluir-carro/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const veiculo = await Veiculo.findByPk(id);
    if (veiculo) {
      await veiculo.destroy();
      res.json({ success: 'Veículo excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    res.status(500).json({ error: 'Erro ao excluir veículo' });
  }
});

// Rota para obter um veículo por ID
app.get('/veiculos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const veiculo = await Veiculo.findByPk(id);
    if (veiculo) {
      res.json(veiculo);
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    res.status(500).json({ error: 'Erro ao buscar veículo' });
  }
});

// Rota para atualizar um veículo por ID
app.put('/atualizar-carro/:id', async (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  try {
    const veiculo = await Veiculo.findByPk(id);
    if (veiculo) {
      await veiculo.update(dadosAtualizados);
      res.json(veiculo);
    } else {
      res.status(404).json({ error: 'Veículo não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).json({ error: 'Erro ao atualizar veículo' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
