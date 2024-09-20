const fs = require('fs');
const path = require('path');
const { Livro } = require('../models');

exports.getAddLivro = (req, res) => {
    res.render('addLivro');
  };

// Cadastrar um novo livro com imagem (apenas para admin)
exports.postAddLivro = async (req, res) => {
  const { titulo, autor, genero, descricao, data_lanc } = req.body;
  const imagem = req.file ? req.file.filename : null;  // Pega o nome do arquivo da imagem

  try {
    await Livro.create({
      titulo,
      autor,
      genero,
      descricao,
      data_lanc,
      imagem  // Armazena o nome do arquivo da imagem no banco de dados
    });
    res.redirect('/add-livro?sucessCad=Livro+cadastrado+com+sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/add-livro?errorCad=Erro+ao+cadastrar+livro');
  }
};

// Visualizar todos os livros (acessível para todos os usuários)
exports.getLivros = async (req, res) => {
    try {
      const livros = await Livro.findAll();
      res.render('listarLivros', { livros });
    } catch (err) {
      console.error(err);
      res.render('listarLivros', { livros: [], error: 'Erro ao buscar livros' });
    }
};

exports.getEditLivro = async (req, res) => {
  const livroId = req.params.id;
  try {
    const livro = await Livro.findByPk(livroId);
    res.render('editLivro', { livro });
  } catch (error) {
    console.error(error);
    res.render('/dashboard', { livros: [], error: 'Erro ao carregar livro' });
  }
};

// Processar a edição do livro (apenas para admin)
exports.postEditLivro = async (req, res) => {
  const livroId = req.params.id;
  const { titulo, autor, genero, descricao, data_lanc } = req.body;
  
  try {
    // Buscar o livro original para acessar a imagem antiga
    const livro = await Livro.findByPk(livroId);

    let novaImagem;
    if (req.file) {
      // Se houver uma nova imagem, use o nome da nova imagem
      novaImagem = req.file.filename;

      // Excluir a imagem antiga, se existir
      if (livro.imagem) {
        const imagemAntiga = path.join(__dirname, '../uploads', livro.imagem);
        fs.unlinkSync(imagemAntiga);  // Remove o arquivo de imagem antigo
      }
    } else {
      // Se nenhuma nova imagem for enviada, mantenha a imagem existente
      novaImagem = livro.imagem;
    }

    // Atualizar os dados do livro no banco de dados
    await Livro.update(
      { titulo, autor, genero, descricao, data_lanc, imagem: novaImagem },
      { where: { id_livro: livroId } }
    );
    
    res.redirect(`/edit-livro/${req.params.id}?successAlt=Livro+atualizado+com+sucesso`);
  } catch (err) {
    console.error(err);
    res.redirect(`/edit-livro/${req.params.id}?errorAlt=Erro+ao+atualizar+livro`);
  }
};

// Excluir livro e a imagem associada (apenas para admin)
exports.deleteLivro = async (req, res) => {
  const livroId = req.params.id;

  try {
    // Buscar o livro para acessar o caminho da imagem
    const livro = await Livro.findByPk(livroId);

    // Excluir o livro do banco de dados
    await Livro.destroy({ where: { id_livro: livroId } });

    // Excluir a imagem associada, se existir
    if (livro.imagem) {
      const imagePath = path.join(__dirname, '../uploads', livro.imagem);
      fs.unlinkSync(imagePath);  // Remove o arquivo de imagem
    }

    res.redirect('/listarLivros?successDel=Livro+excluído+com+sucesso');
  } catch (err) {
    console.error(err);
    res.redirect('/listarLivros?errorDel=Erro+ao+excluir+livro');
  }
};
