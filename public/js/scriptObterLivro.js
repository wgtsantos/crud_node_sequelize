// função para obter a mensagem de Obter o Livro no BackEnd via URL
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroObter = getMessage('errorObter');
const msgSucessObter = getMessage('sucessObter');

// Alertas com as mensagens obitidas no BACKEND 
if (msgErroObter) {
    alert(decodeURIComponent(msgErroObter));
    window.location.href = '/perfil';
}

if (msgSucessObter) {
    alert(decodeURIComponent(msgSucessObter));
    window.location.href = '/perfil';
}