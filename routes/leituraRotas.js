const express = require('express');
const router = express.Router();
const leituraController = require('../controllers/leituraController');
const checarAcesso = require('../middleware/checarAcesso');

// Rota para exibir o formulário "Obter Livro"
// Rota para processar o "Obter Livro"
router.get('/obter-livro/:id', checarAcesso.isAuthenticated, leituraController.getObterLivro);
router.post('/obter-livro/:id', checarAcesso.isAuthenticated, leituraController.postObterLivro);

// Rota para exibir o formulário de edição de status de leitura
// Rota para processar a edição do status de leitura
router.get('/editar-status/:id', checarAcesso.isAuthenticated, leituraController.getEditarStatus);
router.post('/editar-status/:id', checarAcesso.isAuthenticated, leituraController.postEditarStatus);

// Rota para o admin visualizar a tabela "Leitura"
router.get('/leitura', checarAcesso.isAdmin, leituraController.getLeitura);

module.exports = router;
