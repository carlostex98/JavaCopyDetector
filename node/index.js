var express = require('express');
var jison = require("jison");
var fs = require("fs");
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

app.set('port', '3000');
app.use(cors());
var result = [{ errores: null, copia: null, ast: null }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    //lexer.parse_start();
    res.send('el coso funciona');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));

});

var unix="";
app.post('/onfer/', function (req, res) {
    var x = req.body.file1;
    var y = req.body.file2;
    unix=x;
    compile(x, y);
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(result);

});

app.get('/fmx', function (req, res) {
    //respondemos con el json
    res.send(result);
});


var e = 0;
var poser = "";
//parser generator
if (e == 1) {
    var bnf = fs.readFileSync("gram.jison", "utf8");
    var parser = new jison.Parser(bnf);
    var parserSource = parser.generate();
    /*fs.writeFile('./jison_gen.js', parserSource, function (err) {
    if (err) throw err;
    //console.log('Saved!');
    });*/
}

//parser end


function compile(e1, e2) {
    let resultado1 = [];
    let resultado2 = [];
    //primera pasada
    var ast = "";

    var parser = require('./gram');

    parser.clear_vars();
    resultado1 = parser.parse(e1);

    parser.clear_vars();
    resultado2 = parser.parse(e2);

    //generate ast jajaj
    ast = "";
    for (let i = 0; i < resultado1[0].length; i++) {
        ast += resultado1[0][i];
    }
    
    for (let i = 0; i < ast.length; i++) {
        ast = ast.replace(">,<", "><");
    }
    let er=[];
    er=resultado1[1];
    
    for (let i = 0; i < unix.length; i++) {
        unix=unix.replace("\t","\s\s\s\s");
    }
    let r=[];
    r=unix.split("\n");

    for (let i = 0; i < er.length; i++) {
        var ch=r[er[i].linea - 1];
        var t=ch.substr(er[i].columna-1);
        er[i].descripcion=t;
    }
    result = { errores: resultado1[1], copia: calc_repetidos(resultado1[2], resultado2[2]), ast: ast };
}


function calc_repetidos(original, copia) {
    let n = [];

    for (let i = 0; i < original.length; i++) {
        for (let j = 0; j < copia.length; j++) {
            if (original[i].nombre == copia[j].nombre && original[i].tipo == copia[j].tipo) {
                n.push(original[i]);
            }
        }
    }

    return n;
}



