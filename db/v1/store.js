const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  { name                : { type  : String, required : true, trim: true }
  , tenantId: { type: String, required : true }  
  // , description         : { type  : String, required : true, trim: true }
  // , property            : { type  : String, required : true, trim: true }
  // , landlord            : { type  : String, required : true, trim: true}
  // , isConfirmed         : { type  : Boolean, required: true}
  , createdAt           : { type  : Date, required : true, default : Date.now }
  // , expiration          : { type  : Date, required : true, default : Date.now }
  // , _tenantId             : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Tenant' }]
})
module.exports = mongoose.model('Store', storeSchema)