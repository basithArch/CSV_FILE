const express = require('express');
const router = express.Router();

const file_Controller = require('../controllers/files_controller');

router.post('/upload_file',file_Controller.upload);   //Creating route to upload new file
router.get('/open_file',file_Controller.open);        //Creating route to open already uploaded file
router.get('/delete_file',file_Controller.delete);    //Creating route to delete a particular file

module.exports = router;