const router = require("express").Router();
const Form = require("./Form");
const Form1 = require("./formSend");
const Form2 = require("./hireSend");
const { authValidation } = require("./validation");

router.put("/", async (req, res) => {
  const { error } = authValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let formExists = await Form.updateOne({ name: req.body.name }, {$push:{"author": {"name" :req.body.author}}});
  await Form1.updateMany({ name: req.body.name }, {$push:{"author": {"name" :req.body.author}}});
  await Form2.updateMany({ name: req.body.name }, {$push:{"author": {"name" :req.body.author}}});
  if (!formExists) {
    return res.status(400).send("Error");
  }
  
  return res.send(formExists);
});

module.exports = router;
