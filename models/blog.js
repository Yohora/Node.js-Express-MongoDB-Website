const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({   // structure of data
  
  title: {
    type: String,
    required: true
  },

  snippet: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  }

}, { 
  timestamps: true
});



// model is interface to communicate with database 

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;




































