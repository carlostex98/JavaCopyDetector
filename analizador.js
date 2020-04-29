var Parser = require('jison').Parser;

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
    parser.parse("adfe34bc e82a");
}




module.exports={
    something,
    parse_start
};