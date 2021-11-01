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

        if(req.body.toBeReviewed instanceof Object){ //check if the toBeRevieved is a single value or js object
            for(r of req.body.toBeReviewed){ //if js object iterate over it
                let count =0; 
                for(k of reveiwer.toReview){ //iterate over all the to be reveived array to check if the id is alredy present
                    if(k.id == r){ //if present increase the count
                        count++;
                    }
                }
                // console.log(count);
                if(count == 0){ //if the to_be_reveived id is not present in the array
                    reveiwer.toReview.push(r); 
                }
            }
        }else{ //if toBeRevieved is a singlr value
            let count =0; 
                for(k of reveiwer.toReview){ //iterate over all the to be reveived array to check if the id is alredy present
                    if(k.id == req.body.toBeReviewed){ //if present increase the count
                        count++;
                    }
                }
                // console.log(count);
                if(count == 0){ //if the to_be_reveived id is not present in the array
                    reveiwer.toReview.push(req.body.toBeReviewed); 
                }

        }
        reveiwer.save(); //save the changes in database
        // console.log(reveiwer.toReview)
    })
    // console.log(req.body);
    res.redirect('back');
}