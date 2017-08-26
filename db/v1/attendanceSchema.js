const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  { userDetailID : { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail' }
  , eventID      : { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
  , userPartySize: { type: Number, required                   : true, trim: true }
  , createdAt    : { type: Date, default                      : Date.now }
  }
)
module.exports = mongoose.model('Attendance', attendanceSchema)