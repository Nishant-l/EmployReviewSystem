const Employee = require('../../model/employe');

module.exports.homeView = (req,res)=>{
    console.log(req.params);
    Employee.findById(req.params.id,(err,emp)=>{
        res.render('review',{employee:emp});
    })
}