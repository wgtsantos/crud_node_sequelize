module.exports.isAdmin = (req, res, next) => {
    if (req.session.userAcesso === 'admin') {
      return next();  // Se o usuário é admin, prossegue
    }
    return res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
  };
  
  module.exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next();  // Se o usuário está logado, prossegue
    }
    return res.redirect('/login');  // Se não está logado, redireciona para o login
  };
  