document.getElementById('editar').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confSenha = document.getElementById('confSenha').value;

    // Verifica se as senhas são iguais
    if (senha !== confSenha) {
      alert("As senhas não coincidem!");
      event.preventDefault(); // Impede o envio do formulário
    }

  });

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
    window.location.href = '/dashboard';
}

if (msgSucessAlt) {
    alert(decodeURIComponent(msgSucessAlt));
    window.location.href = '/dashboard';
}