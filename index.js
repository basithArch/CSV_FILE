const express = require('express');
const cookieParser = require('cookie-parser');
// Setport num
const port = 8000;
// app use express
const app = express();
// url endcoding
app.use(express.urlencoded({ extended: true }));
// using cookie
app.use(cookieParser());
// Layouts setups
const expresslayouts = require('express-ejs-layouts');
// DataBase Connection
const dataBase = require('./configration/mongoose');
// express-session
const session = require('express-session');
// for flash message require
const flash = require('connect-flash');
// custom middleware for flash
const customFlashMiddleWare = require('./configration/flash-middleware');
// Passport 
const passport = require('passport');
// local passport from configration
const passportLocal = require('./configration/passport-local-stretgy');
// google  stretgy
const passportGoogle = require('./configration/passport-google-oauth-stretgy');
// Requiring passport-jwt
const passport_JWT = require('passport-jwt');
const passport_JWT_Stretgy = require('./configration/passport-jwt-stretgy');

// permanent store cookie in storemongo using connect-mongo
const MongoStore = require('connect-mongo');
//layouts change
app.use(expresslayouts);
//extract styles and scripts from sub pages
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);
// view engine 
app.set('view engine','ejs');  //setting up view engine as ejs
app.set('views','views');   //setting path of views folder
// session use for cookies
app.use(session({
  name:'CSV_PROJECT',
  secret:'thisissecret',
  saveUninitialized: false,
  resave: false,
  cookie:{
      maxAge:(1000 * 60 * 100)
  },
  // mongostore connection where to store the session cookies
  store: MongoStore.create( 
      { 
          mongoUrl : 'mongodb://127.0.0.1:27017/CSV_PROJECT',
          autoRemove: 'disabled'//I dont want to remove session cookies automatically
      }, function(err){
     console.log('Error while trying to establish the connection and store session cookie:', err || 'connect-mongo setup okay');
  })
}));
// authentication uses 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//static files uses
app.use(express.static('assests'));
//accesing uploaded files from uploads folder 
app.use('/uploads',express.static(__dirname+'/uploads'));   
// // Using Flash 
app.use(flash());
app.use(customFlashMiddleWare.setFlash);
//Using Express Router For routing all access
app.use('/',require('./routes'));

// Server Related
app.listen(port, function(err){
    if(err){
        ('Error When Starting the server', err);
        return;
    }
    console.log("Successful Connected With The Server" , port);
});