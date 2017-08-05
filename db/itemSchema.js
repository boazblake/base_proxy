const mongoose = require('mongoose');

// ----------------------
// ITEMS
// ----------------------
const itemSchema = new mongoose.Schema({
  firstName:     { type: String, required: true },
  lastName:  { type: String, required: true },
  image:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Item', itemSchema)