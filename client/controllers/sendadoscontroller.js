const db = require('../db/db');
const bcrypt = require('bcrypt')

exports.Send = async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(nome,email,senha);

    if (!ValidaDadosEmBranco(nome, email, senha, res)) {
        return;
    }
    let dadoBd = await ValidaDadosBancoDeDados(email,res);

    if(dadoBd === true) {
        res.status(501).json({msg: "Esse email já foi usado por favor use outro"});
    } else {
        await inserirBancodeDados(nome,email,senha)
        res.status(201).json({msg: "Conta Cadastrada com sucesso"});
    }
}

// Funções
let inserirBancodeDados = async (nome,email,senha,res) => {
        const sql = "insert into usuario(Nome,Email,Senha) values (?,?,?)";

        const salt = await bcrypt.genSalt(12);
        const senhaCript = await bcrypt.hash(senha,salt);

        db.query(sql,[nome,email,senhaCript], (err,result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
}

// Validação
let ValidaDadosEmBranco = (nome, email, senha, res) => {
    if (!nome) {
        res.status(400).json({msg: "O nome deve ser preenchido"});
        return false;
    }
    if (!email) {
        res.status(400).json({msg: "O email deve ser preenchido"});
        return false;
    }
    if (!senha) {
        res.status(400).json({msg: "A senha deve ser preenchida"});
        return false;
    }
    return true;
}

let ValidaDadosBancoDeDados = (email) => {
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
