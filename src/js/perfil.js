// Variaveis
let salvarDados = document.getElementById('salvar-dados');
let fotoDePerfil = document.getElementById('foto-de-perfil');
let logar = document.getElementById('logar');
let divPerfil = document.getElementById('div-perfil');
let sairDasessao = document.getElementById('sairDasessao');

// Variavel para abrir e fechar o modal
let change = true;

//Eventos
salvarDados.addEventListener('click', () => {
    let novoNome = document.getElementById('novoNome').value;
    let novoEmail = document.getElementById('novoEmail').value;
    let novoTelefone = document.getElementById('novoTelefone').value;
    let novaFoto = document.getElementById('novaFoto').value;
    let novaDataAniversario = document.getElementById('novaData').value;

    let novaDataAniversarioNulo = novaDataAniversario;

    if(novaDataAniversario === '') {
        novaDataAniversarioNulo = null;
    }

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
            data: novaDataAniversarioNulo
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        })
});

fetch('/get/dados/user')
    .then(response => response.json())
    .then(user => {
        colocaFotoPerifl(user);
        colocardadosinput(user)
        mudafotologin(null, user)
        console.log(user)
    }).catch((err) => {
        console.log(err)
        mudafotologin(err.msg, null)
    })

logar.addEventListener('click', () => {
    change = !change;

    if (change) {
        divPerfil.style.display = 'none'
    } else {
        divPerfil.style.display = 'block'
    }
})


let mudafotologin = (msg, user) => {
    if (msg === "Logue para ver seus contatos") {
        logar.innerHTML = `
                <a href="/login">Logar</a>
            `
    } else {
        logar.innerHTML = `
        <img id="foto-perfil" src="${user.foto_perfil ? user.foto_perfil : "https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg"}"></img>
            `
    }
}

let colocardadosinput = (user) => {
    document.getElementById('novoNome').value = user.Nome;
    document.getElementById('novoEmail').value = user.Email;
    document.getElementById('novoTelefone').value = user.numero_telefone;
    document.getElementById('novaFoto').value = user.foto_perfil;
    document.getElementById('novaData').value = user.Data_Aniversario;

}

sairDasessao.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST'
    })
        .then(() => {
            window.location.href = '/login'
        })
})

let colocaFotoPerifl = (user) => {
    if (user && user.foto_perfil) {
        fotoDePerfil.innerHTML = `
            <img src="${user.foto_perfil}"></img>
            `
    } else {
        fotoDePerfil.innerHTML = `
            <img src="https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg"></img>
            `
    }
}    