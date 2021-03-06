const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;