const mongoose = require('mongoose');

// User Schema
const HotSauceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const HotSauce = mongoose.model('HotSauce', HotSauceSchema);
module.exports.HotSauce = HotSauce;