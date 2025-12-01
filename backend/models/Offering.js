const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  tag: String,
  image: String, // path to uploaded image
  title: String,
  location: String,
  description: String,
  total_price: Number,
  get_price: Number,
  security_type: String,
  investment_multiple: String,
  maturity: String,
  min_investment: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offering', offeringSchema);
