const router = require("express").Router();
const Form = require("./hireSend");

router.post("/", async (req, res) => {
  const form = new Form({
    name: req.body.name,
    data: req.body.data,
    author: req.body.author,
  });
  try {
    await form.save();
    res.send(form);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
