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
        ref:this
    }],
    hadRevieved:[{
        employId:mongoose.Schema.Types.ObjectId,
        ref:this
    }],
    myReview:[{
        reviewedBy:{
            employId:mongoose.Schema.Types.ObjectId,
            ref:this
        },
        reviewScore:{
            type:Number,
            required:true,
        }
    }]
});

const Employe = mongoose.model('Employe',employeSchama);

module.exports = Employe;