const router = require("express").Router();
const Form = require("./hireSend");

router.get("/", async (req, res) => {
  try {
    var result = await Form.find({ name: req.header("name") }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
