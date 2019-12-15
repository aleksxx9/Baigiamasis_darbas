const router = require("express").Router();
const { changeValidation } = require("./validation");
const Form = require("./Form");
const bcrypt = require("bcryptjs");

router.put("/", async (req, res) => {

  const user = await Form.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send("Wrong data");
  }
  user.expirationTime = req.body.expiration;
  user.save();
  return res.send("success");
});
module.exports = router;

