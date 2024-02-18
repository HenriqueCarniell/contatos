const db = require('../db/db');

exports.novo = (req, res) => {
    const idcontato = req.params.idcontato;

    const { novoNome, novoTelefone, novoEmail } = req.body;

    const sql = "update Contato_Usuario set nome = ?, email = ?, telefone = ? where idContato = ?";

    db.query(sql, [novoNome, novoEmail, novoTelefone, idcontato], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
        }
    })
}