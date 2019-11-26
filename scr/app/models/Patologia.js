const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const PatologiaSchema = Schema({
    nome:{
        type:String,
        require:true
    },
    IsVitalicio:{
        type:Boolean,
    },
    pacientes:[{
        type: Schema.Types.ObjectId,
        ref:"pacientes",
        required:false
    }],
})

const Patologia = mongoose.model('patologias',PatologiaSchema);

module.exports = Patologia;