document.getElementById('editUser').addEventListener('submit', function(event){

    let senha = document.getElementById('senha').value;
    let confSenha = document.getElementById('confSenha').value;

    if (senha !== confSenha) {
        alert("As senhas informadas são diferentes!");
        event.preventDefault();
    }
});

// função para obter a mensagem do Cadastro no BackEnd via URL
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroEditPerfil = getMessage('errorEditPerfil');
const msgSucessEditPerfil = getMessage('sucessEditPerfil');

// Alertas com as mensagens obitidas no BACKEND 
if (msgErroEditPerfil) {
    alert(decodeURIComponent(msgErroEditPerfil));
    window.location.href = '/perfil';
}

if (msgSucessEditPerfil) {
    alert(decodeURIComponent(msgSucessEditPerfil));
    window.location.href = '/perfil';
}