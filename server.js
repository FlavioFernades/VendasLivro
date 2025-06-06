require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./src/models');

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'https://projeto-final-venda-livros-4965b9298fbe.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Swagger
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

// Login simulado com JWT
const jwt = require('jsonwebtoken');
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@livraria.com' && password === '123456') {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).send('Credenciais inválidas.');
});

// Autenticação JWT
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

// Servir index.html
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rotas protegidas
const livrosRouter = require('./src/routes/livros');
app.use('/livros', autenticarJWT, livrosRouter);

// Sincronizar com banco
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar com o banco:', err);
});
