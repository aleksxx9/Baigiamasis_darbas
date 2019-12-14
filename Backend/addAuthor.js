const router = require("express").Router();
const Form = require("./Form");
const { authValidation } = require("./validation");

router.put("/", async (req, res) => {
  const { error } = authValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let formExists = await Form.updateOne({ name: req.body.name }, {$push:{"author": {"name" :req.body.author}}});
  if (!formExists) {
    return res.status(400).send("Error");
  }
  
  return res.send(formExists);
});

module.exports = router;
