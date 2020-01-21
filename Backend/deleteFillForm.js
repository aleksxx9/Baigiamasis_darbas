const router = require("express").Router();
const Archive = require("./formSend");
const Form = require("./Form");
const Hired = require("./hireSend");

router.delete("/", async (req, res) => {
  try {
    var result = await Form.findOneAndDelete({
      name: req.header("name"),
    }).exec();
    try {
      var result = await Archive.deleteMany({
        name: req.header("name"),
      }).exec();
      try {
        var result = await Hired.deleteMany({
          name: req.header("name"),
        }).exec();
      } catch (error) {
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(500).send(error);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
