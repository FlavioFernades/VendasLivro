const express = require('express');
const router = express.Router();
const { Livro } = require('../models'); // ajuste o caminho conforme sua estrutura

// GET todos os livros (exemplo já deve existir)
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// POST - Criar um novo livro
router.post('/', async (req, res) => {
  const { titulo, autor, ano, preco } = req.body;
  try {
    const novoLivro = await Livro.create({ titulo, autor, ano, preco });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar livro', detalhes: error.message });
  }
});

// PUT - Atualizar um livro pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, preco } = req.body;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    livro.titulo = titulo ?? livro.titulo;
    livro.autor = autor ?? livro.autor;
    livro.ano = ano ?? livro.ano;
    livro.preco = preco ?? livro.preco;

    await livro.save();
    res.json(livro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar livro', detalhes: error.message });
  }
});

// DELETE - Remover um livro pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    await livro.destroy();
    res.status(204).send(); // sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar livro', detalhes: error.message });
  }
});

module.exports = router;
