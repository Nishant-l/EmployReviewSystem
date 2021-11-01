const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Employe = require('../model/employe');

//-------------------------------------------------------------------------------------------------------------------------------------------
passport.use(new localStrategy({usernameField:'email',passReqToCallback:true},(req,email,password,done)=>{ // local stretagy to validate the employe login
    Employe.findOne({email:email},(err,user)=>{ //find the userwith unique email exists
        console.log(req.url);
        if(err){
            console.log('error while loging in employee -----> Passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('wrong password employee ----> passport');
            return done(null,false);
        }
        if(user && user.password == password){ //if user and password are both valid
            if(req.url === '/adminLogin-form'){ // check if the request is for Admin login
                if(user.isAdmin != true){ //if the request is for admin login and the user is not a admin
                    return done(null,false); // return callback with false
                }
            }
            console.log('login successfull of employeee -----> passport');
            return done(null,user);
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
    }else if(req.isAuthenticated() && req.user.isAdmin != true){
        req.logout();
        return res.redirect('/adminLogin');
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