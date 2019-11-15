const mongoose = require('../../databese/index');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
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
    passwordRestToken:{
        type:String,
        select:false
    },
    passwordRestExpires:{
        type:Date,
        select:false
    },
    creatdAt:{
        type:Date,
        default:Date.now
    }

})

UserSchema.pre('save',async function(nest){
    const hash= await bcrypt.hash(this.password,10)
    this.password = hash;
    nest();

})

const User = mongoose.model('User',UserSchema);

module.exports = User;