const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
  },
});

module.exports = mongoose.model("Form", formSchema);
