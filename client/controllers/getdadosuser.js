const db = require('../db/db');

exports.getUser = (req, res) => {

    const idUsuario = req.session.user.id;

    const sql = "select * from usuario where idUsuario = ?";

    db.query(sql, [idUsuario], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            res.status(404).json({ msg: "Erro ao encontrar usuario" });
        }
    })
}