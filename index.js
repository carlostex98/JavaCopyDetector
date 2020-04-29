var express = require('express');
var app = express();
app.set('port', '3000');
app.get('/', function (req, res) {
    
});
app.listen(app.get('port'), function () {
    console.log('Example app listening on port', app.get('port'));
});