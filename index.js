var express = require('express');
var app = express();
app.set('port', '3000');
let lexer=require('./analizador.js');
app.get('/', function (req, res) {
    lexer.parse_start();
    res.send('prus.html');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));

});