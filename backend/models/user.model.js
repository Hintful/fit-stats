const { Schema, Mongoose } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // trim trailing white-spaces in username
    minlength: 4
  }
}, {
  timestamps: true
});

const User = Mongoose.model('User', userSchema);

module.exports = User;