const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  { userDetailID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail' }
  , eventID     : { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
  , itemName    : { type: String, required                   : true, trim: true }
  , itemQuantity: { type: String, required                   : true, trim: true }
  , createdAt   : { type: Date, default                      : Date.now }
  })

module.exports = mongoose.model('Item', itemSchema)