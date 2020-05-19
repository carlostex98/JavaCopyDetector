var express = require('express');
var jison = require("jison");
var fs = require("fs");
var app = express();
app.set('port', '3000');
var a="";
var b="";

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    //lexer.parse_start();
    res.send('prus.html');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));

});

app.get('/o/:file1/:file2', function (req, res) {
    a=req.params.file1;
    b=req.params.file2;
    compile(a,b);
    res.send("hola gupis");
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
    let resultado1;
    let resultado2;
    //primera pasada
    var parser = require('./gram');
    resultado1=parser.parse(e1);
    console.log(resultado1[1]);
}






