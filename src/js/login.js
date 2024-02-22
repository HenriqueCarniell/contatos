// Variaveis
const botao = document.getElementById('login-botao');
const emailHelp = document.getElementById('emailHelp')

// Eventos
botao.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('input-email').value;
    let senha = document.getElementById('input-senha').value;

    enviadados(email, senha);
})


//Chamadas de API
let enviadados = (emaillogin, senhalogin) => {
    fetch('/send/login/dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emaillogin, senhalogin })
    })
        .then(response => response.json())
        .then(data => {
            if (data.msg === "Usuario Logado") {
                window.location.href = '/home'
            }
            if (data.msg === "Email ou Senha incorretos") {
                LoginNaoEncontrado(data.msg);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

let LoginNaoEncontrado = (msg) => {
    emailHelp.innerHTML += `
    <p id="email-senha-incorreta">${msg}</p>
    `
}
