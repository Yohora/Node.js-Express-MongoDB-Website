const Blog = require('../models/blog')
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');





const blog_home = (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      res.render('blog', {title: "Home", blogs: result})

    })
    .catch((err) => {
      console.log(err);
    })
};

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => {
      console.error(err);
      res.render('404' , {title: 'Blog Not Found'})
    })


};



const blog_create_get =  (req, res) => {
  res.render('create', {title: "Create my new Blog"})
};


const blog_create_post = (req, res) => {
  console.log(req.file)
  const blog = new Blog(req.body)
  blog.save()
  .then(() => {
    res.redirect('/blogs')
  })
  .catch((err) => {
    console.log(err);
  })

 
};






















//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');



//   const blog = new Blog({
//     image: Buffer.from(encode_image, 'base64'),
//     contentType: req.file.mimetype
// })

//   blog.save()
//   .then(img => {
//       res.json(img.id)
//   })
//   .catch(err => res.json(err))










const blog_delete_post = (req, res) => {

  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });


}

module.exports = {
  blog_home,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete_post
}









// _id: new mongoose.Types.ObjectId(),
