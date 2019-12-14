const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
  },
  expirationTime: {
    type: String
  },
  role: {
    type: String,
    required: true,
  },
  author: {
    type: JSON,
  }
});

module.exports = mongoose.model("Form", formSchema);
