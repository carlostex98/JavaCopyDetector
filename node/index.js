var express = require('express');
var jison = require("jison");
var fs = require("fs");
var app = express();
app.set('port', '3000');
var result;

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
    var x=req.body.file1;
    var y=req.body.file2;
    //res.send(result);
    compile(x,y);
});

app.get('/fmx', function (req, res) {
    //respondemos con el json
});


var e=0;

//parser generator
if(e==1){
    var bnf = fs.readFileSync("gram.jison", "utf8");
    var parser = new jison.Parser(bnf);
    var parserSource = parser.generate();
    /*fs.writeFile('./jison_gen.js', parserSource, function (err) {
    if (err) throw err;
    //console.log('Saved!');
    });*/
}
 
//parser end


function compile(e1,e2){
    let resultado1=[];
    let resultado2=[];
    //primera pasada
    
    var parser = require('./gram');

    parser.clear_vars();
    resultado1=parser.parse(e1);
    
    parser.clear_vars();
    resultado2=parser.parse(e2);

    //generate ast jajaj
}






