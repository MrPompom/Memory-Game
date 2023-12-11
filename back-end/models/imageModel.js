// models/ImageModel.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
