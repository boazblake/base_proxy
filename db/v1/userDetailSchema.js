const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema(
  { userID   : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  , email    : { type: String, required: true, trim: true }
  , lastName : { type: String, trim: true }
  , firstName: { type: String, trim: true }
  , createdAt: { type: Date, default   : Date.now }
  , itemCollection : [{type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
  , attendanceCollection : [{type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
  })
module.exports = mongoose.model('UserDetails', userDetailSchema)