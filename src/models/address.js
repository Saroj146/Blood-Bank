const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  p_id: {
    type: Schema.ObjectId,
    ref: 'Province',
    required: [true, 'province required']
  },
  d_id: {
    type: Schema.ObjectId,
    ref: 'District',
    required: [true, 'district required']
  },
  m_id: {
    type: Schema.ObjectId,
    ref: 'Municipality',
    required: [true, 'municipality required']
  }
});

module.exports = mongoose.model('Address', AddressSchema);
