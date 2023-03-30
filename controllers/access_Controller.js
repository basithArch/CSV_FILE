// importing models
const User = require('../models/user');


// SignUp And Login Access

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return res.render('signin',{
        title:'Log-in Page | CSV Reader'
    });
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return res.render('firstPage',{
        title:'Sign-Up Page | CSV Reader'
    });
}

// get the data from sign Up And Creat Account
module.exports.create = async function(request , response){
    try{
        if(request.body.password != request.body.confirm_password){
            request.flash('error' ,'Password Not match');
            return response.redirect('back');
        } 
        let user = await User.findOne({email: request.body.email});
         // If no user with that mail then create
        if(!user){
            let user = await User.create(request.body);
            console.log('Successfully Created ',user);
            request.flash('success' , 'User Account Created Successfully');
            return response.redirect('/users/signin');
        }else{
            request.flash('error' , 'User Account Already');
            return response.redirect('back');
        }
    }catch(err){
        console.log('Error When Creating User Account', err);
        return;
    }
}

// create the session for the user login
module.exports.create_session = function(request,response){
    request.flash('success', 'Log In Successfully');
    return response.redirect('/user');
}


// For SignOut The User
module.exports.destroySession = function(request , response){
    request.logout(function(err) {
        if (err) {
            console.log('Error While Trying to Logout',err);
        }
        request.flash('success','Logged Out Successfully');
        return response.redirect('/');
    });
}
