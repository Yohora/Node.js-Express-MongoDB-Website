const express = require('express');
const app = express();  // initialize express application
const PORT = process.env.PORT || 5000


require('dotenv').config();


const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const bodyParser = require('body-parser');



// Static Files | Middleware
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ 
  extended: true,
  })
);

app.use(express.static('Public'));
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));



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


app.use('/blogs', blogRoutes)
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

































