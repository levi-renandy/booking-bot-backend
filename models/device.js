const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  allowed: {
    type: Boolean,
    required: true,
  },
});

const device = mongoose.model("device", deviceSchema);

module.exports = device;
