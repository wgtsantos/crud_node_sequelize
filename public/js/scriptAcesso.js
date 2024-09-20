function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroAC= getMessage('errorAC');
const msgSucessAC = getMessage('sucessAC');

// Alertas com as mensagens obitidas no BACKEND 
if (msgErroAC) {
    alert(decodeURIComponent(msgErroAC));
    window.location.href = '/dashboard';
}

if (msgSucessAC) {
    alert(decodeURIComponent(msgSucessAC));
    window.location.href = '/dashboard';
}