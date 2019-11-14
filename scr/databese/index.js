const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeApi',{
    useNewUrlParser:true,
    useUnifiedTopology: true},
    );
    mongoose.Promisse = global.Promise;


module.exports = mongoose;
