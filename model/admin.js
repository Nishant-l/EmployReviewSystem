const mongoose = require('mongoose');

const adminSchama = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
});

const Admin = mongoose.model('Admin',adminSchama);

module.exports = Admin;