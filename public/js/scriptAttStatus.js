function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroAttStatus = getMessage('errorAttStatus');
const msgSucessAttStatus = getMessage('sucessAttStatus');

// Alertas com as mensagens obitidas no BACKEND 
if (msgErroAttStatus) {
    alert(decodeURIComponent(msgErroAttStatus));
    window.location.href = '/perfil';
}

if (msgSucessAttStatus) {
    alert(decodeURIComponent(msgSucessAttStatus));
    window.location.href = '/perfil';
}