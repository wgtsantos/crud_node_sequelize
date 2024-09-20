const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const checarAcesso = require('../middleware/checarAcesso');
const upload = require('../middleware/upload');

// Rota para exibir o formulário de cadastro de livros (apenas admin)
router.get('/add-livro', checarAcesso.isAdmin, livroController.getAddLivro);

// Rota para cadastrar um livro com upload de imagem (apenas admin)
router.post('/add-livro', checarAcesso.isAdmin, upload.single('imagem'), livroController.postAddLivro);

// Rota para exibir o formulário de edição do livro (apenas admin)
router.get('/edit-livro/:id', checarAcesso.isAdmin, livroController.getEditLivro);

// Rota para cadastrar um livro com upload de imagem (apenas admin)
router.post('/edit-livro/:id', checarAcesso.isAdmin, upload.single('imagem'), livroController.postEditLivro);

// Rota para visualizar todos os livros (acessível para todos)
router.get('/listarLivros', checarAcesso.isAuthenticated, livroController.getLivros);

// Rota para excluir um livro (apenas admin)
router.post('/delete-livro/:id', checarAcesso.isAdmin, livroController.deleteLivro);

module.exports = router;
