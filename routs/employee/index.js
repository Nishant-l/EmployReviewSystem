const { application } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/showListToReviewController');

router.get('/',(req,res)=>{
    res.send(req.user)
})

router.get('/showListToReview',controller.showListToReview);

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/employeeLogin');
})

router.use('/review',require('./review'));

module.exports = router;