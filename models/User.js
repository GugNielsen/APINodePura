const mongose = require('mongose');
const Schema = mongose.Schema;

const UserSchema = new Schema({
    nome:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercasa:true
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    creatdAt:{
        type:Date,
        default:Date.now,
    }

})

const User = Schema('User', UserSchema);

module.exports = User;