const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const pacienteSchema = Schema({
    nome:{
        type:String,
        require:true
    },
    sobernome:{
        type:String,
        require:true
    },
    medicos:[{
        type: Schema.Types.ObjectId,
        ref:"medicos",
        required:false
    }],
    patologias:[{
        type: Schema.Types.ObjectId,
        ref:"patologias",
        required:false
    }],
    medicamentos:[{
        type: Schema.Types.ObjectId,
        ref:"medicamentos",
        required:false
    }],
})

const Paciente = mongoose.model('pacientes',pacienteSchema);

module.exports = Paciente;