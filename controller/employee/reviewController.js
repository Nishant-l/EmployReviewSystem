const { populate } = require('../../model/employe');
const Employee = require('../../model/employe');

module.exports.homeView = (req,res)=>{
    // console.log(req.params);
    Employee.findById(req.params.id,(err,emp)=>{
        res.render('review',{employee:emp});
    })
}

module.exports.review_form = (req,res) => {

        Employee.findById(req.params.id,(err,empToBeReviewed)=>{ //find the employee who is to be reviewed
            console.log(empToBeReviewed);
            const valuee = {
                reviewedBy:req.user._id,
                reviewScore:req.body.feedback
            }
            empToBeReviewed.myReview.push(valuee); //insert the feedback to the myReview field of the reviewed employee
            Employee.findByIdAndUpdate(req.user.id,{$pull:{toReview:req.params.id}},(err,reveiwerr)=>{ //find the reveiwer and delete the employedToBeReviewed from the toReview field and push it to hadReviewed Field;
                reveiwerr.hadReviewed.push(req.params.id);
                reveiwerr.save();
                empToBeReviewed.save();
                res.redirect(`/employee/showListToReview`);
            })
            
        })
        // console.log(req.body);
        // console.log(req.params);

}


module.exports.myReview = (req,res) => {
    Employee.findById(req.user.id)
    .populate({
        path:'myReview',
        populate:{
            path:'reviewedBy'
        }
    })
    .exec((err,myInfo)=>{
        res.render('myReview',{myInfo:myInfo});
    })
}