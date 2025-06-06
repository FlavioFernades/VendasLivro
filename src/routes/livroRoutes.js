const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// CRUD
router.post('/livros', livroController.criarLivro);         // Criar
router.put('/livros/:id', livroController.atualizarLivro);  // Atualizar
router.delete('/livros/:id', livroController.deletarLivro); // Deletar

// (já deve existir) Listar e buscar
router.get('/livros', livroController.listarLivros);
router.get('/livros/:id', livroController.buscarLivroPorId);

module.exports = router;
