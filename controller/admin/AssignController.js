const Employee = require('../../model/employe');

module.exports.assignForReview = (req,res) => {
    Employee.find({},(err,employ)=>{
        res.render('assignForReview',{employe:employ});
    })
}

module.exports.logout = (req,res) => {
    req.logout();
    res.redirect('/adminLogin');
}

module.exports.assignForReviewForm = (req,res) => {
    Employee.findById(req.body.reveiwer,(err,reveiwer)=>{ //find the reveiver by id
        if(!req.body.toBeReviewed instanceof Object){
            req.body.toBeReviewed = [req.body.toBeReviewed];
        }
        if(req.body.toBeReviewed instanceof Object){ //check if the toBeRevieved is a single value or js object
            for(r of req.body.toBeReviewed){ //if js object iterate over it
                let count =0; 
                for(k of reveiwer.toReview){ //iterate over all the to be reveived array to check if the id is alredy present
                    if(k._id.toHexString() == r){ //if present increase the count
                        count++;
                    }
                }
                for(k of reveiwer.hadReviewed){ //check the employee is alredy revieved by same peer employee
                    if(k._id.toHexString() == r){ //if present increase the count
                        count++;
                    }
                }
                // console.log(count);
                if(count == 0){ //if the to_be_reveived id is not present in the array
                    reveiwer.toReview.push(r); 
                }
            }
        }
        reveiwer.save(); //save the changes in database
        // console.log(reveiwer.toReview)
    })
    // console.log(req.body);
    res.redirect('back');
}

module.exports.makeAdmin = (req,res) => {
    Employee.find({},(err,Allemployee)=>{
        res.render('makeAdmin',{allEmployee:Allemployee});
    })
}

module.exports.makeAdmin_form = (req,res) => {

    if(typeof(req.body.futureAdmin)!='object'){ //if a single check box is checked the convert it to arrays
        req.body.futureAdmin = [req.body.futureAdmin];
    }
    
    for(em of req.body.futureAdmin){ // iterate over the object
        Employee.findById(em,(err,emp)=>{ // find the emp in the database 
            emp.isAdmin = true; // update the is addmin field
            emp.save();
            res.redirect('back');
        })
    }
}