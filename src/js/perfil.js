let salvarDados = document.getElementById('salvar-dados');

salvarDados.addEventListener('click', () => {
    let novoNome = document.getElementById('novoNome').value;
    let novoEmail = document.getElementById('novoEmail').value;
    let novoTelefone = document.getElementById('novoTelefone').value;
    let novaFoto = document.getElementById('novaFoto').value;
    let novaDataAniversario = document.getElementById('novaData').value;

    fetch('/send/novos/dados', {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: novoNome,
            email: novoEmail,
            telefone: novoTelefone,
            foto: novaFoto,
            data: novaDataAniversario
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
});