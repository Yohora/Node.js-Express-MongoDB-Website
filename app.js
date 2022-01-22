const express = require('express');
const app = express(); 
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


const PORT = process.env.PORT || 5000

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


// blog routes
app.use('/blogs', blogRoutes)


























