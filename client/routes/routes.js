const express = require('express');
const Router = express();

//Controllers
const homecontroller = require('../controllers/homecontroller');
const criarcontacontroller = require('../controllers/criarcontacontroller');
const logincontroller = require('../controllers/logincontroller');
const perfilcontroller = require('../controllers/perfilcontroller');
const sendadoscontroller = require('../controllers/sendadoscontroller');
const sendlogindadoscontroller = require('../controllers/sendlogindadoscontroller');
const addcontroller = require('../controllers/addcontroller');
const getcontrollers = require('../controllers/getcontrollers');
const deletecontato = require('../controllers/deletecontato');
const novosdadoscontroller = require('../controllers/novosdados')

//API
Router.post('/send/dados', sendadoscontroller.Send);
Router.post('/send/login/dados', sendlogindadoscontroller.SendLogin);
Router.post('/send/add/contato', addcontroller.Add);
Router.get('/get/dados/contatos', getcontrollers.Get);
Router.delete('/delete/contato/:idContato', deletecontato.Delete)
Router.put('/send/novos/dados', novosdadoscontroller.novo)

// Rotas
Router.get('/home', homecontroller.Home);
Router.get('/criarconta', criarcontacontroller.CriarConta);
Router.get('/login', logincontroller.Login);
Router.get('/perfil', perfilcontroller.Perfil);

module.exports = Router;