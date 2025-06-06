const express = require('express');
const router = express.Router();
const { Livro } = require('../models');

// GET - Listar todos
router.get('/', async (req, res) => {
  const livros = await Livro.findAll();
  res.json(livros);
});

// POST - Criar novo livro
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

// PUT - Atualizar livro
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

// DELETE - Excluir livro
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
