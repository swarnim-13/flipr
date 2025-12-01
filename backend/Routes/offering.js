const express = require('express');
const router = express.Router();
const Offering = require('../models/Offering');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all offerings (public)
router.get('/', async (req, res) => {
  const items = await Offering.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST create (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
  const body = req.body;
  if (req.file) body.image = '/uploads/' + req.file.filename;
  const offering = await Offering.create(body);
  res.json(offering);
});

// PUT update
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (req.file) body.image = '/uploads/' + req.file.filename;
  const prev = await Offering.findById(id);
  // remove previous file if replaced
  if (req.file && prev?.image) {
    const prevPath = path.join(__dirname, '..', prev.image);
    if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath);
  }
  const updated = await Offering.findByIdAndUpdate(id, body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const doc = await Offering.findByIdAndDelete(id);
  if (doc?.image) {
    const imgPath = path.join(__dirname, '..', doc.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  res.json({ message: 'Deleted' });
});

module.exports = router;
