require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/study", require("./routes/study"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/weeklyPlan", require("./routes/weeklyPlan"));


app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);
