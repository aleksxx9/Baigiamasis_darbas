const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  author: {
    type: JSON,
    rewuired: true,
  }
});

module.exports = mongoose.model("Hired", formSchema);
