const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqValid = require('mongoose-unique-validator')

const userSchema = new Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true,unique:true},
        password:{type:String, required:true, minlength:6}
    }
)

userSchema.plugin(uniqValid);
module.exports =mongoose.model('User', userSchema)