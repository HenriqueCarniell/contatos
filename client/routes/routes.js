const express = require('express');
const Router = express();

//Controllers
const homecontroller = require('../controllers/homepagina');
const criarcontacontroller = require('../controllers/criarcontapagina');
const logincontroller = require('../controllers/loginpagina');
const perfilcontroller = require('../controllers/perfilpagina');
const sendadoscontroller = require('../controllers/registrausuario');
const sendlogindadoscontroller = require('../controllers/loginusuario');
const addcontroller = require('../controllers/addcontroller');
const getcontrollers = require('../controllers/getcontatos');
const deletecontato = require('../controllers/deletecontato');
const novosdadoscontroller = require('../controllers/novosdados');
const getdadosuser = require('../controllers/getdadosuser');
const novosdadoscontato = require('../controllers/novosdadoscontato');
const logoutsessao = require('../controllers/logoutsessao');

//API
Router.post('/send/dados', sendadoscontroller.Send);
Router.post('/send/login/dados', sendlogindadoscontroller.SendLogin);
Router.post('/send/add/contato', addcontroller.Add);
Router.get('/get/dados/contatos', getcontrollers.Get);
Router.delete('/delete/contato/:idContato', deletecontato.Delete);
Router.put('/send/novos/dados', novosdadoscontroller.novo);
Router.get('/get/dados/user', getdadosuser.getUser);
Router.put('/change/contato/:idcontato', novosdadoscontato.novo);
Router.post('/logout', logoutsessao.logout),

// Rotas
Router.get('/home', homecontroller.Home);
Router.get('/criarconta', criarcontacontroller.CriarConta);
Router.get('/login', logincontroller.Login);
Router.get('/perfil', perfilcontroller.Perfil);

module.exports = Router;