const router = require("express").Router();
const User = require("./User");

router.delete("/", async (req, res) => {
  try {
    var result = await User.findOneAndDelete({
      email: req.header("name"),
    }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
