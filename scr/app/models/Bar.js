const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const barSchema = mongoose.Schema({
    nomeBar:{
        type:String,
        require,
    },
    local:{
        type:String,
        require,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
 
    funcionario:[{
        type:Schema.Types.ObjectId,
        ref:"funcionarios",
       
    }]
})

const Bar = mongoose.model('bares',barSchema);

module.exports = Bar;