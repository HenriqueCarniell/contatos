fetch('/get/dados/contatos')
    .then(response => response.json())
        .then(user => {
            colocadados(user)
        })

let colocadados = (user) => {
    for(var i = 0; i < user.length; i++) {
        document.getElementById('novoNome').value = user[i].nome
        document.getElementById('novoEmail').value = user[i].email
        document.getElementById('novaSenha').value = user[i].senha
        // document.getElementById('novoTelefone').value = user[i].email
        // document.getElementById('novaFoto').value = user[i].email
    }
}