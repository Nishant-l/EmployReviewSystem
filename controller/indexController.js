const { localsName } = require('ejs');
const Employee = require('../model/employe');

module.exports.employeeLogIn = (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/employee/showListToReview');
    }
    return res.render('employeLogin');
}

module.exports.employeeSignUp = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/employee/showListToReview');
    }
    return res.render('employeSignUp');
}

module.exports.adminLogin = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/employee/showListToReview');
    }
    return res.render('adminLogin');
}

module.exports.createEmployee = (req,res) => {
    console.log(req.body);
    Employee.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    },(err)=>{
        if(err){
            console.log('email alredy exists');
            return res.redirect('back');
        }
        return res.redirect('back');
    })
}