const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.SendLogin = async (req, res) => {
    const { emaillogin, senhalogin } = req.body;

    validaDadosEmBranco(emaillogin, senhalogin, res);
    let usuario = await ValidaDadosLoginBancoDeDados(emaillogin, res);

    if (usuario) {
        let comparasenha = await bcrypt.compare(senhalogin, usuario.Senha);

        if (comparasenha) {
            req.session.user = { id: usuario.idUsuario };
            res.status(201).json({ msg: "Usuario Logado" });
        } else {
            res.status(404).json({ msg: "Senha incorreta" });
        }
    }
}

let validaDadosEmBranco = (emaillogin, senhalogin, res) => {
    if (!emaillogin) {
        res.status(404).json({ msg: "Digite um email" });
    }
    if (!senhalogin) {
        res.status(404).json({ msg: "Digite uma senha" });
    }
}

let ValidaDadosLoginBancoDeDados = (emaillogin, res) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM usuario WHERE email = ?";

        db.query(sql, [emaillogin], (err, result) => {
            if (err) {
                reject(err);
                console.log(err);
            }
            if (result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(false);
            }
        })
    })
}

