//Variaveis
const botaoSalvar = document.getElementById('salvar-contato');

//Eventos
botaoSalvar.addEventListener('click', () => {
    let nomecontato = document.getElementById('nomecontato');
    let telefonecontato = document.getElementById('telefonecontato');
    let emailcontato = document.getElementById('emailcontato');

    fetch('/send/contato', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/JSON'
        },
        body: JSON.stringify({nomecontato,telefonecontato,emailcontato})
    })
    .then(response => response.JSON())
        .then(data => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
})

//Funções