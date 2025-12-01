const express = require('express');
const Offering = require('../models/Offering');

const router = express.Router();

// GET /api/offerings - list offerings
router.get('/', async (req, res) => {
  try {
    const all = await Offering.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/offerings - create a new offering
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const created = await Offering.create(body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
