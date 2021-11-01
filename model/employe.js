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
    isAdmin:{
        type:Boolean,
        required:true
    },
    toReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employe'
    }],
    hadRevieved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employe'
    }],
    myReview:[{
        reviewedBy:{
            type:mongoose.Schema.Types.ObjectId,
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