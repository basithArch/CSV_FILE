const express = require('express');
const router = express.Router();
// import passport
const passport = require('passport');


//take from controller
const userprofile_Controller = require('../controllers/userprofile_controller');
router.get('/profile/:id' ,passport.checkAuthentication ,userprofile_Controller.profile);

// exporting
module.exports = router;