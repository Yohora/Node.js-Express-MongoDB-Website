
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')
const path = require('path');
const multer = require('multer');



const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './uploads/');
  },


  
  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});


const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
});






router.get('/create', blogController.blog_create_get);

router.get('/', blogController.blog_home);

router.post('/', upload.single('image') ,blogController.blog_create_post);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete_post);

module.exports = router