const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const especilidadeSchema = Schema({
    nome:{
        type:String,
        require:true
    },
    medicos:[{
        type: Schema.Types.ObjectId,
        ref:"medicos",
        required:false
    }],
})

const Especilidade = mongoose.model('especialidades',especilidadeSchema);

module.exports = Especilidade;