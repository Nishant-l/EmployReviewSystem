const Employee = require('../../model/employe');

module.exports.demo = (req,res)=>{ // to display the employeeManagement page
    Employee.find({},(err,AllEmployee) => {
        res.render('employeeManagement',{AllEmployee:AllEmployee});
    })
};

module.exports.updateEmployeeProfile = (req,res) => { //controller to display a specific employees page to enable editing employees info
    Employee.findById(req.params.empid)
            .populate({
                path:'myReview',
                populate:{
                    path:'reviewedBy'
                }
            })
            .exec((err,emp)=>{
                // console.log(req.params);
                res.render('updateEmpInfo',{empInfo:emp});
                // console.log(emp);
            })
}

module.exports.updateEmpInfo_form = (req,res)=>{ // controller to update employee name and email which are input through form
    Employee.findById(req.params.id,(err,employee)=>{
        if(employee.name != req.body.name || employee.email != req.body.email){
            employee.name = req.body.name;
            employee.email = req.body.email;
            employee.save();
            res.redirect('back');
            console.log(employee);
        }
    })
}