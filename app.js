var express = require('express');
var app = express();
var index = require('./routes/index');

app.set('view engine','hbs');
app.use('/',index);

module.exports=app;
app.listen(3000);
console.log('Running on port 3000');
