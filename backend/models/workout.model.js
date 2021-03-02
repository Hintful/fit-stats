const { Schema, Mongoose } = require("mongoose");

const workoutSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

const Workout = Mongoose.model('Workout', workoutSchema);

module.exports = Workout;