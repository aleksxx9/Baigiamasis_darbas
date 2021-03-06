const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
  },
  author: {
    type: JSON,
    required: true,
  },
  status: {
    type: String,
  }
});

module.exports = mongoose.model("Answer", formSchema);
