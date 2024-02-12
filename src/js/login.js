// Variaveis
const botao = document.getElementById('login-botao');

// Funções


// Eventos
botao.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('input-email').value;
    let senha = document.getElementById('input-senha').value;

    enviadados(email,senha);
})

//Chamadas de API
let enviadados = (emaillogin,senhalogin) => {
    fetch('/send/login/dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({emaillogin,senhalogin})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.msg);
    })
    .catch((err) => {
        console.log(err)
    })
}

