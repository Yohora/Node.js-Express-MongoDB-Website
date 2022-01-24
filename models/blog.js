const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = Date()



const blogSchema = new Schema({   // structure of data
  image: {

    type: String
  
  },
  
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
  },

  date: { 
    type: String,
    default: date
  
   }

}, { 
  timestamps: true
});



// model is interface to communicate with database 

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;
































































