const db = require('../db/db');

exports.Delete = (req, res) => {
    const { idContato } = req.params;

    const sql = "delete from Contato_Usuario where idContato = ?";

    db.query(sql, [idContato], (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.status(201).json({ msg: "Contatos Deletado com sucesso" })
        }
    })
}
