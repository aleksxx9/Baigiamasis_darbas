const router = require("express").Router();
const Form = require("./formSend");

router.delete("/", async (req, res) => {
  try {
    var result = await Form.findOneAndDelete({
      _id: req.header("name"),
    }).exec();
    const mongoose = require("mongoose");
    //mongoose.remove({ _id: req.header("name") });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
