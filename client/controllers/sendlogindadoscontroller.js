const db = require('../db/db');

exports.SendLogin = (req,res) => {
    const {emaillogin,senhalogin} = req.body;

    console.log(emaillogin,senhalogin);

    validaDadosEmBranco(emaillogin,senhalogin,res);
}

let validaDadosEmBranco = (emaillogin, senhalogin,res) => {
    if(!emaillogin) {
        res.status(404).json({msg: "Digite um email"})
    }
    if(!senhalogin) {
        res.status(404).json({msg: "Digite uma senha"})
    }
}