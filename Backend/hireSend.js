const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
});

module.exports = mongoose.model("Hired", formSchema);
