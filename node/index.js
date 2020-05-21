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
    //build_ast(resultado1[0]);
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
    poser = "<ul id=\"myUL\">";
    recur(inlet);
    poser = "</ul>";
}

function recur(op) {
    for (let i = 0; i < op.length; i++) {
        if (op[i].tipo == "CLASS") {
            poser += "<li><span class=\"caret\"> CLASS </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Nombre: " + op[i].valor + "</li>"
            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "IMPORT") {
            poser += "<li><span class=\"caret\"> IMPORT - " + op[i].valor + "</span>"
        }
        if (op[i].tipo == "INSTR_PRINT") {
            poser += "<li><span class=\"caret\"> PRINT </span>"
            poser += "<ul class=\"nested\">";
            poser += "<li>Valor: " + op[i].valor + "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "INSTR_PRINTLN") {
            poser += "<li><span class=\"caret\"> PRINT </span>"
            poser += "<ul class=\"nested\">";
            poser += "<li>Valor: " + op[i].valor + "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "INSTR_WHILE") {
            poser += "<li><span class=\"caret\"> WHILE </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valores: " + op[i].valor + "</li>"

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "INSTR_DOWHILE") {
            poser += "<li><span class=\"caret\"> DO-WHILE </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valores: " + op[i].valor + "</li>"

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "INSTR_FOR") {
            poser += "<li><span class=\"caret\"> FOR </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Variable: " + op[i].variable + "</li>"
            poser += "<li>Valor: " + op[i].valor + "</li>"

            poser += "<li>Valores: " + op[i].valor + "</li>"//log expr

            poser += "<li>Valores: " + op[i].valor + "</li>"//aumento

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }
        if (op[i].tipo == "INSTR_IF") {
            poser += "<li><span class=\"caret\"> IF </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valores: " + op[i].valor + "</li>"//LOGIC

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "INSTR_IFELSE") {
            poser += "<li><span class=\"caret\"> ELSE IF </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valores: " + op[i].valor + "</li>"//LOGIC

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "INSTR_ELSE") {
            poser += "<li><span class=\"caret\"> IF </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "SWITCH") {
            poser += "<li><span class=\"caret\"> SWITCH </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Variable: " + op[i].variable + "</li>"//LOGIC

            poser += "<li><span class=\"caret\"> Casos </span>"
            //call cases builder
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "METODO") {
            poser += "<li><span class=\"caret\"> METODO </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Nombre: " + op[i].nombre + "</li>"

            poser += "<li>Nombre: " + op[i].nombre + "</li>"//params call

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "FUNCION") {
            poser += "<li><span class=\"caret\"> FUNCION </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Nombre: " + op[i].nombre + "</li>"
            poser += "<li>Tipo: " + op[i].tipo + "</li>"

            poser += "<li>Nombre: " + op[i].nombre + "</li>"//params call

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "LLAMADA_F") {
            poser += "<li><span class=\"caret\"> LLAMADA FUNCION </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Nombre: " + op[i].nombre + "</li>"

            poser += "<li>Nombre: " + op[i].nombre + "</li>"//params call
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "INSTR_ASIGNACION") {
            poser += "<li><span class=\"caret\"> ASIGNACION </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Nombre: " + op[i].nombre + "</li>"
            poser += "<li>Valores: " + op[i].nombre + "</li>"//asignacion
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "BREAK") {
            poser += "<li> BREAK </li>"
        }

        if (op[i].tipo == "CONTINUE") {
            poser += "<li> CONTINUE </li>"
        }

        if (op[i].tipo == "RETURN") {
            poser += "<li><span class=\"caret\"> RETURN </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Valores: " + op[i].nombre + "</li>"//asignacion
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipex == "VARIABLE") {
            poser += "<li><span class=\"caret\"> VARIABLE </span>";
            poser += "<ul class=\"nested\">";
            poser += "<li>Tipo: " + op[i].tipo + "</li>"
            poser += "<li>Nombre: " + op[i].nombre + "</li>"
            poser += "<li>Valor: " + op[i].tipo + "</li>"//asg call
            poser += "</ul>"
            poser += "</li>"
        }

    }
}

function cases_builder(vps) {
    for (let i = 0; i < vps.length; i++) {
        //evaluando
        if (op[i].tipo == "CASE") {
            poser += "<li><span class=\"caret\"> CASO </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valor: " + op[i].variable + "</li>"//value

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

        if (op[i].tipo == "DEFAULT") {
            poser += "<li><span class=\"caret\"> DEFAULT </span>";
            poser += "<ul class=\"nested\">";

            poser += "<li>Valor: " + op[i].variable + "</li>"//value

            poser += "<li><span class=\"caret\"> Instrucciones </span>"
            recur(op[i].instrucciones);
            poser += "</li>"
            poser += "</ul>"
            poser += "</li>"
        }

    }
}

function minVar(){
    //el minimo de valor, es decir, numero, cadena, identificador
}


