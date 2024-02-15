//Variaveis
const botaoSalvar = document.getElementById('salvar-contato');
const divContatos = document.getElementById('div-contatos');
const logar = document.getElementById('logar');
const divPerfil = document.getElementById('div-perfil')

let change = false;

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
        body: JSON.stringify({ nomecontato, telefonecontato, emailcontato })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.msg) {
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

logar.addEventListener('click', () => {
    change = !change;
    
    if(change) {
        divPerfil.style.display = 'none'
    } else {
        divPerfil.style.display = 'block'
    }
});

fetch('/get/dados/contatos')
    .then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    })
    .then(data => {
        colocaContato(data);
        mudafotologin(null, data.foto);
    })
    .catch(err => {
        err.json().then(errorMessage => {
            mudafotologin(errorMessage.msg, null);
            console.log(errorMessage.msg)
        });
    });

//Funções

let mudafotologin = (msg, fotoUrl) => {
    if (msg === "Logue para ver seus contatos") {
        logar.innerHTML = `
            <a href="/login">Logar</a>
        `
    } else {
        logar.innerHTML = `
            <img id="foto-perfil" src="${fotoUrl}">Foto</img>
        `
    }
}


let colocaContato = (data) => {
    for (var i = 0; i < data.length; i++) {
        divContatos.innerHTML += `
        <div id="Econtatos">
            <h4>Nome: ${data[i].nome}</h4>
            <h4>Email: ${data[i].email}</h4>
            <h4>Telefone: ${data[i].telefone}</h4>
            <button onclick="ExcluirContato(${data[i].idContato})">Excluir</button>
            <button>Alterar</button>
        </div>
        `
    }
}

let ExcluirContato = (idContato) => {
    fetch(`/delete/contato/${idContato}`, {
        method: 'DELETE',
    }).then(response => response.json())
        .then(data => {
            divContatos.innerHTML = ''
            fetch("/get/dados/contatos")
                .then(response => response.json())
                .then(data => {
                    colocaContato(data)
                })
        })
}

