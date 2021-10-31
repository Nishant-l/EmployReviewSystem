const Employee = require('../model/employe');

module.exports.employeeLogIn = (req,res) =>{
    res.render('employeLogin');
}

module.exports.employeeSignUp = (req,res) => {
    res.render('employeSignUp');
}

module.exports.adminLogin = (req,res) => {
    res.render('adminLogin');
}

module.exports.createEmployee = (req,res) => {
    console.log(req.body);
    Employee.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    })
    res.redirect('back');
}