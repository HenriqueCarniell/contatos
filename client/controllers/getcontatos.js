const db = require('../db/db');

exports.Get = (req,res) => {

    if(!req.session || !req.session.user) {
        res.status(404).json({msg: "Logue para ver seus contatos"});
        return;
    }

    const idUsuario = req.session.user.id;

    const sql = "select * from Contato_Usuario where fk_id_Usuario = ?";

    db.query(sql, [idUsuario], (err,result) => {
        if(err) {
            console.log(err);
            res.status(500).json({msg: "Erro ao buscar contatos"});
        }
        if(result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({msg: "Nenhum contato encontrado"});
        }
    });
}
