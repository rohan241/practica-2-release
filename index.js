const express = require('express')
const app = express()
const port = 80;
var body_parser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


app.use(body_parser.urlencoded({ extended: false }))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.post('/registerUser', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    localStorage.setItem(username, password);
    res.send('<p>Hola ' + username + ' , ya estas registrado</p>');
})

app.post('/loginUser', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const data = localStorage.getItem(username);
    if (data !== null) {
        if (data == password) {
            res.send('<p>Hola ' + username + ' , ahora estas logueado</p>');

        } else {
            res.send('<p>Hola ' + username + ' , tu contrasenia esta mal</p>');

        }
    } else {
        res.send('<p>Hola ' + username + ' , no estas registrado</p>');

    }
    console.log(data);
})



app.listen(process.env.PORT || 80);