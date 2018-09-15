const mongoose = require('mongoose');

const { Schema } = mongoose;

const MunicipalitySchema = new Schema({
  name: { type: String, required: [true, 'required'] },
  type: {
    type: String,
    enum: ['METRO', 'SUBMETRO', 'MUNICIPALITY', 'RURALMUNICIPALITY'],
    required: [true, 'required']
  },
  d_id: { type: Schema.ObjectId, ref: 'District', required: [true, 'required'] }
});

module.exports = mongoose.model('Municipality', MunicipalitySchema);
