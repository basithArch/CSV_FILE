// user models 
const User = require('../models/user');


// for signup controll

module.exports.sign_up = function(request , response){
    if(request.isAuthenticated()){
        return response.redirect('/user');
   }
    return response.render('firstPage',{
        title : 'Sign-Up or Log-in | CSV READER'
    });
}

// For sign in controll 

module.exports.sign_in = function(request , response){
    if(request.isAuthenticated()){
       return response.redirect('/user');
    }
    return response.render('firstPage',{
        title: 'Sign-Up or Log-in | CSV READER'
    });
}

// Create User Account
module.exports.create = async function(request , response){
  
    //  Using async await 
    try{
        if(request.body.password != request.body.confirm_password){
            request.flash('error' , 'Password Not Matched');
            return response.redirect('back');
        } 
        let user = await User.findOne({email: request.body.email});
         // If no user with that mail then create
        if(!user){
            let user = await User.create(request.body);
            console.log('Successfully Created ',user);
            request.flash('success' , 'User Account Created Successfully');
            return response.redirect('/user/sign_in');
        }else{
            request.flash('error' , 'User Account Already');
            return response.redirect('back');
        }
    }catch(err){
        console.log('Error When Creating User Account', err);
        return;
    }
}



// create the session for the user
module.exports.create_session = function(request,response){
    // Using passposrt Js library use
    request.flash('success', 'Log In Successfully');
    return response.redirect('/user');
}


// For SignOut 
module.exports.destroySession = function(request , response){
    request.logout(function(err) {
        if (err) {
            console.log('Error While Trying to Logout',err);
        }
        request.flash('success' , 'Logged Out Successfully');
        return response.redirect('/');
    });
}

