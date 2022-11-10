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


//encrypting password
userSchema.pre('save', function () {
  //we use the 'function' keyword instead of => function, because in arrow fucntion this is refered to the entire file and function keyword this is refered to just that function
  const user = this;
  if (!user.Modified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});


//Password check
userSchema.methods.comparePassword = function (candiatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candiatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
