const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Venda de Livros',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de autenticação
const autenticarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).send('Token não fornecido.');

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dados;
    next();
  } catch {
    res.status(403).send('Token inválido.');
  }
};

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulação de validação (substituir pelo banco em casos reais)
  if (email === 'admin@livraria.com' && password === '123456') {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).send('Credenciais inválidas.');
});

// Rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Venda de Livros!');
});

// Rotas
const livrosRouter = require('./src/routes/livros');
app.use('/livros', livrosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { autenticarJWT };
