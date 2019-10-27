const jwt = require("jsonwebtoken");
const User = require("./User");

module.exports = function(req, res, next) {
  const token = req.header("auth");

  if (!token) return res.status(401).send("Access denied");

  //   res.send(req.user);
  //   next();
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    const token2 = jwt.sign(
      { id: req.user.id, name: req.user.name, role: req.user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.set("auth", token2).send(token2);
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};
