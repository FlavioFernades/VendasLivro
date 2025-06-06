const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 */
router.get('/', livroController.listarLivros);

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', livroController.buscarLivroPorId);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *               - preco
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', livroController.criarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
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
 *             required:
 *               - titulo
 *               - autor
 *               - preco
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', livroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Exclui um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro excluído com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', livroController.deletarLivro);

module.exports = router;
