const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  img_base64: String,
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
