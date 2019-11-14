const express = require('express');
const bodyParser = require('body-parser');

const app = express();

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// rotas 
require('./controllers/authControllers')(app);
require('./controllers/projectsControllers')(app);

app.listen(3000);
console.log('servidor na porta 3000')



