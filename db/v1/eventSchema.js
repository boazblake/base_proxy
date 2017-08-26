const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  { title               : { type  : String, required     : true, trim: true }
  , description         : { type  : String, required     : true, trim: true }
  , location            : { type  : String, required     : true, trim: true }
  , eventDate           : { type  : Date, default        : Date.now }
  , hostID              : { type  : mongoose.Schema.Types.ObjectId, ref: 'UserDetail' }
  , itemCollection      : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Item' }]
  , attendanceCollection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance'}]
  , createdAt           : { type  : Date, default                      : Date.now }
})
module.exports = mongoose.model('Event', eventSchema)