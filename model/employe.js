const mongoose = require('mongoose');

const employeSchama = mongoose.Schema({
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
        required:true,
    },
    toReview:[{
        employId:mongoose.Schema.Types.ObjectId,
        ref:'Employe'
    }],
    myReview:[{
        reviewedBy:{
            employId:mongoose.Schema.Types.ObjectId,
            ref:'Employe'
        },
        reviewScore:{
            type:Number,
            required:true,
        }
    }]
});

const Employe = mongoose.model('Employe',employeSchama);

module.exports = Employe;