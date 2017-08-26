const mongoose = require('mongoose');

const eventDetailSchema = new mongoose.Schema(
  { eventID    : { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
  , hostID     : { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail' }
  , description: { type: String, required: true, trim: true }
  , title      : { type: String, required: true, trim: true }
  , location   : { type: String, required: true, trim: true }
  , eventDate  : { type: Date, default   : Date.now }
  , createdAt  : { type: Date, default   : Date.now }
  }
)
module.exports = mongoose.model('EventDetails', eventDetailSchema)