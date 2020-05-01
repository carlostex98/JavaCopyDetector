var Parser = require('jison').Parser;
var fs = require('fs');
let t=[];
let something="";


var grammar = {
    "lex": {
        "rules": [
           ["\\s+", "/* skip whitespace */"],
           ["[a-f0-9]+", "return 'HEX';"]
        ]
    },

    "bnf": {
        "hex_strings" :[ "hex_strings HEX",
                         "HEX" ]
    }
};


var parser = new Parser(grammar);
var parserSource = parser.generate();


function parse_start(){
    
    var z=parser.parse("adfe34bc e82a");
    //console.log(parserSource);
    fs.writeFile('./jison_gen.js', parserSource, function (err) {
        if (err) throw err;
        //console.log('Saved!');
        //
    }); 
}




module.exports={
    something,
    parse_start
};