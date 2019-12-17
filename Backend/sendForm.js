const router = require("express").Router();
const Form = require("./formSend");

router.post("/", async (req, res) => {
  const form = new Form({
    name: req.body.name,
    data: req.body.data,
    author: req.body.author,
    status: "",
  });
  try {
    await form.save();
    res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
