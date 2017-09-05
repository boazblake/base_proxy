const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema(
  { userId: { type: String, required : true }  
  ,  name: { type: String, required : true }
  , createdAt   : { type: Date, default : Date.now }
  })

module.exports = mongoose.model('Tenant', tenantSchema)

// _userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }