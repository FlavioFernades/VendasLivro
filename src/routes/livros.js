const express = require('express');
const router = express.Router();
const { autenticarJWT } = require('../../server'); // Ajuste o caminho conforme necessário


/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Retorna todos os livros
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.get('/', (req, res) => {
  res.json([{ id: 1, titulo: 'Livro A' }]);
});

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Adiciona um novo livro
 *     responses:
 *       201:
 *         description: Livro cadastrado.
 */
router.post('/', (req, res) => {
  const novoLivro = { titulo: req.body.titulo };
  res.status(201).json(novoLivro);
});

module.exports = router;

router.post('/', autenticarJWT, (req, res) => {
  const novoLivro = { titulo: req.body.titulo };
  res.status(201).json(novoLivro);
});

