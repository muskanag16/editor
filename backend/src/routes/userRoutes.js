// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const { protect } = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');

// 1. Account Stats (Total Projects, Created, Shared)
// router.get('/stats', protect, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // 1. Total projects jahan user collaborator hai
//     const totalProjects = await Project.countDocuments({ collaborators: userId });

//     // 2. Projects jo user ne khud banaye (Owner == userId)
//     const createdByYou = await Project.countDocuments({ owner: userId });

//     // 3. Collaborated projects = Total - Created
//     // (Kyuki har project jahan user collaborator hai, usme owner bhi include ho sakta hai)
//     const collaborated = totalProjects - createdByYou;

//     res.json({ totalProjects, createdByYou, collaborated });
//   } catch (err) {
//     res.status(500).json({ message: "Stats fetch failed" });
//   }
// });
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    // Saare projects le aao jahan user ka naam hai
    const allProjects = await Project.find({ collaborators: userId });
    
    // Frontend ko sirf list bhej do
    res.json(allProjects); 
  } catch (err) {
    res.status(500).json({ message: "Stats fetch failed" });
  }
});
// 2. Password Reset
router.put('/change-password', protect, async (req, res) => {
    const { newPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Password reset failed" });
    }
});

module.exports = router;