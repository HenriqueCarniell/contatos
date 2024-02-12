-- Active: 1706295515506@@localhost@3306@contatos

use contatos;

show tables;

show tables;

drop table usuario;
create table usuario (
    idUsuario int PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    Senha VARCHAR(160) NOT NULL,
    Data_Aniversario DATE
);
drop table Tel_Usuario;
create Table Tel_Usuario (
    idTelefone int PRIMARY KEY AUTO_INCREMENT,
    numero CHAR(13) NOT NULL,
    fk_id_Usuario int NOT NULL,
    FOREIGN KEY (fk_id_Usuario) REFERENCES usuario(idUsuario)
);

drop table contato_usuario;
create Table Contato_Usuario (
    idContato int PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(30),
    telefone CHAR(13),
    fk_id_Usuario INT NOT NULL,
    FOREIGN KEY (fk_id_Usuario) REFERENCES usuario(idUsuario)
);

SELECT * FROM usuario;
SELECT * FROM tel_usuario;
SELECT * FROM contato_usuario;