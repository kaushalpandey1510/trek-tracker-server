const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function() { //we use the 'function' keyword instead of 
    const user = this;
    if(!user.Modified('password'))
})

mongoose.model('User', userSchema);
