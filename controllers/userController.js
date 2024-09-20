const bcrypt = require('bcryptjs');
const { User, Livro, Leitura } = require('../models');

// Exibir tela de Login
exports.getLogin = (req, res) => {
    res.render('login');
};

// Processo de login
exports.postLogin = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
  
    if (user && bcrypt.compareSync(senha, user.senha)) {
      req.session.userId = user.id_usuario;
      req.session.userAcesso = user.acesso;
      req.session.userName = user.nome;
  
      // Redireciona dependendo do papel
      if (user.acesso === 'admin') {
        res.redirect('/dashboard');  // Admin pode gerenciar usuários
      } else {
        res.redirect('/perfil');  // Usuário comum vai para seu perfil
      }
  
    } else {
      res.render('login', { error: 'Usuário ou senha incorretos' });
    }
};

exports.getCadastrar = (req, res) => {
    res.render('cadastrar');
};

exports.postCadastrar = async (req, res) => {
    const { nome, email, senha, genero_fav } = req.body;

    try {
        const senhaHash = bcrypt.hashSync(senha, 10);
        await User.create({ nome, email, senha: senhaHash, genero_fav });
        // res.redirect('/login');
        res.redirect('/cadastrar?sucessCad=Usu%C3%A1rio+Cadastrado+com+sucesso!');
    } catch (error) {
        console.error(error);
        res.redirect('/cadastrar?errorCad=Erro+ao+cadastrar+o+Usu%C3%A1rio!');
    } 
};

exports.getDashboard = async (req, res) => {
    if (!req.session.userId) { return res.redirect('/login'); }
    const users = await User.findAll();
    res.render('dashboard', { users });
};

// Tornar usuário admin
exports.tornarAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    // Atualizar o papel do usuário para 'admin'
    await User.update({ acesso: 'admin' }, { where: { id_usuario: userId } });
    res.redirect('/dashboard?sucessAC=Usuário+tornado+admin+com+sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard?errorAC=Erro+ao+tornar+usuário+admin');
  }
};

// Tornar usuário comum
exports.tornarUsuarioComum = async (req, res) => {
  const userId = req.params.id;

  try {
    // Atualizar o papel do usuário para 'user'
    await User.update({ acesso: 'user' }, { where: { id_usuario: userId } });
    res.redirect('/dashboard?sucessAC=Usuário+tornado+usuário+comum+com+sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard?errorAC=Erro+ao+tornar+usuário+comum');
  }
};

// Exibir perfil do usuário com os livros e status de leitura
exports.getPerfil = async (req, res) => {
  const userId = req.session.userId;
  try {
    // Buscar todos os livros
    const livros = await Livro.findAll();

    // Para cada livro, verificar se o usuário já obteve o livro
    const leituras = await Leitura.findAll({ where: { id_usuario: userId } });
    const leituraMap = {};
    
    leituras.forEach(leitura => {
      leituraMap[leitura.id_livro] = leitura.status_leitura;
    });

    // Renderizar a página do perfil com os livros e o status de leitura
    // Passar o mapa de leituras do usuário
    res.render('perfil', { userName: req.session.userName, livros, leituraMap });

  } catch (error) {
    console.error(error);
    res.render('perfil', { userName : req.session.userName, livros: [], error: 'Error ao carregar os livros' });
  }
};

// Exibir formulário de edição de perfil do usuário
exports.getEditPerfil = async (req, res) => {
  const userId = req.session.userId;  // ID do usuário logado

  try {
    // Buscar as informações do usuário logado
    const user = await User.findByPk(userId);

    // Renderizar o formulário de edição com os dados do usuário
    res.render('editPerfil', { user });
  } catch (error) {
    console.error(error);
    res.redirect('/perfil?errorEditPerfil=Erro+ao+carregar+perfil');
  }
};

// Processar a atualização do perfil do usuário
exports.postEditPerfil = async (req, res) => {
  const userId = req.session.userId;  // ID do usuário logado
  const { nome, email, senha, genero_fav } = req.body;

  try {
    // Atualizar as informações do usuário no banco de dados
    const hashedPassword = bcrypt.hashSync(senha, 10);
    await User.update({ nome, email, senha: hashedPassword, genero_fav }, { where: { id_usuario: userId } });

    res.redirect('/editar-perfil?sucessEditPerfil=Perfil+atualizado+com+sucesso');
  } catch (error) {
    console.error(error);
    res.redirect('/editar-perfil?errorEditPerfil=Erro+ao+atualizar+perfil');
  }
};

// Tela de edição de usuário
exports.getEditUser = async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    const user = await User.findByPk(req.params.id);
    res.render('editUser', { user });
  };
  
// Processo de edição de usuário
exports.postEditUser = async (req, res) => {
    const { nome, email, senha, genero_fav } = req.body;
  
    try {
      const hashedPassword = bcrypt.hashSync(senha, 10);
      await User.update({ nome, email, senha: hashedPassword, genero_fav }, { where: { id_usuario: req.params.id } });
      
      res.redirect(`/edit/${req.params.id}?successAlt=Cadastro+alterado+com+sucesso`);
    
    } catch (err) {
  
      console.error(err);
      res.redirect(`/edit/${req.params.id}?errorAlt=Erro+ao+alterar+usu%C3%A1rio`);
    }
};
  
// Excluir usuário
exports.deleteUser = async (req, res) => {
    try {
      await User.destroy({ where: { id_usuario: req.params.id } });
  
      res.redirect('/dashboard?successDel=Usuário+excluído+com+sucesso');
  
    } catch (err) {
  
      console.error(err);
      res.redirect('/dashboard?errorDel=Erro+ao+excluir+usuário');
    }
};  

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};