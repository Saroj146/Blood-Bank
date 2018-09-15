const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProvinceSchema = new Schema({
  name: { type: String, required: [true, 'required'] },
  number: { type: Number, required: [true, 'required'] }
});

module.exports = mongoose.model('Province', ProvinceSchema);
