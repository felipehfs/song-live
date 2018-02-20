"use strict";
var app = require('./config/server');
var mongoose = require('./config/mongoose');
app.use(require('./config/cors'));

app.use('/songs', require('./routes/routes'));
app.listen(3000, () => console.log("Rodando o servidor na porta 3000"));
