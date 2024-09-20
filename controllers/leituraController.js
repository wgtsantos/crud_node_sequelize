const { User, Leitura, Livro } = require('../models');

// Exibir formulário de "Obter Livro"
exports.getObterLivro = async (req, res) => {
  const livroId = req.params.id;
  
  try {
    // Buscar informações do livro - Renderizar formulário de status de leitura
    const livro = await Livro.findByPk(livroId);
    res.render('obterLivro', { livro });
  } catch (err) {
    console.error(err);
    res.redirect('/perfil?error=Erro+ao+carregar+livro');
  }
};

// Processar "Obter Livro" e salvar status de leitura
exports.postObterLivro = async (req, res) => {
  const { status_leitura } = req.body;
  const livroId = req.params.id;
  const userId = req.session.userId; // Pega o ID do usuário logado

  try {
    // Criar uma nova entrada na tabela "Leitura"
    await Leitura.create({ id_usuario: userId, id_livro: livroId, status_leitura });

    res.redirect(`/obter-livro/${req.params.id}?sucessObter=Livro+obtido+com+sucesso`);
  } catch (err) {
    console.error(err);
    res.redirect(`/obter-livro/${req.params.id}?errorObter=Erro+ao+obter+livro`);
  }
};

// Exibir formulário de edição de status de leitura
exports.getEditarStatus = async (req, res) => {
  const livroId = req.params.id;
  const userId = req.session.userId;

  try {
    // Buscar a leitura existente
    const livro = await Livro.findOne({ where: { id_livro: livroId } });
    const leitura = await Leitura.findOne({ where: { id_livro: livroId, id_usuario: userId } });

    // Renderizar a página com o formulário de edição de status
    res.render('editarStatus', { leitura, livro });
  } catch (error) {
    console.error(error);
    res.redirect('/perfil?error=Erro+ao+carregar+status+de+leitura');
  }
};

// Processar atualização do status de leitura
exports.postEditarStatus = async (req, res) => {
  const livroId = req.params.id;
  const userId = req.session.userId;
  const { status_leitura } = req.body;

  try {
    // Atualizar o status de leitura
    await Leitura.update(
      { status_leitura },
      { where: { id_livro: livroId, id_usuario: userId } }
    );

res.redirect(`/editar-status/${req.params.id}?sucessAttStatus=Status+de+leitura+atualizado`);
  } catch (err) {
    console.error(err);
    res.redirect(`/editar-status/${req.params.id}?errorAttStatus=Erro+ao+atualizar+status+de+leitura`);
  }
};

// Visualizar a tabela "Leitura" (apenas admin)
exports.getLeitura = async (req, res) => {
  try {
    // Buscar todas as entradas da tabela "Leitura" com informações de usuários e livros
    const leituras = await Leitura.findAll({
      include: [
        { model: User, as: 'usuario' },
        { model: Livro, as: 'livro' }
      ]
    });

    // Renderizar a página de visualização de leituras
    res.render('leituraAdmin', { leituras });
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard?error=Erro+ao+carregar+informações+de+leitura');
  }
};