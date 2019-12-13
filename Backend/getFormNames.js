const router = require("express").Router();
const Form = require("./Form");

router.get("/", async (req, res) => {
  try {
    var data = await Form.find().exec();
    let array = [];
    let i = 0;
    data.forEach(name => {
      array[i] = name.role + "\\n" + name.expirationTime + "\\n" + name.name;
      i++;
    });
    res.send(array);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
