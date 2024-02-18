// Variaveis
const botao = document.getElementById('criar-botao');
const emailMsg = document.getElementById('emailMsg');

// Eventos
botao.addEventListener('click', (e) => {
    e.preventDefault();

    let nome = document.getElementById('input-nome').value;
    let email = document.getElementById('input-email').value;
    let senha = document.getElementById('input-senha').value;

    enviadados(nome, email, senha);
})

//Chamadas de API
let enviadados = (nome, email, senha) => {
    fetch('/send/dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.msg);
            if (data.msg === "Conta Cadastrada com sucesso") {
                window.location.href = '/login'
            } else {
                emailMsg.innerHTML = `
            <p>${data.msg}</p>
            `
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

