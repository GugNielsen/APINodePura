const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

funcionarioSchema = mongoose.Schema({
    nome:{
        type:String,
        require,
    },
    salario:{
        type:Number,
        require,
    },
    bar:{
        type:Schema.Types.ObjectId,
        ref:"bares",
        required:true
    },
})
const Funcionario = mongoose.model('funcionarios',barSchema);
module.exports = Funcionario;