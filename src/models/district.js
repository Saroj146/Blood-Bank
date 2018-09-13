const mongoose = require('mongoose');

const { Schema } = mongoose;

const DistrictSchema = new Schema({
  name: { type: String, required: true },
  p_id: { type: Schema.ObjectId, ref: 'Province', required: true }
});

module.exports = mongoose.model('District', DistrictSchema);
