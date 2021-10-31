const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Employe = require('../model/employe');

//-------------------------------------------------------------------------------------------------------------------------------------------
passport.use(new localStrategy({usernameField:'email'},(email,password,done)=>{ // local stretagy to validate the employe login
    Employe.findOne({email:email},(err,user)=>{
        if(err){
            console.log('error while loging in employee -----> Passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('wrong password employee ----> passport');
            done(null,false);
        }
        if(user && user.password == password){
            console.log('login successfull of employeee -----> passport');
            done(null,user);
        }
        return done(null,false);
    })
}));

//-------------------------------------------------------------------------------------------------------------------------------------------
passport.serializeUser((user,done)=>{ // the user id is stored in req.session.passport.user
    done(null,user.id);
})

//-------------------------------------------------------------------------------------------------------------------------------------------
passport.deserializeUser((id,done)=>{ // the session id is retrived from cookie and the employee with the id is retrived from db
    Employe.findById(id,(err,employe)=>{
        if(err){
            done(err);
        }
        done(null,employe);
    })
})
//-------------------------------------------------------------------------------------------------------------------------------------------

passport.isAdmin = (req,res,next)=>{ // to check if the authenticated user is an admin
    if(req.isAuthenticated() && req.user.isAdmin === true){
        return next();
    }else{
        return res.redirect('/adminLogin');//ToDo 
    }
};
//-------------------------------------------------------------------------------------------------------------------------------------------

passport.isEmploye = (req,res,next) =>{ //to check if the authenticate user is an employee
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/employeeLogin');
};
//-------------------------------------------------------------------------------------------------------------------------------------------

passport.setAuthenticatedUser = (req,res,next) => { // to set the locals.user property on res to be utilised by the EJS while serverside rendering
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
//-------------------------------------------------------------------------------------------------------------------------------------------

module.exports = passport;