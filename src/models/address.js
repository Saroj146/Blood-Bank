const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  p_id: { type: Schema.ObjectId, ref: 'Province', required: true },
  z_id: { type: Schema.ObjectId, ref: 'Zone', required: true },
  d_id: { type: Schema.ObjectId, ref: 'District', required: true },
  m_id: { type: Schema.ObjectId, ref: 'Municipality', required: true }
});

module.exports = mongoose.model('Address', AddressSchema);
