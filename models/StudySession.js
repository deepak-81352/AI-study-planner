const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  subject: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudySession", studySessionSchema);
