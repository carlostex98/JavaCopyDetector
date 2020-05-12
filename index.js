var express = require('express');
var jison = require("jison");
var fs = require("fs");
var app = express();
app.set('port', '3000');

//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    lexer.parse_start();
    res.send('prus.html');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));

});

app.get('/o/:file1/:file2', function (req, res) {
    var a=req.params.file1;
    var b=req.params.file2;
    res.send("hola gupis");
});

var e=1;

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


