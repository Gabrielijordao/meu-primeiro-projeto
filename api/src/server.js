
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar banco SQLite
require('./database/db');

// Importar as rotas
const vagasRoutes = require('./routes/vagas.routes');
const authRoutes = require('./routes/auth.routes');
const cepRoutes = require('./routes/cep.routes');

// Configurações
app.use(cors());
app.use(express.json());

// Verificar se API está funcionando
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'ok',
    projeto: 'DevJobs API',
    timestamp: new Date().toISOString()
  });
});

// Registrar as rotas
app.use('/api/auth', authRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/cep', cepRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(500).json({
    erro: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `DevJobs API rodando em http://localhost:${PORT}`
  );
});
