const db = require('../db/db')

exports.Add = (req, res) => {
    const { nomecontato, telefonecontato, emailcontato } = req.body;

    if (!req.session.user) {
        res.status(401).json({ msg: "Usuário não está logado" });
        return;
    }

    const idUsuario = req.session.user.id;

    Validacao(nomecontato, telefonecontato, emailcontato, idUsuario, res);
}

let Validacao = (nomecontato, telefonecontato, emailcontato, idUsuario, res) => {
    if (!nomecontato || !telefonecontato || !emailcontato) {
        res.status(404).json({ msg: "Digite aguma coisa" });
        return;
    } else {
        inserircontatoDB(nomecontato, telefonecontato, emailcontato, idUsuario, res);
    }
}

let inserircontatoDB = (nomecontato, telefonecontato, emailcontato, idUsuario, res) => {
    const sql = "insert into Contato_Usuario(nome,email,telefone,fk_id_Usuario) values(?,?,?,?)";

    db.query(sql, [nomecontato, emailcontato, telefonecontato, idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "Erro ao inserir contato" });
        } else {
            res.status(200).json({ msg: "Contato inserido com sucesso" });
        }
    })
}