const express = require('express');
const app = express();
const cors = require('cors');
const porta = 4000
const routes = require('../client/routes/routes');
const session = require('express-session');

app.use(session({
    secret: "ASDFSADFSDF39382070fh200fh092cnlznknsaASFASDF",
    resave: false,
    saveUninitialized: true
}));
app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../src'));
app.use(routes);

app.listen(porta, () => {
    console.log(`servidor rodando na porta http://localhost:${porta}`);
})

