require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRouter = require('./Routes/auth');
const offeringsRouter = require('./Routes/offerings');
const newsletterRouter = require('./Routes/newsletter');

const app = express();
app.use(cors());
app.use(express.json());
// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', authRouter);
app.use('/api/offerings', offeringsRouter);
app.use('/api/newsletter', newsletterRouter);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    if (process.argv.includes('--seed')) {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      const email = process.env.ADMIN_EMAIL || 'admin@example.com';
      const pass = process.env.ADMIN_PASS || 'Admin123!';
      const existing = await User.findOne({ email });
      if (!existing) {
        const hashed = await bcrypt.hash(pass, 10);
        await User.create({ email, password: hashed });
        console.log('Seeded admin', email);
      } else {
        console.log('Admin already exists');
      }
      process.exit(0);
    }

    app.listen(PORT, () => console.log(`Server running ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message || err);
    process.exit(1);
  }
}
start();
