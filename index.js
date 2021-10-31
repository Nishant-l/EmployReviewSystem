const express = require('express');
const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/pasport-local-strategy');
const session = require('express-session');
const layout = require('express-ejs-layouts');
const mongoStore = require('connect-mongo');
const port = 8080;

const app = express();

app.use(express.static('./assets'));

app.set('views','views');
app.set('view engine','ejs');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.urlencoded({extended:true}));
app.use(layout);
app.use(session({
    name:'empReviewSystem',
    secret:'holaaa',
    resave:false,
    saveUninitialized:false,
    store:mongoStore.create({
        mongoUrl:'mongodb://localhost/EmployeReviewSystemDev',
        autoRemove:'disabled'
    },(err)=>{console.log(`error connecting to mongoDb during session creation ${err}`)}),
    cookie:{
        maxAge: (1000*60*60)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routs'));

app.listen(port,(err)=>{
    if(err){
        console.log('❌ error starting the server');
    }
    console.log(`✅ server up and running on port ${port}`);
})