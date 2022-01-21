const express = require('express');
const app = express(); 
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const Blog = require('./models/blog')

// express app
app.use(expressLayouts);

// Connect to mongoDB & Server
const dbURI =  'mongodb+srv://Yohora:Hybrid99@yohcluster.lsnet.mongodb.net/Yohora-Node?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT, 
    () => console.log(`Live on PORT ${PORT}`)))
  .catch((err) => console.log(err))
  console.log(`Live on PORT ${PORT}`)

// Templating engine
app.set('layout', './layouts/main_layout');
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Static Files | Middleware
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


// Blog Route and Render Views

app.get('/', (req, res) => {
  res.redirect('/blogs')

});


app.get('/about', (req, res) => {
  res.render('about', {title: "About"});
});


app.get('/projects', (req, res) => {
  res.render('projects', {title: "Projects"});
});


app.get('/blogs/create', (req, res) => {
  res.render('create', {title: "Create my new Blog"})
});



app.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      res.render('blog', {title: "Home", blogs: result})

    })
    .catch((err) => {
      console.log(err);
    })

});


// Post Requests

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
  
  blog.save()
    .then(() => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      console.log(err);
    })

});


app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details'});
    })
    .catch(err => {
      console.error(err);
    });
});


































// // Render views
// app.get('/', (req, res) => {
//   res.redirect('/blogs')
//   // res.render('blog', {title: "Home"});
// });






// // Mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'Yohoras New Blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//       console.log(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })

// });


// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//    .then((result) => {
//      res.send(result)
//    })
//    .catch((err) => {
//      console.log(err)
//    })
// });


// app.get('single-blog', (req, res) => {
//   Blog.findById('61e95a1675da938825b175b0')
//     .then((result) => {
//       res.send(result)
//     })

//     .catch((err) => {
//       console.log(err)
//   });

// });
