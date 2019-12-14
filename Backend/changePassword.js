const router = require("express").Router();
const { changeValidation } = require("./validation");
const User = require("./User");
const bcrypt = require("bcryptjs");

router.put("/", async (req, res) => {
  const { error } = changeValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Wrong credentials");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Wrong credentials");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hashedPassword;
  user.save();
  return res.send("success");
});
module.exports = router;

