// função para obter a mensagem do Cadastro do Livro no BackEnd via URL
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroCad = getMessage('errorCad');
const msgSucessCad = getMessage('sucessCad');

// Alertas com as mensagens obitidas no BACKEND 
if (msgErroCad) {
    alert(decodeURIComponent(msgErroCad));
    window.location.href = '/dashboard';
}

if (msgSucessCad) {
    alert(decodeURIComponent(msgSucessCad));
    window.location.href = '/dashboard';
}