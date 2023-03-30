const express = require('express');
const router = express.Router();
// import passport
const passport = require('passport');

//take from controller
const access_Controller = require('../controllers/access_Controller');

// signin and singup routes
router.get('/signin',access_Controller.signin);
router.get('/signup',access_Controller.signup);

// User Login And Creating 
// sign up crete route
router.post('/create',access_Controller.create);
// sigin session using middleware passport
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),access_Controller.create_session);
// signOut request
router.get('/sign_out',  access_Controller.destroySession);


// for google stretgy
router.get('/auth/google' , passport.authenticate('google' ,{scope: ['profile', 'email ']}));
router.get('/auth/google/callback' , passport.authenticate( 'google',{failureRedirect: '/users/sign_in'}), access_Controller.create_session);


// exporting
module.exports = router;