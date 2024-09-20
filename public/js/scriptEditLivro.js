// Função para obter os parâmetros da query string
function getMessage(msg) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(msg);
}

const msgErroAlt = getMessage('errorAlt');
const msgSucessAlt = getMessage('successAlt');

// Exibe alert do Editar com erro ou sucesso se houver
if (msgErroAlt) {
    alert(decodeURIComponent(msgErroAlt));
    window.location.href = '/listarLivros';
}

if (msgSucessAlt) {
    alert(decodeURIComponent(msgSucessAlt));
    window.location.href = '/listarLivros';
}