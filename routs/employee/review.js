const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/reviewController');

router.get('/:id',controller.homeView);

router.post('/fidback-form',(req,res)=>{
    console.log(req.body);
    res.redirect('back');
})

module.exports = router;