require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// ✅ ADD THESE ROUTES BACK
app.use("/api/auth", require("./routes/auth"));
app.use("/api/study", require("./routes/study"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/weeklyPlan", require("./routes/weeklyPlan"));

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
