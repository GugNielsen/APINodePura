const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

cliemeShema = mongoose.Schema({
    nome:{
        type:String,
        require:true
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    bares:[{
        type:Schema.Types.ObjectId,
        ref:'bares',
        require:false
    }],

    quantidade:{
        type:Number
    },

    desconto:{
        type:Number
    }
})

const Cliente = mongoose.model('clientes',cliemeShema);

module.exports = Cliente;