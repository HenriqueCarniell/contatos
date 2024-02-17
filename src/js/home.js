//Variaveis
const botaoSalvar = document.getElementById('salvar-contato');
const divContatos = document.getElementById('div-contatos');
const logar = document.getElementById('logar');
const divPerfil = document.getElementById('div-perfil');

const sairDasessao = document.getElementById('sairDasessao');

let change = true;

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

    if (change) {
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
    })
    .catch(err => {
        err.json().then(errorMessage => {
            mudafotologin(errorMessage.msg, null);
            console.log(errorMessage.msg);
        });
    });

fetch('/get/dados/user')
    .then(response => response.json())
    .then(user => {
        mudafotologin(null, user);
    })

sairDasessao.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST'
    })
        .then(() => {
            window.location.href = '/login'
        })
})

//Funções

let mudafotologin = (msg, user) => {
    if (msg === "Logue para ver seus contatos") {
        logar.innerHTML = `
            <a href="/login">Logar</a>
        `
    } else {
        logar.innerHTML = `
            <img id="foto-perfil" src="${user.foto_perfil}"></img>
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
                <button onclick="ExcluirContato(${data[i].idContato})" class="btn btn-danger">Excluir</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2${data[i].idContato}" class="btn btn-dark">Alterar</button>

                <!--Modal -->
                <div class="modal fade" id="exampleModal2${data[i].idContato}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="nomenovocontato${data[i].idContato}"
                                        aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Telefone</label>
                                    <input type="tel" class="form-control" id="telefonenovocontato${data[i].idContato}"
                                        aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email:</label>
                                    <input type="email" class="form-control" id="emailnovocontato${data[i].idContato}"
                                        aria-describedby="emailHelp">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onclick="AlterarContato(${data[i].idContato})" type="button" class="btn btn-dark">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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

let AlterarContato = (idContato) => {
    const nomenovocontato = document.getElementById('nomenovocontato' + idContato).value;
    const telefonenovocontato = document.getElementById('telefonenovocontato' + idContato).value;
    const emailnovocontato = document.getElementById('emailnovocontato' + idContato).value;

    fetch(`/change/contato/${idContato}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({
            novoNome: nomenovocontato,
            novoTelefone: telefonenovocontato,
            novoEmail: emailnovocontato
        })
    })
    window.location.reload();
}