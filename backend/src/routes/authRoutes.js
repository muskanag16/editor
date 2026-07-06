// // src/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');
// const { OAuth2Client } = require('google-auth-library');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// // POST /api/auth/signup
// router.post('/signup', registerUser);
// // const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// router.post('/google', async (req, res) => {
//   try {
//     const { token } = req.body;

//     // 1. Google se token verify karo
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,  
//     });
    
//     // 2. User ki details nikalo
//     const { name, email, picture, sub } = ticket.getPayload();

//     // 3. Check karo ki kya yeh user pehle se hamare DB mein hai
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Agar naya user hai, toh DB mein create kar do
//       // Google walo ka password nahi hota, toh dummy password ya handle kar lijiye
//       user = await User.create({
//         name,
//         email,
//         googleId: sub,
//         profilePicture: picture,
//         password: Math.random().toString(36).slice(-10)
//       });
//     }

//     // 4. Apna system ka JWT token generate karo
//     const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     // 5. Frontend ko response bhej do
//     res.status(200).json({
//       token: authToken,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error("Google Auth Error:", error);
//     res.status(401).json({ message: "Google Authentication failed" });
//   }
// });

// // module.exports = router;
// // POST /api/auth/login
// router.post('/login', loginUser);

// module.exports = router;
// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios'); // NAYA: Google se baat karne ke liye
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/auth/signup
router.post('/signup', registerUser);

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    // 1. Frontend se access_token receive karo
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ message: "Access token is missing!" });
    }

    // 2. Google ke userinfo API se token verify karke details nikalo
    const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    // Google se yeh data milega
    const { name, email, picture, sub } = googleResponse.data;

    // 3. Check karo ki kya yeh user pehle se hamare DB mein hai
    let user = await User.findOne({ email });

    if (!user) {
      // Agar naya user hai, toh DB mein create kar do
      user = await User.create({
        name,
        email,
        googleId: sub,
        profilePicture: picture, // Ensure karo ki schema mein ye field ho
        password: Math.random().toString(36).slice(-10) // Dummy password
      });
    }

    // 4. Apne system ka JWT token generate karo
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // 5. Frontend ko response bhej do
    res.status(200).json({
      token: authToken,
      user: {
        _id: user._id, 
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });

  } catch (error) {
    console.error("Google Auth Error:", error?.response?.data || error.message);
    res.status(401).json({ message: "Google Authentication failed" });
  }
});

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;