const express = require('express');
const app = express();

const secret= require('./crypto/config.js')

const bodyParser = require('body-parser')

const routes = require('./routes/routes.js')

const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{secure: false}
}))

app.use('/', routes);

app.listen(3000, ()=>{
    console.log('Servidor ecuchando en el puert0 3000...');
})