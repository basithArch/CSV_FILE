const express = require('express');
const router = express.Router();

const home_Controller = require('../controllers/home_controller');
const first_pageController = require('../controllers/first_page');
const passport = require('passport');


router.get('/', passport.checkAuthentication,first_pageController.firstPage); //Creating route home
router.get('/user',home_Controller.home);    //Creating route for main CSV 

router.use('/users',require('./access'));// creating routes for login and signup page
router.use('/users',require('./userprofile'));// creating routes for Profile page


router.use('/file',require('./file'));  //Creating route for all other routes related to files

module.exports = router;

