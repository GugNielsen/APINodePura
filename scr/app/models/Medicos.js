const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

MedicosSchema = Schema({
    nome:{
        type:String,
        require:true,
    },

    cod:{
        type:Number,
        require:true,
    },
    especialidade:{
        type: Schema.Types.ObjectId,
        ref:"especialidades",
        required:false
    },
    paciente:[{
        type: Schema.Types.ObjectId,
        ref:"pacientes",
        required:false
    }],

})

const Medico = mongoose.model('medicos',MedicosSchema);

module.exports = Medico;