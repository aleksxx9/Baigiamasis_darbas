const router = require("express").Router();
const Form = require("./formSend");

router.put("/", async (req, res) => {
  try {
    var result = await Form.updateOne({ _id: req.header("name")}, {$set:{"status": "declined"}});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
