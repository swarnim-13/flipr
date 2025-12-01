const express = require('express');
const router = express.Router();
const Offering = require('../models/Offering');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all offerings (public)
router.get('/', async (req, res) => {
  try {
    const items = await Offering.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
  
const { title, get_price, min_investment } = req.body;
if (!title || !get_price) return res.status(400).json({ message: 'title and get_price required' });

  try {
    const body = req.body;
    if (req.file) body.image = '/uploads/' + req.file.filename;
    const offering = await Offering.create(body);
    res.json(offering);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
  
});

// PUT update
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (req.file) body.image = '/uploads/' + req.file.filename;
    const prev = await Offering.findById(id);
    if (req.file && prev?.image) {
      const prevPath = path.join(__dirname, '..', prev.image);
      if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath);
    }
    const updated = await Offering.findByIdAndUpdate(id, body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Offering.findByIdAndDelete(id);
    if (doc?.image) {
      const imgPath = path.join(__dirname, '..', doc.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

