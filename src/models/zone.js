const mongoose = require('mongoose');

const { Schema } = mongoose;

const ZoneSchema = new Schema({
  name: { type: String, required: true },
  p_id: { type: Schema.ObjectId, ref: 'Province', required: true }
});

module.exports = mongoose.model('Zone', ZoneSchema);
