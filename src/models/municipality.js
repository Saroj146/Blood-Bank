const mongoose = require('mongoose');

const { Schema } = mongoose;

const MunicipalitySchema = new Schema({
  name: { type: String, required: true },
  d_id: { type: Schema.ObjectId, ref: 'District', required: true }
});

module.exports = mongoose.model('Municipality', MunicipalitySchema);
