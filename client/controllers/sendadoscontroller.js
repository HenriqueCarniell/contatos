const db = require('../db/db');

exports.Send = async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(nome,email,senha);

    ValidaDadosEmBranco(nome, email, senha, res);
    let dadoBd = await ValidaDadosBancoDeDados(email,res);

    if(dadoBd === true) {
        res.status(501).json({msg: "Esse email já foi usado por favor use outro"});
    } else {
        res.status(201).json({msg: "Conta Cadastrada com sucesso"});
    }
}

// Funções

// Validação
let ValidaDadosEmBranco = (nome, email, senha, res) => {
    if (!nome) {
        res.status(400).json({msg: "O nome deve ser preenchido"});
    }
    if (!email) {
        res.status(400).json({msg: "O email deve ser preenchido"});
    }
    if (!senha) {
        res.status(400).json({msg: "A senha deve ser preenchida"});
    }
}

let ValidaDadosBancoDeDados = (email,res) => {
    return new Promise((resolve,reject) => {
        const sql = "select email from usuario where email = ?";

        db.query(sql,[email], (err,result) => {
            if(err) {
                reject(err);
                console.log(err);
            }
            if(result.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}
