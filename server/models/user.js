const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqValid = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: String , ref: 'Article'}] // Change this to store strings
  });

userSchema.plugin(uniqValid);
module.exports =mongoose.model('User', userSchema)