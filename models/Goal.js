const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  monthlyGoal: Number
});

module.exports = mongoose.model("Goal", goalSchema);
