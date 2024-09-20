function getMessage(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const successDel = getMessage('successDel');
  const errorDel = getMessage('errorDel');

  if (successDel) {
    alert(decodeURIComponent(successDel));
  }

  if (errorDel) {
    alert(decodeURIComponent(errorDel));
  }

function confirmDelete() {
    return confirm("Tem certeza que deseja excluir este usuário?");
}