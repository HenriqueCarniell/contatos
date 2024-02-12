//Variaveis
const botaoSalvar = document.getElementById('salvar-contato');

//Eventos
botaoSalvar.addEventListener('click', () => {
    let nomecontato = document.getElementById('nomecontato').value;
    let telefonecontato = document.getElementById('telefonecontato').value;
    let emailcontato = document.getElementById('emailcontato').value;

    fetch('/send/add/contato', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({nomecontato,telefonecontato,emailcontato})
    })
    .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
})

//Funções
