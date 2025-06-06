const { Livro } = require('../models');

// POST /livros — Criar novo livro
exports.criarLivro = async (req, res) => {
  const { titulo, autor, preco } = req.body;

  if (!titulo || !autor || !preco) {
    return res.status(400).json({ erro: 'Campos título, autor e preço são obrigatórios' });
  }

  try {
    const novoLivro = await Livro.create({ titulo, autor, preco });
    res.status(201).json(novoLivro);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar livro', detalhes: erro.message });
  }
};

// PUT /livros/:id — Atualizar livro
exports.atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, preco } = req.body;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    if (!titulo || !autor || !preco) {
      return res.status(400).json({ erro: 'Campos título, autor e preço são obrigatórios' });
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.preco = preco;

    await livro.save();

    res.status(200).json(livro);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar livro', detalhes: erro.message });
  }
};

// DELETE /livros/:id — Remover livro
exports.deletarLivro = async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    await livro.destroy();
    res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao excluir livro', detalhes: erro.message });
  }
};
