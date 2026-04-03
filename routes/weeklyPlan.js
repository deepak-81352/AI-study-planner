const express = require("express");
const router = express.Router();

let weeklyPlanData = "";

router.post("/save", (req, res) => {
  weeklyPlanData = req.body.plan;
  res.json({ message: "Plan Saved" });
});

router.get("/", (req, res) => {
  res.json({ plan: weeklyPlanData });
});

module.exports = router;
