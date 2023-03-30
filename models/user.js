const mongoose = require('mongoose'); 

// Creating User Details Schema

const User_Schema = new mongoose.Schema({
    email: {
        type: String,
        required :true,
        unique : true
    },
    password: {
        type : String,
        required :true
    },
    name:{
        type :String,
        required :true
    }
   },
   {
    timestamps : true
});

//setup
const User = mongoose.model('User',User_Schema);
// Exports
module.exports = User;