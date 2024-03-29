-- Active: 1706295515506@@localhost@3306@contatos

use contatos;

show tables;

show tables;

drop table usuario;
create table usuario (
    idUsuario int PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Senha VARCHAR(160) NOT NULL,
    foto_perfil VARCHAR(1000),
    Data_Aniversario DATE,
    numero_telefone CHAR(13)
);

drop table contato_usuario;
create Table Contato_Usuario (
    idContato int PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(50),
    telefone CHAR(13),
    fk_id_Usuario INT NOT NULL,
    FOREIGN KEY (fk_id_Usuario) REFERENCES usuario(idUsuario)
);

SELECT * FROM usuario;
SELECT * FROM contato_usuario;
