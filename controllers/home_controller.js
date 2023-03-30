const file_Controller = require('./files_controller');

const uploadedFileNames = file_Controller.uploadedFileNames;
const array = uploadedFileNames();   //containing csv filenames

module.exports.home = function(req,res){
    return res.render('home',{
        title:'Home | CSV Reader',
        files: array
    });
}

