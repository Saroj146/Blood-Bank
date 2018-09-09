const mongoose = require('mongoose');

const { Schema } = mongoose;

const DistrictSchema = new Schema({
  name: { type: String, required: true },
  z_id: { type: Schema.ObjectId, ref: 'Zone', required: true }
});

module.exports = mongoose.model('District', DistrictSchema);
