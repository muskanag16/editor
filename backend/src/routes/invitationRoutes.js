// backend/src/routes/invitationRoutes.js
const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const Project = require('../models/Project');
const User = require('../models/User'); // Ensure your User model path is correct
// const authMiddleware = require('../middlewares/authMiddleware'); // Agar aap JWT use kar rahe hain
const { protect } = require('../middlewares/authMiddleware');
// 1. Send Invitation (POST /api/invitations/send)
router.post('/send', protect, async (req, res) => {
  try {
    const { projectId, receiverEmail } = req.body;
    
    // Check karo jisko bhej rahe ho wo register hai ya nahi
    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) return res.status(404).json({ message: 'User with this email not found!' });

    // Check duplicate invitation
    const existingInvite = await Invitation.findOne({ project: projectId, receiverEmail, status: 'pending' });
    if (existingInvite) return res.status(400).json({ message: 'Invitation already sent!' });

    const newInvite = new Invitation({
      project: projectId,
      sender: req.user.id, // Logged in user ID
      receiverEmail
    });

    await newInvite.save();
    res.json({ message: 'Invitation sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Get My Invitations (GET /api/invitations/my-invitations)
// 2. Get My Invitations (GET /api/invitations/my-invitations)
router.get('/my-invitations', protect, async (req, res) => {
  try {
    // 1. Pehle database se current logged-in user ko dhundo taaki uska EXACT email mil jaye
    const currentUser = await User.findById(req.user._id || req.user.id);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Ab us confirm email se pending invites dhundo
    const invites = await Invitation.find({ receiverEmail: currentUser.email, status: 'pending' })
      .populate('project')
      .populate('sender', 'name email');
      
    res.json(invites);
  } catch (error) {
    console.error("GET Invites Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 3. Respond to Invitation (PUT /api/invitations/respond/:id)
router.put('/respond/:id', protect, async (req, res) => {
  try {
    const { action } = req.body; // 'accepted' ya 'rejected'
    const invite = await Invitation.findById(req.params.id);
    if (!invite) return res.status(404).json({ message: 'Invitation not found' });

    if (action === 'accepted') {
      invite.status = 'accepted';
      // Project ke andar collaborators array mein is user ko add karo
      await Project.findByIdAndUpdate(invite.project, {
        $addToSet: { collaborators: req.user.id }
      });
    } else {
      invite.status = 'rejected';
    }

    await invite.save();
    res.json({ message: `Invitation ${action} successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;