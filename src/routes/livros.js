const express = require('express');
const router = express.Router();
const { Livro } = require('../models');

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get('/', async (req, res) => {
  const livros = await Livro.findAll();
  res.json(livros);
});

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Livro criado
 */
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, ano, preco } = req.body;
    if (!titulo || !autor || !ano || !preco) {
      return res.status(400).json({ erro: 'Campos obrigatórios não informados.' });
    }

    const novoLivro = await Livro.create({ titulo, autor, ano, preco });
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar livro.' });
  }
});

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Livro atualizado
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ano, preco } = req.body;

    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

    await livro.update({ titulo, autor, ano, preco });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar livro.' });
  }
});

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Exclui um livro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Livro excluído com sucesso
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

    await livro.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir livro.' });
  }
});

module.exports = router;
