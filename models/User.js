const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    },
  image: {
      type: String,
      default: 'user.png'
  },
  role: {
      type: String,
      default: 'admin'
  },
  verified: {
    type: Boolean,
    required: true,
    defualt: false,
  },

  //token mailed will be used for email verification or password reset
  tokenMailed: {
    type: String,
    default: 'none',
  },

  //auth Token to keep the currently logged in token.
  authToken: {
    type: String,
    default: 'none',
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
