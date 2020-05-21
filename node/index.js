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

app.post('/onfer/', function (req, res) {
    var x = req.body.file1;
    var y = req.body.file2;
    compile(x, y);
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(result);
});

app.get('/fmx', function (req, res) {
    //respondemos con el json
    res.send(result);
});


var e = 0;
var poser="";
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
var ast = "";

function compile(e1, e2) {
    let resultado1 = [];
    let resultado2 = [];
    //primera pasada

    var parser = require('./gram');

    parser.clear_vars();
    resultado1 = parser.parse(e1);

    parser.clear_vars();
    resultado2 = parser.parse(e2);
    
    //generate ast jajaj
    ast = "";
    build_ast(resultado1[0]);
    result = { errores: resultado1[1], copia: null, ast: resultado1[0] };
}


function calc_repetidos(original, copia) {
    let n = [];
    for (let i = 0; i < original.length; i++) {
        if (copia.includes(original[i])) {
            n.push(original[i]);
        }
    }
    return n;
}

function build_ast(inlet) {
    poser="";
    recur(inlet);
}

function recur(op){
    for(let i=0;i<op.length;i++){
        
    }
}


