const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checarAcesso = require('../middleware/checarAcesso');

// Rotas de login e registro
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/cadastrar', userController.getCadastrar);
router.post('/cadastrar', userController.postCadastrar);

// Rotas para tornar um usuário admin e para tornar um usuário comum
router.post('/tornar-admin/:id', checarAcesso.isAdmin, userController.tornarAdmin);
router.post('/tornar-user/:id', checarAcesso.isAdmin, userController.tornarUsuarioComum);

// Dashboard e logout
router.get('/dashboard', checarAcesso.isAdmin, userController.getDashboard);
router.get('/perfil', checarAcesso.isAuthenticated, userController.getPerfil);
router.get('/logout', userController.logout);

// Rotas para exibir o formulário de edição de perfil e processar a atualização do perfil
router.get('/editar-perfil', checarAcesso.isAuthenticated, userController.getEditPerfil);
router.post('/editar-perfil', checarAcesso.isAuthenticated, userController.postEditPerfil);

// Editar e excluir usuário (admin)
router.get('/edit/:id', checarAcesso.isAdmin, userController.getEditUser);
router.post('/edit/:id', checarAcesso.isAdmin, userController.postEditUser);
router.post('/delete/:id', checarAcesso.isAdmin, userController.deleteUser);

module.exports = router;
