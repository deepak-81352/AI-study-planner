const router = require("express").Router();
const StudySession = require("../models/StudySession");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.post("/add", auth, async (req, res) => {
  const { subject, duration } = req.body;

  const session = new StudySession({
    userId: req.user.id,
    subject,
    duration
  });

  await session.save();

  await User.findByIdAndUpdate(req.user.id, {
    $inc: { xp: duration }
  });

  res.json({ msg: "Session saved" });
});

router.get("/analytics", auth, async (req, res) => {
  const sessions = await StudySession.find({ userId: req.user.id });

  const totalHours = sessions.reduce((sum, s) => sum + s.duration, 0);

  res.json({
    totalHours,
    totalSessions: sessions.length
  });
});

module.exports = router;
