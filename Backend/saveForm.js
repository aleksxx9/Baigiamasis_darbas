const router = require("express").Router();
const Form = require("./Form");
const { formValidation } = require("./validation");

router.post("/", async (req, res) => {
  const { error } = formValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const formExists = await Form.findOne({ name: req.body.name });

  if (formExists) {
    return res.status(400).send("Form already exists");
  }
  const form = new Form({
    name: req.body.name,
    data: req.body.data,
  });
  try {
    await form.save();
    res.send("Success");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
