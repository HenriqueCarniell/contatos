const express = require('express');
const app = express();
const cors = require('cors');
const porta = 4000
const routes = require('../client/routes/routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('../src'));
app.use(routes);

app.listen(porta, () => {
    console.log(`servidor rodando na porta http://localhost:${porta}`);
})

