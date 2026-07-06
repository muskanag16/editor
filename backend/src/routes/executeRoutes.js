// src/routes/executeRoutes.js
const express = require('express');
const router = express.Router();
const { executeCode } = require('../controllers/executeController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, executeCode);

module.exports = router;