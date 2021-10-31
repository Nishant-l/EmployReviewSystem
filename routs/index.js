const express = require('express');
const router = express.Router();
const passport = require('passport');
const indexController = require('../controller/indexController')

//routs for rendering login and sign-up pages
router.get('/employeeLogin',indexController.employeeLogIn);
router.get('/employeeSignup',indexController.employeeSignUp);
router.get('/adminLogin',indexController.adminLogin);

//routs for handeling form inputs
router.post('/employeeLogin-form',passport.authenticate('local',{failureRedirect:'/employeeLogin'})) //authenticate this path withpassport
router.post('/adminLogin-form',passport.authenticate('local',{failureRedirect:'/adminLogin'}))  //authenticate this path withpassport
router.post('/employeeSignUp-form',indexController.createEmployee); //controler inserts data into db to create new employee

router.use('/employee',passport.isEmploye,require('./employee'));
router.use('/admin',passport.isAdmin,require('./admin'));

module.exports = router;