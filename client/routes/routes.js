const express = require('express');
const Router = express();

//Controllers
const homecontroller = require('../controllers/homecontroller');
const criarcontacontroller = require('../controllers/criarcontacontroller');
const logincontroller = require('../controllers/logincontroller');
const perfilcontroller = require('../controllers/perfilcontroller');
const sendadoscontroller = require('../controllers/sendadoscontroller');

//API
Router.post('/send/dados', sendadoscontroller.Send)

// Rotas
Router.get('/home', homecontroller.Home);
Router.get('/criarconta', criarcontacontroller.CriarConta);
Router.get('/login', logincontroller.Login);
Router.get('/perfil', perfilcontroller.Perfil);

module.exports = Router;