const mongoose = require('../../databese/index');

EventoSchema =mongoose.Schema({
    titulo:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Evento = mongoose.model('Evento',EventoSchema);

module.exports = Evento;