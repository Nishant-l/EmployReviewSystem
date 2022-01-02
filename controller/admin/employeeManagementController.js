const { resolveInclude } = require('ejs');
const { readBuilderProgram } = require('typescript');
const Employee = require('../../model/employe');
const { myReview } = require('../employee/reviewController');

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
        return res.redirect('back');
    })
}

module.exports.AdminReviewView = (req,res)=>{
    Employee.findById(req.params.id)
            .populate({
                path:'myReview',
                populate:{
                    path:'reviewedBy'
                }
            })
            .exec((err,empolyee)=>{
                return res.render('AdminEditReviewView',{empolyeeInfo:empolyee});
            }) 
}

module.exports.updateReviewForm = (req,res)=>{ //controller to update the review of an employee which is reviewed by someone else
    Employee.findById(req.query.reviewOf,(err,reviewOFF)=>{ // find the employee whose reviewee is to be edited
        for(i of reviewOFF.myReview){ // find from the myReview array of the employee the reviewer whose review is to be updated
            if(i.reviewedBy._id.toString()===req.query.reviewedBy && i.reviewScore != req.body.feedback){ //match the reviewer whose review is to be updated
                i.reviewScore = req.body.feedback;
                reviewOFF.save()
                console.log('in');
            }
        }
    })
    return res.redirect('back');
}

module.exports.deleteAnEmployee = (req,res) => {
    const toDelete = req.params.id;
    if(toDelete != req.user.id){ //check if the admin is deleating itself canbe deleated by other admins
        console.log('can be deleated');

        Employee.findById(toDelete)
        .then(async (e)=>{
            for(i of e.hadReviewed){
                await Employee.findByIdAndUpdate(i,{$pull:{myReview:{reviewedBy:toDelete}}})
                .then(console.log('----Deleated-----'));
            }
            return e;
        })
        .then(async (e)=>{
            for(i of e.myReview){
                console.log(i);
                await Employee.findByIdAndUpdate(i.reviewedBy,{$pull:{hadReviewed:e.id}})
            }
            e.remove();
        })
        .then(()=>res.redirect('back'));
    }
}