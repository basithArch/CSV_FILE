const multer = require('multer');   //Here multer used to upload files
const path = require('path');       //Importing path module
const csv = require('csv-parser');  //Here csv-parser used to convert data into json format
const fs = require('fs');           //importing fs to perform operations over file system
const uploadedFileNames = [];       //Creating array to contain names of uploaded files
const file_PATH = path.join('/uploads');// File Path


//Module to set-up a multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..' ,file_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  });


  //Here file-filter function used to upload only (.csv) files
function fileFilter (req, file, cb) {

    if(file.mimetype == 'text/csv'){
        cb(null,true);
    }
    else{
        console.log("Error occured only csv file allowed");
        cb(null,false);
    }
  }

  const upload = multer({storage:storage,fileFilter:fileFilter}).single('uploaded_file');  //initializing multer

  
//Module to upload file in uploads folder
module.exports.upload = function(req,res){
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            console.log("****error occured due to multer",err);
            req.flash('error' ,'Error Please Upload File');
            return;
        }
        else if(err){
            console.log('error occured due to multer',err);
            req.flash('error' ,'Please Select File');
            return;
        }
        else if(req.file){
            uploadedFileNames.push(req.file.filename);
            req.flash('success' ,'File Uploaded SucccessFully');
        }
        return res.redirect('back');
    });
}

//exporting array to make it accessible to other files
module.exports.uploadedFileNames = function(){
  return uploadedFileNames;
}

//module to open the csv file and shows its content in a tabular form
module.exports.open = function(req,res){
  const csv_Parsed_Data = [];              //Creating array to store the data in JSON format
  const index = req.query.index;
  fs.createReadStream(path.join(__dirname,'..',file_PATH,uploadedFileNames[index])) //setting up the path for file upload
  .pipe(csv())
  .on('data', (data) => csv_Parsed_Data.push(data))
  .on('end', () => {
   return res.render('main_view',{
        title: 'CSV  Reader | Tabuler View ',
        csvData: csv_Parsed_Data
    });
  });
}

//Module to delete any particular CSV file
module.exports.delete = function(req,res){
  let indx = req.query.index;
  try { var files = fs.readdirSync(path.join(__dirname,'..',file_PATH)); }
    catch(e) { return; }
    if (files.length > 0){
        var filePath = path.join(__dirname,'..',file_PATH,uploadedFileNames[indx]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
    }
    uploadedFileNames.splice(indx,1);
    req.flash('success' , 'File SuccessFully Deleted');
    return res.redirect('back');
}