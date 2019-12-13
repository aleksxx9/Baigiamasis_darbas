const router = require("express").Router();
const User = require("./User");

const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  try {
    const savedUser = await user.save();
    await form.save();
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role},
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.header("auth", token).send("Success");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
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

  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role, email: user.email },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  res.header("auth", token).send(token);
});
module.exports = router;
