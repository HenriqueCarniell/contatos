let salvarDados = document.getElementById('salvar-dados');
let fotoDePerfil = document.getElementById('foto-de-perfil')

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

fetch('/get/dados/user')
    .then(response => response.json())
    .then(user => {
        colocaFotoPerifl(user);
        colocardadosinput(user)
    })

    let colocardadosinput = (user) => {
        document.getElementById('novoNome').value = user.Nome;
        document.getElementById('novoEmail').value = user.Email;
        document.getElementById('novoTelefone').value = user.numero_telefone;
        document.getElementById('novaFoto').value = user.foto_perfil;
        document.getElementById('novaData').value = user.Data_Aniversario;
    
    }

    let colocaFotoPerifl = (user) => {
        if(user && user.foto_perfil) {
            fotoDePerfil.innerHTML = `
            <img src="${user.foto_perfil}"></img>
            `
        } else {
            fotoDePerfil.innerHTML = `
            <img src="https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg"></img>
            `
        }
    }    