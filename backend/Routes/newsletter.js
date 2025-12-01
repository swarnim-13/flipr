const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const auth = require('../middleware/auth');

// POST subscribe (public)
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const sub = await Subscriber.create({ email });
  res.json(sub);
});

// GET subscribers (admin)
router.get('/', auth, async (req, res) => {
  const items = await Subscriber.find().sort({ createdAt: -1 });
  res.json(items);
});

module.exports = router;
