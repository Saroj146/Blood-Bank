const mongoose = require('mongoose');

const { Schema } = mongoose;

const DistrictSchema = new Schema({
  name: { type: String, required: [true, 'required'] },
  p_id: {
    type: Schema.ObjectId,
    ref: 'Province',
    required: [true, 'required']
  }
});

module.exports = mongoose.model('District', DistrictSchema);
