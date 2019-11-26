const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const MedicamentoSchema = Schema({
    nome:{
        type:String,
        require:true
    },
    patologia:{
        type: Schema.Types.ObjectId,
        ref:"patologias",
        required:true
    },
    pacientes:[{
        type: Schema.Types.ObjectId,
        ref:"pacientes",
        required:false
    }],
})

const Medicamento = mongoose.model('medicamentos',MedicamentoSchema);

module.exports = Medicamento;