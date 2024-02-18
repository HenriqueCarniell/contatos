const db = require('../db/db');

exports.novo = (req, res) => {
    const { nome, email, telefone, foto, data } = req.body;
    const idUsuario = req.session.user.id;

    const sql = "UPDATE usuario SET Nome = ?, Email = ?, foto_perfil = ?, Data_Aniversario = ?, numero_telefone = ? where idUsuario = ?";
    db.query(sql, [nome, email, foto, data, telefone, idUsuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Erro ao atualizar dados do usuário' });
        } else {
            console.log(result);
            res.json({ status: 'Dados do usuário atualizados com sucesso!' });
        }
    })
}